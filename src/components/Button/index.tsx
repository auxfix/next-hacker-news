import { motion } from 'framer-motion';
import  './button.scss';
import useButtonStyle from './hooks/useButtonStyle';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}


export default function Button(props: ButtonProps) {
  const { children, onClick } = props;
  const [buttonStyle, onButtonDown, onButtonUp] = useButtonStyle([
    'button',
    'button-on-push',
  ]);

  return (
    <motion.button
      initial={{
        translateX: -10,
        translateY: -6
      }}
      whileTap={{
        scale: 0.9
      }}
      whileHover={{
        scale: 1.04,
        translateX: 10,
        translateY: 4,
        transition: { duration: 0.2 },
      }}
      className={buttonStyle}
      data-testid="button"
      onClick={onClick}
      onMouseDown={onButtonDown}
      onMouseUp={onButtonUp}
    >
      {children}
    </motion.button>
  );
}
