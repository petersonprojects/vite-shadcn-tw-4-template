import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../main';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AdminDashboard: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const roleId = useSelector(selectUserRole);
    
    useEffect(() => {
        // Check if user is admin (roleId === 0)
        if (roleId !== 0) {
            console.error('Unauthorized access attempt to admin dashboard');
            navigate('/login');
        }
        setLoading(false);
    }, [navigate, roleId]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (roleId !== 0) {
        return <div className="flex justify-center items-center h-screen">Unauthorized. Redirecting...</div>;
    }

    return (
        <div className="flex min-h-screen">
            {/* Admin Sidebar */}
            <div className="w-64 bg-card text-card-foreground p-5 shadow-md border-r border-border">
                <h2 className="text-xl font-semibold mb-5 pb-2 border-b border-border">Admin Panel</h2>
                <nav>
                    <ul className="space-y-2">
                        <li>
                            <Button variant="ghost" className="w-full justify-start transition-colors hover:bg-primary/10 hover:text-primary" asChild>
                                <a href="#users" className="flex items-center">User Management</a>
                            </Button>
                        </li>
                        <li>
                            <Button variant="ghost" className="w-full justify-start transition-colors hover:bg-primary/10 hover:text-primary" asChild>
                                <a href="#content" className="flex items-center">Content Management</a>
                            </Button>
                        </li>
                        <li>
                            <Button variant="ghost" className="w-full justify-start transition-colors hover:bg-primary/10 hover:text-primary" asChild>
                                <a href="#settings" className="flex items-center">System Settings</a>
                            </Button>
                        </li>
                        <li>
                            <Button variant="ghost" className="w-full justify-start transition-colors hover:bg-primary/10 hover:text-primary" asChild>
                                <a href="#reports" className="flex items-center">Reports</a>
                            </Button>
                        </li>
                        <li>
                            <Button variant="ghost" className="w-full justify-start transition-colors hover:bg-primary/10 hover:text-primary" asChild>
                                <a href="#logs" className="flex items-center">Activity Logs</a>
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
            
            {/* Admin Content */}
            <div className="flex-1 p-6 bg-background overflow-y-auto">
                <h1 className="text-3xl font-bold mb-6 text-foreground">Admin Dashboard</h1>
                
                <div className="space-y-6">
                    <Card id="users" className="shadow-sm border-border hover:shadow-md transition-all duration-300 hover:border-primary/50">
                        <CardHeader className="bg-card text-card-foreground">
                            <CardTitle className="text-primary">User Management</CardTitle>
                            <CardDescription>Manage user accounts, permissions, and roles.</CardDescription>
                        </CardHeader>
                        <CardContent className="bg-card/50">
                            {/* Add user management components here */}
                        </CardContent>
                    </Card>
                    
                    <Card id="content" className="shadow-sm border-border hover:shadow-md transition-all duration-300 hover:border-primary/50">
                        <CardHeader className="bg-card text-card-foreground">
                            <CardTitle className="text-primary">Content Management</CardTitle>
                            <CardDescription>Manage website content, posts, and media.</CardDescription>
                        </CardHeader>
                        <CardContent className="bg-card/50">
                            {/* Add content management components here */}
                        </CardContent>
                    </Card>
                    
                    <Card id="settings" className="shadow-sm border-border hover:shadow-md transition-all duration-300 hover:border-primary/50">
                        <CardHeader className="bg-card text-card-foreground">
                            <CardTitle className="text-primary">System Settings</CardTitle>
                            <CardDescription>Configure application settings and preferences.</CardDescription>
                        </CardHeader>
                        <CardContent className="bg-card/50">
                            {/* Add settings components here */}
                        </CardContent>
                    </Card>
                    
                    <Card id="reports" className="shadow-sm border-border hover:shadow-md transition-all duration-300 hover:border-primary/50">
                        <CardHeader className="bg-card text-card-foreground">
                            <CardTitle className="text-primary">Reports</CardTitle>
                            <CardDescription>View and generate system reports.</CardDescription>
                        </CardHeader>
                        <CardContent className="bg-card/50">
                            {/* Add reporting components here */}
                        </CardContent>
                    </Card>
                    
                    <Card id="logs" className="shadow-sm border-border hover:shadow-md transition-all duration-300 hover:border-primary/50">
                        <CardHeader className="bg-card text-card-foreground">
                            <CardTitle className="text-primary">Activity Logs</CardTitle>
                            <CardDescription>Monitor system and user activity.</CardDescription>
                        </CardHeader>
                        <CardContent className="bg-card/50">
                            {/* Add log components here */}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;