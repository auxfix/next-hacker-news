import { motion } from 'framer-motion';
import  './button.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}


export default function Button(props: ButtonProps) {
  const { children, onClick } = props;

  return (
    <motion.button
      whileTap={{
        scale: 0.9,
        transition: { duration: 0.1 },
      }}
      className={'button-simple'}
      data-testid='button'
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
