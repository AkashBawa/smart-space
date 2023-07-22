import React from 'react';
import { Calendar } from 'antd';

const BookingMonth= () => {

  
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  return <Calendar onPanelChange={onPanelChange} />;
};



export default BookingMonth;
