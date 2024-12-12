import React, { useEffect, useState } from 'react';
import Container from '../subcomponents/Container';
import { useParams } from 'react-router';
import { 
    getTransaction,    
    createTransaction,
    updateTransaction,
    deleteTransaction } from '../subcomponents/apicalls';
import Modal from '../subcomponents/Modal';

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
        transactionData: '',
        details: '',
        category: '',
        amount: '',
        date: '',
    })

    const [modalList, setModalList] = useState([
    <Modal
        message='Delete Entry?'
        action={()=>{console.log('womp')}}
        />
])

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
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = (e) => {

    }

    // console.log(pageState.editMode == true)
    return (
        <>
        {modalList.length > 0 ? modalList.map(modal => modal) : null}

        <div className='place-content-center items-center h-full w-full flex'>
            <div className='w-[1020px] min-w-96'>
                {/* <h1 className='py-2'>Edit Entry</h1> */}
                <Container className='grid-cols-2 text-right transition-all h-[450px]'>
                    <div className='place-content-center'>
                        <img 
                            className='w-[512px] hidden md:inline rounded'
                            src={imgURLs[transactionData.category]} alt="" />
                    </div>
                    <div 
                        className='col-span-2 md:col-span-1 relative place-content-center'>
                        {pageState.editMode == false ?
                            <>
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
                                <div 
                                    className='bottom-0 right-0 p-4'>
                                    <button
                                        onClick={()=>{deleteTransaction()}}
                                        className='bg-red-400 m-2 transition hover:bg-red-700'>Delete</button>
                                    <button 
                                        onClick={()=> {setPageState({...pageState, editMode: !pageState.editMode})}}
                                        className='bg-slate-500 m-2 transition hover:bg-slate-700'>Edit</button>
                                </div>
                            </>
                        : <>
                        <form 
                            className='grid grid-cols-none text-left px-4'
                            onSubmit={handleSubmit}>
                            <div className='my-1'>
                                <div className='py-2 mx-2 text-lg'>
                                    Date
                                </div>
                                <input 
                                    required
                                    value={formData.date.split('T')[0]}
                                    id='date'
                                    className='rounded w-full p-2 transition hover:scale-105 focus:scale-105 bg-slate-800'
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
                                    className='rounded w-full p-2 transition hover:scale-105 focus:scale-105 bg-slate-800'
                                    type="text" />
                            </div>
                            <div className='my-1'>
                                <div className='py-2 mx-2 text-lg'>
                                    Category
                                </div>
                                <select
                                    className='rounded w-full p-2 transition active:scale-105 hover:scale-105 bg-slate-800'
                                    name="category" 
                                    id="category"
                                    onChange={handleChange}
                                    value={formData.category}
                                >
                                    <option value="BILL">Bill</option>
                                    <option value="EXPENSE">Expense</option>
                                    <option value="PAYMENT">Payment</option>
                                    <option value="PURCHASE">Purchase</option>
                                    <option value="SALE">Sale</option>
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
                            <div className='flex py-2 place-content-end'>
                                <button
                                    type='submit'
                                    onClick={()=>{updateTransaction(formData)}}
                                    className='bg-blue-500 m-1 transition hover:bg-blue-700'>Save Edit</button>
                                <button 
                                    onClick={()=> {
                                        setPageState({...pageState, editMode: !pageState.editMode})
                                        setFormData({...transactionData})
                                    }}
                                    className='bg-slate-500 m-1 transition hover:bg-slate-700'>Cancel Edit</button>
                            </div>
                        </form>
                        </>}
                    </div>
                </Container>
            </div>
        </div>
        
        </>
    );
}

export default Transaction;
