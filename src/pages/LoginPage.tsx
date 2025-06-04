import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginFormCard from '@/components/auth/LoginFormCard'; // Custom component
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

// Define the type for login form data based on LoginFormCard's internal type if known,
// or a generic one if not. Assuming LoginFormCard handles its own Zod schema.
interface LoginFormData {
  email: string;
  password?: string; // Password might be optional if using social logins, etc.
  rememberMe?: boolean;
}

const LoginPage = () => {
  console.log('LoginPage loaded');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const handleLoginSubmit = async (data: LoginFormData) => {
    console.log('Login attempt with:', data);
    setIsLoading(true);
    setErrorMessage(undefined);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Example: Hardcoded credentials for demonstration
    if (data.email === 'user@example.com' && data.password === 'password123') {
      console.log('Login successful');
      // On successful login, you would typically redirect the user
      // For now, just clear loading and show a success message (or navigate)
      // navigate('/dashboard'); // Example redirect
      setIsLoading(false);
      // For demo, let's show an alert here. In a real app, you'd navigate.
      alert('Login Successful! (Normally, you would be redirected)');
    } else {
      console.log('Login failed');
      setErrorMessage('Invalid email or password. Please try again.');
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log('Navigating to forgot password page');
    navigate('/forgot-password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Optional: Logo or App Name */}
        <div className="text-center mb-8">
          <img src="https://via.placeholder.com/150x50?text=YourLogo" alt="App Logo" className="mx-auto mb-2 h-12" />
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-slate-300">Sign in to continue to your account.</p>
        </div>

        <LoginFormCard
          onSubmit={handleLoginSubmit}
          onForgotPassword={handleForgotPassword}
          isLoading={isLoading}
          errorMessage={errorMessage}
          defaultEmail="user@example.com" // Pre-fill for easier testing
        />

        {/* Example of a simple message area below the card if needed */}
        {/* {successMessage && (
          <Alert variant="default" className="mt-4">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )} */}

        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <a href="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;