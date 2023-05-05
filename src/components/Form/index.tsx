
import { Link, useNavigate } from 'react-router-dom';
import { createLongClassName } from '../../utils/createLongClassName';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store/store';
import { RootState } from '../../store/store';
import { fetchRegister } from '../../store/slices/user';
import { useEffect, useState } from 'react';
import { validateEmail } from '../../utils/validateEmail';


interface IProps {
  type: 'register' | 'login';
}


const Form = ({type}: IProps) => {

  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);
  const token = user.userData.token;
  const status = user.status;
  const mainErr = user.err;
  const navigate = useNavigate();
  const [nameValue, setNameValue] = useState('');
  const [mailValue, setMailValue] = useState('');
  const [passwValue, setPasswValue] = useState('');
  const [passwRepeatValue, setPasswRepeatValue] = useState('');
  const [passwVisible, setPasswVisible] = useState(false);
  const [passwRepeatVisible, setPasswRepeatVisible] = useState(false);

  const [nameErrValue, setNameErrValue] = useState('');
  const [mailErrValue, setMailErrValue] = useState('');
  const [passwErrValue, setPasswErrValue] = useState('');
  const [passwRepeatErrValue, setPasswRepeatErrValue] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, func: React.Dispatch<React.SetStateAction<string>>) => {
    func(e.target.value.trim());
  }

  const comparePasswords = (p1: string, p2: string, count: number = 6) => {
    if (p1.length >= count && p2.length >= count) {
      if (p1 !== p2) {
        setPasswErrValue('Пароли не совпадают');
        setPasswRepeatErrValue('Пароли не совпадают');
        return 'err';
      }
    }
    return undefined;
  }

  useEffect(() => {
    token && navigate('/');
  }, [token]);

  const checksValues = () => {
    let valid = true;

    const requiredText = 'обязательное поле';
    if (!nameValue.length) {
      setNameErrValue(requiredText);
      valid = false;
    } else if (nameValue.length < 2) {
      setNameErrValue('слишком короткое имя');
      valid = false;
    } else setNameErrValue('');
    
    if (!mailValue.length) {
      setMailErrValue(requiredText);
      valid = false;
    } else if (!validateEmail(mailValue)) {
      setMailErrValue('некорректный формат');
      valid = false;
    } else setMailErrValue('');

    if (!passwValue.length) {
      setPasswErrValue(requiredText);
      valid = false;
    } else if (passwValue.length < 6) {
      setPasswErrValue('Недостаточно символов');
      valid = false;
    } else setPasswErrValue('');

    if (!passwRepeatValue.length) {
      setPasswRepeatErrValue(requiredText);
      valid = false;
    } else if (passwRepeatValue.length < 6) {
      setPasswRepeatErrValue('Недостаточно символов');
      valid = false;
    } else setPasswRepeatErrValue('');

    const res = comparePasswords(passwValue, passwRepeatValue);
    if (res === 'err') valid = false;
    return valid;
  }

  
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = checksValues();
    if (res) {
      dispatch(fetchRegister({mail: mailValue, password: passwValue}));
    } 
  }

  const onPasswToggle = (e: React.MouseEvent, func: React.Dispatch<React.SetStateAction<boolean>>) => {
    e.preventDefault();
    func(prev => !prev);
  }
  return ( 
    <div className={styles.wrap}>
      <div className={styles.top}>
        <h1>
          {
            type === 'login' ? 'Вход' : 'Регистрация'
          }
        </h1>
        {/* {
          type === 'login' ? 
          <Link to={'/register'}>Нет аккаунта?</Link> : <Link to={'/login'}>Уже есть аккаунт?</Link>
        } */}
      </div>
      <form className={styles.form} onSubmit={onSubmit}>
        {
          type === 'register' &&
          <>
            <label>
              <span className={styles.name}>Имя</span>
              <div className={styles.inputWrap}>
                <input aria-invalid={nameErrValue.length ? true : undefined} type="text" placeholder='Введите имя' value={nameValue} onChange={(e) => onChange(e, setNameValue)} />
                <span className={styles.inputErr}>{nameErrValue}</span>
              </div>
            </label>
            <label>
              <span className={styles.name}>Электронная почта</span>
              <div className={styles.inputWrap}>
                <input aria-invalid={mailErrValue.length ? true : undefined} type="text" placeholder='Введите почту' value={mailValue} onChange={(e) => onChange(e, setMailValue)} />
                <span className={styles.inputErr}>{mailErrValue}</span>
              </div>
            </label>
          </>
        }
        <label>
          <span className={styles.name}>Пароль</span>
          <div className={styles.inputWrap}>
            <input aria-invalid={passwErrValue.length ? true : undefined} type={passwVisible ? 'text' : 'password'} placeholder='Введите пароль' value={passwValue} onChange={(e) => onChange(e, setPasswValue)} />
            <span className={styles.inputErr}>{passwErrValue}</span>
            <button className={createLongClassName(['animated-btn', styles.inputIcon])} onClick={e => onPasswToggle(e, setPasswVisible)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.7302 5.07319C11.1448 5.02485 11.5684 5 11.9999 5C16.6639 5 20.3998 7.90264 21.9999 12C21.6053 13.0104 21.0809 13.9482 20.4446 14.7877M6.51956 6.51944C4.47949 7.76406 2.90105 9.69259 1.99994 12C3.60008 16.0974 7.33597 19 11.9999 19C14.0375 19 15.8979 18.446 17.4805 17.4804M9.87871 9.87859C9.33576 10.4215 8.99994 11.1715 8.99994 12C8.99994 13.6569 10.3431 15 11.9999 15C12.8284 15 13.5785 14.6642 14.1214 14.1212" stroke="#808185" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 4L20 20" stroke="#808185" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </label>
        <label>
          <span className={styles.name}>Подтвердите пароль</span>
          <div className={styles.inputWrap}>
            <input aria-invalid={passwRepeatErrValue.length ? true : undefined} type={passwRepeatVisible ? 'text' : 'password'} placeholder='Введите пароль' value={passwRepeatValue} onChange={(e) => onChange(e, setPasswRepeatValue)} />
            <span className={styles.inputErr}>{passwRepeatErrValue}</span>
            <button className={createLongClassName(['animated-btn', styles.inputIcon])} onClick={e => onPasswToggle(e, setPasswRepeatVisible)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.7302 5.07319C11.1448 5.02485 11.5684 5 11.9999 5C16.6639 5 20.3998 7.90264 21.9999 12C21.6053 13.0104 21.0809 13.9482 20.4446 14.7877M6.51956 6.51944C4.47949 7.76406 2.90105 9.69259 1.99994 12C3.60008 16.0974 7.33597 19 11.9999 19C14.0375 19 15.8979 18.446 17.4805 17.4804M9.87871 9.87859C9.33576 10.4215 8.99994 11.1715 8.99994 12C8.99994 13.6569 10.3431 15 11.9999 15C12.8284 15 13.5785 14.6642 14.1214 14.1212" stroke="#808185" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 4L20 20" stroke="#808185" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </label>
        <button type='submit' className={createLongClassName(['animated-btn', styles.btn])}>
          <span className={styles.spinner} aria-hidden={status !== 'load' ? true : undefined}></span>
          {type === 'login' ? 'Войти' : 'Зарегистрироваться'}
        </button>
        {
          mainErr && <div className={styles.err}>{mainErr}</div>
        }
      </form>
    </div>
   );
}
 
export default Form;