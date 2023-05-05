import React, {Suspense, useEffect} from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './store/store';
import { getStorageData } from './store/slices/user';
import { getStorageCollegues } from './store/slices/collegues';
import ScrollToTop from './hooks/scrollToTop';

import 'normalize.css';
import './assets/styles/load-fonts.css';
import './assets/styles/global.scss';
import Home from './pages/Home';
import Spinner from './components/Spinner';
import Detail from './pages/Detail';
import Access from './components/Access';
import Register from './pages/Register';


function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getStorageData());
    dispatch(getStorageCollegues());
  }, []);
  return (
    <div className='App'>
      <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<Spinner additionalClassNames={['onAllViewPort']} />}>
        <Routes>
          <Route path='/' element={<Navigate to='/team' /> }/>
            <Route path='/team/:id' element={<Access><Detail /></Access> } />
            <Route path='/team' element={<Access><Home /></Access> } />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
