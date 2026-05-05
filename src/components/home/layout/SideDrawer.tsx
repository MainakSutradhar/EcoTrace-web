import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Truck, 
  Map as MapIcon, 
  BarChart3, 
  Info, 
  Database, 
  Mail, 
  X 
} from 'lucide-react';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Truck, label: 'Vehicle', path: '/vehicle' },
  { icon: MapIcon, label: 'Map', path: '/map' },
  { icon: BarChart3, label: 'Statewise', path: '/statewise' },
  { icon: Info, label: 'About', path: '/about' },
  { icon: Database, label: 'Data collection', path: '/data-collection' },
  { icon: Mail, label: 'Contact us', path: '/contact' },
];

export function SideDrawer({ isOpen, onClose }: SideDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-white shadow-2xl z-[101] flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-emerald-600 font-bold tracking-tight text-xl">ECOTRACE</span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.2em]">Navigation</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors group"
              >
                <X className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
              </button>
            </div>

            <nav className="flex-1 py-6 overflow-y-auto">
              <ul className="space-y-1 px-3">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 group"
                    >
                      <item.icon className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
