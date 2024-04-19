import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({ selectedDate, onChange }) => {
  return (
    <DatePicker 
      selected={selectedDate} 
      onChange={onChange} 
      dateFormat="dd/MM/yyyy" 
      placeholderText="Select a date" 
    />
  );
};

export default DateInput;
