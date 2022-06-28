import Header from './Header'

import React ,{useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Protected(props)

{
    let user=JSON.parse(localStorage.getItem("user-info"))
    let Cmp=props.Cmp   
    const navegate=useNavigate();
    useEffect(()=>{
        
              
    }, [])


    return( 
        <div>
            <Cmp />
        </div>
        
    )
}

export default Protected