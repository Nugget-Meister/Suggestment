import React, { useEffect, useState } from 'react';
import Container from '../subcomponents/Container';
import { useParams } from 'react-router';
import { 
    getTransaction,    
    createTransaction,
    updateTransaction,
    deleteTransaction } from '../subcomponents/apicalls';

    const imgURLs = {
        bill: '',
        payment: '',
        expense: '',
        investment: '',
        sale: ''
    }


const Transaction = (props) => {
    let id = useParams().id

    const sessionToken = window.localStorage.getItem('sessionToken')
    const [transactionData, setTransactionData] = useState({
        transaction_id: '',
        details: '',
        category: '',
        amount: '',
        date: '',
    })

    const [formData, setFormData] = useState({
        details: '',
        category: '',
        amount: '',
        date: '',
    })


    const [modalList, setModalList] = useState([])

    useEffect(()=>{
        console.log(id)
        if(!props.new){
            getTransaction(id, sessionToken)
            .then(res => {
                // console.log(res.data)
                if(res.data.transaction_id){
                    setTransactionData(res.data)
                    setFormData(res.data)
                }
            })
        }
    },[])

    return (
        <div className='place-content-center items-center h-full w-full flex'>
            <div className='w-[920px] min-w-96'>
                <Container className='grid-cols-2'>
                    <div>Bing</div>
                    <div className='p-5 grid'>
                        <div className='p-2 font-bold text-4xl '>
                            {transactionData.date.split('T')[0]}
                        </div>
                        <div className='p-2 '>
                            {transactionData.category}
                        </div>
                        <div className='p-1 px-2 text-2xl font-bold'>
                            ${transactionData.amount}
                        </div>
                        <div className='p-2 text-2xl '>
                            {transactionData.details}
                        </div>
                    </div>

                    <button className='bg-slate-500 transition hover:bg-slate-700'>Edit</button>
                    <button
                        onClick={()=>{deleteTransaction()}}
                        className='bg-red-400 transition hover:bg-red-700'>Delete</button>
                </Container>
            </div>
        </div>
    );
}

export default Transaction;
