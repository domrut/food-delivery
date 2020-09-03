import React from 'react';
import styles from './DishInterface.module.css'
import fixURL from '../../fixURLfunc';

const dishInterface = props => (
    <div className={styles.Dishes}>
        <div className={styles.ContainerText}>
            <h2 className={styles.DishName}>{props.name}</h2>
            <p className={styles.Ingredients}>{props.text}</p>
                <div className={styles.LowerText}>
                    <p className={styles.Price}><strong>{props.price} &euro;</strong></p>
                    <button className={styles.AddButton} onClick={props.add}>+</button>
                    <button className={styles.RemoveButton} disabled={props.disabledControl} onClick={props.remove}>-</button>
                </div>
        </div>
            <img className={styles.DishImage}
                src={`https://firebasestorage.googleapis.com/v0/b/food-delivery-app-5d5eb.appspot.com/o/dishImages%2F${fixURL(props.name)}.jpeg?alt=media&token=12ec4123-f4a0-4255-b2ad-6fbd0ac335dd`} 
                alt={props.name + " patiekalas"} />
    </div>
);

export default dishInterface;