import { motion } from 'framer-motion';

function SlideInHelper({ children, isFaqs = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`w-full  flex ${
        isFaqs ? 'flex-col items-start' : 'flex-col'
      }  items-center justify-center `}
    >
      {children}
    </motion.div>
  );
}
export default SlideInHelper;