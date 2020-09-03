import React from 'react';
import styles from './Category.module.css';

const category = props => {

    const pluralSingular = count => {
        return count !== 1 ? `${count} restoranai` : `${count} restoranas`;
    }

    return (
        <div className={styles.CategoryCard}>
            <div className={styles.ImageOutside}>
                <img className={styles.Image} src={props.pictures} alt={props.alt}/>
            </div>
            <h4>{props.name}</h4>
            <p>{pluralSingular(props.count)}</p>
        </div>
    )
};

export default category;