import React, {useState,useEffect} from 'react'
import logo from './log.png';
import { Link } from 'react-router-dom';
import './Navbar.css'
import { Button} from './Button'


function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
  
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  
    const showButton = () => {
      if (window.innerWidth <= 960) {
        setButton(false);
      } else {
        setButton(true);
      }
    };
  
    useEffect(() => {
      showButton();
    }, []);
  
    window.addEventListener('resize', showButton);
  
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
            <Link to="/" className="navbar-logo">
                BoxCorrect
            </Link>
            <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-meny active' : 'nav-menu'}>
                <li className='nav-item'>
                    <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                        Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/check' className='nav-links' onClick={closeMobileMenu}>
                        Form Check
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/tips' className='nav-links' onClick={closeMobileMenu}>
                        Tips
                    </Link>
                </li>
                <li className='nav-item sign'>
                    <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                        Sign Up
                    </Link>
                </li>
            </ul>
            {button && <Button  buttonStyle='btn--outline--sign'>SIGN UP</Button>}
        </div>
      </nav>
    </>
  )
}

export default Navbar
