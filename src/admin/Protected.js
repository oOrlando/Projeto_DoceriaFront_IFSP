

import React ,{ useEffect} from 'react'


function Protected(props)

{

    let Cmp=props.Cmp   
  

    useEffect(()=>{
        
              
    }, [])


    return( 
        <div>
            <Cmp />
        </div>
        
    )
}

export default Protected