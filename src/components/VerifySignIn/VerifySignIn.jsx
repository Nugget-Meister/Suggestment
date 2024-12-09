import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getSignInVerification, verifyToken } from '../subcomponents/apicalls';
import Modal from '../subcomponents/Modal';

const VerifySignIn = () => {

    let token = useParams().token
    let navigate = useNavigate()

    let [modalList, setModalList] = useState([])

    useEffect(() => {   
        getSignInVerification(token)
        .then((res)=> {
            if(res.message == "OK"){
                window.localStorage.setItem('sessionToken', res.data)
                verifyToken(res.data)
                .then(res => {
                    if(res.message == "OK" && res != false){
                        window.localStorage.setItem('valid', true)
                        setTimeout(()=>{
                            navigate('/')
                        },200)
                    } else {
                        window.localStorage.setItem('valid', false)
                        setModalList([
                            ...modalList,
                            <Modal
                                bad
                                message='Failed to login/verify user. If this issue persists, contact server admin'
                                linkTo='/signin'
                                linkText='Back to Login'
                            />
                        ])
                    }
                })
            } else {
                setModalList([
                    ...modalList,
                    <Modal
                        bad
                        message='Failed to login/verify user. If this issue persists, contact server admin'
                        linkTo='/signin'
                        linkText='Back to Login'
                    />
                ])
            }
        })
    }, [])

    return (
        <div>
            
        </div>
    );
}

export default VerifySignIn;
