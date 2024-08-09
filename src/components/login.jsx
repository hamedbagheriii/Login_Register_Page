import { ErrorMessage, FastField, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import FormikControl from './formikComponenet/formikControl';
import PersonalError from './personalComponent/personalError';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


// ============== initial props ===============
const initialValues = {
    register_mode : 'phone' ,
    email : '' ,
    phone : '' ,
    password : '' ,
    c_password : '' ,
}

const onSubmit = (values , submitProps)=>{
    console.log(values);
    console.log(submitProps);

    const formData = new FormData();

    // formData.append('register_mode' , values.register_mode);

    // formData.append('email' , values.email);

    const mobile = '0' + values.phone;
    console.log(mobile);
    
    formData.append('phone' , mobile);
    
    formData.append('password' , values.password);

    formData.append('c_password' , values.c_password);

    axios.post('URL/login' , formData , {
        headers : {
            'Content-Type' : 'multipart/form-data'
        }
    }).then(res=>{
        if (res.status === 200) {
            swal('با موفقیت وارد شدید .');
            localStorage.setItem('token',res.data.token)
        }else{
            swal(res.data.message || res.data.phone[0])
        }
    }).catch(err=>{
        console.log(err.data[0]);
        swal('مشکل در اتصال به سرور .')
    })
    

    setTimeout(() => {
        submitProps.resetForm();
        submitProps.setSubmitting(false);
    }, 3000);
}

const validationSchema = Yup.object({
    phone : Yup.string().when( 'register_mode' , {
        is : 'phone' ,
        then : ()=> Yup.number().required('لطفا مقداری بنویسید .')
    }) ,
    email : Yup.string().when( 'register_mode' , {
        is : 'email' ,
        then : ()=>Yup.string().required('لطفا مقداری بنویسید .').email('لطفا یک ایمیل صحیح بنویسید .')
    }) ,
    password : Yup.string().required('لطفا مقداری بنویسید .').min(4,'حداقل 4 کاراکتر وارد کنید .') ,
    c_password : Yup.string().required('لطفا مقداری بنویسید .').oneOf([Yup.ref('password', '')] , 'پسورد مطابقت ندارد .') ,
})
// ============== initial props ===============



// ============== local props ===============
const registerMode = [
    {id : 'phone' , value : 'موبایل'} ,
    {id : 'email' , value : 'ایمیل'} ,
]
// ============== local props ===============


const Login =  () => {
    return (
        <div className='bg-white w-100  mx-auto' style={{borderRadius:15,maxWidth:550}}>
            <div className='header w-75 mx-auto pt-5 d-flex flex-column border-bottom border-1 pb-4 '>
                <i className='fa fa-user text-primary mx-auto' style={{fontSize:90}}></i>
                <span className='mx-auto mt-4 fs-4 fw-bold'>ورود به پنل</span>
            </div>
            <Formik
             initialValues={initialValues}
             onSubmit={onSubmit}
             validationSchema={validationSchema}
             validateOnMount
            >
                {formik=>{
                    return(
                        <Form className='w-100 px-4 pt-1 pb-4 mt-2'>
                            
                            <FormikControl type='radio' name='register_mode' control='radio' label='نوع اعتبارسنجی' options={registerMode} />

                            {formik.values.register_mode == 'phone' ?
                                <FormikControl type='number' name='phone' control='input' label='شماره موبایل' />
                            : 
                                <FormikControl type='email' name='email' control='input' label='ایمیل' />
                            }

                            <FormikControl type='password' name='password' control='input' label='رمز عبور' />

                            <FormikControl type='password' name='c_password' control='input' label='تکرار رمز عبور' />
                            
                            <div className='d-flex w-100 mt-5'>
                                <button className='btn btn-primary w-50 mx-auto' disabled={!formik.isValid || formik.isSubmitting}>
                                    {formik.isSubmitting ?
                                        <div className="spinner-border text-light mt-1" style={{width:20,height:20}}>
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    : 'ورود به حساب' }
                                </button>
                            </div>

                            <div className='d-flex w-100 mt-4 mb-1'>
                                <Link to={'/Register'} className='mx-auto text-dark fw-bold' style={{fontSize:14,textDecoration:'none'}}>
                                    حساب کاربری ندارید ؟ <span className='text-primary'>ثبت نام . . .</span>
                                </Link>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    );
}

export default Login;