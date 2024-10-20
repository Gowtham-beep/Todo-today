import React, { useState } from 'react';
import { Box, Button, Input, VStack, FormLabel, Heading, Text,Flex } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = () => {
    axios.post('http://localhost:3000/user/signin', {
      username,
      password
    })
      .then((response) => {
        localStorage.setItem('token', response.data.token);  // Store JWT in localStorage
        navigate('/todos');  // Redirect to Todos page
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
    <Box p={8} maxW="md" borderWidth={1} borderRadius={8} boxShadow="dark-lg">
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Welcome, Please Sign in
      </Heading>

      <VStack spacing={4} align="stretch">
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          placeholder="Enter your email"
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

        <Button colorScheme="teal" onClick={handleSignIn}>
          Sign In
        </Button>
      </VStack>
    </Box>
    </Flex>
  );
};

export default SignIn;
