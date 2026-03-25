import { homeCareFaqs } from '@/config/data';
import { ChevronDown } from 'lucide-react';
import { useContext, useState } from 'react';
import SlideInHelper from './SlideIn';
import { globalState } from '@/context/GlobalContext';

function FAQS() {
  const [activeFaq, setActiveFaq] = useState(-1);
  const { currentSiteSettings } = useContext(globalState)
  return (
    <SlideInHelper>
      <div className=' w-full  mt-4 items-start pt-50 flex flex-col fmd:flex-row gap-6 fmd:gap-1'>
        <div className='  w-full justify-start fmd:w-[45%] tmd:w-[43%] h-full gap-4  flex flex-col items-center'>
          <div className='h-18 flex  flex-col items-center justify-center w-11/12 '>
            <h2 className=' font-bold text-2xl'>Frequently Asked</h2>
            <p className=' font-bold  text-2xl text-sky-500'>Questions</p>
          </div>
          <h3 className=' w-11/12 esm:w-3/4 text-center'>
            Find quick answers to common questions about our services,
            appointments and care process{' '}
          </h3>
          <button className=' font-semibold  text-[medium] py-1 bg-blue-600 w-1/2 text-white'>
            Free Consultation
          </button>
        </div>

        <div className=' w-full fmd:w-[55%] tmd:w-[57%]  h-full flex flex-col justify-center gap-3 items-center'>{
          currentSiteSettings && currentSiteSettings.HomePageFaqs.length > 2 ? currentSiteSettings.HomePageFaqs.map((faq, index) => (
            <div
              key={faq._id}
              className='bg-gray-50 rounded-[0.2em] w-full fes:w-[85%] bsm:w-[80%] fmd:w-[95%] flex flex-col transform duration-1000 ease-in-out items-center justify-center outline-1 outline-gray-200 '
            >
              <div
                onClick={() => {
                  activeFaq == index ? setActiveFaq(-1) : setActiveFaq(index);
                }}
                className=' cursor-pointer flex flex-row py-2 items-center w-full px-4 justify-between'
              >
                <h2 className=' cursor-pointer text-fsm font-semibold pointer-events-none max-w-11/12'>
                  {faq.question}
                </h2>
                <ChevronDown
                  size={24}
                  className='pointer-events-none'
                  style={
                    activeFaq === index
                      ? {
                        transform: 'rotate(180deg)',
                        transition: '0.4s',
                      }
                      : {
                        transform: 'rotate(360deg)',
                        transition: '0.4s',
                      }
                  }
                />
              </div>
              <hr
                className={`${activeFaq === index ? 'block' : 'hidden'
                  } w-full text-gray-400`}
              />
              <div
                className={`${activeFaq === index ? 'block' : 'hidden'
                  }   w-full px-4`}
              >
                <h3 className='w-full py-2 text-gray-800 text-fsm  transform duration-1000 ease-in-out'>
                  {faq.answer}
                </h3>
              </div>
            </div>
          )) : homeCareFaqs.map((faq, index) => (
            <div
              key={faq.id}
              className='bg-gray-50 rounded-[0.2em] w-full fes:w-[85%] bsm:w-[80%] fmd:w-[95%] flex flex-col transform duration-1000 ease-in-out items-center justify-center outline-1 outline-gray-200 '
            >
              <div
                onClick={() => {
                  activeFaq == index ? setActiveFaq(-1) : setActiveFaq(index);
                }}
                className=' cursor-pointer flex flex-row py-2 items-center w-full px-4 justify-between'
              >
                <h2 className=' cursor-pointer text-fsm font-semibold pointer-events-none max-w-11/12'>
                  {faq.question}
                </h2>
                <ChevronDown
                  size={24}
                  className='pointer-events-none'
                  style={
                    activeFaq === index
                      ? {
                          transform: 'rotate(180deg)',
                          transition: '0.4s',
                        }
                      : {
                          transform: 'rotate(360deg)',
                          transition: '0.4s',
                        }
                  }
                />
              </div>
              <hr
                className={`${
                  activeFaq === index ? 'block' : 'hidden'
                } w-full text-gray-400`}
              />
              <div
                className={`${
                  activeFaq === index ? 'block' : 'hidden'
                }   w-full px-4`}
              >
                <h3 className='w-full py-2 text-gray-800 text-fsm  transform duration-1000 ease-in-out'>
                  {faq.answer}
                </h3>
              </div>
            </div>
          ))
        }

        </div>
      </div>
    </SlideInHelper>
  );
}

export default FAQS;
