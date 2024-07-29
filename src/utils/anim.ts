import {animate, type AnimationProps} from "framer-motion";

export const variants: AnimationProps["variants"] = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};

export const transition: AnimationProps["transition"] = {
  duration: 0.3,
  type: "spring",
  stiffness: 220,
  damping: 60,
  mass: 0.5,
};

export const fadeInAnimationOnce: AnimationProps["variants"] = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
    },
  }),
};


export const fadeInHorizontalOnce: AnimationProps["variants"] = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: .5,
      ease: [.42, 0, .58, 1],
      delay: .3
    }
},

};

