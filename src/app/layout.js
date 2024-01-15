"use client"
import React, { useReducer } from 'react'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css';
import { Inter } from 'next/font/google'
import { appReducer } from '@/reducer/appReducer'
import { init } from '@/utils/init'
import { appCtx } from '@/context/appContext'
import { Header } from '@/components/Header'
import Footer from '@/components/Footer'
import Menu from '@/components/Menu'
import Loader from '@/components/Loader'
import { ToastContainer } from 'react-toastify';
const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  const [state, dispatch] = useReducer(appReducer, init);
  return (
    <html lang="en">
      <body className={inter.className}>
        <appCtx.Provider value={{ state, dispatch }}>
          <Header />
          {state.isLoggedIn && <Menu />}
          {children}
          <Footer />
          {state.isShowLoader && <Loader />}
          <ToastContainer />
        </appCtx.Provider>
      </body>
    </html>
  )
}
