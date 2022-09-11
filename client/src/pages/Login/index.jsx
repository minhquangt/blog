import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Loading from '../../components/Loading';
import { loginUser } from '../../store/reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import './login.scss';
import { unwrapResult } from '@reduxjs/toolkit';

function Login() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async values => {
            setLoading(true);
            const resultAction = await dispatch(loginUser(values));
            const user = unwrapResult(resultAction);
            setLoading(false);
            if (user) {
                navigate('/');
            }
        },
    });
    return (
        <div className="login">
            <h1 className="text-center title">Login</h1>
            <form onSubmit={formikLogin.handleSubmit}>
                <div>
                    <label className="form-label">Email</label>
                    <input
                        className="form-control"
                        type="text"
                        name="email"
                        value={formikLogin.values.email}
                        onChange={formikLogin.handleChange}
                    />
                </div>
                <div>
                    <label className="form-label">Password</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        value={formikLogin.values.password}
                        onChange={formikLogin.handleChange}
                    />
                </div>
                <div className="d-grid gap-2 mt-4">
                    <input
                        className="btn btn-danger"
                        type="submit"
                        value="LOGIN"
                    />
                </div>
            </form>
            {loading && <Loading />}
        </div>
    );
}

export default Login;
