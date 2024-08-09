import React, { useEffect, useState } from 'react';
// import Login from './components/login';
import Register from './components/register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login';


const App = ()=>{


    
    return (
        <BrowserRouter>
            <div className={` app container-fluid py-5 px-4`}>
                <Routes>
                    <Route path='/Login' element={<Login/>} />

                    <Route path='/Register' element={<Register/>} />

                    <Route path='*' element={<Register/>} />
                </Routes>
            </div>
        </BrowserRouter>
    ) 
}


export default App;