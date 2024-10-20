import React, { useState } from 'react';
import { Box, Button, Input, VStack } from '@chakra-ui/react';
import axios from 'axios';

const AddTodo = ({ setTodos }) => {
  const [newTodo, setNewTodo] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleAddTodo = () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    if (newTodo.trim() && newDescription.trim()) {
      axios.post('http://localhost:3000/todos/createTodo', 
        {
          title: newTodo,         // Send the title of the todo
          description: newDescription // Send the description of the todo
        }, 
        {
          headers: {
            'Token': `${token}` // Include token in headers
          }
        }
      )
      .then(response => {
        // Update the todos state with the new todo
        setTodos(prevTodos => [...prevTodos, response.data.todo]);
        setNewTodo(''); // Clear the input fields
        setNewDescription('');
      })
      .catch(error => {
        console.error('Error adding todo:', error);
      });
    }
  };

  return (
    <Box p={4}
      maxW="lg"
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
      bg={'white'}
      transition="background 0.3s"
      _hover={{ boxShadow: 'xl' }}
    >
      <VStack spacing={4}>
        <Input
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Input
          placeholder="Add description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleAddTodo}>
          Add Todo
        </Button>
      </VStack>
    </Box>
  );
};

export default AddTodo;
