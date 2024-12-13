import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import {GoodSVG, BadSVG} from './ModalSVG'


const Modal = (props) => {

    // link, linkTo, title, message, closeAnywhere, action, actionColor, actionHover

   

    let navigate = useNavigate()
    let [classState, setClassState] = useState({
        visible: true,
        general: 'opacity-0',
        scale: 'scale-50'
    })

    const dismissTo = (destination) => {
        setClassState({
            ...classState,
            scale: 'scale-0',
            general: 'opacity-0'
        })
        setTimeout(() => {
            setClassState({
                ...classState,
                visible: false
            })
        }, 500)

        if(destination){
            setTimeout(() => {
                navigate(destination)
            }, 500)
            
        }
    }

    useEffect(()=> {
            setTimeout(() => {
                setClassState({
                    ...classState,
                    general:'opacity-100',
                    scale:'scale-110'
                })
            }, 100)
    
            setTimeout(() => {
                setClassState({
                    ...classState,
                    general:'opacity-100',
                    scale:'scale-100'
                })
            }, 300)
    },[])


    return (
        <>
        {classState.visible ? (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" 
        onClick={()=> {props.closeAnywhere ? dismissTo() : null}}
        >
        <div className={`fixed inset-0 bg-gray-500/75 ${classState.general} transition`} aria-hidden="true"/>
        <div className={`fixed inset-0 z-10 w-screen overflow-y-auto transition ${classState.general} ${classState.scale}`}>
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start w-full flex content-end">
                        {props.good ? GoodSVG : null}
                        {props.bad ? BadSVG : null}
                        {/* <div className="mx-auto flex size-14 shrink-0 items-center justify-center rounded-full bg-red-200 sm:mx-0 sm:size-14">
                        <svg className="size-8 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />                        
                        </svg>
                        </div> */}
                        <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3 className="text-base text-center font-semibold text-gray-900" id="modal-title">{props.title ? props.title: null}</h3>
                        <div className="mt-2 text-center items-center">
                            <p className="text-sm text-gray-500 py-2">
                                {props.message ? props.message : null}
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                    {props.linkTo ? (<>
                        <div className="bg-gray-50 px-4 py-3 flex w-full place-content-center">
                            <button 
                                type="button" 
                                onClick={()=>{dismissTo(props.linkTo ? props.linkTo : null)}}
                                className="flex justify-center rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all w-40 hover:w-72 hover:bg-slate-500">{props.linkText ? props.linkText : "Button"}</button>
                        </div>
                    </>) :null}
                    {props.action ? 
                        <div className="bg-gray-50 px-4 py-3 flex w-full place-content-center">
                            <button 
                                type="button" 
                                onClick={()=>{props.action()}}
                                className={`mx-1 flex justify-center rounded-md  ${props.actionColor ? props.actionColor : 'bg-slate-600'} ${props.actionHover ? props.actionHover : 'bg-slate-700'} px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all w-40 hover:w-72`}>
                                    {props.linkText ? props.linkText : "Button"}
                            </button>
                            <button 
                                onClick={()=>{dismissTo(null)}}
                                className={`mx-1 flex justify-center rounded-md bg-slate-400 hover:bg-slate-700 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all w-40 hover:w-72`}>
                                Cancel
                            </button>
                        </div>
                    : null}
                </div>
                </div>
            </div>
            </div>
    ): null}
        </>
    );
}

export default Modal;
