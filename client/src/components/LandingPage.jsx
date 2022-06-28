import React from 'react'
import {Link} from 'react-router-dom'

function LandingPage() {
  return (
    <div className='LandingPage'>
        <h1>Bienvenidos a mi web Countries</h1>
        <Link to = "/home">
        <button>Home</button>
        </Link>
    </div>
  )
}

export default LandingPage