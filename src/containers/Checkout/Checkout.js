import React, { Component } from 'react';
import DeliveryDataForm from '../DeliveryDataForm/DeliveryDataForm';
import styles from './Checkout.module.css';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import * as dishActions from '../../store/actions/combinedActions';

class Checkout extends Component {

    state = {
        fromRestaurant: null,
        showContinue: "block"
    }

    componentDidMount() {
        document.title = "Checkout";
        window.scrollTo({
            top: 0
        })
        const fromRestaurant = window.location.href.split("@");
        this.setState({fromRestaurant: fromRestaurant[1]})
    }

    componentWillUnmount () {
        this.props.onLaunch();
    }

    checkoutContinue = () => {
        window.scrollTo({
            top: 140,
            behavior: "smooth"
        });
        this.props.history.replace("/checkout/delivery-data");
        this.setState({showContinue: "none"})
    }

    capitalizeDishName = string => {
        return string.charAt(0).toUpperCase() + string.slice(1).split("_").join(" ");
    }

    render() {
        let orderedDishes;

        if (this.props.dshes !== null && this.props.ttlPrice !== null) {
            orderedDishes = Object.entries(this.props.dshes).map(([el, index], i) => {
                if (index !== 0) {
                    return (
                        <div key={i} className={styles.CartItem}>
                            <p><strong className={styles.CartItemName}>{this.capitalizeDishName(el)}:</strong> {index}x</p>
                        </div>
                    )
                }
                return null;
            }
        );
        }
        return (
            <React.Fragment>
                <h1 className={styles.CartHeader}>Jūsų užsakymas</h1>
                <div className={styles.CheckoutContainer}>
                    {this.props.ttlPrice ? <h2>Restoranas: {decodeURIComponent(this.state.fromRestaurant)}</h2> : null}
                    {orderedDishes}
                    {this.props.ttlPrice ? (
                        <div>
                            <p className={styles.CartPrice}>Iš viso: {this.props.ttlPrice.toFixed(2)} &euro;</p>
                            <button onClick={this.checkoutContinue} style={{display: this.state.showContinue}} className={styles.CartButton}>Tęsti</button>
                            <Route path="/checkout/delivery-data" render={() => <DeliveryDataForm orderedFrom={this.state.fromRestaurant} />} />
                        </div>
                    ) : <h2 style={{textAlign: "center"}}>Krepšelis tuščias</h2> }
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        dshes: state.dishes,
        ttlPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLaunch: () => dispatch(dishActions.appResetas())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);