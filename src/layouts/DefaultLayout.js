import React from 'react'
import NavbarHome from '../components/Navbar/NavbarHome'

export const DefaultLayout = ({children}) => {
  return (
    <div>
    {/* Sử dụng NavbarLogin */}
    <NavbarHome />
    <main className="pt-20"> 
        <div className="max-w-screen-xl mx-auto ">
        {children}
        </div>
    </main>
</div>
  )
}
