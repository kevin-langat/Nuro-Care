import {
  ClockClockwiseIcon,
  SealCheckIcon,
  ShieldCheck,
} from '@phosphor-icons/react';
import SlideInHelper from './SlideIn';
import { useContext } from 'react';
import { globalState } from '@/context/GlobalContext';
// Trust and safety section
function Trust() {
  const { currentSiteSettings } = useContext(globalState);
  const founder =
    'https://res.cloudinary.com/dwwaetdws/image/upload/w_800,c_fill,q_auto,f_auto/v1767278136/founder_pfhpj3.avif';

  return (
    <div className='p-2 font-montserrat  flex flex-col items-center justify-center w-full pt-3'>
      <SlideInHelper>
        <div className='w-full bsm:items-center fsm:w-[90%] bg-white outline-0  transform duration-500 ease-in-out outline-gray-200 rounded-[0.2em]  flex flex-col gap-4 items-start p-3'>
          <h2 className='text-sky-600 font-poppins text-fsm tmd:font-semibold'>
            From scrubs, to smiles
          </h2>

          <div className='w-full flex flex-row items-center justify-around gap-3'>
            <div className=' w-10 h-3/5 flex flex-col gap-2'>
              <span className='w-6 h-0.5 rounded-full bg-blue-500'></span>
              <span className='w-10 h-0.5 rounded-full bg-sky-500'></span>
            </div>
            <div className='text-xl sm:text-fxl tmd:text-2xl transform duration-500 ease-in-out  font-poppins font-semibold text-center'>
              {currentSiteSettings ? (
                <p>{currentSiteSettings.TrustHeader}</p>
              ) : (
                <p>
                  {' '}
                  Our Commitment to{' '}
                  <span className='text-sky-500'> Safety</span> &{' '}
                  <span className='text-sky-500'> Excellence</span> <br />
                </p>
              )}
            </div>

            <div className=' w-10 h-3/5 flex flex-col items-end gap-2'>
              <span className='w-6 h-0.5 rounded-full bg-blue-500'></span>
              <span className='w-10 h-0.5 rounded-full bg-sky-500'></span>
            </div>
          </div>
          <div className='w-full tmd:w-[85%] '>
            <div className='text-gray-600 font-poppins text-justify text-fsm bsm:text-vsm  '>
              {currentSiteSettings ? (
                <p>{currentSiteSettings.TrustSubHeader}</p>
              ) : (
                <p>
                  At Mekin Home Care in Nairobi, we don’t just provide
                  professional caregivers — we deliver peace of mind through a
                  rigorous safety framework designed to protect your family. Our
                  licensed nurses and trained caregivers treat your loved ones
                  like our own. Safety and compassionate care aren’t just
                  policies at Mekin — they’re promises we keep every single day,
                  whether it’s post-surgical support, chronic disease
                  management, or elderly care at home.
                </p>
              )}
            </div>
          </div>
          <div className='bg-sky-300/10 outline-sky-500/20 rounded-[0.4em] px-1 outline-1 w-3/4 h-17 bsm:w-3/5 fmd:w-1/3 bsm:h-21 flex flex-row items-center gap-4'>
            <img
              src={
                currentSiteSettings ? currentSiteSettings.CEOAvatar : founder
              }
              sizes='64px'
              width='64'
              height='64'
              loading='eager'
              decoding='async'
              className='rounded-full h-16 w-16 bsm:w-20 bsm:h-20 border border-sky-500'
              alt='Founder of Mekin Home Based Care'
            />
            <div className=' flex flex-col items-center justify-center *:first:bsm:text-fmd *:first:font-semibold *:nth-2:bsm:text-fsm *:nth-2:tracking-tight *:nth-2:text-fxs *:first:text-fsm'>
              <div>
                {currentSiteSettings ? (
                  <p>{currentSiteSettings.CEOFullName}</p>
                ) : (
                  <h2>Damacline Nyasaka</h2>
                )}
              </div>
              <h3>CEO & Founder</h3>
            </div>
          </div>
          <div className='w-full  flex flex-col items-center bsm:flex-row outline-gray-500/20 rounded-[0.4em] outline-1'>
            <div className='w-full p-2 flex flex-row bsm:flex-col items-center justify-center  gap-5 bsm:gap-3 sm:gap-4 bsm:h-full '>
              <ShieldCheck weight='thin' size={60} color='#00aaff' />
              <div className='flex flex-col items-starts w-3/4 fes:w-3/5 bsm:h-3/5  bsm:justify-between bsm:items-center bsm:w-11/12  justify-center'>
                <h2 className='fsm:text-fmd text-fsm text-gray-950 bsm:text-center font-semibold'>
                  Patient <br className='hidden bsm:block sm:hidden' />{' '}
                  Satisfaction
                </h2>
                <h3 className='text-fxs bsm:w-full bsm:text-center '>
                  Hundreds of Nairobi families trust our proven, compassionate,
                  and life-enhancing care.
                </h3>
              </div>
            </div>
            <div className='w-full pl-3 bsm:pl-0 p-2 bsm:pt-3 flex   bsm:h-full flex-row bsm:flex-col items-center sm:justify-start sm:gap-2 gap-5 justify-center'>
              <ClockClockwiseIcon size={60} weight='thin' color='#00aaff' />
              <div className='flex w-3/4 bsm:w-11/12 flex-col fes:w-3/5  bsm:h-3/5 bsm:text-center bsm:justify-between items-start bsm:items-center justify-center'>
                <h2 className='fsm:text-fmd text-fsm text-gray-950 font-semibold'>
                  24/7 Emergency Response
                </h2>
                <h3 className='text-fxs '>
                  Our Nairobi team provides immediate, expert medical support
                  any time, day or night.
                </h3>
              </div>
            </div>

            <div className='w-full p-2   bsm:gap-3 bsm:h-full flex flex-row bsm:flex-col items-center justify-center gap-5'>
              <SealCheckIcon size={60} weight='thin' color='#00aaff' />
              <div className='flex flex-col items-start w-3/4 fes:w-3/5 bsm:h-3/5 bsm:w-11/12 bsm:text-center bsm:justify-between bsm:items-center justify-center'>
                <h1 className='fsm:text-fmd text-fsm text-gray-950 font-semibold'>
                  Fully Vetted Professionals
                </h1>
                <h2 className='text-fxs'>
                  Every caregiver undergoes rigorous background checks and
                  certifications for your peace.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </SlideInHelper>
    </div>
  );
}
export default Trust;
