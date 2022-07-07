import * as ReactDOM from 'react-dom';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{}>;

const Portal: React.FC<Props> = ({ children }) => {
  const element = document.getElementById('portal')!;

  return ReactDOM.createPortal(children, element);
};

export default Portal;
