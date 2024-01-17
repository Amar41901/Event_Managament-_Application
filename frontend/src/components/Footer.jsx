import React from 'react'
import {FaFacebookF} from 'react-icons/fa'
import {FaInstagramSquare} from 'react-icons/fa'
import {FaLinkedin} from 'react-icons/fa'


function Footer() {
  return (
      <div className='footer-div'>
        <footer className='foot'>
          <div className='accounts'>
            <a href='https://www.facebook.com/profile' target='__blank'>
              <label><FaFacebookF color='#5b5ea6' /></label>
            </a>
            <a href='https://www.instagram.com/' >
              <label><FaInstagramSquare color='#cc2b5e' /></label>
            </a>
            <a href='https://www.linkedin.com/company/bugendaitech/?originalSubdomain=in' target='__blank'>
              <label><FaLinkedin color='#2193b0' /></label>
            </a>
          </div>

          <div className='footer'>
            <p>&copy; This website is developed by #codeInfiny...</p>
          </div>
        </footer>
      </div>
  );
}


export default Footer
