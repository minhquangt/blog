import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/reducers/userReducer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './postDetail.scss';
import axios from 'axios';
import Loading from '../../components/Loading';

function PostDetail() {
    const [post, setPost] = useState({});
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
                const res = await axios.get(`/api/post/${params.id}`);
                setPost(res.data);
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
            const updatePost = await axios.put(`/api/post/${id}`, {
                title,
                desc,
            });

            setTitle(updatePost.data.title);
            setDesc(updatePost.data.desc);
            setDate(updatePost.data.updatedAt);
            setLoading(false);
            setUpdateMode(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    const handleDelete = async id => {
        setLoading(true);
        try {
            await axios.delete(`/api/post/${id}`);
            setLoading(false);
            navigate('/my-blog');
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    return (
        <div className="singlePost">
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
                        {post.username === user?.username && (
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
                        <b> {post.username}</b>
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
