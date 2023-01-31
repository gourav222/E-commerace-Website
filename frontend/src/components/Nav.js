import {Link} from 'react-router-dom'
export function Nav(){
    return(
        <>
        <div className='main-nav'>
            <div className="app-name">
                App Name
            </div>
            <div className='nav-bar'>
                <ul>
                    <li><Link to="/" className="routes">Products</Link></li>
                    <li><Link to="/chart" className="routes">Add to chart</Link></li>
                    <li><Link to="/login" className="routes">Login</Link></li>
                    <li><Link to="/signup" className="routes">Sing Up</Link></li>
                    <li><Link to="/logout" className="routes">Logouti</Link></li>
                </ul>
            </div>  
        </div>
        </>
    )
}