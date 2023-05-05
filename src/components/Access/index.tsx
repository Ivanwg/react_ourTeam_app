import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface IProps {
  children: React.ReactNode;
}


const Access = ({children}: IProps) => {
  const token = useSelector((state: RootState) => state.user.userData.token);
  const mounted = useSelector((state: RootState) => state.user.userData.mounted);

  return ( 
    <>
      {
        !token && mounted? <Navigate to='/register' /> : children
      }
    </>
  );
}
 
export default Access;