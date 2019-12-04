import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import './../css/Menu.css';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

const menus = [
  { name: 'Home', to: '/' },
  { name: 'Categories', to: '/admin/categories' },
  { name: 'Products', to: '/admin/products' },
];

const MenuLink = ({ label, to, event }) => {
  return (
    <Route
      path={to}
      exact
      children={({ match }) => {
        let active = match ? 'nav-item active' : 'nav-item';
        return (
          <li className={active}>
            <Link to={to} className="nav-link" onClick={event}>
              {label}
            </Link>
          </li>
        );
      }}
    />
  );
};

const showMenu = menus => {
  let result = null;
  if (menus.length > 0) {
    result = menus.map((menu, i) => {
      return <MenuLink key={i} label={menu.name} to={menu.to} />;
    });
  }
  return result;
};

const rightMenu = props => {
  const { currentUser } = props;
  if (currentUser != null) {
    return (
      <>
        <li className="nav-item"></li>
        <li className="nav-item dropleft">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              src={currentUser.image.url}
              className="rounded-circle z-depth-0 avatar"
              alt="avatar image"
            />
          </a>

          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <Link to="/profile" className="dropdown-item">
              Profile
            </Link>
            <a className="dropdown-item" href="#">
              Settings
            </a>
            <Link
              to="/login"
              onClick={() => props.logout()}
              className="dropdown-item"
            >
              <i className="fa fa-sign-out" aria-hidden="true"></i>
              Logout
            </Link>
          </div>
        </li>
        <li className="mgt-15 Menu-username">{currentUser.username}</li>
      </>
    );
  } else {
    return (
      <li>
        <Link to="/login">
          <i className="fa fa-sign-out" aria-hidden="true"></i>
          Login
        </Link>
      </li>
    );
  }
};

const Menu = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">{showMenu(menus)}</ul>
        <ul className="navbar-nav ml-auto">{rightMenu(props)}</ul>
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(actions.logOut());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
