
import SlideInHelper from './SlideIn';

import CoverflowCarousel from './ScrollAnim';
import { useContext } from 'react';
import { globalState } from '@/context/GlobalContext';

function Services() {
  const { serviceRes } = useContext(globalState);
  return (
    <div className='w-full flex flex-col items-center'>{
      serviceRes && serviceRes.length > 0 ? <SlideInHelper>
        <div className=' w-full flex flex-col items-center'>
          <h2 className='text-sky-600 font-poppins text-fsm tmd:font-semibold'>
            Choose your services
          </h2>
          <h3 className='text-xl sm:text-fxl tmd:text-2xl transform duration-500 ease-in-out  font-poppins font-semibold text-center'>
            Comprehensive Care Across <br />
            Every Speciality.
          </h3>
        </div>

        <div className='w-4/5 py-4 h-112 rounded-[0.4em] flex flex-row items-center'>
          <CoverflowCarousel />
        </div>
      </SlideInHelper> : null
    }

    </div>
  );
}
export default Services;