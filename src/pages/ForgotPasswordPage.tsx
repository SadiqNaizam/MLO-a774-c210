import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Mail, AlertTriangle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address. Please enter a valid email." }),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  console.log('ForgotPasswordPage loaded');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const handleForgotPasswordSubmit = async (data: ForgotPasswordFormData) => {
    console.log('Forgot password request for:', data.email);
    setIsLoading(true);
    setMessage(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate success
    setMessage({ type: 'success', text: 'If an account with that email exists, a password reset link has been sent. Please check your inbox.' });
    setIsLoading(false);
    form.reset(); // Clear the form on success
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4">
       <div className="text-center mb-8">
          <img src="https://via.placeholder.com/150x50?text=YourLogo" alt="App Logo" className="mx-auto mb-2 h-12" />
        </div>
      <Card className="w-full max-w-md bg-slate-800 border-slate-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Forgot Your Password?</CardTitle>
          <CardDescription className="text-slate-400">
            No worries! Enter your email address below, and we'll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(handleForgotPasswordSubmit)}>
          <CardContent className="space-y-4">
            {message && (
              <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className={message.type === 'success' ? 'bg-green-500/10 border-green-500 text-green-300' : ''}>
                {message.type === 'success' ? <CheckCircle className="h-4 w-4 text-green-400" /> : <AlertTriangle className="h-4 w-4" />}
                <AlertTitle className={message.type === 'success' ? 'text-green-200' : ''}>{message.type === 'success' ? 'Email Sent' : 'Error'}</AlertTitle>
                <AlertDescription className={message.type === 'success' ? 'text-green-300' : ''}>{message.text}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-1">
              <Label htmlFor="email" className="text-slate-300">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:ring-indigo-500 focus:border-indigo-500"
                  {...register('email')}
                  aria-invalid={errors.email ? "true" : "false"}
                />
              </div>
              {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white" disabled={isLoading}>
              {isLoading ? 'Sending Link...' : 'Send Reset Link'}
            </Button>
            <Link to="/login" className="text-sm text-indigo-400 hover:text-indigo-300">
              Back to Login
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;