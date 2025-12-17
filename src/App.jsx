// import React, { Component } from 'react'
import { Navbar } from '../component/Navbar/Navbar'
import { Container } from 'react-bootstrap'
import Login from '../pages/Login/Login'
import { Route, Routes } from 'react-router-dom'
import { Register } from '../pages/Register/Register'
import { Toaster } from 'react-hot-toast'
import { VerifyOtp } from '../component/VerifyOtp/VerifyOtp'
import { errorHandler } from '../utils/errorHandler'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../store/Slices/userSlice'
import { useEffect } from 'react'
import api from '../apis/api'
import { ForgotPasswordLink } from '../component/ForgotPasswordLink/ForgotPasswordLink'
import { ResetPassword } from '../component/ResetPassword/ResetPassword'



export default function App  () {
  const {isLoggedIn} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await api.get("/api/v1/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const user = response.data;
          dispatch(setUser(user));

         
        }
      } catch (error) {
       errorHandler(error);
      }
    }

    fetchData();
  }, []);



    return (
      <div>
        <Toaster position='top-right' />
        <Navbar />

        <Container className='my-3 py-3'> 
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/forgot-password" Component={ForgotPasswordLink} />
          <Route path="/reset-password/:token" Component={ResetPassword} />


          {!isLoggedIn && (
            <>
              <Route path="/login" Component={Login} />
              <Route path="/register" Component={Register} />
              <Route path="/verify-otp" Component={VerifyOtp} />
            </>
            
          )}
</Routes>

        </Container>
      </div>
    )
  }



