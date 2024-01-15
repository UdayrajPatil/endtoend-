"use client"
import React, { useState, useContext } from 'react'
import configurations from './configuration.json'
import Input from '@/components/inputControls/Input'
import Textarea from '@/components/inputControls/Textarea'
import { fnFieldValidation, fnFormValidation } from '../../validations/appValidations'
import { useEffect } from 'react'
import { appCtx } from '@/context/appContext'
import { toast } from 'react-toastify'
import { Ajax } from '@/services/ajax'
import Modal from '@/components/Modal/Modal'
import { useRouter } from 'next/navigation'
import { Cookies } from '@/services/cookies'
const Profile = () => {
    const [inputControls, setInputControls] = useState(configurations)
    const [isShowModal, setIsShowModal] = useState(false)
    const ctxData = useContext(appCtx)
    const router = useRouter()
    useEffect(() => {
        fnSetFormData();
    }, [])
    const fnSetFormData = () => {
        try {
            const clonedInputControls = JSON.parse(JSON.stringify(inputControls))
            const userInfo = JSON.parse(sessionStorage.userInfo)
            clonedInputControls.forEach((obj) => {
                obj.value = userInfo[obj.name]
            })
            setInputControls(clonedInputControls)
        } catch (ex) {
            console.error("Profile-useEffect", ex);
        }
    }
    const fnChange = (eve) => {

        const updatedInputControls = fnFieldValidation(eve, inputControls)
        setInputControls(updatedInputControls)
    }
    const fnUpdate = () => {
        const [isFormInValid, dataObj, updatedInputControls] = fnFormValidation(inputControls)
        if (isFormInValid) {
            setInputControls(updatedInputControls)
            return;
        }
        ctxData.dispatch({ type: "LOADER", payload: true })
        Ajax.fnSendPutReq(`users/update-user?id=${ctxData?.state?.user?._id}`, { data: dataObj })
            .then((res) => {
                const { acknowledged, modifiedCount } = res.data
                if (acknowledged && modifiedCount) {
                    const userInfo = JSON.parse(sessionStorage.userInfo)
                    sessionStorage.userInfo = JSON.stringify({ ...userInfo, ...dataObj });
                    ctxData.dispatch({ type: "LOGIN", isLoggedIn: true, user: { ...userInfo, ...dataObj } })
                    toast.success("Successfully Updated")
                } else {
                    toast.error("Not Updated, try again")
                }
            })
            .catch((res) => {
                console.error("register", res);
                toast.error("Something went wrong")
            })
            .finally(() => {
                ctxData.dispatch({ type: "LOADER", payload: false })
            })

    }
    const fnTerminate = () => {
        setIsShowModal(true)
    }
    const fnOk = async () => {
        try {
            setIsShowModal(false)
            ctxData.dispatch({ type: "LOADER", payload: true })
            const res = await Ajax.fnSendDeleteReq(`users/delete-user/${ctxData?.state?.user?._id}`)
            const { acknowledged, deletedCount } = res.data
            if (acknowledged && deletedCount) {
                toast.success("Successfully Terminated")
                sessionStorage.clear();
                Cookies.clear()
                ctxData.dispatch({ type: "LOGIN", isLoggedIn: false, user: {} })
                router.push('/login')
            } else {
                toast.error("Not terminated, try again")
            }
        } catch (ex) {
            toast.error("Something went wrong, please check console")
            console.error("Profile-delete", ex)
        } finally {
            ctxData.dispatch({ type: "LOADER", payload: false })
        }

    }
    const fnClose = () => {
        setIsShowModal(false)
    }
    return (
        <div className='container-fluid'>
            <h3 className='text-center my-3'>Profile</h3>
            {
                inputControls.map((obj, ind) => {
                    switch (obj.tag) {
                        case 'textarea':
                            return <Textarea key={`input_${ind}`} fnChange={fnChange} {...obj} />
                        default:
                            return <Input key={`input_${ind}`} fnChange={fnChange} {...obj} />
                    }

                })
            }
            <div className='row'>
                <div className='offset-sm-5 col-sm-7'>
                    <button onClick={fnUpdate} className='btn btn-primary me-3'>Update</button>
                    <button onClick={fnTerminate} className='btn btn-primary me-3'>Terminate</button>

                </div>

            </div>
            {isShowModal && <Modal text="R u sure..." isShowOk={true} fnOK={fnOk} fnClose={fnClose} />}
        </div>
    )
}

export default Profile
