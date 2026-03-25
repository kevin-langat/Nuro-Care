'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { HashLink } from 'react-router-hash-link';
import { globalState } from '@/context/GlobalContext';
import { useNavigate } from 'react-router-dom';

export default function CoverflowCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { serviceRes } = useContext(globalState);
  const navigateTo = useNavigate()
  const intervalRef = useRef(null);
  const autoplayDelay = 7000;

  const wrapIndex = (index) => (index + serviceRes.length) % serviceRes.length;

  // 👉 Autoplay: always move right → left
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => wrapIndex(i + 1));
    }, autoplayDelay);

    return () => clearInterval(intervalRef.current);
  }, [serviceRes.length]);

  return (
    <div className='relative w-full h-100 flex items-center justify-center overflow-hidden'>
      {serviceRes.map((item, index) => {
        let offset = index - activeIndex;

        if (offset > serviceRes.length / 2) offset -= serviceRes.length;
        if (offset < -serviceRes.length / 2) offset += serviceRes.length;

        return (
          <motion.div
            key={item._id}
            className={`absolute outline-gray-300 shadow shadow-gray-50 rounded-[0.3em]  h-full flex items-center justify-center ${offset === 0 ? 'outline-1 z-40' : 'outline-0'}`}
            animate={{
              x: offset * 300,
              scale: offset === 0 ? 0.98 : 0.94,
              opacity: Math.abs(offset) > 3 ? 0 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 25,
            }}
          >
            <div className='flex bg-white flex-col items-center gap-2 justify-center w-70 h-[98%]'>
              <img
                src={item.ServiceCoverImage.url}
                className='w-36 h-36 rounded-full aspect-square'
                alt='home-based nurse taking care of a patient'
              />

              <div className='w-11/12 flex flex-col items-center'>
                <h2 className='text-fmd text-gray-950 font-semibold'>
                  {item.Title}
                </h2>
                <h3 className='text-vsm text-gray-500 text-center'>
                  {item.MetaDescription.slice(0, 150 - 1) + '...'}
                </h3>
              </div>

              {offset === 0 && (
                <button
                  onClick={() => navigateTo(`/services/${item.ServiceSlug}`)}
                  className='bg-blue-600 transform duration-300 hover:bg-blue-700 px-3 py-1 mt-2 text-white'
                >Explore this service
                </button>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
