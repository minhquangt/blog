import React from 'react';
import { Link } from 'react-router-dom';
import './postItem.scss';

function PostItem({ post }) {
    return (
        <div className="col-4 post-item mb-4">
            <div className="card">
                <Link to={`/posts/${post._id}`}>
                    <img src={post?.photo} className="card-img-top" alt="" />
                </Link>
                <div className="card-body">
                    <Link to={`/posts/${post._id}`}>
                        <h5 className="card-title">{post?.title}</h5>
                    </Link>
                    <p className="card-text">{post?.desc.substring(0, 50)}</p>
                </div>
            </div>
        </div>
    );
}

export default PostItem;
