import { createSlice } from "@reduxjs/toolkit";
import { SUCCESS, ERROR } from "../constants";

const initialState = {
    type: "",
    data: {},
};

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setDataSuccess: (state, action) => {
            state.type = SUCCESS;
            state.data = action.payload;
        },
        setDataError: (state, action) => {
            state.type = ERROR;
            state.data = action.payload;
        },
    },
});

export const { setDataSuccess, setDataError } = userDataSlice.actions;
export const userDataReducer = userDataSlice.reducer;
