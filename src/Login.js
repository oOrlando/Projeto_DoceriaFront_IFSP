import Header from './Header'

import React ,{useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Login()
{
    useEffect(()=>{
        if(localStorage.getItem('user-info'))
        {
            navegate("/add")
        }

    },[])
    const navegate=useNavigate();
    return( 

        <>
        <Header />
        <div>
            <h1>Login Page</h1>
        </div>
        </>
    )
}

export default Login