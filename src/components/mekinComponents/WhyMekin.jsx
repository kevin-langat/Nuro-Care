import { SealCheckIcon } from '@phosphor-icons/react';
import { useContext } from 'react';
import { globalState } from '@/context/GlobalContext';
function WhyMekin() {
  const { currentSiteSettings } = useContext(globalState);

  return (
    <div className='w-full relative bg-blue-950 flex flex-col md:flex-row items-center justify-between transform duration-500 ease-out'>
      <div className='w-3/4 flex flex-col items-center justify-center'>
        {currentSiteSettings ? (
          <video
            src={currentSiteSettings.TrustVideo.url}
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className='mask-r-from-35% mask-r-to-90%'
          />
        ) : (
          <video
            src={
              'https://res.cloudinary.com/dwwaetdws/video/upload/v1771316496/6520439-uhd_3840_2160_24fps_sfufto.webm'
            }
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className='mask-r-from-35% mask-r-to-90%'
          />
        )}

        <div className=' absolute top-0 right-0 md:w-[46%] fmd:w-[50%] smd:w-[52%] tmd:w-[54%] tlg:w-[50%] w-full h-full flex flex-row items-center justify-end'>
          <div className=' why-mekin-con w-11/12 mt-10 flex flex-col items-start justify-start gap-1 transform duration-500 ease-out'>
            <h2 className='text-fxs font-semibold font-montserrat text-sky-400'>
              Your Health, Our Mission
            </h2>
            <div className='text-fxl  sm:text-f2xl md:text-fxl tmd:text-f2xl font-semibold font-montserrat text-white transform duration-500 ease-out'>
              {currentSiteSettings ? (
                <h2>{currentSiteSettings.WhyMekinHeader}</h2>
              ) : (
                <h2>
                  {' '}
                  Why Mekin is the Trusted Choice for Skilled Home-Based Medical
                  Care in Nairobi.
                </h2>
              )}
            </div>
            <p className='text-gray-50'>
              {' '}
              {currentSiteSettings ? (
                <h2>{currentSiteSettings.WhyMekinSubHeader}</h2>
              ) : (
                <h2>
                  {' '}
                  From 24/7 skilled nursing to specialized rehabilitation, Mekin
                  delivers hospital-grade medical excellence directly to your
                  doorstep, ensuring safety, dignity, and professional recovery
                  at home.
                </h2>
              )}
            </p>
            <div className=' py-3 w-full  grid grid-cols-1 tmd:grid-cols-2  gap-2 place-items-center'>
              {
                currentSiteSettings && currentSiteSettings.WhyMekinTrustPoints.length >= 2 ? currentSiteSettings.WhyMekinTrustPoints.map((point) => (
                  <div className='flex flex-row gap-1 items-center justify-start w-full'>
                <SealCheckIcon
                  weight='fill'
                  className='fill-sky-300 '
                  size={18}
                />
                    <h2 className='text-gray-100 tmd:text-fsm lg:text-base'>
                      {point}
                </h2>
                  </div> 
                )) : null
              }


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WhyMekin;
