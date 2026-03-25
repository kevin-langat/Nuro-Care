import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion';
import { useEffect, useRef } from 'react';

const CircularProgressBar = ({ percentage, size, strokeWidth = 10 }) => {
  const center = size / 2;
  const radius = center - strokeWidth / 0.8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      // Animate the number counter when in view
      animate(count, percentage, { duration: 1.5 });
    }
  }, [isInView, percentage, count]);

  return (
    <div
      className='scale-95 bsm:scale-105'
      ref={ref}
      style={{ width: size, height: size, position: 'relative' }}
    >
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill='none'
          stroke='#e0e0e0'
          strokeWidth={strokeWidth}
        />

        {/* Animated Progress Circle */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill='none'
          stroke='#00aaff'
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>

      {/* Percentage Text Counter */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          fontWeight: 'bold',
        }}
      >
        <motion.span>{rounded}</motion.span>%
      </div>
    </div>
  );
};

export default CircularProgressBar;
