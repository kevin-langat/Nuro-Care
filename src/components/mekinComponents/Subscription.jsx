import LiveKit from '@/assets/svgs/LiveKit';
import { Check } from 'lucide-react';
import { subscriptionTiers } from '@/config/data';
import SlideInHelper from './SlideIn';
import MekinPlus from '@/assets/svgs/MekinPlus';
import AdvancedPlus from '@/assets/svgs/AdvancedPlus';

function Subscription() {
  return (
    <div className=' p-1 w-full bg-gray-100 rounded-[0.3em] flex flex-col bg-cover bg-center items-center py-3 gap-3 '>
      <SlideInHelper>
        <h2 className='text-sky-600 font-poppins text-fsm tmd:font-semibold'>
          Affordable Plans for You
        </h2>
        <h3 className='text-xl sm:text-fxl tmd:text-2xl transform duration-500 ease-in-out  font-poppins font-semibold text-center'>
          Choose Your Package and <br /> Have Peace of Mind
        </h3>
        <div className='w-11/12 gap-2 bg-blue-500g  flex flex-col fmd:flex-row fmd:w-full tmd:w-[95%] slg:w-11/12 fmd:items-start items-center py-4 justify-center'>
          {subscriptionTiers.map((tier) => (
            <div
              key={tier.id}
              className='h-11/12 w-11/12 fes:w-[84%] ses:w-[80%] bsm:w-3/4 fsm:w-3/5 md:w-[55%] fmd:w-1/3 bg-white outline-1 outline-gray-300 ses:rounded-none nth-2:bg-blue-950 flex flex-col items-center rounded-[0.3em] justify-start transform duration-500 ease-in'
            >
              <div className='relative w-full  h-20 flex flex-col items-center justify-start py-2 rounded-t-[0.3em] ses:rounded-none bg-blue-950 outline-0 outline-gray-400 nth-2:outline-0'>
                <h2 className='text-white font-semibold text-xl'>
                  {tier.name}
                </h2>
                {tier.id === 2 ? (
                  <div className='bg-white absolute w-16 h-16 p-2 top-12 rounded-full'>
                    <MekinPlus />
                  </div>
                ) : tier.id === 3 ? (
                  <div className='bg-white absolute w-16 h-16 p-2 top-12 rounded-full'>
                    <AdvancedPlus />
                  </div>
                ) : (
                  <div className='bg-white absolute w-16 h-16 p-2 top-12 rounded-full'>
                    {' '}
                    <LiveKit />
                  </div>
                )}
              </div>
              <div className='w-11/12 h-25 flex flex-col items-center justify-end'>
                <h3
                  className={` ${
                    tier.id === 2 ? 'text-sky-500' : ' text-sky-900'
                  } text-fxl font-montserrat text-center  font-semibold`}
                >
                  From <br /> <span className='inline-flex text-fsm'>Ksh</span>{' '}
                  {tier.price}{' '}
                  <span className='inline-flex text-fsm'>/Month</span>
                </h3>
              </div>
              <div className='w-full py-2  flex flex-col items-center justify-center gap-4'>
                <h3
                  className={` ${
                    tier.id === 2 ? 'text-gray-300' : 'text-sky-500'
                  } font-semibold  w-[80%]  text-center`}
                >
                  {tier.value}
                </h3>
                <ul
                  className={` ${
                    tier.id === 2 ? 'text-gray-300/90' : ' text-gray-900'
                  } w-full gap-1 pl-3  flex flex-col items-start justify-start `}
                >
                  {tier.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className='flex text-fsm flex-row items-center justify-center gap-1'
                    >
                      <Check size={14} className='stroke-3' />{' '}
                      <p className='inline-flex'>{benefit}</p>
                    </li>
                  ))}
                </ul>
                <button
                  className={` ${
                    tier.id === 2
                      ? 'bg-sky-500 hover:bg-sky-600'
                      : ' bg-sky-950 hover:bg-sky-900 hover:text-sky-400'
                  } w-3/5 py-1.5   hover:rounded-[0.3em] transform duration-200 ease-in text-white  `}
                >
                  Request Pricing
                </button>
              </div>
            </div>
          ))}
        </div>
      </SlideInHelper>
    </div>
  );
}
export default Subscription;
