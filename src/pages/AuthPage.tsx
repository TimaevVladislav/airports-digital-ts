import React from 'react'
import {useInput} from "../hooks/input"
import {useAppDispatch} from "../hooks/redux"
import {login, register} from "../store/actions/authActions"


export function AuthPage() {

    const username = useInput("")
    const password = useInput("")
    const dispatch = useAppDispatch()

    const isFormValid = () => username.value && password.value

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()

        if (isFormValid()) {
          dispatch(register({username: username.value, password: password.value}))
        }

        if (!isFormValid()) {
            alert("Invalid form please change fast...")
        }
    }

    const loginHandler = () => {
        if (isFormValid()) {
            dispatch(login({username: username.value, password: password.value}))
        }

        if (!isFormValid()) {
            alert("Invalid form please change fast...")
        }
    }

    return (
        <form
        className="container mx-auto max-w-[500px] pt-8"
        onSubmit={submitHandler}
        >
            <div className="mb-2">
                <label htmlFor="username" className="block">Username</label>
                <input type="text" {...username} id="username" className="border py-1 px-2 w-full" />
            </div>

            <div className="">
                <label htmlFor="password" className="block">Password</label>
                <input type="password" {...password} id="password" className="border py-1 px-2 w-full" />
            </div>

            <button className="mt-3 py-2 px-4 bg-blue-700 border text-white" type="submit">Register</button>
            <button onClick={loginHandler} className="mt-3 ml-2 py-2 px-4 bg-green-700 border text-white" type="submit">Login</button>
        </form>
    )
}