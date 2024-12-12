import React, { useEffect, useState } from 'react';
import Container from '../subcomponents/Container';
import { useParams } from 'react-router';
import { 
    getTransaction,    
    createTransaction,
    updateTransaction,
    deleteTransaction } from '../subcomponents/apicalls';

    const imgURLs = {
        BILL: 'https://images.unsplash.com/photo-1724482606633-fa74fe4f5de1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        PAYMENT: 'https://images.unsplash.com/photo-1676151863834-b9b162faa8ab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        EXPENSE: 'https://images.unsplash.com/photo-1556740772-1a741367b93e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        PURCHASE: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        SALE: 'https://images.unsplash.com/photo-1669951584309-492ed24d274f?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }


const Transaction = (props) => {
    let id = useParams().id

    const sessionToken = window.localStorage.getItem('sessionToken')

    const [pageState, setPageState] = useState ({
        editMode: false
    })
    
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
        // console.log(id)
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

    const handleChange = (e) => {
        
    }
    const handleSubmit = (e) => {

    }

    return (
        <>
        {modalList.showModal ? modalList.map(modal => modal) : null}
        <div className='place-content-center items-center h-full w-full flex'>
            <div className='w-[920px] min-w-96'>
                <Container className='grid-cols-2 text-right'>
                    <div>
                        <img src={imgURLs[transactionData.category]} alt="" />
                    </div>
                    {pageState.editMode ? 
                        <div className='p-5 grid'>
                            <div className='p-2 font-bold text-4xl '>
                                {transactionData.date.split('T')[0]}
                            </div>
                            <div className='p-2'>
                                {transactionData.category}
                            </div>
                            <div className='p-1 px-2 text-2xl font-bold'>
                                ${transactionData.amount}
                            </div>
                            <div className='p-2 text-2xl '>
                                {transactionData.details}
                            </div>
                        </div>
                    : <>
                    <form 
                        className='grid grid-cols-none text-left'
                        onSubmit={handleSubmit}>
                        <div className='my-1'>
                            <div className='py-2 mx-2 text-lg'>
                                Date
                            </div>
                            <input 
                                required
                                value={formData.date.split('T')[0]}
                                id='date'
                                className='rounded w-full p-2 transition focus:scale-105 bg-slate-800'
                                onChange={handleChange}
                                type="date" />
                        </div>
                        <div className='my-1'>
                            <div className='py-2 mx-2 text-lg'>
                                Details
                            </div>
                            <input 
                                required
                                value={formData.details}
                                id='details'
                                onChange={handleChange}
                                className='rounded w-full p-2 transition focus:scale-105 bg-slate-800'
                                type="text" />
                        </div>
                        <div className='my-1'>
                            <div className='py-2 mx-2 text-lg'>
                                Category
                            </div>
                            <select 
                                name="category" 
                                id="category"
                                onChange={handleChange}
                                value={formData.category}
                            >
                                <option value="BILL">Bill</option>
                                expense
                                payment
                                purchase
                                sale
                            </select>
                            {/* <input 
                                required
                                value={formData.category}
                                id='category'
                                onChange={handleChange}
                                className='rounded w-full p-2 transition focus:scale-105 bg-slate-800'
                                type="text" /> */}
                        </div>
                        <div className='my-1'>
                            <div className='py-2 mx-2 text-lg'>
                                Amount
                            </div>
                            <input 
                                required
                                value={formData.amount}
                                id='amount'
                                onChange={handleChange}
                                className='rounded w-full p-2 transition focus:scale-105 bg-slate-800'
                                type="number" />
                        </div>


                            <div
                                className='pt-2 pr-2 flex place-content-center items-center'>
                                <button 
                                    className='my-2 bg-slate-600 hover:bg-slate-700 hover:scale-105 transition '
                                    type='submit'
                                >Sign In</button>
                            </div>
                    </form>
                    </>}
                    <button
                        onClick={()=>{deleteTransaction()}}
                        className='bg-red-400 transition hover:bg-red-700'>Delete</button>
                    <button 
                        onClick={()=> {setPageState({...pageState, editMode: !pageState.editMode})}}
                        className='bg-slate-500 transition hover:bg-slate-700'>Edit</button>
                </Container>
            </div>
        </div>
        </>
    );
}

export default Transaction;
