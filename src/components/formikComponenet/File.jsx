import { ErrorMessage, FastField } from 'formik';
import React from 'react';
import PersonalError from '../personalComponent/personalError';

const File = ({label , type , name , formik}) => {
    return (
        <div className='mt-4 w-100'>
            <label htmlFor={name+`-id`} className=' pb-2 pe-1 fw-bold'>{label} :</label>
            <FastField name={name} className='w-100'>
                {({meta})=>{
                    return(
                        <>
                            <input type={type} className='form-control mb-2' onBlur={formik.handleBlur}
                            name={name}  onChange={e=>formik.setFieldValue(name , e.target.files[0])} />
                            {meta.error && meta.touched ? 
                             <PersonalError>
                                {meta.error}
                             </PersonalError>
                            : null}
                        </>
                    )
                }}
            </FastField>
        </div>
    );
}

export default File;
