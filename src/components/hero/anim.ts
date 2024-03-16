import {type AnimationProps} from "framer-motion";

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
