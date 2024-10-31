import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SignOutButton = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    
    localStorage.removeItem('token');
    navigate('/Signin');
  };

  return (
    <Button 
      colorScheme="teal" 
      variant="solid" 
      onClick={handleSignOut}
      mt={4}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
