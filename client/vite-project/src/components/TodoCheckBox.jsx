// src/components/TodoCheckbox.jsx
import React from 'react';
import { Checkbox } from '@chakra-ui/react';

const TodoCheckBox = ({ isChecked, onToggle }) => {
  return (
    <Checkbox colorScheme="teal" isChecked={isChecked} onChange={onToggle}>
      Done
    </Checkbox>
  );
};

export default TodoCheckBox;
