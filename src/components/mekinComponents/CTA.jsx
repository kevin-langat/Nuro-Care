import { Link } from 'react-router-dom';
import founder from '/founder.avif';
import SlideInHelper from './SlideIn';
export default function CTA({ body }) {
  return (
    <section className='flex font-poppins items-center justify-center p-4 py-5'>
      <SlideInHelper>
        <div className='relative w-full max-w-5xl bg-linear-to-bl from-blue-600 to-blue-800 rounded-2xl border border-indigo-500 px-2  pb-4 flex flex-col items-center text-center'>
          <div className='inline-block bg-white/10 backdrop-blur-md rounded-full px-6 mt-2 py-2 mb-2'>
            <span className='text-white text-xs'>
              Care That Feels Like Family, Backed by Medical Expertise
            </span>
          </div>

          <h2 className='text-xl  bsm:w-3/4 fmd:w-3/5 md:text-[25px]/8 font-medium text-gray-200 mb-4  max-w-6xl'>
            {body}
          </h2>

          <div className='flex flex-col sm:flex-row items-center gap-4'>
            <Link
              to='https://wa.me/254713231908?text=Hello%20Damacline,%20I%20wanted%20to%20inquire%20about%20Mekin%20Home%20Care%20Services'
              className='bg-green-500 rounded-full p-1 pr-8 flex items-center gap-3 hover:bg-green-400 transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer'
            >
              <img
                fetchPriority='high'
                src={founder}
                alt='Avatar'
                className='size-9 rounded-full object-cover'
              />
              <div className='text-left flex flex-col justify-center gap-0.5'>
                <span className='text-xs text-gray-900 leading-tight'>
                  WhatsApp Damacline
                </span>
                <span className='text-xs text-gray-900 font-medium leading-tight flex items-center gap-1'>
                  Available{' '}
                  <span className='w-1.5 h-1.5 bg-blue-500 rounded-full inline-block'></span>
                </span>
              </div>
            </Link>
            <Link to={'/book-appointment'} className='bg-white text-gray-900 rounded-full px-6 py-3 text-sm flex items-center gap-2 hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer'>
              Get Care Today
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                className='w-4 h-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3'
                />
              </svg>
            </Link>
          </div>
        </div>
      </SlideInHelper>
    </section>
  );
}
