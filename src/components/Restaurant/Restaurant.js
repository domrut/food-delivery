import React from 'react';
import styles from './Restaurant.module.css'

const restaurant = props => {
    
    return (
        <div className={styles.Restaurant}>
            <h4 className={styles.RestaurantHeader}>{props.name}</h4>
            <div className={styles.ImageDiv}>
                <img className={styles.Image} src={props.image} alt={props.alt} />
            </div>
            <hr className={styles.RestaurantHR}/>
            <p>{props.value}<span>{Math.ceil(Math.random() * 30) + 20} min</span><span className={styles.Icon}/></p>
        </div>
    )
};

export default restaurant;