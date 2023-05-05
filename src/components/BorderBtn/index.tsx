import { createLongClassName } from "../../utils/createLongClassName";
import styles from './style.module.scss';

interface IProps {
  children: React.ReactNode;
  additionalClassNames?: Array<string>;
  onClick?: (e: React.MouseEvent) => void;
}


const BorderBtn = ({children, additionalClassNames=[], onClick}: IProps) => {
  const names = ['animated-btn', styles.btn, ...additionalClassNames];


  return ( 
    <button className={createLongClassName(names)} onClick={onClick}>
      {children}
    </button>
   );
}
 
export default BorderBtn;