import React from 'react'
import {Link} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../hooks/redux"
import {authSlice} from "../store/slices/authSlice";

export function Navigation() {
    const dispatch = useAppDispatch()
    const {isAuth, username} = useAppSelector(state => state.auth)

    const logoutHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
        dispatch(authSlice.actions.logout())
    }

    return (
        <nav className="flex justify-between px-5 h-[50px] bg-gray-200 items-center shadow-md">
          <Link to="/">Airport</Link>

          {!isAuth && <Link to="/auth">Auth</Link>}

          {isAuth &&
          <>
          <span className="font-bold">{username}</span>
          <a href="#" onClick={logoutHandler}>Logout</a>
          </>
          }
        </nav>
    )
}