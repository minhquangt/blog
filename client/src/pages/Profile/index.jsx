import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../../api/axiosClient';
import { updateUser, userSelector } from '../../store/reducers/userReducer';
import './profile.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loading from '../../components/Loading';
import axiosAttachHeader from '../../api/axiosAttachHeader';
import { toastNotify } from '../../utils/toastNotify';
import { ToastContainer } from 'react-toastify';

function Profile() {
    const userSel = useSelector(userSelector);
    const [user, setUser] = useState({});
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const getMyProfile = async () => {
            try {
                setLoading(true);
                const res = await axiosAttachHeader.get(
                    `/api/user/${userSel._id}`
                );
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        if (user) getMyProfile();
    }, []);

    const formikUpdateUser = useFormik({
        initialValues: {
            username: user.username,
            email: user.email,
            password: user.password,
        },
        validationSchema: Yup.object({
            username: Yup.string().min(4, 'Must be 4 characters or more'),
            email: Yup.string().matches(
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                'Please enter a valid email address'
            ),
            password: Yup.string().matches(
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{4,15}$/,
                'Password must be 4-15 characters and contain at least one letter, one number and a special character'
            ),
        }),
        onSubmit: async values => {
            setLoading(true);
            let infoUser = values;
            if (file) {
                if (file.size > 1024 * 1024) return alert('Size too large!');

                if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                    return alert('File format is incorrect.');

                let formData = new FormData();
                formData.append('file', file);
                try {
                    const res = await axiosClient.post('/api/upload', formData);
                    infoUser.profilePic = res.data;
                } catch (err) {
                    console.log(err);
                }
            }
            try {
                const updatedUser = await axiosAttachHeader.put(
                    `/api/user/${userSel._id}`,
                    infoUser
                );
                if (updatedUser) {
                    dispatch(updateUser(updatedUser.data));
                    setLoading(false);
                }
                toastNotify('success', 'Update profile successfully!!!');
            } catch (err) {
                console.log(err);
                setLoading(false);
                toastNotify('error', 'Update profile failed!!!');
            }
        },
    });

    return (
        <div className="container profile pt-4">
            <ToastContainer />
            <h3 className="text-center title">MY INFO</h3>
            <form onSubmit={formikUpdateUser.handleSubmit}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="fileInput">
                        Avatar:
                        <img
                            className="profilePic"
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : user.profilePic
                            }
                            alt="avatar"
                        />
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        className="form-control"
                        style={{ display: 'none' }}
                        onChange={e => setFile(e.target.files[0])}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={user.username}
                        name="username"
                        value={formikUpdateUser.values.username}
                        onChange={formikUpdateUser.handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={user.email}
                        name="email"
                        value={formikUpdateUser.values.email}
                        onChange={formikUpdateUser.handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="********"
                        name="password"
                        value={formikUpdateUser.values.password}
                        onChange={formikUpdateUser.handleChange}
                    />
                </div>
                <div className="d-grid gap-2">
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Update"
                    />
                </div>
            </form>
            {loading && <Loading />}
        </div>
    );
}

export default Profile;
