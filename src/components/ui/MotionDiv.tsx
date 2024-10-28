import { motion } from "framer-motion";
const MotionDiv = ({ children }: { children: JSX.Element }) => {
  return (
    <motion.div
      whileHover={{
        y: "-5%",
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  );
};
export default MotionDiv;
