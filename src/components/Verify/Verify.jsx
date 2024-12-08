import React, { useEffect, useState } from 'react';
import Container from '../subcomponents/Container';
import Modal from '../subcomponents/Modal';
import { useParams } from 'react-router';
import { getUserVerification } from '../subcomponents/apicalls';
const Verify = () => {
    document.title = "Verify User" 
    let token = useParams().id
    // console.log(token)

    const [page, setPage] = useState({
        hasFailed: null
    })


    useEffect(()=> {
        getUserVerification(token)
        .then(res =>{
            console.log(res.message)
            if(res != undefined){
                if(res.message == "OK"){
                    setPage({
                        ...page,
                        hasFailed: false
                    })
                } else {
                    setPage({
                        ...page,
                        hasFailed: true 
                    })
                }
            }
        })
    },[])
 

    return (
        <div>
            {page.hasFailed === true ? (
                <>
                <Modal 
                action='navigate'
                linkTo='/signin' 
                bad
                linkText='Back to Login'
                message="An error has occured, your link may be invalid or has expired."
                    />
            </>) :null}
            {page.hasFailed === false ? <>
                <Modal 
                linkTo='/signin' 
                linkText='Back to Login'
                good
                title='Successfully Verified User'
                message={(<span>User has been sucessfully registered. <br/> You can now login.</span>)}
                />
            </>: null}
            {page.hasFailed !== true && page.hasFailed !== false ? (<></>): null}

            


            
        </div>
    );
}

export default Verify;
