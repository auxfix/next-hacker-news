import { useState } from 'react';

const useButtonStyle = (styles: Array<string>): [string, () => void, () => void] => {
  const normalStyle = styles[0];
  const onPushStyle = styles[1];
  const [style, setState] = useState(normalStyle);

  const onButtonDown = () => setState(onPushStyle);
  const onButtonUp = () => setState(normalStyle);

  return [style, onButtonDown, onButtonUp];
};

export default useButtonStyle;
