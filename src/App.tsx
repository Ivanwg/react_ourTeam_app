import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ScrollToTop from './utils/scrollToTop';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path='/' element={ <Navigate to="/team" /> }/>
            <Route path='/team' element={ <div></div>
              // <Layout>
              //   <Header />
              //   <Content>
              //     <CardsList />
              //   </Content>
              // </Layout>
            }>
              {/* <Route path='/team/:id' element={<Post />} /> */}
            </Route>
            <Route path='*' element={<Navigate to="/error" />} />
            {/* <Route path='/error' element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

      </header>
    </div>
  );
}

export default App;
