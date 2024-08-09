import { ErrorMessage, FastField, FieldArray } from 'formik';
import React, { Fragment, useState } from 'react';
import PersonalError from '../personalComponent/personalError';

const FildArray = ({label  , name , formik}) => {
    const [isDirty , setIsDirty] = useState(false);

    return (
        <FieldArray name={name} >
            {(props)=>{
                const {form , remove , push} = props
                const {other_skills} = form.values
                return(
                    <div className='mt-4 w-100 d-flex flex-column'>
                        <div className='w-100 d-flex justify-content-between align-items-center'>
                            <label htmlFor={name} className='pe-1 fw-bold'>{label} :</label>
                            <button type='button' className="btn btn-primary" onClick={()=>push('')}
                            disabled={other_skills.length == 5 || !isDirty } >
                                <i className='fa fa-plus pt-1' style={{fontSize:12}}></i>
                            </button>
                        </div>
                        <div className='w-100 d-felx mt-3'>
                            {other_skills.map((f,i)=>(
                                <div key={i} className='mt-2 d-flex'>
                                    <FastField type="text" onClick={()=>setIsDirty(true)} name={`other_skills[${i}]`} className='form-control' />
                                    {other_skills.length > 1 ?
                                        <button type='button' className="btn btn-danger me-2" onClick={()=>remove(i)}>
                                            <i className='fa fa-minus pt-1' style={{fontSize:12}}></i>
                                        </button>
                                    : null}
                                </div>
                            ))}                                    
                        </div>
                        <ErrorMessage name={name} component={PersonalError} /> 
                    </div>
                )}}
        </FieldArray>
    );
}

export default FildArray;
