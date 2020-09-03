import React, { Component } from 'react';
import { connect } from 'react-redux';
import DishController from '../../components/DishController/DishController';
import Modal from '../Modal/Modal';
import OrderConfirmation from '../../components/OrderConfirmation/OrderConfirmation';
import axios from '../../axios-instance';
import { withRouter } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import RestaurantInformation from '../../components/RestaurantAbout/RestaurantAbout';
import fixURL from '../../fixURLfunc';
import * as dishActions from '../../store/actions/combinedActions';

class RestaurantContainer extends Component {

    state = {
        restaurantInformation: null,
        purchasing: false,
        showModal: false
    }
    
    async componentDidMount () {
        const [getRestInfoRequest] = await Promise.all([
            axios.get(`restaurantInformation/${fixURL(this.props.restName)}.json`),
            this.props.onLoadDishes(this.props.restName),
            this.props.onLoadDishPrices(this.props.restName),
            this.props.onLoadDishText(this.props.restName)
        ]);

        this.setState({
            restaurantInformation: getRestInfoRequest.data
        })
    }
    
    UNSAFE_componentWillMount () {
        this.props.onLaunch();
    }

    isPurchasing (dishes) {
        const dishesSum = Object.keys(dishes).map(el => {
            return dishes[el];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return dishesSum > 0;
    }

    showModalHandler = () => {
        this.setState({showModal: true});
    }

    hideModalHandler = () => {
        this.setState({showModal: false});
    }

    continuePurchasing = () => {
        this.props.history.push(`/checkout/@${this.props.restName}`);
    }

    render() {
        let dishList = <Loading />;
        let orderConfirm;
        let restInfo;
        let workingHours;

        const disableButton = {
            ...this.props.dshes
        };

        for (let btn in disableButton) {
            disableButton[btn] = disableButton[btn] <= 0;
        };

            if ((this.props.dshes !== null) && (this.props.dshesPrices !== null) && (this.state.restaurantInformation !== null) && (this.props.dshesText !== null)) {
                dishList = (
                        <DishController
                            dishes2={this.props.dshes}
                            dishPrices={this.props.dshesPrices}
                            dishText={this.props.dshesText}
                            dishAdded={this.props.onDishAdded}
                            dishRemoved={this.props.onDishRemoved}
                            disabledControls={disableButton}
                            currentPrice={Math.abs(this.props.ttlPrice).toFixed(2)}
                            purchaseable={this.isPurchasing(this.props.dshes)}
                            isModalVisible={this.showModalHandler}
                        />
                    );
                orderConfirm = (
                    <OrderConfirmation 
                            fullPrice={this.props.ttlPrice}
                            cancel={this.hideModalHandler}
                            continue={this.continuePurchasing} />
                );
                workingHours = (
                    Object.entries(this.state.restaurantInformation.Darbo_laikas)
                        .map(([el, index], i) => {
                            return (
                                <p key={i}><strong>{el.replace(/[0-9]/g, '')}: </strong><span>{index}</span></p>
                            )
                        })
                );
                restInfo = (
                        <RestaurantInformation
                            restAddress={this.state.restaurantInformation.Adresas}
                            restWorkingHours={workingHours} />
                );
            };

        return (
            <React.Fragment>
                <div>
                    {restInfo}
                    {this.props.error ? <h2 style={{textAlign: 'center'}}>Klaida pasiekiant serverį</h2> : null}
                    {dishList}
                </div>
                <Modal visible={this.state.showModal} closed={this.hideModalHandler}>
                    {orderConfirm}
                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        dshes: state.dishes,
        dshesPrices: state.dishPrices,
        ttlPrice: state.totalPrice,
        error: state.error,
        dshesText: state.dishIngredientText,
    }
}

const mapDispatchToProps = dispatch => ({
        onDishAdded: (dish) => dispatch(dishActions.addDish(dish)),
        onDishRemoved: (dish) => dispatch(dishActions.removeDish(dish)),
        onLoadDishes: (restVardas) => dispatch(dishActions.fetchDishInfo(restVardas)),
        onLoadDishPrices: (restVardas) => dispatch(dishActions.fetchDishPriceInfo(restVardas)),
        onLaunch: () => dispatch(dishActions.appResetas()),
        onLoadDishText: (restVardas) => dispatch(dishActions.fetchDishTextInfo(restVardas)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RestaurantContainer));

