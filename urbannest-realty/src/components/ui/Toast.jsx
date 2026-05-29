import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { hideToast } from '../../store/slices/toastSlice.js';
import { cn } from '../../utils/cn.js';

export default function Toast() {
  const dispatch = useDispatch();
  const { visible, message, type } = useSelector((s) => s.toast);

  useEffect(() => {
    if (!visible) return undefined;
    const t = setTimeout(() => dispatch(hideToast()), 4000);
    return () => clearTimeout(t);
  }, [visible, dispatch]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={cn(
            'fixed bottom-6 right-6 z-[100] max-w-sm rounded-2xl px-5 py-4 text-sm font-medium shadow-2xl',
            type === 'error' ? 'bg-red-600 text-white' : 'bg-slate-900 text-white',
          )}
          role="status"
        >
          {message}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
