import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import Loading from '../../components/Loading';
import PostItem from '../../components/PostItem';
import Search from '../../components/Search';
import './home.scss';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getAllPosts = async () => {
            try {
                setLoading(true);
                const res = await axiosClient.get('/api/post');
                setPosts(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        getAllPosts();
    }, []);
    return (
        <div className="container home">
            <Search posts={posts} setPosts={setPosts} />
            <div className="row">
                {posts.map(post => (
                    <PostItem post={post} key={post._id} />
                ))}
            </div>
            {loading && <Loading />}
        </div>
    );
}

export default Home;
