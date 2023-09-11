import { Variants } from "framer-motion";

export const cardVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    visibility: "hidden",
  },
  visible: {
    opacity: 1,
    y: 0,
    visibility: "visible",
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const buttonVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};
