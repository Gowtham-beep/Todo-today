import React, { useEffect, useState } from 'react';
import { Box, VStack, Heading, Grid, useBreakpointValue, Spinner, Text } from '@chakra-ui/react';
import Todocard from './Todocard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddTodo from './Addtodo';

export default function Todos() {
  const [todos, setTodos] = useState([]);  // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/Signin');  
    } else {
      axios.get('http://localhost:3000/todos/readTodo', {
        headers: {
          'Token': `${token}`
        }
      })
      .then(response => {
        // Log the response to debug
        console.log(response.data.todos);  // Ensure this is an array
        if (Array.isArray(response.data.todos)) {
          setTodos(response.data.todos);  // Set todos if it's an array
        } else {
          setError('Invalid data format received from server');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching todos:', error);
        setError('Failed to fetch todos');
        setLoading(false);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/');
        }
      });
    }
  }, [navigate]);
 
  // Responsive column configuration based on screen size
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return <Text color="red.500" fontSize="lg">{error}</Text>;
  }

  if (todos.length === 0) {
    return <Text fontSize="lg" color="gray.600">No todos available. Please add some tasks!</Text>;
  }
  const handleDelete = (id) => {
    const token = localStorage.getItem('token');  // Retrieve token from localStorage
  
    // Perform delete logic here (e.g., axios call)
    axios.delete(`http://localhost:3000/todos/deleteTodo/${id}`, {
      headers: {
        'Token': `${token}`
      }
    })
    .then(() => {
      setTodos(todos.filter(todo => todo._id !== id));  // Update the state by filtering out the deleted todo
    })
    .catch((error) => {
      console.error('Error deleting todo:', error);
    });
  };
  

  const handleToggle = (id, currentStatus) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
  
    // Toggle the status of the todo
    axios.put(`http://localhost:3000/todos/statusTodo/${id}`, {
      // Send the updated status in the request body
      status: !currentStatus
    }, {
      headers: {
        'Token': `${token}` // Include token in headers
      }
    })
    .then(() => {
      // Update the state by mapping through the todos and toggling the status
      setTodos(todos.map(todo => 
        todo._id === id ? { ...todo, status: !currentStatus } : todo
      ));
    })
    .catch((error) => {
      console.error('Error toggling todo status:', error);
    });
  };
  
  return (
    <Box p={4}>
      <Heading mb={6} textAlign="center" color="teal.500">Your Todos</Heading>

      <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={6}>
        {todos.map((todo) => (
          <Todocard
            key={todo._id}
            title={todo.title}
            description={todo.description || 'No description'}
            status={todo.status}
            onDelete={() => handleDelete(todo._id)}
            onToggle={() => handleToggle(todo._id, todo.status)}
          />
          ))}
        </Grid>
      <AddTodo setTodos={setTodos} />
    </Box>
  );
}

// You need to add the handleDelete and handleToggle functions to manage the delete and toggle actions.
