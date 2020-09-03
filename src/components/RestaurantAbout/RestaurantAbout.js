import React, { useState } from 'react';
import styles from './RestaurantAbout.module.css';

const RestaurantInformation = props => {

    const [isToggled, setToggle] = useState(false);

    const toggleClass = () => setToggle(!isToggled);

    return (
        <React.Fragment>
            <h6 className={styles.Accordion} onClick={toggleClass} role="button">{isToggled ? "Paslėpti" : "Rodyti"} restorano informaciją</h6>
            <div className={isToggled ? styles.RestaurantsAbout1Shown : styles.RestaurantsAboutHidden}>
                <div className={styles.RestaurantAboutHeaders}>
                    <h5><strong>Adresas</strong></h5>
                    <p>{props.restAddress}</p>
                    <a href={`https://www.google.com/maps/place/${props.restAddress}`} target="_blank"
                    rel="noopener noreferrer" className={styles.MapLink}>Peržiūrėti žemėlapyje</a>
                </div>
                <div className={styles.RestaurantAboutHeaders}>
                    <h5><strong>Darbo laikas</strong></h5>
                    {props.restWorkingHours}
                </div>
            </div>
        </React.Fragment>
    )
}

export default RestaurantInformation;