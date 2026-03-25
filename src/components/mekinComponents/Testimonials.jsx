import CircularProgressBar from './ProgressBar';
import SlideInHelper from './SlideIn';
import TestimonialsCarousel from './TestimonialsSlider';
import TestimonialsCarouselTwo from './TestimonialsSliderTwo';

function Testimonials() {
  return (
    <div className='w-full h-80 text-white bg-blue-950 flex flex-col items-center justify-center'>
      <SlideInHelper>
        <div className='w-11/12 fes:w-[85%] bsm:w-4/5 h-50 flex flex-col fmd:flex-row justify-between '>
          <div className='w-full fmd:w-1/2 h-full flex flex-col items-start justify-center transform duration-500 ease-in-out'>
            <h2 className='text-sky-400 font-poppins text-fsm tmd:font-semibold'>
              Real Stories, Real Care
            </h2>
            <h3 className='text-xl sm:text-fxl tmd:text-2xl transform duration-500 ease-in-out  font-poppins font-semibold'>
              What Our Patients Say About Us
            </h3>
          </div>
          <div className='w-full fmd:w-1/2 p-2 flex  gap-4 flex-row items-center justify-center '>
            <CircularProgressBar percentage={92} size={70} strokeWidth={2} />
            <div className='flex flex-col items-start justify-start'>
              <h3 className='text-sky-400 font-poppins text-fsm tmd:font-semibold'>
                Happy Patients
              </h3>
              <p className='text-fxs w-full bsm:text-fmd '>
                Happy patients are the heart of Mekin home care. Their
                experience reflect our commitment to compassionate, expert care
                every step of the way.
              </p>
            </div>
          </div>
        </div>
        <div className='relative w-11/12 h-30 hidden fmd:flex flex-row items-center justify-center transform duration-500 ease-in-out'>
          <TestimonialsCarousel />
        </div>
        <div className='relative w-3/4 fes:w-3/5 fsm:w-1/2 h-30 flex fmd:hidden flex-row items-center justify-center  transform duration-500 ease-in-out'>
          <TestimonialsCarouselTwo />
        </div>
      </SlideInHelper>
    </div>
  );
}
export default Testimonials;
