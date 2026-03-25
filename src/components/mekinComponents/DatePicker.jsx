import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';

function DatePicker() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <div className='flex w-60 bsm:w-68 fsm:w-74 fmd:w-68 tmd:w-60 flg:w-56 transform duration-500 ease-in flex-row justify-between'>
      <div className='flex flex-col gap-3'>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              aria-label='date entry'
              variant='outline'
              id='date-picker'
              className='w-29 tracking-tight justify-between font-normal'
            >
              {date ? date.toLocaleDateString() : 'Select date'}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
            <Calendar
              mode='single'
              selected={date}
              captionLayout='dropdown'
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className='flex flex-col'>
        <Label htmlFor='time-picker' className='sr-only'>
          Search our professionals
        </Label>
        <Input
          type='time'
          id='time-picker'
          step='1'
          defaultValue='10:30:00'
          className='bg-background w-26 tracking-tight appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
        />
      </div>
    </div>
  );
}

export default DatePicker;
