import React from 'react';
import { Box, Button, HStack, Heading, Text, Checkbox, IconButton, VStack, Badge, Stack } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import Deletebutton from './Deletebutton';
import TodoCheckBox from './TodoCheckBox'

function Todocard({ title, description, status, onDelete, onToggle }) {
  return (
    <Box
      p={4}
      maxW="lg"
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
      bg={status ? 'green.50' : 'white'}
      transition="background 0.3s"
      _hover={{ boxShadow: 'xl' }}
    >
      <VStack align="stretch" spacing={3}>
        {/* Todo Title and Badge */}
        <HStack justify="space-between">
          <Heading size="md" color={status ? 'green.600' : 'gray.800'}>
            {title}
          </Heading>
          <Badge colorScheme={status ? 'green' : 'teal'}>
            {status ? 'Completed' : 'Pending'}
          </Badge>
        </HStack>

        {/* Todo Description */}
        <Text fontSize="sm" color="gray.600">
          {description}
        </Text>

        {/* Action Buttons */}
        <HStack justify="space-between">
          
        <TodoCheckBox isChecked={status} onToggle={onToggle} />
          <Deletebutton onDelete={onDelete} />
        </HStack>
      </VStack>
    </Box>
  );
}

export default Todocard;
