// src/components/DeleteButton.jsx
import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const Deletebutton = ({ onDelete }) => {
  return (
    <IconButton
      colorScheme="red"
      aria-label="Delete Todo"
      icon={<DeleteIcon />}
      onClick={onDelete}
    />
  );
};

export default Deletebutton;
