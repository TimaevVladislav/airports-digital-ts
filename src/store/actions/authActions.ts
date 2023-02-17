import {AppDispatch} from "../index"
import axios from "../../axios"
import {authSlice} from "../slices/authSlice";

interface AuthResponse {
    access: string
    refresh: string
}

interface AuthData {
    username: string
    password: string
}

export const register = (data: AuthData) => {
    return async (dispatch: AppDispatch) => {
        try {
            // Отправка данных на сервер
            const response = await axios.post<AuthResponse>(`auth/register`, data)
            // Передать state в slice
            dispatch(authSlice.actions.login({
                username: data.username,
                access: response.data.access
            }))
        } catch (e) {
            console.log(e)
        }
    }
}

export const login = (data: AuthData) => {
    return async (dispatch: AppDispatch) => {
        try {
            // Отправка данных на сервер
            const response = await axios.post<AuthResponse>(`auth/login`, data)
            // Передать state в slice
            dispatch(authSlice.actions.login({
                username: data.username,
                access: response.data.access
            }))
        } catch (e) {
            console.log(e)
        }
    }
}