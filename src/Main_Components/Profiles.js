import React from 'react'
import { getProfile } from '../services/profiles'
import { useEffect } from 'react'
import { useState } from 'react'

function Profiles() {
    const [user, setUser] =  useState({})
    useEffect(() => {getProfile("64a3695bbdf2fb536a1810fb").then(profile => (setUser(profile["user"])))},[])
    return (
    <div>Profiles{user["username"]}</div>
  )
}

export default Profiles