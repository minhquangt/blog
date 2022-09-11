import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreatePost from './CreatePost';
import Home from './Home';
import Login from './Login';
import MyBlog from './MyBlog';
import NotFound from './NotFound';
import PostDetail from './PostDetail';
import Profile from './Profile';
import Register from './Register';

function Pages() {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/my-blog" element={<MyBlog />}></Route>
            <Route path="/posts/:id" element={<PostDetail />}></Route>
            <Route path="/create-post" element={<CreatePost />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="*" element={<NotFound />}></Route>
        </Routes>
    );
}

export default Pages;
