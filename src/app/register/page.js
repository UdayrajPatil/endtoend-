"use client"
import React, { useState, useContext } from 'react'
import configurations from './configuration.json'
import Input from '@/components/inputControls/Input'
import Select from '@/components/inputControls/Select'
import Textarea from '@/components/inputControls/Textarea'
import { fnFieldValidation, fnFormValidation, fnReset } from '../../validations/appValidations'
import { Ajax } from '@/services/ajax'
import Link from 'next/link'
import { appCtx } from '@/context/appContext'
import { toast } from 'react-toastify'
const Register = () => {
    const [inputControls, setInputControls] = useState(configurations)
    const ctxData = useContext(appCtx)
    const fnChange = (eve) => {
        const updatedInputControls = fnFieldValidation(eve, inputControls)
       
        setInputControls(updatedInputControls)
    }
    const fnRegister = () => {
        const [isFormInValid, dataObj, updatedInputControls] = fnFormValidation(inputControls)
        if (isFormInValid) {
            setInputControls(updatedInputControls)
            return;
        }
        ctxData.dispatch({ type: "LOADER", payload: true })
        Ajax.fnSendPostReq("users/save-user", { data: dataObj })
            .then((res) => {
                const { acknowledged, insertedId } = res.data
                if (acknowledged && insertedId) {
                    setInputControls(fnReset(inputControls));
                    toast.success("Successfully Registered")
                } else {
                    toast.error("Not registered, try again")
                }
                console.log("then", res);
            })
            .catch((res) => {
                console.error("register", res);
                toast.error("Something went wrong")
            })
            .finally(() => {
                console.log("finally")
                ctxData.dispatch({ type: "LOADER", payload: false })
            })
    }
    return (
        <div className='container-fluid'>
            <h3 className='text-center my-3'>Register</h3>
            {
                inputControls.map((obj, ind) => {
                    switch (obj.tag) {
                        case 'select':
                            return <Select key={`input_${ind}`} fnChange={fnChange} {...obj} />
                        case 'textarea':
                            return <Textarea key={`input_${ind}`} fnChange={fnChange} {...obj} />
                        default:
                            return <Input key={`input_${ind}`} fnChange={fnChange} {...obj} />

                    }

                })
            }

            <div className='row'>
                <div className='offset-sm-5 col-sm-7'>
                    <button onClick={fnRegister} className='btn btn-primary me-3'>Register</button>
                    <Link href="/login">To Login</Link>
                </div>

            </div>
        </div>
    )
}

export default Register
