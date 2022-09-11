import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { logOutUser, userSelector } from '../../store/reducers/userReducer';
import './navbar.scss';
import { useDispatch, useSelector } from 'react-redux';
import userIcon from '../../assets/userIcon.png';

function Navbar() {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(logOutUser());
        navigate('/');
    };
    return (
        <div className="navbar fixed-top">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <div className="nav-middle">
                <ul>
                    <li className="nav-item">
                        <NavLink to="/">HOME</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/my-blog">MY BLOGS</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/create-post">CREATE POST</NavLink>
                    </li>
                    {!user ? (
                        <>
                            <li className="nav-item">
                                <NavLink to="/login">LOGIN</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/register">REGISTER</NavLink>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item" onClick={logout}>
                            <span>LOGOUT</span>
                        </li>
                    )}
                </ul>
            </div>
            <div className="nav-right">
                {user && (
                    <>
                        <NavLink to="profile" className="info">
                            <li>
                                <img
                                    src={
                                        user.profilePic
                                            ? user.profilePic
                                            : userIcon
                                    }
                                    alt=""
                                    className="profilePic"
                                />
                                <span className="name">
                                    {user.username.toLowerCase()}
                                </span>
                            </li>
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
