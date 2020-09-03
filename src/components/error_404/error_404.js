import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './error_404.module.css';

const NotFoundError = () => {

    const goBack = () => {
        window.history.back();
    }

    let location = useLocation();

    return(
        <div className={styles.NotFoundError}>
            <h1>Error 404 </h1>
            <h2>Puslapis <code>{location.pathname}</code> nerastas</h2>
            <button className={styles.BackButton} onClick={goBack}>Atgal</button>
        </div>
    )
};

export default NotFoundError;