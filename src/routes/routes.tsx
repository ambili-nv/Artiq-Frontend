import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Login = lazy(()=>import('../pages/login'))
const Register = lazy(()=>import('../pages/register'))





export const MainRouter = () => {
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/login" element = {<Login/>}/>
                <Route path="/signup" element = {<Register/>}/>
            </Routes>
        </Suspense>
    )

}