import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate } from 'react-router-dom'


function NotUser() {
    const {user} = useUser()
    if (!user) {
        return <Navigate to="/notAllow" />
      }
}

export default NotUser
