import React, { useEffect, useState } from 'react';
// import Login from './components/login';
import Rigister from './components/rigester';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


const App = ()=>{


    
    return (
        <BrowserRouter>
            <div className={` app container-fluid py-5`}>
                <Routes>
                    {/* <Route path='/Login' element={<Login/>} /> */}

                    <Route path='/Rigester' element={<Rigister/>} />

                    <Route path='*' element={<Rigister/>} />
                </Routes>
            </div>
        </BrowserRouter>
    ) 
}


export default App;