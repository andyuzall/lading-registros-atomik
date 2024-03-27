import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import style from '../App.css';
import GoogleAuth from '../components/login/Login';
import Main from '../components/main/Main';
import Form from '../components/form/Form';

function Rutas() {

    const [userData, setUserData] = useState(null);
    
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<GoogleAuth setUserData={setUserData} />} />
            <Route path='/main' element={<Main userData={userData} />} />
            <Route path='/form' element={
                <>
                <Main userData={userData} />
                <Form userData={userData} />
                </>} />
        </Routes>
        </BrowserRouter>
    );
}

export default Rutas;