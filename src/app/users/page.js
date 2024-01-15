"use client"
import { appCtx } from '@/context/appContext';
import { Ajax } from '@/services/ajax';
import React, { useContext, useEffect, useState } from 'react'
import { MyTable } from '@/components/Table/Table';
const Users = () => {
    const [users, setUsers] = useState([])
    const ctxData = useContext(appCtx)
    const headers = ["Full Name", "User ID", "Phone", "Address"]
    const columns = ["fullName", "uid", "phone", "address"]


    useEffect(() => {
        fnGetUsers();
    }, [])
    const fnGetUsers = async () => {
        ctxData.dispatch({ type: "LOADER", payload: true })
        try {
            const res = await Ajax.fnSendGetReq("users/get-users");
            console.log('success', res)
            setUsers(res.data);
        } catch (ex) {
            console.error("Users", ex);
        } finally {
            ctxData.dispatch({ type: "LOADER", payload: false })
        }
    }
    return (
        <div>
            <h3 className='text-center'>Users</h3>
            <MyTable columns={columns} data={users} headers={headers} />;
        </div>
    )
}

export default Users
