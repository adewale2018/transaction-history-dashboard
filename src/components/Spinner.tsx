import { motion } from 'framer-motion';

const Spinner = () => {
  return (
    <motion.div
        className="w-5 h-5 border-4 border-t-4 border-t-green-500 border-green-300 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
  )
}

export default Spinner