import React, { useContext, useEffect} from 'react';
import AuthContext from '../../context/authentication/authContext';

const Header = () => {
      //setting the state of the App
  const authContext = useContext(AuthContext)
  const { user, authUser } = authContext;
  
  useEffect(() => {
    authUser();
  });

    return (
        <header className='app-header'>
            {user ? <p className='nombre-usuario'>Hello <span>{user.username}</span></p> : <p className='nombre-usuario'>Hello <span>you!</span></p>}
            <nav className='nav-principal'>
                <a href="#!">Logout</a>
            </nav>
        </header>
    );
};

export default Header;