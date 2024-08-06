import {type AnimationProps} from "framer-motion";

export const largeVariants: AnimationProps["variants"] = {
  open: {x: "0", height: "90%", y: "6.25%", borderRadius: "0px 12px 12px 0px", display: "flex"},
  closed: {
    x: "-100%",
    height: "90%",
    y: "6.25%",
    borderRadius: "0px 12px 12px 0px",
    display: "flex",
  },
  locked: {
    x: "0",
    height: "100%",
    y: "0%",
    borderRadius: "0px 0px 0px 0px",
    display: "flex",
    transitionEnd: {display: "none"},
  },
};

export const smallVariants: AnimationProps["variants"] = {
  open: {x: "0", height: "85%", y: "9.375%", borderRadius: "0px 12px 12px 0px", display: "flex"},
  closed: {
    x: "-100%",
    height: "85%",
    y: "9.375%",
    borderRadius: "0px 12px 12px 0px",
    display: "flex",
  },
  locked: {
    x: "0",
    height: "100%",
    y: "0%",
    borderRadius: "0px 0px 0px 0px",
    display: "flex",
  },
};

export const transition: AnimationProps["transition"] = {
  duration: 0.1,
  type: "spring",
  stiffness: 420,
  damping: 45,
};
