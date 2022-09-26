import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axiosAttachHeader from '../../api/axiosAttachHeader';
import axiosClient from '../../api/axiosClient';
import Loading from '../../components/Loading';
import { userSelector } from '../../store/reducers/userReducer';
import { toastNotify } from '../../utils/toastNotify';
import './createPost.scss';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState(null);
    const user = useSelector(userSelector);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            title,
            desc,
        };
        if (!file) return alert('File not exist.');

        if (file.size > 1024 * 1024) return alert('Size too large!');

        if (file.type !== 'image/jpeg' && file.type !== 'image/png')
            return alert('File format is incorrect.');

        let formData = new FormData();
        formData.append('file', file);
        try {
            setLoading(true);
            const res = await axiosClient.post('/api/upload', formData);
            newPost.photo = res.data;
        } catch (err) {
            console.log(err);
        }
        try {
            await axiosAttachHeader.post('/api/post', newPost);
            setTitle('');
            setDesc('');
            setFile(null);
            setLoading(false);
            toastNotify('success', 'Create post successfully!!!');
        } catch (err) {
            console.log(err);
            setLoading(false);
            toastNotify('error', 'Create post failed!!!');
        }
    };
    return (
        <>
            <ToastContainer />
            {user ? (
                <div className="createPost">
                    {file && (
                        <img
                            className="postImg"
                            src={URL.createObjectURL(file)}
                            alt=""
                        />
                    )}
                    <form className="postForm" onSubmit={handleSubmit}>
                        <div className="postFormGroup">
                            <label htmlFor="fileInput">
                                <i className="fas fa-plus plusIcon"></i>
                            </label>
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: 'none' }}
                                onChange={e => setFile(e.target.files[0])}
                            />
                            <input
                                type="text"
                                placeholder="Title"
                                className="postInput"
                                autoFocus={true}
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="postFormGroup">
                            <textarea
                                placeholder="Tell your story..."
                                type="text"
                                className="postInput postText"
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
                            ></textarea>
                        </div>
                        <button
                            className="btn btn-success btnSubmit"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                    {loading && <Loading />}
                </div>
            ) : (
                <div className="col-md-12 text-center">
                    <p className="advice">
                        Please login to create your own blog
                    </p>
                    <Link to="/login" className="btn btn-primary">
                        Login
                    </Link>
                </div>
            )}
        </>
    );
}

export default CreatePost;
