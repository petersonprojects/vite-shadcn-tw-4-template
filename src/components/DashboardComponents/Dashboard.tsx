/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../main';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from "../../LoadingContext/LoadingContext.tsx";
import TestComponent from "../../test-components/TennisBallLoader.tsx";
import VerifyEmail from './VerifyEmail';
import { Check, X, Edit, AlertCircle, Badge, User, Mail, History, RefreshCw, Loader2, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "../../lib/utils";

import "./Dashboard.css";

const UserDashboard = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const { isLoading, setIsLoading } = useLoading();
  const [itemsBeingEdited, setItemsBeingEdited] = useState<any>([]);
  const [error, setError] = useState(null);
  const userId = useSelector(selectUserId);
  const hasRun = useRef(false);

  // Function to transform single object into array of objects
  function objectToArray(obj: any): any {
    const arrayFromObject = Object.keys(obj).map(key => {
      const originalText = key;
      const normalizedText = originalText.replace(/([A-Z])/g, " $1");
      const lowerCaseText = normalizedText.toLowerCase();

      return {
        fieldName: lowerCaseText,
        oldValue: obj[key],
        newValue: obj[key],
        isBeingEdited: false,
        isEditable: false,
        hasError: false,
        isLoading: false,
        errorMessage: ""
      }
    });

    const arrayWithEditConstraints = arrayFromObject.map((obj: any) => {
      const editableFields = ["first name", "last name", "username"];

      // it is an editable field in the ok list
      if (editableFields.indexOf(obj.fieldName) !== -1) {
        // return the same obj with the isEditable set to true
        return {
          ...obj,
          isEditable: true
        }
      } else {
        return {
          ...obj
        }
      }
    });

    return arrayWithEditConstraints;
  }

  useEffect(() => {
    const fetchDetails = async () => {
      if (!userId) return;

      setIsLoading(true);
      try {
        const { data } = await axios.get(`/api/user-details?userId=${userId}`);
        console.log("user details: ", data);
        setUserDetails(data);
        const arrayDetails = objectToArray(data);
        console.log(arrayDetails);
        setItemsBeingEdited(arrayDetails);
      } catch (error: any) {
        setError(error.response && error.response.data.message
          ? error.response.data.message
          : error.message);
      }
    };

    if (userId && !hasRun.current) {
      fetchDetails();
      hasRun.current = true;
    }
  }, [userId, setIsLoading]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    console.log("items being edited: ", itemsBeingEdited);
  }, [itemsBeingEdited]);

  const buttonClicked = (event: any, editableObj: any) => {
    if (editableObj.isBeingEdited) {
      event.stopPropagation();
      return;
    }

    if (editableObj.isEditable && !editableObj.isBeingEdited) {
      const newArray = itemsBeingEdited.map((obj: any) => {
        if (obj.fieldName === editableObj.fieldName) {
          return {
            ...obj,
            isBeingEdited: true
          };
        }
        return obj;
      });

      setItemsBeingEdited(newArray);
    }
  };

  const determineIcon = (fieldName: string) => {
    if (fieldName === "first name" || fieldName === "last name") {
      return <Badge className="h-4 w-4" />;
    }
    if (fieldName === "username") {
      return <User className="h-4 w-4" />;
    }
    if (fieldName === "email") {
      return <Mail className="h-4 w-4" />;
    }
    if (fieldName === "created at") {
      return <History className="h-4 w-4" />;
    }
    if (fieldName === "updated at") {
      return <RefreshCw className="h-4 w-4" />;
    }
    
    return <Badge className="h-4 w-4" />;
  };

  return (
    <>
      {isLoading && <TestComponent size={40} speed={0.6} />}
      
      <AnimatePresence>
        {!isLoading && userDetails?.isEmailVerified && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4"
          >
            <Card className="col-span-1 shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-zinc-800/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold">
                  Account Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {error ? (
                  <p className="text-destructive">Error fetching details: {error}</p>
                ) : userDetails ? (
                  <div className="space-y-1">
                    {itemsBeingEdited.map((editableObj: any) => (
                      <motion.div
                        key={editableObj.fieldName}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={cn(
                          "flex items-center p-3 rounded-md transition-all duration-200 group relative",
                          editableObj.isBeingEdited 
                            ? "bg-muted dark:bg-zinc-700/50 border-l-4 border-primary" 
                            : editableObj.isEditable 
                              ? "hover:bg-muted/70 dark:hover:bg-zinc-700/30 hover:scale-[1.01] hover:shadow-sm cursor-pointer hover:border-l-4 hover:border-primary/70" 
                              : "hover:bg-muted/30 dark:hover:bg-zinc-700/20 cursor-default"
                        )}
                        onClick={(event) => buttonClicked(event, editableObj)}
                      >
                        <div className={cn(
                          "mr-3 text-primary transition-transform duration-200",
                          editableObj.isEditable && !editableObj.isBeingEdited && "group-hover:scale-110"
                        )}>
                          {determineIcon(editableObj.fieldName)}
                        </div>
                        
                        <div className="flex-1">
                          {!editableObj.isBeingEdited ? (
                            <div className="space-y-0.5">
                              <p className="text-sm text-muted-foreground capitalize">
                                {editableObj.fieldName}
                              </p>
                              <p className={cn(
                                "font-medium",
                                editableObj.isEditable && "group-hover:text-primary transition-colors duration-200"
                              )}>
                                {editableObj.oldValue}
                              </p>
                            </div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Input
                                className="w-full dark:bg-zinc-800 focus-visible:ring-primary"
                                placeholder={`Edit ${editableObj.fieldName}`}
                                defaultValue={editableObj.oldValue}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                  const newArray = itemsBeingEdited.map((obj: any) => {
                                    if (obj.fieldName === editableObj.fieldName) {
                                      return {
                                        ...obj,
                                        newValue: event.target.value,
                                        hasError: false,
                                        errorMessage: ""
                                      };
                                    }
                                    return obj;
                                  });
                                  setItemsBeingEdited(newArray);
                                }}
                              />
                            </motion.div>
                          )}
                        </div>
                        
                        <div className="flex space-x-1">
                          {editableObj.oldValue !== editableObj.newValue && editableObj.newValue.length > 0 && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className={cn(
                                      "h-8 w-8 transition-all",
                                      editableObj.hasError ? "text-destructive hover:text-destructive/80" : "text-primary hover:text-primary/80 hover:bg-primary/10"
                                    )}
                                    disabled={editableObj.hasError || editableObj.isLoading}
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      
                                      // Update loading state
                                      const newArray = itemsBeingEdited.map((obj: any) => {
                                        if (obj.fieldName === editableObj.fieldName) {
                                          return {
                                            ...obj,
                                            isLoading: true
                                          };
                                        }
                                        return obj;
                                      });
                                      setItemsBeingEdited(newArray);
                                      
                                      try {
                                        const url = `/api/update-user-field/${userId}/${editableObj.fieldName}/${editableObj.newValue}`;
                                        const response = await fetch(url, {
                                          method: 'POST',
                                          headers: {
                                            'Content-Type': 'application/json'
                                          }
                                        });
                                        
                                        const result = await response.json();
                                        
                                        if (response.ok) {
                                          const updatedArray = itemsBeingEdited.map((obj: any) => {
                                            if (obj.fieldName === editableObj.fieldName) {
                                              return {
                                                ...obj,
                                                oldValue: editableObj.newValue,
                                                isBeingEdited: false,
                                                hasError: false,
                                                errorMessage: "",
                                                isLoading: false
                                              };
                                            }
                                            return obj;
                                          });
                                          setItemsBeingEdited(updatedArray);
                                        } else {
                                          const errorArray = itemsBeingEdited.map((obj: any) => {
                                            if (obj.fieldName === editableObj.fieldName) {
                                              return {
                                                ...obj,
                                                hasError: true,
                                                errorMessage: `${result.error.errors[0].type}`,
                                                isLoading: false
                                              };
                                            }
                                            return obj;
                                          });
                                          setItemsBeingEdited(errorArray);
                                          console.error('Error updating user field:', result.error.errors);
                                        }
                                      } catch (error) {
                                        const errorArray = itemsBeingEdited.map((obj: any) => {
                                          if (obj.fieldName === editableObj.fieldName) {
                                            return {
                                              ...obj,
                                              hasError: true,
                                              errorMessage: String(error),
                                              isLoading: false
                                            };
                                          }
                                          return obj;
                                        });
                                        setItemsBeingEdited(errorArray);
                                        console.error('Fetch POST UPDATE Error: ', error);
                                      }
                                    }}
                                  >
                                    {editableObj.isLoading ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : editableObj.hasError ? (
                                      <AlertCircle className="h-4 w-4" />
                                    ) : (
                                      <Check className="h-4 w-4" />
                                    )}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 text-black dark:text-white">
                                  {!editableObj.hasError 
                                    ? `Save ${editableObj.fieldName}` 
                                    : editableObj.errorMessage}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          
                          {editableObj.isBeingEdited && editableObj.isEditable && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                                    disabled={editableObj.isLoading}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const newArray = itemsBeingEdited.map((obj: any) => {
                                        if (obj.fieldName === editableObj.fieldName) {
                                          return {
                                            ...obj,
                                            isBeingEdited: false,
                                            newValue: editableObj.oldValue
                                          };
                                        }
                                        return obj;
                                      });
                                      setItemsBeingEdited(newArray);
                                    }}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 text-black dark:text-white">
                                  Cancel
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          
                          {!editableObj.isBeingEdited && editableObj.isEditable && (
                            <>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className={cn(
                                        "h-8 w-8 transition-opacity",
                                        editableObj.isEditable ? "opacity-0 group-hover:opacity-100" : "opacity-0"
                                      )}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-white dark:bg-zinc-800 border dark:border-zinc-700 text-black dark:text-white">
                                    Edit {editableObj.fieldName}
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="text-muted-foreground ml-1">
                                      <Info className="h-4 w-4" />
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent side="right" className="max-w-xs bg-white dark:bg-zinc-800 border dark:border-zinc-700 text-black dark:text-white">
                                    <p>You can only change your {editableObj.fieldName} once every 6 months.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </>
                          )}
                        </div>
                        
                        {editableObj.isEditable && !editableObj.isBeingEdited && (
                          <motion.div 
                            className="absolute right-0 top-0 bottom-0 w-1 bg-primary/40 opacity-0 group-hover:opacity-100"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isLoading && !userDetails?.isEmailVerified && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <VerifyEmail userEmail={userDetails?.email} />
        </motion.div>
      )}
    </>
  );
};

export default UserDashboard;