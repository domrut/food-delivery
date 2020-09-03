import React from 'react';
import styles from './DishController.module.css';
import DishInterface from '../DishInterface/DishInterface';

const dishController = props => {

    const dishes = Object.keys(props.dishes2);
    const dishPrices = Object.values(props.dishPrices);
    const dishText = Object.values(props.dishText)

    const rounding = num => {
        return Number.parseFloat(num).toFixed(2);
    }

    return (
        <React.Fragment>
            {dishes && dishPrices && dishText ? dishes.map((el, i) => (
                <DishInterface
                    key={i}
                    name={el.includes("mac") || el.includes("tasty") || el.includes("mc") ? el.replace(/_/g, " ").replace(/(^\w{1})|(\s{1}\w{1})/g, s => s.toUpperCase()): el.replace(/_/g, " ").replace(/(^\w{1})/g, s => s.toUpperCase())}
                    price={rounding(dishPrices[i])}
                    text={dishText[i]}
                    add={() => props.dishAdded(el)}
                    remove={() => props.dishRemoved(el)}
                    disabledControl={props.disabledControls[el]}
                    />
            )) : null} 
            <div className={styles.FinishOrder}>
                <h2>Suma: {props.currentPrice} &euro;</h2>
                <button 
                    disabled={!props.purchaseable}
                    onClick={props.isModalVisible}
                    className={styles.OrderButton}>Tęsti</button>
            </div>
        </React.Fragment>
    )
}

export default dishController;