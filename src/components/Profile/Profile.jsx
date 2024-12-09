import React, { useEffect, useState } from 'react';
import { resetPasswordRequest, verifyToken } from '../subcomponents/apicalls';
import Container from '../subcomponents/Container';
import ButtonLogout from '../subcomponents/ButtonLogout';
import Modal from '../subcomponents/Modal';

const Profile = () => {
    const [userData , setUserData]= useState({})
    const [modalList, setModalList] = useState([])
    const [classState, setClassState] = useState({
        visible: true,
        general: 'opacity-50',
        scale: 'scale-75'
    })
    

    const sessionToken = window.localStorage.getItem('sessionToken')
    useEffect(()=> {
        verifyToken(sessionToken)
        .then(res => {
            if(res.message == 'OK'){
                setUserData(res.data)
            } else {
                navigate('/signin')
            }
            })
    }, [])


    const addModal = () => {
        resetPasswordRequest(sessionToken)
        .then(res => {
            if(res.message == "OK" && res) {
                setModalList([
                    ...modalList,
                    <Modal
                        good
                        closeAnywhere
                        message={(<>Password Reset Link Sent <br /><span className='font-bold p-4'>Click Anywhere to Dismiss</span></>)}
        
                    />
                ])
            } else {
                setModalList([
                    ...modalList,
                    <Modal
                        bad
                        closeAnywhere
                        message={(<>Unable to send password reset request. If this issue persists, contact site owner. <br /><span className='font-bold p-4'>Click Anywhere to Dismiss</span></>)}
        
                    />
                ])
            }
        })

        
    } 

    useEffect(()=> {
        setTimeout(() => {
            setClassState({
                ...classState,
                opacity:'opacity-100',
                scale:'scale-105'
            })
        }, 100)

        setTimeout(() => {
            setClassState({
                ...classState,
                opacity:'opacity-100',
                scale:'scale-100'
            })
        }, 300)
    
},[])

    // console.log(userData)
    return (
        <>
            {modalList.length > 0 ? modalList.map(modal => modal): null}
            <div className={`h-full p-12 transition ${classState.opacity} ${classState.scale}`}>
                <Container className='grid-cols-1 h-4/5'>
                    <div className='grid place-content-center text-center w-auto'>
                        <h1>{userData.name}</h1>
                        <h1 className='text-base'>{userData.email}</h1>

                        <button 
                            onClick={addModal}
                            className='bg-red-300 m-4 transition hover:bg-red-700'>
                            Reset Password
                        </button>

                        <div>
                            <ButtonLogout />
                        </div>
                    </div>

                </Container>
            </div>
        </>
    );
}

export default Profile;
