import { useEffect, useState } from "react"
import { Outlet } from "react-router"
import localStorage from "./localStorage";
const ProtectedRouted = ( children) => {
    const [isLoggedIn, setLogIn] = useState();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if(userId) {
            setLogIn(true)
        }
    }, [])

    return (
        <div>

        </div>
    )
}

export default ProtectedRouted