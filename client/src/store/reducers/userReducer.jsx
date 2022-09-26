import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async user => {
        try {
            const res = await axiosClient.post('/api/user/register', user);
            console.log(res);
            return res.data;
        } catch (error) {
            alert(error.response.data.msg);
        }
    }
);

export const loginUser = createAsyncThunk('user/loginUser', async user => {
    try {
        const res = await axiosClient.post('/api/user/login', user);
        localStorage.setItem('accessToken', res.data.accessToken);
        return res.data;
    } catch (error) {
        alert(error.response.data.msg);
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState: { user: null },
    reducers: {
        logOutUser: (state, action) => {
            state.user = null;
            localStorage.removeItem('accessToken');
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
    },
    extraReducers: {
        //registerUser
        [registerUser.pending]: (state, action) => {
            console.log('Registering user from BE...');
        },
        [registerUser.fulfilled]: (state, action) => {
            console.log('Done');
        },
        [registerUser.rejected]: (state, action) => {
            console.log('Rejected');
        },
        //loginUser
        [loginUser.pending]: (state, action) => {
            console.log('Logining user from BE...');
        },
        [loginUser.fulfilled]: (state, action) => {
            console.log('Done');
            state.user = action.payload;
        },
        [loginUser.rejected]: (state, action) => {
            console.log('Rejected');
        },
    },
});

//reducers
const userReducer = userSlice.reducer;
export default userReducer;

//selector
export const userSelector = state => state.userReducer.user;

//action
export const { logOutUser, updateUser } = userSlice.actions;
