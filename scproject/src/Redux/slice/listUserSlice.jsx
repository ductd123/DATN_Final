import { createSlice } from "@reduxjs/toolkit";
// import { SUCCESS_All_USER } from "../constants";

const initialState = [];

const listUserSlice = createSlice({
    name: "listUser",
    initialState,
    reducers: {
        successAllUser: (state, action) => {
            return action.payload;
        },
    },
});

export const { successAllUser } = listUserSlice.actions;
export const listUserReducer = listUserSlice.reducer;
