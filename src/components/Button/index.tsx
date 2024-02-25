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
    <button
      className={buttonStyle}
      data-testid="button"
      onClick={onClick}
      onMouseDown={onButtonDown}
      onMouseUp={onButtonUp}
    >
      {children}
    </button>
  );
}
