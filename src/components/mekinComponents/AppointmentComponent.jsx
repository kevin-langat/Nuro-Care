import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import DatePicker from './DatePicker';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
function AppointmentComponent() {
  const [stethoscope, setStethoscope] = useState(
    'https://res.cloudinary.com/dwwaetdws/image/upload/w_1200,c_fill,q_auto,f_auto/v1767276098/stethoscope_par3kr.avif'
  );

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.85),rgba(255,255,255,0.97)), url('${stethoscope}')`,
        backgroundSize: 'cover',
      }}
      className=' p-1 w-full tmd:w-3/5 bg-gray-50 rounded-[0.3em] flex flex-col h-full bg-cover bg-center items-center gap-3 '
    >
      <p className='text-xl bsm:text-fxl fsm:text-2xl tmd:text-f2xl transfrom duration-500 ease-in-out font-bold text-blue-700'>
        Book Appointment Today!
      </p>

      <div className='w-full  h-1/2 py-2 place-items-center grid grid-cols-1 fmd:grid-cols-2 gap-y-4  '>
        <Select>
          <SelectTrigger
            aria-label='Select a department category'
            className={
              'bg-white w-60 bsm:w-68 fsm:w-74 fmd:w-68 tmd:w-60 flg:w-56 transform duration-500 ease-in'
            }
          >
            <SelectValue placeholder='Select department' />
          </SelectTrigger>
          <SelectContent className={'  text-blue-500'}>
            <SelectGroup>
              <SelectLabel> Select department</SelectLabel>
              <SelectItem value='department one'>
                Clinical Monitoring
              </SelectItem>
              <SelectItem value='department two'>Wound Management</SelectItem>
              <SelectItem value='department three'>
                Occupational Therapy
              </SelectItem>
              <SelectItem value='department four'>
                Catheter & Ostomy Care
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger
            aria-label='Select a doctor'
            className={
              'bg-white w-60 bsm:w-68 fsm:w-74 fmd:w-68 tmd:w-60 flg:w-56 transform duration-500 ease-in'
            }
          >
            <SelectValue placeholder='Select doctor' />
          </SelectTrigger>
          <SelectContent className={'  text-blue-500'}>
            <SelectGroup>
              <SelectLabel> Select doctor</SelectLabel>
              <SelectItem value='department one'>
                Clinical Monitoring
              </SelectItem>
              <SelectItem value='department two'>Wound Management</SelectItem>
              <SelectItem value='department three'>
                Occupational Therapy
              </SelectItem>
              <SelectItem value='department four'>
                Catheter & Ostomy Care
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <label htmlFor='email-entry' className='sr-only'>
          Search our professionals
        </label>
        <Input
          id='email-entry'
          type='email'
          className='w-60 bsm:w-68 fsm:w-74 fmd:w-68 tmd:w-60 flg:w-56 transform duration-500 ease-in field-sizing-content bg-white'
          placeholder='Email'
        />

        <DatePicker />
      </div>

      <Button
        aria-label='Book Appointment'
        className='bg-blue-700 px-10 transform duration-500 ease-in hover:bg-sky-600 rounded-[0.2em]'
      >
        Book An Appointment
      </Button>
    </div>
  );
}
export default AppointmentComponent;
