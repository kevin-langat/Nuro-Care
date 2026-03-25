import { globalState } from '@/context/GlobalContext';
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  TwitterLogoIcon,
} from '@phosphor-icons/react';
import { Heart } from 'lucide-react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function Footer() {
  const { serviceRes } = useContext(globalState);
  console.log(serviceRes);
  return (
    <footer className='w-full flex flex-col justify-between bg-gray-950 z-30 '>
      <div className=' p-3 h-[85%] flex flex-col tmd:flex-row justify-around tmd:gap-6  '>
        <div
          className=' w-full bsm:w-3/4 sm:w-3/5 smd:w-1/2 tmd:w-[35%] flg:w-1/3
         h-full   flex flex-col gap-8'
        >
          <div className='w-full h-1/2 flex flex-col gap-2 '>
            <Link
              to='/home'
              className='flex  transform duration-500 ease-in-out  items-center space-x-2'
            >
              <Heart className='h-8 w-8 stroke-blue-600 dark:stroke-blue-500' />
              <div className='flex flex-col'>
                <span className='text-xl font-bold text-gray-200 dark:text-gray-300'>
                  Mekin Home Care
                </span>
              </div>
            </Link>
            <h2 className='font-semibold text-gray-400 text-justify text-fsm'>
              Mekin Home Based Care delivers professional, compassionate
              healthcare services in the comfort of your home across Nairobi.
              From skilled nursing to long-term support, we are your trusted
              care partner.
            </h2>
          </div>
          <div className='w-full h-1/2 flex flex-col gap-2'>
            <h3 className='text-gray-400'>
              Subscribe to our newsletter to receive updates
            </h3>
            <div className='w-3/4 fes:w-3/5 tmd:w-4/5  bg-gray-200 outline-1 rounded-[0.3em] outline-gray-300 h-9 p-0.5 flex flex-row items-center justify-between pl-3'>
              <input
                type='email'
                className='caret-blue-500 h-11/12 px-3 rounded-[0.4em] field-sizing-fixed italic bg-gray-200 outline-0 text-fsm placeholder:italic border-0 w-[65%]'
                placeholder='email'
              />
              <button className='h-11/12 rounded-[0.2em] bg-blue-700 text-gray-200 px-4'>
                Subscribe
              </button>
            </div>
            <div className='w-11/12 h-14 flex flex-row items-center gap-3 '>
              <TwitterLogoIcon size={30} className='text-gray-300' />
              <FacebookLogoIcon size={30} className='text-gray-300' />
              <InstagramLogoIcon size={30} className='text-gray-300' />
              <LinkedinLogoIcon size={30} className='text-gray-300' />
            </div>
          </div>
        </div>
        <div className='w-full tmd:w-[65%] grid grid-cols-1 ses:grid-cols-2 gap-1 fsm:grid-cols-3 tmd:grid-cols-2 flg:grid-cols-3 transform ease-in-out duration-500'>
          {
            serviceRes && serviceRes.length > 0 ? <div className=' w-full  p-1 *:text-gray-300 *:hover:text-sky-400  *:nth-1:text-gray-100  *:nth-1:hover:text-gray-200  flex flex-col gap-1 '>
              <h3 className='text-white font-semibold text-fxl'>
                Services Links
              </h3>{
                serviceRes.map(service =>
                  <Link to={`/services/${service?.ServiceSlug}`}>
                    {service.Title}
                  </Link>)
              }


            </div> : null
          }

          <div className=' w-full p-1 *:text-gray-300 *:hover:text-sky-400  *:nth-1:text-gray-100  *:nth-1:hover:text-gray-200  flex flex-col gap-1 '>
            <h3 className='text-white font-semibold text-fxl'>Caregiver</h3>
            <HashLink to='/caregivers/apply'>Become a Caregiver</HashLink>
            <HashLink to='/caregivers#requirements'>
              Caregiver Requirements
            </HashLink>
            <HashLink to='/caregivers#certification'>
              Training & Certification
            </HashLink>
            <HashLink to='/caregivers#why-work-with-mekin'>
              Why Work With Mekin
            </HashLink>
          </div>
          <div className='w-full text-gray-300 p-1 gap-1 flex flex-col '>
            <h3 className='text-white font-semibold text-fxl'>Contact Us</h3>
            <Link className='hover:text-green-400' to='tel:+254713231908'>
              +254 713 231 908
            </Link>
            <Link
              className='hover:text-green-400'
              to='https://wa.me/254713231908?text=Hello%20Damacline,%20I%20wanted%20to%20inquire%20about%20Mekin%20Home%20Care%20Services'
            >
              WhatsApp Us
            </Link>
            <Link
              className='hover:text-green-400'
              to='mailto:info@mekinhomecare.com'
            >
              info@mekinhomecare.com
            </Link>

            <h2>Nairobi, Kenya</h2>
          </div>
        </div>
      </div>

      <hr className='border-0 h-[0.9px] bg-gray-800' />
      <div className='w-full h-8 flex flex-row items-center justify-center'>
        <p className='text-gray-300 text-fsm '>
          {' '}
          &copy; {new Date().getFullYear()} Mekin Home Care. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
export default Footer;
