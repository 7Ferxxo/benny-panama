import type { Transition } from 'framer-motion';

export const spring = {
  type: 'spring',
  stiffness: 60,
  damping: 15,
} satisfies Transition;

export const springFast = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
} satisfies Transition;

export const springSlow = {
  type: 'spring',
  stiffness: 50,
  damping: 15,
} satisfies Transition;

export const springSnappy = {
  type: 'spring',
  stiffness: 380,
  damping: 30,
} satisfies Transition;
