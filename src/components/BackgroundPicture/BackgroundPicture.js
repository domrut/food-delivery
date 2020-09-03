import React from 'react';
import styles from './BackgroundPicture.module.css';


const backgroundPicture = () => (
    <div className={styles.BackgroundImg}>
            <div className={styles.BackgroundImgText}>
                <span className={styles.BackgroundImgSpan}>Mes žinome, jog darbas vargina,<span>todėl darbo dienomis maistą</span></span>
                <h1 className={styles.BackgroundImgH1}>Pristatome<span>nemokamai</span></h1>
            </div>
    </div>
    )

export default backgroundPicture;