import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  userEmail : "",
  url: "",
  newNotification : null
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
    },
    setUrl: (state, action) => {
      state.url = action.payload.url
    },
    setNotification: (state, action) => {
      state.newNotification = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { login, logout, setUrl, setNotification } = userSlice.actions

export default userSlice.reducer