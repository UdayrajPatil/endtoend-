import React from 'react'
import styles from './Loader.module.css'
const Loader = () => {
    return (
        <div>
            <div className={styles.mask}></div>
            <img src="loader.gif" alt="Loading..."></img>
        </div>
    )
}

export default Loader
