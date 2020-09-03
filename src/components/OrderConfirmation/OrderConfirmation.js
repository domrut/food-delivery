import React from 'react';
import styles from './OrderConfirmation.module.css';

const orderConfirmation = props => (
        <div className={styles.InnerModalInfo}>
            <h1>Ar norite patvirtinti užsakymą?</h1>
            <p className={styles.FoodPrice}>Galutinė suma: <strong>{props.fullPrice.toFixed(2)} &euro;</strong></p>
                <button onClick={props.continue} className={styles.ConfirmOrder}>Taip</button>
                <button onClick={props.cancel} className={styles.DenyOrder}>Ne</button>
        </div>
    )

export default orderConfirmation;