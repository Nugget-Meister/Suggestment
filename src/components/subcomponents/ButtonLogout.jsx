import React, { useState } from 'react';
import Modal from './Modal';

const ButtonLogout = () => {

    const [modalList, setModalList] = useState([])

    const logout = () => {
        window.localStorage.removeItem('sessionToken')
        window.localStorage.removeItem('valid')

        setModalList([
            ...modalList,
            <Modal
                good
                message='You have been successfully signed out'
                linkTo='/signin'
                linkText='Back to Login'
            />
        ])
    } 
    

    return (
    <>
        {modalList.map(modal => {return modal})}
        <button onClick={() => {logout()}}> 
            Logout
        </button>
    </>
    );
}

export default ButtonLogout;
