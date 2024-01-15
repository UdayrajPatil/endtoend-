import React, { Fragment } from 'react'
import styles from './Input.module.css'

const Input = ({ lbl, type, value, criteria, fnChange, name, errMsg, options, values, readOnly }) => {
    const fnPrepareInputContrls = () => {
        switch (type) {
            case 'text':
            case 'password':
            case 'number':
                return <input disabled={readOnly} value={value} name={name} onChange={fnChange} type={type} className='form-control' />
            case 'radio':
                return options.map((opt, ind) => {
                    return <Fragment key={`fragment_${ind}`}><input checked={values[ind] === value} className='me-2' value={values[ind]} name={name} onChange={fnChange} type={type} /><span className='me-2'>{opt}</span></Fragment>
                })

            case 'checkbox':
                const selValues = value.split(',');
                return options.map((opt, ind) => {
                    return <Fragment key={`fragment_${ind}`}><input checked={selValues.includes(values[ind])} className='me-2' value={values[ind]} name={name} onChange={fnChange} type={type} /><span className='me-2'>{opt}</span></Fragment>
                })

            default:
        }
    }
    return (
        <div className='row mb-3'>
            <div className='col-sm-5 text-end'>
                <b>{lbl} {criteria?.length > 0 && <span className='text-danger'>*</span>}:</b>
            </div>
            <div className='col-sm-3'>
                {fnPrepareInputContrls()}
            </div>
            <div className='col-sm-4'>
                {errMsg && <b className='text-danger'>{errMsg}</b>}
            </div>
        </div>
    )
}

export default Input
