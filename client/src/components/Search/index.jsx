import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './search.scss';
import queryString from 'query-string';
import axios from 'axios';
import Loading from '../Loading';

function Search({ setPosts, username }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSearch = async e => {
        setFilterText(e.target.value);
        const queryParams = { search: e.target.value };

        navigate({
            pathname: location.pathname,
            search: queryString.stringify(queryParams),
        });
        let res;
        setLoading(true);
        if (!username) {
            res = await axios.post(`/api/post/search`, {
                title: e.target.value,
            });
        } else {
            res = await axios.post(`/api/post/search`, {
                title: e.target.value,
                username: username,
            });
        }
        setPosts(res.data);
        setLoading(false);
    };
    return (
        <div className="search">
            <div className="content-search">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Enter a search term..."
                    value={filterText}
                    onChange={handleSearch}
                />
                <i className="fa-solid fa-magnifying-glass search-icon"></i>
            </div>
            {loading && <Loading />}
        </div>
    );
}

export default Search;
