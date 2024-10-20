// src/components/SignUp.jsx
import React, { useState } from 'react';
import { Box, Button, Input, VStack, FormLabel, Heading, Text, Flex } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = () => {
    axios.post('http://localhost:3000/user/signup', {
      username,
      password
    })
      .then(() => {
        navigate('/Signin');  // Redirect to Signup page
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        
        >
    <Box p={8}  maxW="md" borderWidth={1} borderRadius={8} boxShadow="dark-lg">
      <Heading as="h2" size="lg" mb={6} textAlign="center" colorScheme='teal'>
        Welcome to Todo-Today 
      </Heading>

      <VStack spacing={4} align="stretch">
        
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <Text color="red.500">{error}</Text>}

        <Button colorScheme="teal" onClick={handleSignUp}>
          Sign Up
        </Button>
        <Button colorScheme="teal" onClick={() => {
        navigate('/Signin');  // Redirect to SignIn page
      }}>
          Sign In
        </Button>
      </VStack>
    </Box>
    </Flex>
  );
};

export default SignUp;
