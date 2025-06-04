import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordVisibilityToggleProps {
  isVisible: boolean;
  onToggle: () => void;
  className?: string;
}

const PasswordVisibilityToggle: React.FC<PasswordVisibilityToggleProps> = ({ isVisible, onToggle, className }) => {
  console.log("Rendering PasswordVisibilityToggle, isVisible:", isVisible);
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className={className}
      aria-label={isVisible ? 'Hide password' : 'Show password'}
    >
      {isVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
    </Button>
  );
};

export default PasswordVisibilityToggle;