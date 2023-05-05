import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { createLongClassName } from '../../utils/createLongClassName';
import styles from './style.module.scss';
import { useEffect } from 'react';
import { fetchCollegues } from '../../store/slices/collegues';
import { getRandomKey } from '../../utils/getRandomKey';
import UserFace from '../UserFace';
import Spinner from '../Spinner';
import { appendLike, deleteOneLike } from '../../store/slices/user';


const CardsList = () => {
  const collegues = useSelector((state: RootState) => state.collegues.collegues);
  const totalCount = useSelector((state: RootState) => state.collegues.total);
  const status = useSelector((state: RootState) => state.collegues.status);
  const likesList = useSelector((state: RootState) => state.user.userData.likesList);
  const mounted = useSelector((state: RootState) => state.collegues.mounted);
  const dispatch = useAppDispatch();
  useEffect(() => {
    !collegues.length && mounted && dispatch(fetchCollegues());
  }, [mounted]);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    totalCount > collegues.length && dispatch(fetchCollegues());
  }

  const onLike = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    if (likesList.includes(id)) {
      dispatch(deleteOneLike(id));
    } else {
      dispatch(appendLike(id));
    }
    
  }


  return ( 
    <>
      {
        status !== 'load' ? <Spinner additionalClassNames={['transformedUp']} /> :
        <div className={styles.wrap}>
          <ul className={styles.list}>
            {
              collegues.map(obj => 
                <li key={getRandomKey()}>
                  <div className={styles.card}>
                    <UserFace type='small' id={obj.id} name={[obj.first_name, obj.last_name].join(' ')} avatar={obj.avatar} />
                    <button className={createLongClassName(['animated-btn', styles.like])} datatype={likesList.includes(obj.id) ? 'liked' : undefined} onClick={e => onLike(e, obj.id)}>
                      <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.85 1C2.72375 1 1 2.72173 1 4.84548C1 8.69096 5.55 12.1869 8 13C10.45 12.1869 15 8.69096 15 4.84548C15 2.72173 13.2762 1 11.15 1C9.848 1 8.6965 1.64569 8 2.63398C7.64499 2.1289 7.17336 1.71669 6.62504 1.43226C6.07672 1.14784 5.46785 0.999565 4.85 1Z" stroke="#151317" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </li>
              )
            }
          </ul>
          {
            collegues.length < totalCount &&
            <button className={createLongClassName(['animated-btn', styles.btn])} onClick={onClick}>
              Показать еще
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.497 7.98903L12 15.297L4.50299 7.98903C4.36905 7.85819 4.18923 7.78495 4.00199 7.78495C3.81475 7.78495 3.63494 7.85819 3.50099 7.98903C3.43614 8.05257 3.38461 8.12842 3.34944 8.21213C3.31426 8.29584 3.29614 8.38573 3.29614 8.47653C3.29614 8.56733 3.31426 8.65721 3.34944 8.74092C3.38461 8.82463 3.43614 8.90048 3.50099 8.96403L11.4765 16.74C11.6166 16.8765 11.8044 16.953 12 16.953C12.1956 16.953 12.3834 16.8765 12.5235 16.74L20.499 8.96553C20.5643 8.90193 20.6162 8.8259 20.6517 8.74191C20.6871 8.65792 20.7054 8.56769 20.7054 8.47653C20.7054 8.38537 20.6871 8.29513 20.6517 8.21114C20.6162 8.12715 20.5643 8.05112 20.499 7.98753C20.365 7.85669 20.1852 7.78345 19.998 7.78345C19.8108 7.78345 19.6309 7.85669 19.497 7.98753V7.98903Z" fill="#151317"/>
              </svg>
            </button>
          }
        </div>
      }
    </>
  );
}
 
export default CardsList;