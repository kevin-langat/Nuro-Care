import { ArrowRight, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { globalState } from '@/context/GlobalContext';

function Hero() {
  const { currentSiteSettings } = useContext(globalState);
  console.log(currentSiteSettings);
  const heroImg =
    'https://res.cloudinary.com/dwwaetdws/image/upload/w_800,c_fill,q_auto,f_auto/v1767189325/realistic-scene-with-elderly-care-senior-people_l1mbnf';

  return (
    <div className='w-full flex  flex-col  justify-between transform duration-500 ease-in '>
      {/* Hero header */}
      <div id='hero' className='w-full flex flex-row gap-2 justify-between'>
        <div
          className=' w-full smd:w-1/2 p-1 bsm:pl-10 bsm:pr-10 smd:pr-0 pt-30
       flex flex-col items-start justify-end pb-12 sm:pb-10 flg:pb-13 overflow-hidden gap-3 bsm:gap-4 transform delay-75 duration-500 ease-out'
        >
          <div className=' text-2xl bsm:text-3xl fmd:text-4xl text-gray-950 font-semibold ses:w-4/5  transform duration-500 ease-in text-left animate-slide-up'>
            {currentSiteSettings ? (
              <p>{currentSiteSettings.HeroHeader}</p>
            ) : (
              <p>
                Trusted Home Care Services in Nairobi –{' '}
                <span className=' inline text-blue-700 '>
                  Compassionate Care
                </span>{' '}
                Right at Home
              </p>
            )}
          </div>
          <div className='text-left md:w-11/12 text-fmd flex flex-col items-center justify-center ses:w-4/5 smd:w-full  text-gray-800 animate-slide-up'>
            {currentSiteSettings ? (
              <p>{currentSiteSettings.HeroSubHeader}</p>
            ) : (
              <p>
                At Mekin Home Care, we provide reliable and compassionate
                home-based healthcare services in Nairobi, tailored to meet the
                unique needs of every patient.{' '}
                <span className='hidden bsm:flex'>
                  Our experienced caregivers and licensed healthcare
                  professionals deliver quality care in the comfort of your
                  home.
                </span>
              </p>
            )}
          </div>

          {/* CTA button */}
          <Link
            to={'/book-appointment'}
            aria-label='caregiver-near-you'
            className='group bg-blue-700 px-2 rounded-[0.3em] py-1 bsm:py-1.5 flex flex-row items-center justify-center  text-gray-100 hover:text-gray-200 hover:rounded-[0.2em] transform duration-300 ease-in  text-nfz tracking-tight gap-1 animate-slide-up'
          >
            <h2>Book A Free Assessment</h2>{' '}
            <ArrowRight
              size={18}
              className='mt-0.5 transform duration-500 ease-in-out group-hover:translate-x-0.5'
            />
          </Link>

          <img
            fetchPriority='high'
            src={
              currentSiteSettings ? currentSiteSettings.HeroImage.url : heroImg
            }
            sizes='(max-width: 768px) 90vw, 800px'
            loading='eager'
            decoding='async'
            width='800'
            height='533'
            className='smd:hidden block z-40'
            alt='Professional elderly home care in Nairobi'
          />
        </div>
        <div className='hidden smd:flex p-1  w-1/2 items-center justify-center'>
          <img
            fetchPriority='high'
            src={
              currentSiteSettings ? currentSiteSettings.HeroImage.url : heroImg
            }
            sizes='(max-width: 768px) 90vw, 800px'
            loading='eager'
            decoding='async'
            width='800'
            height='533'
            alt='Professional elderly home care in Nairobi'
          />
        </div>
      </div>
    </div>
  );
}
export default Hero;
