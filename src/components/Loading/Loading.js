import React from 'react';
import styles from './Loading.module.css';

const loading = () => (
    <div className={styles.Loader}>
        <div className={[styles.Cube, styles.Cube1].join(' ')}></div>
        <div className={[styles.Cube, styles.Cube2].join(' ')}></div>
        <div className={[styles.Cube, styles.Cube3].join(' ')}></div>
        <div className={[styles.Cube, styles.Cube4].join(' ')}></div>
        <div className={[styles.Cube, styles.Cube5].join(' ')}></div>
        <div className={[styles.Cube, styles.Cube6].join(' ')}></div>
        <div className={[styles.Cube, styles.Cube7].join(' ')}></div>
        <div className={[styles.Cube, styles.Cube8].join(' ')}></div>
        <div className={[styles.Cube, styles.Cube9].join(' ')}></div>
    </div>
);

export default loading;