import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface DatePickerPopoverProps {
  label: string;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

const DatePickerPopover: React.FC<DatePickerPopoverProps> = ({ label, date, onDateChange }) => {
  return (
    <div className="border border-dashed border-[#555555] rounded p-4 flex flex-col gap-2 justify-between w-full">
      <h1 className="text-[#333333] font-semibold phone:text-2xl md:text-5xl tracking-tighter text-left">
        {label}
      </h1>
      <Popover>
        <PopoverTrigger asChild>
          <button className="bg-[#222222] w-full rounded flex px-5 py-3 tracking-tight outline-none text-[#FAFAFA]">
            <CalendarIcon className="mr-2 my-auto h-5 w-5 text-[#BBBBBB]" />
            {date ? (
              format(date, 'PPP')
            ) : (
              <span className="text-[#FAFAFA] tracking-tighter">Pick a date</span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 backdrop-blur-md rounded-2xl z-10" align="center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            initialFocus
            className="w-auto backdrop-blur-md rounded z-20 p-5 text-[#FAFAFA] bg-white/10"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerPopover;
