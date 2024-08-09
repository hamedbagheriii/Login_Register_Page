import { ErrorMessage, FastField, Form, Formik } from 'formik';
import React from 'react';
import FormikControl from './formikComponenet/formikControl';
import * as Yup from 'yup'



// ============== initial props ===============
const initialValues = {
    person_name : '' ,
    user_name : '' ,
    register_mode : 'phone' ,
    email : '' ,
    phone : '' ,
    password : '' ,
    c_password : '' ,
    image : null ,
}

const onSubmit = (values , submitProps)=>{
    console.log(values);
}

const validationSchema = Yup.object({
    person_name : Yup.string().required('لطفا مقداری بنویسید .') ,
    user_name : Yup.string().required('لطفا مقداری بنویسید .') ,
    phone : Yup.number().when( 'register_mode' , {
        is : 'phone' ,
        then : ()=> Yup.number().required('لطفا مقداری بنویسید .')
    }) ,
    email : Yup.string().when( 'register_mode' , {
        is : 'email' ,
        then : ()=>Yup.string().required('لطفا مقداری بنویسید .').email('لطفا یک ایمیل صحیح بنویسید .')
    }) ,
    password : Yup.string().required('لطفا مقداری بنویسید .').min(4,'حداقل 4 کاراکتر وارد کنید .') ,
    c_password : Yup.string().required('لطفا مقداری بنویسید .').oneOf([Yup.ref('password', '')] , 'پسورد مطابقت ندارد .') ,
    image : Yup.mixed().required('لطفا یک عکس وارد کنید .')
    .test('fileFormat' , 'لطفا فرمت png یا jpg وارد کنید .' , value=>value && value.type.includes('image/') ) ,
})
// ============== initial props ===============



// ============== local props ===============
const registerMode = [
    {id : 'phone' , value : 'موبایل'} ,
    {id : 'email' , value : 'ایمیل'} ,
]
// ============== local props ===============



const Rigister = () => {
    return (
        <div className='bg-white w-75 mx-auto' style={{borderRadius:15}}>
            <div className='header w-75 mx-auto pt-5 d-flex flex-column border-bottom border-1 pb-4 '>
                <i className='fa fa-user text-primary mx-auto' style={{fontSize:90}}></i>
                <span className='mx-auto mt-4 fs-4 fw-bold'>ثبت نام</span>
            </div>
            <Formik
             initialValues={initialValues}
             onSubmit={onSubmit}
             validationSchema={validationSchema}
             validateOnMount
            >
                {formik=>{
                    console.log(formik);
                    return(
                        <Form className='w-100 px-4 pt-1 pb-4 mt-2'>
                            
                            <FormikControl type='text' name='person_name' control='input' label='نام و نام خانوادگی' />

                            <FormikControl type='text' name='user_name' control='input' label='نام کاربری' />

                            <FormikControl type='radio' name='register_mode' control='radio' label='نوع اعتبارسنجی' options={registerMode} />

                            {formik.values.register_mode == 'phone' ?
                                <FormikControl type='number' name='phone' control='input' label='شماره موبایل' />
                            : 
                                <FormikControl type='email' name='email' control='input' label='ایمیل' />
                            }

                            <FormikControl type='password' name='password' control='input' label='رمز عبور' />

                            <FormikControl type='password' name='c_password' control='input' label='تکرار رمز عبور' />

                            <FormikControl type='file' name='image' control='file' label='تصویر پروفایل' formik={formik} />


                            <div className='d-flex w-100 mt-4'>
                                <button className='btn btn-primary w-50 mx-auto' disabled={!formik.isValid || formik.isSubmitting}>
                                    {formik.isSubmitting ?
                                        <div className="spinner-border text-light mt-1" style={{width:20,height:20}}>
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    : 'ثبت نام' }
                                </button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    );
}

export default Rigister;