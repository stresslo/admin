import { LazyLoadImage } from "react-lazy-load-image-component"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import Products from "../pages/products"
import Handle from "../../service/handle"
import Context from "../../utils/context"
import "../style/content.css"
import { useEffect } from "react"

const Content = () => {

    const path = location.pathname
    const navigate = useNavigate()
    const context = useContext(Context)
    const token = sessionStorage.getItem('token')

    useEffect(() => {if (!token ||token == 'undefined') return window.location.href = '/login'} ,[path])

    return (
        <div className="content">
            <div className="grep"/>
            {(path == '/') && <div style={{marginTop: '80px'}}><Handle status={404}/></div>}
            {(path == '/about') && <div style={{marginTop: '80px'}}><Handle status={404}/></div>}
            {(path == '/products') && <Products/>}
        </div>
    )
}

export default Content