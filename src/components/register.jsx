import { ErrorMessage, FastField, Form, Formik } from 'formik';
import React from 'react';
import FormikControl from './formikComponenet/formikControl';
import * as Yup from 'yup'
import PersonalError from './personalComponent/personalError';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';



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
    skills : [] ,
    other_skills : [''] ,
    rules : false ,
}

const onSubmit = (values , submitProps)=>{
    console.log(values);

    const formData = new FormData();

    // formData.append('person_name' , values.person_name);

    // formData.append('user_name' , values.user_name);

    // formData.append('register_mode' , values.register_mode);

    // formData.append('email' , values.email);

    const mobile = '0' + values.phone;
    console.log(mobile);

    formData.append('phone' , mobile);
    
    formData.append('password' , values.password);

    formData.append('c_password' , values.c_password);

    // formData.append('image' , values.image);

    // formData.append('skills' , values.skills);

    // formData.append('other_skills' , values.other_skills);

    // formData.append('rules' , values.rules);
    

    axios.post('URL/register', formData ,{
        headers : {
            'Content-Type' : 'multipart/form-data'
        }
    }).then(res=>{
        if (res.status == 200) {
            console.log('موفق');
            swal(res.data.message);
            localStorage.setItem('token',res.data.token);
        }
        else{
            console.log('ناموفق');
            swal(res.data.phone[0]);
        }
    }).catch(err=>{
        console.log(err);
        swal(err.data[0])
    })



    setTimeout(() => {
        submitProps.resetForm()
        submitProps.setSubmitting(false)
    }, 3000);
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
    skills : Yup.array().min(1,'لطفا یک مقدار انتخاب کنید') ,
    rules : Yup.mixed().required('لطفا قوانین را مطالعه کنید .').test('check' , 'لطفا قوانین را مطالعه کنید .' , value=> value) ,
})
// ============== initial props ===============



// ============== local props ===============
const registerMode = [
    {id : 'phone' , value : 'موبایل'} ,
    {id : 'email' , value : 'ایمیل'} ,
]

const skills = [
    {id : 1 , value : 'HTML'} ,
    {id : 2 , value : 'CSS'} ,
    {id : 3 , value : 'JS'} ,
    {id : 4 , value : 'REACT'} ,
]

// ============== local props ===============



const Register = () => {
    return (
        <div className='bg-white w-100  mx-auto' style={{borderRadius:15,maxWidth:550}}>
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
                    // console.log(formik);
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

                            <FormikControl type='checkbox' name='skills' control='checkbox' label='مهارت ها' formik={formik} options={skills} />

                            <FormikControl name='other_skills' control='fildArray' label='مهارت دیگری دارید ؟' formik={formik}  />
                            
                            <div className='w-100'>
                                <div className='w-100 d-flex align-items-center justify-content-start pt-3'>
                                    <FastField type='checkbox' name='rules' id='rules' />
                                    <label htmlFor={'rules'} className='pe-2 fw-bold pointer'> <span className='text-primary'>قوانین</span> را مطالعه کردم و آنها را قبول دارم .</label> 
                                </div>
                                <span className='d-block w-100 mt-2'>
                                    <ErrorMessage name={'rules'} component={PersonalError} /> 
                                </span>
                            </div>

                            <div className='d-flex w-100 mt-4'>
                                <button className='btn btn-primary w-50 mx-auto' disabled={!formik.isValid || formik.isSubmitting}>
                                    {formik.isSubmitting ?
                                        <div className="spinner-border text-light mt-1" style={{width:20,height:20}}>
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    : 'ثبت نام' }
                                </button>
                            </div>

                            <div className='d-flex w-100 mt-4 mb-1'>
                                <Link to={'/Login'} className='mx-auto text-dark fw-bold' style={{fontSize:14,textDecoration:'none'}}>
                                    حساب کاربری دارید ؟ <span className='text-primary'>ورود به پنل کاربری . . .</span>
                                </Link>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    );
}

export default Register;