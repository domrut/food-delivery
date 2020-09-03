import React from 'react';
import styles from './RestaurantBanner.module.css';

const restaurantBanner = props => {
    document.title = props.restaurantName + " - Užsisakyk!";
    return (
        <div className={styles.Banneris} style={{backgroundImage: `url(${props.bannerImage})`}}>
            <h1 className={styles.BannerText}>{props.restaurantName}</h1>
        </div>
    )
};

export default restaurantBanner;