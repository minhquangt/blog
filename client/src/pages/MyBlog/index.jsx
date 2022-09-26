import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosAttachHeader from '../../api/axiosAttachHeader';
import Loading from '../../components/Loading';
import PostItem from '../../components/PostItem';
import Search from '../../components/Search';
import { userSelector } from '../../store/reducers/userReducer';
import './myBlog.scss';

function MyBlog() {
    const [myPosts, setMyPosts] = useState([]);
    const user = useSelector(userSelector);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getMyPosts = async () => {
            try {
                setLoading(true);
                const res = await axiosAttachHeader.get(
                    `/api/post/me/${user._id}`
                );
                setMyPosts(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        if (user) getMyPosts();
    }, []);
    return (
        <>
            {user ? (
                <div className="container myblog">
                    <Search setPosts={setMyPosts} username={user.username} />
                    <div className="row">
                        {myPosts.map(post => (
                            <PostItem post={post} key={post._id} />
                        ))}
                    </div>
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

export default MyBlog;
