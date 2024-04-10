import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('userName');
        props.onLogout();
      });
  }

  return (
    <div>
      <div className='title'>{props.userName}</div>
      <p>Press garden to see you plants</p>
      <Button variant='success' onClick={() => navigate('/garden')}>
        Garden
      </Button>
      <Button variant='success' onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
