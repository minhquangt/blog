import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Loading from '../../components/Loading';
import { registerUser } from '../../store/reducers/userReducer';
import './register.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

function Register() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formikRegister = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Required')
                .min(4, 'Must be 4 characters or more'),
            email: Yup.string()
                .required('Required')
                .matches(
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    'Please enter a valid email address'
                ),
            password: Yup.string()
                .required('Required')
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{4,15}$/,
                    'Password must be 4-15 characters and contain at least one letter, one number and a special character'
                ),
        }),
        onSubmit: async values => {
            setLoading(true);
            const resultAction = await dispatch(registerUser(values));
            const user = unwrapResult(resultAction);
            setLoading(false);
            if (user) {
                navigate('/login');
            }
        },
    });
    return (
        <div className="register">
            <h1 className="text-center title">Register</h1>
            <form onSubmit={formikRegister.handleSubmit}>
                <div>
                    <label className="form-label">Username</label>
                    <input
                        className="form-control"
                        type="text"
                        name="username"
                        value={formikRegister.values.username}
                        onChange={formikRegister.handleChange}
                    />
                    {formikRegister.errors.username &&
                        formikRegister.touched.username && (
                            <p className="text-danger">
                                {formikRegister.errors.username}
                            </p>
                        )}
                </div>
                <div>
                    <label className="form-label">Email</label>
                    <input
                        className="form-control"
                        type="text"
                        name="email"
                        value={formikRegister.values.email}
                        onChange={formikRegister.handleChange}
                    />
                    {formikRegister.errors.email &&
                        formikRegister.touched.email && (
                            <p className="text-danger">
                                {formikRegister.errors.email}
                            </p>
                        )}
                </div>
                <div>
                    <label className="form-label">Password</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        value={formikRegister.values.password}
                        onChange={formikRegister.handleChange}
                    />
                    {formikRegister.errors.password &&
                        formikRegister.touched.password && (
                            <p className="text-danger">
                                {formikRegister.errors.password}
                            </p>
                        )}
                </div>
                <div className="d-grid gap-2 mt-4">
                    <input
                        className="btn btn-danger"
                        type="submit"
                        value="REGISTER"
                    />
                </div>
            </form>
            {loading && <Loading />}
        </div>
    );
}

export default Register;
