import { ErrorMessage, FastField } from 'formik';
import React, { Fragment } from 'react';
import PersonalError from '../personalComponent/personalError';

const Checkbox = ({label , type , name , options , formik}) => {
    return (
        <div className='mt-5 w-100'>
            <label htmlFor={name} className=' pb-2 pe-1 fw-bold'>{label} :</label>
            <FastField name={name}  id={name} >
                {({field})=>{
                    return options.map(i=>(
                        <Fragment key={i.id} >
                            <input type={type} name={name} {...field} value={i.value} checked={field.value.includes(i.value)} className='me-2' id={`check-${i.id}`} />
                            <label className='me-1' htmlFor={`check-${i.id}`}>{i.value}</label>
                        </Fragment>
                    ))
                }}
            </FastField>
            {formik.touched.skills && formik.errors.skills ? 
                <span className='d-block'>
                    <ErrorMessage name={name} component={PersonalError} /> 
                </span>
            : 
                <span className='text-dark mb-2 d-block' style={{opacity:.6,fontSize:14}}>
                    {'(حداقل یک مقدار انتخاب کنید .)'}
                </span>
            }
        </div>
    );
}

export default Checkbox;
