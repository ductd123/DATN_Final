import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     type: "",
//     data: {},
// };

const userDataSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
  },
  reducers: {
    setDataUser: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setDataUser } = userDataSlice.actions;
export const userDataReducer = userDataSlice.reducer;
