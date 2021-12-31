import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../store/auth-context';

import classes from './Navbar.module.css';

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <NavLink to='/store'>Store</NavLink>
        </li>
        <li>
          <NavLink to='/orders'>Orders</NavLink>
        </li>
        <li>
          <NavLink to='/home'>Home</NavLink>
        </li>
        <li onClick={authCtx.logout}>logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;
