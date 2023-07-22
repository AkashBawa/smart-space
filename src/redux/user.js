import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  userEmail : ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    login: (state, action ) => {
        state.isLoggedIn = true;
        state.userEmail = action.payload.userEmail;
    },
    logout: (state, action) => { 
        state.isLoggedIn = false;
        state.userEmail = ""
    }
  }
})

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer