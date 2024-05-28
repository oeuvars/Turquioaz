import { useState } from 'react';

export const useDatePicker = (initialDate = new Date()) => {
  const [date, setDate] = useState<Date | undefined>(initialDate);

  return { date, setDate };
};
