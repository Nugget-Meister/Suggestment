import React, { useEffect, useState, useRef } from 'react';
import { validatePassword } from '../functions';

const PasswordBox = ({val}) => {
    // let val = useRef({
    //     mismatch: true,
    //     sub12: true,
    //     capital: true,
    //     lowercase: true,
    //     number: true,
    //     symbol: true
    // })

    // console.log(val)
    // val.current = validatePassword(form.password,form.repeat)

    console.log(val)


    return (
        <div className='rounded text-slate-600 bg-tertiary p-2 px-4'>
            {/* {console.log(val)} */}
            <li 
                className={`${val.mismatch ? 'text-orange-700': 'text-green-600'}`}
                >Passwords must match</li>
            <li
                className={`${val.sub12 ? 'text-orange-700': 'text-green-600'}`}
            >Password must be at least 12 characters.</li>
            <li
                className={`${val.capital ? 'text-orange-700': 'text-green-600'}`}
            >Password must contain a capital letter</li>
            <li
                className={`${val.lowercase ? 'text-orange-700': 'text-green-600'}`}
            >Password must contain a lowercase letter</li>
            <li
                className={`${val.number ? 'text-orange-700': 'text-green-600'}`}
            >Password must contain a number</li>
            <li
                className={`${val.symbol ? 'text-orange-700': 'text-green-600'}`}
            >Password must contain a symbol</li>
            
        </div>
    );
}

export default PasswordBox;
