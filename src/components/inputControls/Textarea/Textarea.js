import React from 'react'
import styles from './Textarea.module.css'

const Textarea = ({ lbl, criteria, value, fnChange, name, errMsg }) => {
    return (
        <div className='row mb-3'>
            <div className='col-sm-5 text-end'>
                <b>{lbl} {criteria?.length > 0 && <span className='text-danger'>*</span>}:</b>
            </div>
            <div className='col-sm-3'>
                <textarea value={value} name={name} onChange={fnChange} className='form-control' />
            </div>
            <div className='col-sm-4'>
                {errMsg && <b className='text-danger'>{errMsg}</b>}
            </div>
        </div>
    )
}

export default Textarea
