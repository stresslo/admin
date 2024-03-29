import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import ScaleLoader from "react-spinners/ScaleLoader"
import Context from "../../utils/context"
import swalert from "../../utils/swalert"
import Loading from "../../utils/loading"
import { useState } from "react"
import axios from "axios"
import "../style/navbar.css"

const Navbar = () => {
  
  const navigate = useNavigate()
  const context = useContext(Context)
  const transaction_mode = localStorage.getItem('transaction_mode')
  const token = sessionStorage.getItem('token')
  const [loading, setLoading] = useState(false)

  window.onscroll = () => {
      let y = window.scrollY
      let w = window.innerWidth
      let nav = document.querySelector('.navbar-container')
      let grep = document.querySelector('.grep')
  
      if (w > 530 && nav && grep) {
        if (y > 170) {
          nav.classList.add('fix');
          grep.classList.add('block');
        }
      }
    
      if (nav && grep && nav.classList.contains('fix') && y < 5) {
        nav.classList.remove('fix');
        grep.classList.remove('block');
      }
  }

  const handleSidebar = () => {
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.toggle('show')
  }

  const logout = async () => {
    try {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_API}/logout/admin`)
        sessionStorage.removeItem('token')
        swalert(response.data, "success")
        .then((res) => res.dismiss && location.reload())
    } catch (error) {
        return false;
    } finally {
        setLoading(false)
    }
  }

  if (loading) return <Loading/>

  return (
    <div className="navbar-container">
      <div className='navbar'>
        <div className="nav-logo">
          {context.loading ? <ScaleLoader height={25} color="#EBE76C"/> : 
          <>
            <img src="/img/vixcera.png"/>
            <div>VI | X</div>
          </>
          }
        </div>
        <div className="nav-menu">
          <NavLink className="menu" to="/">Home</NavLink> 
          <NavLink className="menu" to="/products">Product</NavLink> 
          <NavLink className="menu" to="/about">About</NavLink> 
        </div>
        <div className="nav-user">
          {(token !== 'undefined') ? 
          <div className="button" onClick={() => logout()}>
            <div className="fa solid fa-right-from-bracket" />
          </div>
          : 
          <NavLink className="button" to="/login">Sign in</NavLink>
          }
        </div>  
        <div className="nav-user-mobile">
          <div style={{ position: 'relative' }}>
            <div className="i fa-solid fa-bell fa-xl"/>
          </div>
          <div className="i fa-solid fa-qrcode fa-xl" onClick={() => handleSidebar()} style={{fontSize : "28px"}}/>
        </div>
      </div>
    </div>
  )
}

export default Navbar