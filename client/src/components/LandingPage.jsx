import React from 'react'
import {Link} from 'react-router-dom'
import "../stayle/LandingPage.css"

function LandingPage() {
  return (
    <div className='LandingPage'>
        <h1 className='titulo'>Bienvenidos a mi web Countries</h1>
        <Link to = "/home">
        <button>Home</button>
        </Link>
    </div>
  )
}

export default LandingPage