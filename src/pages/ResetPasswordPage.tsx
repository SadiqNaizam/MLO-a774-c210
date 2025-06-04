import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import PasswordVisibilityToggle from '@/components/auth/PasswordVisibilityToggle'; // Custom component
import { KeyRound, AlertTriangle, CheckCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom'; // To potentially get token from URL

const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character." }),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match. Please re-enter.",
  path: ["confirmPassword"], // Error applies to the confirmPassword field
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  console.log('ResetPasswordPage loaded');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Example: Get token from URL query param

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { register, handleSubmit, formState: { errors } } = form;

  const handleResetPasswordSubmit = async (data: ResetPasswordFormData) => {
    console.log('Reset password attempt with token:', token, 'and data:', data);
    setIsLoading(true);
    setMessage(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (!token) {
      setMessage({ type: 'error', text: 'Invalid or expired reset token. Please request a new one.' });
      setIsLoading(false);
      return;
    }

    // Simulate success
    setMessage({ type: 'success', text: 'Your password has been successfully reset! You can now log in with your new password.' });
    setIsLoading(false);
    form.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
          <img src="https://via.placeholder.com/150x50?text=YourLogo" alt="App Logo" className="mx-auto mb-2 h-12" />
        </div>
      <Card className="w-full max-w-md bg-slate-800 border-slate-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Set New Password</CardTitle>
          <CardDescription className="text-slate-400">
            Create a new, strong password for your account.
            {token ? ` (Token: ${token.substring(0,10)}...)` : ' (No token found in URL - this is for UI demonstration)'}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(handleResetPasswordSubmit)}>
          <CardContent className="space-y-4">
            {message && (
              <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className={message.type === 'success' ? 'bg-green-500/10 border-green-500 text-green-300' : ''}>
                 {message.type === 'success' ? <CheckCircle className="h-4 w-4 text-green-400" /> : <AlertTriangle className="h-4 w-4" />}
                <AlertTitle className={message.type === 'success' ? 'text-green-200' : ''}>{message.type === 'success' ? 'Password Reset' : 'Error'}</AlertTitle>
                <AlertDescription className={message.type === 'success' ? 'text-green-300' : ''}>{message.text}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-1">
              <Label htmlFor="newPassword" className="text-slate-300">New Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:ring-indigo-500 focus:border-indigo-500"
                  {...register('newPassword')}
                  aria-invalid={errors.newPassword ? "true" : "false"}
                />
                <PasswordVisibilityToggle
                  isVisible={showNewPassword}
                  onToggle={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                />
              </div>
              {errors.newPassword && <p className="text-sm text-red-400 mt-1">{errors.newPassword.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirmPassword" className="text-slate-300">Confirm New Password</Label>
               <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:ring-indigo-500 focus:border-indigo-500"
                  {...register('confirmPassword')}
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                />
                <PasswordVisibilityToggle
                  isVisible={showConfirmPassword}
                  onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                />
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-400 mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white" disabled={isLoading || !token}>
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </Button>
             {message?.type === 'success' && (
                <Link to="/login" className="text-sm text-indigo-400 hover:text-indigo-300">
                    Proceed to Login
                </Link>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;