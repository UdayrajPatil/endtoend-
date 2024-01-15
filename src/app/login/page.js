"use client"
import React, { useState, useContext } from 'react'
import Input from '@/components/inputControls/Input'
import configurations from './configuration.json'
import { fnFieldValidation, fnFormValidation } from '../../validations/appValidations'
import Link from 'next/link'
import { Ajax } from '@/services/ajax'
import { appCtx } from '@/context/appContext'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Cookies } from '@/services/cookies'
const Login = () => {
    const [inputControls, setInputControls] = useState(configurations)
    const ctxData = useContext(appCtx);
    const router = useRouter()
    const fnLogin = async (eve) => {
        eve.preventDefault();
        eve.stopPropagation();
        try {
            const [isFormInValid, dataObj, updatedInputControls] = fnFormValidation(inputControls)
            if (isFormInValid) {
                setInputControls(updatedInputControls)
                return;
            }
            ctxData.dispatch({ type: "LOADER", payload: true })
            const res = await Ajax.fnSendPostReq("users/login", { data: dataObj });
            if (res.data?.length) {
                router.push('/home')
                sessionStorage.userInfo = JSON.stringify(res.data[0]);
                //sessionStorage.setItem(key,value)
                Cookies.setItem("token", res.data[0]?.token);
                setTimeout(() => {
                    ctxData.dispatch({ type: "LOGIN", isLoggedIn: true, user: res.data[0] })
                }, 10)


            } else {
                toast.error("Please checke entered uid or password")
            }
        } catch (ex) {
            console.error("Login", ex)
            toast.error("Something went wrong")
        } finally {
            ctxData.dispatch({ type: "LOADER", payload: false })
        }
    }

    const fnChange = (eve) => {
        const updatedInputControls = fnFieldValidation(eve, inputControls)
        setInputControls(updatedInputControls)
    }

    return (
        <div className='container-fluid'>
            <h3 className='text-center my-3'>Login</h3>
            <form onSubmit={fnLogin} >
                {
                    inputControls.map((obj, ind) => {
                        return <Input key={`input_${ind}`} fnChange={fnChange} {...obj} />
                    })
                }

                <div className='row'>
                    <div className='offset-sm-5 col-sm-7'>
                        <input type="submit" className='btn btn-primary me-3' value="Login" />
                        <Link href="/register">To Register</Link>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default Login
