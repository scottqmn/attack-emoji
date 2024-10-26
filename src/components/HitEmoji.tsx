import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Emoji } from './Emoji';
import { HitData, HitDataTypes } from '../types/hit';

interface IHitEmojiProps {
  data: HitData;
}

const UNMOUNT_DELAY = 200;

export const HitEmoji = ({ data }: IHitEmojiProps) => {
  const [mounted, setMounted] = useState(true);

  useEffect(function unmountAfterDelay() {
    const timer = setTimeout(() => setMounted(false), UNMOUNT_DELAY);
    return () => clearTimeout(timer);
  }, []);

  let emoji;
  switch (data.type) {
    case HitDataTypes.Bang:
      emoji = '💥';
      break;
    case HitDataTypes.Kick:
      emoji = '🦶';
      break;
    case HitDataTypes.Punch:
    default:
      emoji = '👊';
  }

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: data.x, top: data.y }}
    >
      <AnimatePresence>
        {mounted && (
          <motion.div
            initial={{ opacity: 0.8, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.35 }}
          >
            <Emoji size={100}>{emoji}</Emoji>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
