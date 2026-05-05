import { motion } from 'motion/react';

export default function DataCollectionPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8"
    >
      <h1 className="text-3xl font-bold text-slate-800 mb-4">Data Collection</h1>
      <p className="text-slate-600">This is the Data Collection page</p>
    </motion.div>
  );
}
