import axios from 'axios'
import Swaload from "../../utils/swaload"
import Handle from '../../service/handle'
import convertPrice from '../../utils/price'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {LazyLoadImage} from "react-lazy-load-image-component"
import "../style/create.css"
import "../style/content.css"
import "../style/product.css"
import "../style/main.css"

const Products = () => {

    const path = location.pathname
    const ctgHistory = localStorage.getItem('ctg')
    const navigate = useNavigate()
    const [ ctg, setCtg] = useState(ctgHistory? ctgHistory : 'Web')
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ status, setStatus ] = useState(200)
    const token = sessionStorage.getItem('token')
    
    const checkAdmin = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${import.meta.env.VITE_API}/waitinglist/${ctg}`,{
                headers: { "authorization": `bearer ${token}` }
            })
            if (!response.data.length) return setStatus(404)
            setData(response.data)
            setStatus(200)
        } catch (error) {
            if (error || error.response) return setStatus(404)
        } finally {setLoading(false)}
    };

    useEffect(() => { 
        if (token != 'undefined') {
            localStorage.setItem('ctg', ctg)
            checkAdmin()
        }
    }, [path, ctg])

    if (status !== 200) return (
        <div style={{marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
            <div className='form' style={{marginTop: '10px'}}>
                    <div className='input-form'>
                    <div>
                    <div>Category :</div>
                        <select style={{width: '100%', textAlign: 'center'}} value={ctg} onChange={(e) => setCtg(e.target.value)} required>
                            <option value="">-- CATEGORY --</option>
                            <option value="Web">Web</option>
                            <option value="3D">3D</option>
                            <option value="Motion">Motion</option>
                            <option value="Vector">Vector</option>
                        </select>
                    </div>
                    </div>
                </div>
            <Handle status={status}/>
        </div>
    )

    return (
        <>
        <div className='product-page' style={{marginTop: '10px', paddingTop: '0px'}}>
            <div className='product-container' style={{flexDirection: 'column'}}>
                <div className='form' style={{marginTop: '10px'}}>
                    <div className='input-form'>
                    <div>
                    <div>Category :</div>
                        <select style={{width: '100%', textAlign: 'center'}} value={ctg} onChange={(e) => setCtg(e.target.value)} required>
                            <option value="">-- CATEGORY --</option>
                            <option value="Web">Web</option>
                            <option value="3D">3D</option>
                            <option value="Motion">Motion</option>
                            <option value="Vector">Vector</option>
                        </select>
                    </div>
                    </div>
                </div>
                {(loading) ? (<Swaload.Product/>) : 
                data.length != 0 && 
                data.map((i, k) => {
                        return(
                        <div className='product-card' key={k}>
                            <LazyLoadImage className='product-img' onClick={() => navigate(`/waiting/details/${i.vid}`)} src={(i.img) || ('img/img404.jpg')} loading='lazy' effect='blur'/>
                            <div className='wrapped-text'>
                                <div className='product-title'>{i.title}</div>
                                <div style={{ display: 'flex', flexWrap : 'wrap', flexDirection : 'column'}}>
                                    <div className='product-desc'>{i.desc.length >= 40 ? i.desc.substring(0,40) + '...' : i.desc}</div>
                                    <div className='wrapdet' style={{ position: 'unset', marginTop: '15px', marginLeft: '5px', gap: '5px' }}>
                                        <div style={{ backgroundColor: 'var(--background)', width: '95px', height: '30px' }}>{i.tech}</div>
                                        <div style={{ backgroundColor: 'var(--background)', width: '95px', height: '30px' }}>{i.tech.toLowerCase().includes('html') ? "only" : 'JS'}</div>
                                     </div>
                                </div>
                                <div className='wrapped-details'>
                                    <div className='button price'>{convertPrice(i.price)}</div>
                                    <div style={{ color : 'var(--text)', cursor: 'pointer'}} onClick={() => navigate(`/order/${i.vid}`)} className='fa-solid fa-cart-plus fa-xl' />
                                </div>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}

export default Products