import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Redirect = ({to}) => {
    let navigate = useNavigate()

    useEffect(()=>{
        if(to != undefined){
            navigate(to)
        } else {
            navigate('/')
        }
    }, [])
    return (
        <div>
            
        </div>
    );
}

export default Redirect;
