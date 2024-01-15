import React from 'react'
import styles from './Footer.module.css'
const Footer = () => {
  return <div data-testid="footer-test-div" className={`position-fixed bottom-0 bg-primary text-center w-100 text-white ${styles.footer}`}>
    &copy; rights belongs to me.
  </div>

}

export default Footer
