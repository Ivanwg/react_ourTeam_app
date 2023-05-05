import { createLongClassName } from '../../utils/createLongClassName';
import styles from './style.module.scss';

interface IProps {
  additionalClassNames?: Array<string>;
}

function Spinner({additionalClassNames=[]}: IProps) {
  const names = createLongClassName([styles.loaderWrap, ...additionalClassNames])
  return ( 
    <div className={names}>
      <div className={styles.loader}></div>
    </div>
   );
}

export default Spinner;