import Sidebar from '@/components/Sidebar/Sidebar'
import React, { ReactNode } from 'react'

const DashboardLayout = ({children}:{children:ReactNode}) => {
  return (
    <div>
        <Sidebar>{children}</Sidebar>
    </div>
  )
}

export default DashboardLayout