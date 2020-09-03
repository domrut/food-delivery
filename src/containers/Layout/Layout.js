import React, { Component } from 'react';
import Navbaras from '../../components/Navbar/Navbar';
import BackgroundPicture from '../../components/BackgroundPicture/BackgroundPicture';
import Container from '../../components/container/Container';
import Footer from '../../components/Footer/Footer';
import { Route, Switch, Redirect } from 'react-router-dom';
import './Layout.module.css';
import Restaurants from '../Restaurants/Restaurants';
import RestaurantBanner from '../../components/RestaurantBanner/RestaurantBanner';
import NotFoundError from '../../components/error_404/error_404';
import Categories from '../Categories/Categories';
import axios from '../../axios-instance';
import Loading from '../../components/Loading/Loading';
import fixURL from '../../fixURLfunc';
import Checkout from '../Checkout/Checkout';
import RestaurantContainer from '../RestaurantContainer/RestaurantContainer';

class Layout extends Component {

    state = {
        categoryTypes: [],
        restNames: [],
        loading: true
    }

    componentDidMount() {
        axios
            .get('/restaurantsList.json')
            .then(resp => {
                this.setState({
                    categoryTypes: Object.values(resp.data),
                    restNames: Object.keys(resp.data),
                    loading: false
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    categorySort = category => {
        this.state.categoryTypes.forEach(x => {
                category[x] = (category[x] || 0) + 1;
            });
            return category;
    }

    render() {
        const count = {};
        let restaurantBannersList;
        let restaurantContainerList = <Loading />;
        this.categorySort(count);
        const categoryRoutes = Object.keys(count)
        .map((el, i) => {
            return (
                <Route path={`/categories/category/${fixURL(el)}`} key={i} exact render={() => <Restaurants kategorija={el} />} />
            )
        });
        
        if (!this.state.loading) {
            restaurantBannersList = this.state.restNames.map((el, i) => {
                return (
                    <Route path={`/restaurants/${fixURL(el)}`}
                            key={i}
                            exact
                            render={() =>
                                <RestaurantBanner
                                    bannerImage={`https://firebasestorage.googleapis.com/v0/b/food-delivery-app-5d5eb.appspot.com/o/restaurantInsideImages%2F${fixURL(el)}.jpg?alt=media&token=006427a1-bb35-4a9d-853b-ebcabecc0a87`}
                                    restaurantName={el} /> }
                        />
                )
            });
            restaurantContainerList = this.state.restNames.map((el, i) => {
                return (
                    <Route path={`/restaurants/${fixURL(el)}`}
                            key={i}
                            exact
                            render={() => 
                                <RestaurantContainer 
                                    restName={el} />}
                        />
                )
            })
        }

        return (
            <React.Fragment>
                <Navbaras />
                <Switch>
                    <Route path='/restaurants' exact component={BackgroundPicture} />
                    {restaurantBannersList}
                    <Route path="/categories" component={BackgroundPicture}/>
                    <Route path="/checkout" component={Checkout} />
                    <Redirect from="/" to="/restaurants" exact/>
                    <Route component={NotFoundError} />
                </Switch>
                <Container>
                    <Switch>
                        {categoryRoutes}
                        <Route path="/restaurants" exact component={Restaurants} />
                        {restaurantContainerList}
                        <Route path="/categories" exact render={() => <Categories sorted={count}/>}/>
                    </Switch>
                </Container>
                <Footer size={count} topRestaurant={this.state.restNames}/>
            </React.Fragment>
        )
    }
}

export default Layout;