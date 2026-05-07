import { motion } from 'motion/react';
import { ContactSection } from '@/components/contact/ContactSection';

export default function ContactUsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative left-1/2 min-h-full w-[calc(100vw-2rem)] -translate-x-1/2 sm:w-[calc(100vw-3rem)] lg:w-[calc(100vw-5rem)]"
    >
      <ContactSection />
    </motion.div>
  );
}
