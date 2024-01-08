import { combineReducers, configureStore, createStore } from '@reduxjs/toolkit';
import { userDataReducer } from './slice/userDataSlice';
import { listUserReducer } from './slice/listUserSlice';
import { conversationReducer } from './slice/conversationSlice';
import { userReducer } from './actions';

export const store = configureStore({
    reducer: {
        userData: userDataReducer,
        listUser: listUserReducer,
        conversation: conversationReducer
    }
})

