import React from 'react';
import './loading.scss';

function Loading() {
    return (
        <div className="loading">
            <div className="spinner-border text-primary" role="status"></div>
        </div>
    );
}

export default Loading;
