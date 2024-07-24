import React from 'react'
import Header from './Header'
import Footer from './Footer'
import AdminSidebar from './AdminSidebar'

const Layout = ({children}:{children:React.ReactNode})=> {
  return (
    <div className='h-screen flex flex-col bg-gray-700'>
        <Header />
        <div className='flex flex-grow overflow-hidden'>
            <AdminSidebar />
        </div>
        <div className="flex flex-col flex-grow overflow-y-auto">
            {children}
            <Footer />
        </div>
    </div>
  )
}

export default Layout