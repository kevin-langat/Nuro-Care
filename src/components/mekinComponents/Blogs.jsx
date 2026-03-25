import { CalendarDays, Folder } from 'lucide-react';
import heart from '/heart.avif';
import { blogs } from '@/config/data';
import SlideInHelper from './SlideIn';
import { HashLink } from 'react-router-hash-link';

function Blogs() {
  return (
    <SlideInHelper>
      <div className='w-full pt-8 mt-4 bg-white flex flex-col gap-4 items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-2 w-full'>
          <h2 className='text-sky-600 font-poppins text-fsm tmd:font-semibold'>
            Health Insights & News
          </h2>
          <h3 className='text-xl sm:text-fxl tmd:text-2xl transform duration-500 ease-in-out  font-poppins font-semibold text-center'>
            Stay Informed with the <br /> Latest from Mekin Home Care
          </h3>
        </div>
        <div className='flex smd:hidden flex-row items-center justify-center w-11/12  gap-4'>
          <div className='w-full fes:w-11/12 ses:w-3/4 bsm:w-1/2 fmd:w-[45%] outline-1 outline-gray-300/90 rounded-[0.3em] py-3 bg-white h-full flex flex-col gap-2'>
            <img
              loading='lazy'
              src={heart}
              className=' h-50 w-full object-cover'
              alt='a human heart'
            />
            <div className='flex flex-col w-full items-center gap-1'>
              <div className='flex w-[80%] gap-6 flex-row justify-start'>
                <h2 className='flex flex-row items-center justify-center gap-0.5'>
                  <CalendarDays className='stroke-sky-600' size={15} />
                  <p className='text-fsm'>{blogs[0].date}</p>
                </h2>
                <h3 className='flex flex-row items-center justify-center gap-0.5'>
                  <Folder className='stroke-sky-600' size={15} />
                  <p className='text-fsm'>Health Care</p>
                </h3>
              </div>
              <h3 className='text-fxs sm:text-fmd   w-[85%] font-semibold  text-sky-600'>
                {blogs[0].title}
              </h3>
              <h3 className='w-[85%] text-fsm after:content-["..."]'>
                {blogs[0].body.slice(0, 100)}
              </h3>
              <HashLink to={`/blogs/${blogs[0].id}`} className='py-0.5 px-8 text-gray-200 bg-blue-500'>
                Learn More
              </HashLink>
            </div>
          </div>
          <div className='hidden w-1/2 fmd:w-[45%] bsm:flex outline-1 outline-gray-300/90 rounded-[0.3em] py-3 bg-white h-full  flex-col gap-2'>
            <img
              loading='lazy'
              src={heart}
              className=' h-50 w-full object-cover'
              alt='a human heart'
            />
            <div className='flex flex-col w-full items-center gap-1'>
              <div className='flex w-[80%] gap-6 flex-row justify-start'>
                <h2 className='flex flex-row items-center justify-center gap-0.5'>
                  <CalendarDays className='stroke-sky-600' size={15} />
                  <p className='text-fsm'>{blogs[1]?.date}</p>
                </h2>
                <h3 className='flex flex-row items-center justify-center gap-0.5'>
                  <Folder className='stroke-sky-600' size={15} />
                  <p className='text-fsm'>Health Care</p>
                </h3>
              </div>
              <h3 className='text-fxs sm:text-fmd   w-[85%] font-semibold text-sky-600'>
                {blogs[1]?.title}
              </h3>
              <p className='w-[85%] text-fsm after:content-["..."]'>
                {blogs[1]?.body.slice(0, 100)}
              </p>
              <HashLink to={`/blogs/${blogs[1].id}`} className='py-0.5 px-8 text-gray-200 bg-blue-500'>
                Learn More
              </HashLink>
            </div>
          </div>
        </div>
        <div className='hidden smd:flex flex-row items-center w-full lg:w-11/12 px-2 gap-4'>
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className='w-1/3 outline-1 outline-gray-300/90 rounded-[0.3em] py-3 bg-white h-110 flex flex-col gap-2'
            >
              <img
                src={heart}
                className=' h-50 w-full object-cover'
                alt='a human heart'
              />
              <div className='flex flex-col w-full h-60 items-center justify-around'>
                <div className='flex flex-row gap-3'>
                  <h2 className='flex flex-row items-center justify-center gap-0.5'>
                    <CalendarDays className='stroke-sky-600' size={15} />
                    <p className='text-fsm'>{blog.date}</p>
                  </h2>
                  <h3 className='flex flex-row items-center justify-center gap-0.5'>
                    <Folder className='stroke-sky-600' size={15} />
                    <p className='text-fsm'>Health Care</p>
                  </h3>
                </div>
                <h3 className='text-fxs sm:text-fmd  w-[85%] font-semibold text-sky-600'>
                  {blog.title}
                </h3>
                <p className='w-[85%] after:content-["..."] '>
                  {blog.body.slice(0, 100)}
                </p>
                <HashLink to={`/blogs/${blog.id}`} className='py-0.5 px-8 text-gray-200 bg-blue-500'>
                  Learn More
                </HashLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideInHelper>
  );
}
export default Blogs;
