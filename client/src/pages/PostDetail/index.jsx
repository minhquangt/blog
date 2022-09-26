import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axiosAttachHeader from '../../api/axiosAttachHeader';
import Loading from '../../components/Loading';
import { userSelector } from '../../store/reducers/userReducer';
import { toastNotify } from '../../utils/toastNotify';
import './postDetail.scss';
import { ToastContainer } from 'react-toastify';

function PostDetail() {
    const [post, setPost] = useState({});
    const [username, setUsername] = useState('');
    const user = useSelector(userSelector);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState('');
    const [updateMode, setUpdateMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getOnePost = async () => {
            try {
                const res = await axiosAttachHeader.get(
                    `/api/post/${params.id}`
                );
                setPost(res.data);

                const resUser = await axiosAttachHeader.get(
                    `/api/user/${res.data.userId}`
                );
                setUsername(resUser.data.username);

                setTitle(res.data.title);
                setDesc(res.data.desc);
                setDate(res.data.updatedAt);
            } catch (error) {
                console.log(error);
            }
        };
        getOnePost();
    }, []);
    const handleUpdate = async id => {
        setLoading(true);
        try {
            const updatePost = await axiosAttachHeader.put(`/api/post/${id}`, {
                title,
                desc,
            });

            setTitle(updatePost.data.title);
            setDesc(updatePost.data.desc);
            setDate(updatePost.data.updatedAt);
            setLoading(false);
            setUpdateMode(false);
            toastNotify('success', 'Update post successfully!!!');
        } catch (err) {
            console.log(err);
            setLoading(false);
            toastNotify('error', 'Update post failed!!!');
        }
    };
    const handleDelete = async id => {
        setLoading(true);
        try {
            await axiosAttachHeader.delete(`/api/post/${id}`);
            setLoading(false);
            navigate('/my-blog');
            toastNotify('success', 'Delete post successfully!!!');
        } catch (err) {
            console.log(err);
            setLoading(false);
            toastNotify('error', 'Delete post failed!!!');
        }
    };
    return (
        <div className="singlePost">
            <ToastContainer />
            <div className="singlePostWrapper">
                {post.photo && (
                    <img src={post.photo} alt="" className="singlePostImg" />
                )}
                {updateMode ? (
                    <input
                        type="text"
                        value={title}
                        className="singlePostTitleInput"
                        autoFocus
                        onChange={e => setTitle(e.target.value)}
                    />
                ) : (
                    <h1 className="singlePostTitle">
                        {title}
                        {post.userId === user?._id && (
                            <div className="singlePostEdit">
                                <i
                                    className="singlePostIcon far fa-edit"
                                    onClick={() => setUpdateMode(true)}
                                ></i>
                                <i
                                    className="singlePostIcon far fa-trash-alt"
                                    onClick={() => handleDelete(post._id)}
                                ></i>
                            </div>
                        )}
                    </h1>
                )}
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author:
                        <b> {username}</b>
                    </span>
                    <span className="singlePostDate">
                        {new Date(date).toDateString()}
                    </span>
                </div>
                {updateMode ? (
                    <textarea
                        className="singlePostDescInput"
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                    />
                ) : (
                    <p className="singlePostDesc">{desc}</p>
                )}
                {updateMode && (
                    <button
                        className="singlePostButton"
                        onClick={() => handleUpdate(post._id)}
                    >
                        Update
                    </button>
                )}
            </div>
            {loading && <Loading />}
        </div>
    );
}

export default PostDetail;
