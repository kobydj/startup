import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Garden } from './garden/garden';
import { Info } from './info/info';
import { About } from './about/about';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';


function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
    <div className= "body text-light">
        <header className="container-fluid">
            <nav className= "navbar fixed-top navbar-dark">
            <a  className="navbar-brand">
              <h1>Gardentimer</h1>
            </a>
            <menu className="navbar-nav" >
              <li className="nav-item">
              <NavLink className='nav-link' to=''>Login</NavLink></li>
              <li className="nav-item">
              <NavLink className='nav-link' to='garden'>Garden</NavLink></li>
              <li className="nav-item">
              <NavLink className='nav-link' to='info'>Plant Info</NavLink></li>
              <li className="nav-item">
              <NavLink className='nav-link' to='about'>About</NavLink></li>
            </menu>
          </nav>
        </header>
        <main className= 'main'>
        <Routes>
          <Route path='/' element={<Login 
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
            exact
          />
          <Route path='/garden' element={<Garden />} />
          <Route path='/info' element={<Info />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        </main>
        <footer className="text-white-50">
          <div className="container-fluid">
            <span className="text-reset">Koby Jensen</span>
            <a className="text-reset" href="https://github.com/kobydj/startup.git">GitHub</a>
          </div>
        </footer>  
    </div>
    </BrowserRouter>

    );
    function NotFound() {
      return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
    }
}

export default App;
