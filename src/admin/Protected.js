import Header from './Header'

import React ,{useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Protected(props)
{
    let Cmp=props.Cmp   
    const navegate=useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('user-info'))
        {
            navegate("/login")
        }

    }, [])
    return( 
        <div>
            <Cmp />
        </div>
        
    )
}

export default Protected