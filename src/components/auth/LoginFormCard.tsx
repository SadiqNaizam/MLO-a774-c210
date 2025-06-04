import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'; // For displaying general errors
import { AlertTriangle } from 'lucide-react';
import PasswordVisibilityToggle from './PasswordVisibilityToggle'; // Import the custom toggle
import { Link } from 'react-router-dom'; // Assuming react-router-dom for "Forgot Password?"

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }), // Basic validation, can be extended
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormCardProps {
  onSubmit: (data: LoginFormData) => Promise<void> | void;
  onForgotPassword?: () => void; // Optional handler for "Forgot Password?" link
  isLoading?: boolean;
  errorMessage?: string; // General error message from the backend/login process
  defaultEmail?: string;
}

const LoginFormCard: React.FC<LoginFormCardProps> = ({
  onSubmit,
  onForgotPassword,
  isLoading = false,
  errorMessage,
  defaultEmail = '',
}) => {
  console.log("Rendering LoginFormCard, isLoading:", isLoading, "errorMessage:", errorMessage);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: defaultEmail,
      password: '',
      rememberMe: false,
    },
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const handleFormSubmit = (data: LoginFormData) => {
    console.log("LoginFormCard submitted with data:", data);
    onSubmit(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <CardContent className="space-y-4">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {onForgotPassword && (
                 <Link
                  to="#" // Path should be configured by the parent page or use onForgotPassword
                  onClick={(e) => {
                    if (onForgotPassword) {
                      e.preventDefault();
                      onForgotPassword();
                    }
                  }}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('password')}
                aria-invalid={errors.password ? "true" : "false"}
                className="pr-10" // Add padding for the icon button
              />
              <PasswordVisibilityToggle
                isVisible={showPassword}
                onToggle={togglePasswordVisibility}
                className="absolute right-1 top-1/2 -translate-y-1/2"
              />
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="rememberMe" {...register('rememberMe')} />
            <Label htmlFor="rememberMe" className="text-sm font-normal">Remember me</Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginFormCard;