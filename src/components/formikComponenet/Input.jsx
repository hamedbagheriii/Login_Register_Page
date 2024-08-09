import { ErrorMessage, FastField } from 'formik';
import React from 'react';
import PersonalError from '../personalComponent/personalError';

const Input = ({label , type , name }) => {
    return (
        <div className='mt-4 w-100'>
            <label htmlFor={name+`-id`} className=' pb-2 pe-1 fw-bold'>{label} :</label>
            <FastField name={name} type={type} className='form-control mb-2' id={name+`-id`} />
            <ErrorMessage name={name} component={PersonalError} /> 
        </div>
    );
}

export default Input;
