'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'motion/react';
import imageTest from '/founder.avif';
const testimonials = [
  {
    id: 1,
    name: 'Sarah W.',
    role: 'Client – Nairobi',
    quote:
      'Mekin Home Care provided compassionate and professional support for my mother. The caregivers were reliable and kind.',
  },
  {
    id: 2,
    name: 'James K.',
    role: 'Client – Westlands',
    quote:
      'The nursing care was exceptional. Having medical support at home made recovery much easier for our family.',
  },
  {
    id: 3,
    name: 'Grace M.',
    role: 'Client – South B',
    quote:
      'Very professional team. They treated my father with dignity and respect. I highly recommend Mekin Home Care.',
  },
];

const AUTOPLAY_DURATION = 5000; // 5 seconds

export default function TestimonialsCarouselTwo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const progressControls = useAnimationControls();

  // ▶ Start progress animation
  const startProgress = async () => {
    await progressControls.start({
      width: '100%',
      transition: { duration: AUTOPLAY_DURATION / 1000, ease: 'linear' },
    });

    setActiveIndex((i) => (i + 1) % testimonials.length);
  };

  // 🔄 Restart on index change
  useEffect(() => {
    progressControls.set({ width: '0%' });
    startProgress();
  }, [activeIndex]);

  return (
    <div className='w-full absolute top-12 max-w-3xl mx-auto'>
      {/* Testimonial content */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='bg-white outline-1 flex flex-col justify-between outline-gray-300 shadow-lg text-center'
      >
        <h2 className='text-gray-700 bsm:text-fmd p-4 mb-4'>
          {' '}
          “{testimonials[activeIndex].quote}”
        </h2>
        <div className='w-full h-20 flex flex-row items-center justify-start px-6 bg-gray-300 gap-3'>
          <img
            src={imageTest}
            className='w-18 h-18 rounded-full'
            alt='A nurse care for a patient'
          />
          <div className='flex flex-col items-start justify-center '>
            <h3 className='font-semibold text-gray-900'>
              {' '}
              {testimonials[activeIndex].name}
            </h3>
            <h4 className='text-sm text-gray-700'>
              {' '}
              {testimonials[activeIndex].role}
            </h4>
          </div>
        </div>
      </motion.div>

      {/* Pagination */}
      <div className='mt-3 flex justify-center gap-3'>
        {testimonials.map((_, index) => (
          <button
            aria-label='mekin home care testimonials indicators'
            type='button'
            key={index}
            onClick={() => setActiveIndex(index)}
            className='relative w-10 h-1 rounded-full bg-gray-300 overflow-hidden'
          >
            <span className='sr-only'>Indicator</span>
            {index === activeIndex && (
              <motion.div
                className='absolute left-0 top-0 h-full bg-blue-600'
                initial={{ width: '0%' }}
                animate={progressControls}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
