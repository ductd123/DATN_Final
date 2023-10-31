import { createSlice } from "@reduxjs/toolkit";
import { GET_CONVERSATION_USER } from "../constants";

const initialState = [];

const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        getConversationUser: (state, action) => {
            return action.payload;
        },
    },
});

export const { getConversationUser } = conversationSlice.actions;
export const conversationReducer = conversationSlice.reducer;
