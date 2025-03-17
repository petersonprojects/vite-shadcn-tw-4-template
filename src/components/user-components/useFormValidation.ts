import { useState } from 'react';

type ValidationRule =
  | { type: 'required' }
  | { type: 'minLength'; value: number }
  | { type: 'maxLength'; value: number }
  | { type: 'pattern'; regex: RegExp; message: string }
  | { type: 'custom'; validate: (value: string) => boolean; message: string };

type FieldErrors = {
  [key: string]: {
    hasError: boolean;
    errorMessage: string;
  };
};

type UseFormValidation = {
  errorsValidation: FieldErrors;
  validateField: (field: string, value: string, rules: ValidationRule[]) => void;
  clearFieldError: (field: string) => void;
};

const useFormValidation = (): UseFormValidation => {

  const [errorsValidation, setErrors] = useState<FieldErrors>({});

  const validateField = (field: string, value: string, rules: ValidationRule[]) => {
    
    const fieldErrors: FieldErrors = { ...errorsValidation };
    let hasError = false;
    let errorMessage = '';

    rules.forEach(rule => {
      switch (rule.type) {
        case 'required':
          fieldErrors[field] = {
            hasError: !value.trim(),
            errorMessage: value.trim() ? '' : 'This field is required',
          };
          break;
        case 'minLength':
          fieldErrors[field] = {
            hasError: value.length < rule.value,
            errorMessage: value.length < rule.value ? `Must be at least ${rule.value} characters` : '',
          };
          break;
        case 'maxLength':
          fieldErrors[field] = {
            hasError: value.length > rule.value,
            errorMessage: value.length > rule.value ? `Must be ${rule.value} characters or less` : '',
          };
          break;
        case 'pattern':
          fieldErrors[field] = {
            hasError: !rule.regex.test(value),
            errorMessage: rule.regex.test(value) ? '' : rule.message,
          };
          break;
        case 'custom':
          if (!rule.validate(value)) {
            hasError = true;
            errorMessage = rule.message;
          }
          else{
            hasError = false;
            errorMessage = "";
          }
          break;
        default:
          break;
      }
      
    });

    fieldErrors[field] = {
      hasError,
      errorMessage
    };

    setErrors({ ...errorsValidation, ...fieldErrors });

    return !hasError;

  };

  const clearFieldError = (field: string) => {
    setErrors(prevErrors => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  return { errorsValidation, validateField, clearFieldError };
};

export default useFormValidation;