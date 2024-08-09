import { ErrorMessage, FastField } from 'formik';
import React, { Fragment } from 'react';
import PersonalError from '../personalComponent/personalError';

const Radio = ({label , type , name , options}) => {
    return (
        <div className='mt-4 w-100'>
            <label htmlFor={name+`-id`} className=' pb-2 pe-1 fw-bold'>{label} :</label>
            <FastField name={name} className='form-control mb-2' >
                {({field})=>{
                    return options.map(i=>(
                        <Fragment key={i.id}>
                            <input type={type} {...field} className='me-2' checked={field.value === i.id} value={i.id} id={i.id} />
                            <label htmlFor={i.id} className='me-1' >{i.value}</label>
                        </Fragment>
                    ))
                }}
            </FastField>
            <ErrorMessage name={name} component={PersonalError} /> 
        </div>
    );
}

export default Radio;
