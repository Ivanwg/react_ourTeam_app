import { Link } from 'react-router-dom';
import img from '../../assets/img/avatar.png';
import { createLongClassName } from '../../utils/createLongClassName';
import styles from './style.module.scss';


interface IProps {
  type?: 'small' | 'big';
  name: string;
  avatar?: string;
  id: number;
}

const UserFace = ({id, name, avatar, type='big'}: IProps) => {
  const wrapClassName = type === 'big' ? styles.wrap_big : styles.wrap_small;
  const imgClassName = type === 'big' ? styles.img_big : styles.img_small;
  return ( 
    <div className={wrapClassName}>
      <img src={avatar ? avatar : img} alt="avatar" className={imgClassName} />
      <div className={styles.text}>
        {
          type === 'big' ? 
          <h1 className={createLongClassName(['mb-16 white-color title', styles.name])}>{name ? name : 'Без имени'}</h1> :
          <Link to={`/team/${id}`} className={createLongClassName(['mb-16 white-color title', styles.name])}>{name ? name : 'Без имени'}</Link>
        }
        {
          type === 'big' &&
          <p className={createLongClassName(['white-color', styles.status])}>Партнер</p>
        }
      </div>
    </div>
   );
}
 
export default UserFace;