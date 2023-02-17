
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface AuthState {
  access: string
  username: string
  isAuth: boolean
}

const ACCESS_KEY = "u-access"
const USERNAME_KEY = "u-username"

// Начальное состояние Redux Toolkit slice
const initialState: AuthState = {
   access: localStorage.getItem(ACCESS_KEY) ?? "",
   username: localStorage.getItem(USERNAME_KEY) ?? "",
   isAuth: false
}

interface AuthPayload {
  username: string
  access: string
}




export const authSlice = createSlice({
    name: "auth",
    initialState,
    //  Управление состоянием через функции редюсеры
    reducers: {
        login(state, action: PayloadAction<AuthPayload>) {
           state.access = action.payload.access
           state.username = action.payload.username
           state.isAuth = Boolean(action.payload.access)

           localStorage.setItem(ACCESS_KEY, action.payload.access)
           localStorage.setItem(USERNAME_KEY, action.payload.username)
        },
        logout(state) {
            state.access = ""
            state.username = ""
            state.isAuth = false

            localStorage.removeItem(ACCESS_KEY)
            localStorage.removeItem(USERNAME_KEY)
        }
    }
})

export default authSlice.reducer