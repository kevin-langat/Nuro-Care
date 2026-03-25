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
  {
    id: 4,
    name: 'Daniel O.',
    role: 'Client – Karen',
    quote:
      'The caregivers were punctual, respectful, and well-trained. Mekin Home Care exceeded our expectations.',
  },
  {
    id: 5,
    name: 'Lucy N.',
    role: 'Client – Ruaka',
    quote:
      'Excellent home care services. Communication was clear and the support team was always available.',
  },
];

const AUTOPLAY_DURATION = 5000; // 5 seconds
const VISIBLE_COUNT = 3;

export default function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const progressControls = useAnimationControls();

  const startProgress = async () => {
    await progressControls.start({
      width: '100%',
      transition: {
        duration: AUTOPLAY_DURATION / 1000,
        ease: 'linear',
      },
    });

    setActiveIndex((i) => (i + 1) % testimonials.length);
  };

  useEffect(() => {
    progressControls.set({ width: '0%' });
    startProgress();
  }, [activeIndex]);

  const visibleTestimonials = Array.from(
    { length: VISIBLE_COUNT },
    (_, i) => testimonials[(activeIndex + i) % testimonials.length]
  );

  return (
    <div className='w-full  absolute top-5 max-w-6xl mx-auto'>
      {/* Testimonials row */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {visibleTestimonials.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='bg-white flex flex-col outline-1 outline-gray-400 items-center justify-between h-60 shadow-md'
          >
            <h2 className='text-gray-700 p-4 mb-4'>“{item.quote}”</h2>
            <div className='w-full h-20 flex flex-row items-center justify-start px-6 bg-gray-200 gap-3'>
              <img
                src={imageTest}
                className='w-18 h-18 rounded-full'
                alt='A nurse care for a patient'
              />
              <div className='flex flex-col items-start gap-0.5 justify-center '>
                <h3 className='font-semibold text-gray-900'>{item.name}</h3>
                <h4 className='text-sm text-gray-700'>{item.role}</h4>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination with progress */}
      <div
        aria-label='mekin home care testimonials indicators'
        className='mt-4 flex justify-center gap-2'
      >
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
                aria-label='mekin home care testimonials gray indicators'
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
