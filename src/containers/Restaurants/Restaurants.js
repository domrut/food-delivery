import React, {Component} from 'react';
import styles from './Restaurants.module.css';
import {Link, Route} from 'react-router-dom';
import Restaurant from '../../components/Restaurant/Restaurant';
import axios from '../../axios-instance';
import Loading from '../../components/Loading/Loading';
import fire from '../../firebase';
import fixURL from '../../fixURLfunc';

class Restaurants extends Component {

    state = {
        restaurantInfo: null,
        images: [],
        loading: true,
        purchasing: false
    };

    componentDidMount() {
        document.title = "Restaurants";

        axios
            .get('/restaurantsList.json')
            .then(resp => {
                this.setState({restaurantInfo: resp.data})
            })
            .catch(err => {
                console.log(err);
            });

        fire
            .storage()
            .ref("restaurantImages/")
            .listAll()
            .then(result => {
                result
                    .items
                    .forEach(imageRef => {
                        this.displayImage(imageRef);
                    })
            })
            .catch(err => {
                console.log(err);
            });
    }

    clickedRestaurant = () => {
        window.scrollTo({top: 0});
    }

    displayImage = result => {
        result
            .getDownloadURL()
            .then(url => {
                this.setState({
                    images: [
                        ...this.state.images,
                        url
                    ]
                })
                this.setState({loading: false})
            })
            .catch(err => {
                console.log(err);
            })
    }

    purchases = () => {
        this.setState({purchasing: false});
    }

    randomize = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    render() {

        let restaurantList = <Loading/>;
        let categorizedRestList = <Loading/>;

        if (this.state.restaurantInfo && (this.state.images.length === Object.keys(this.state.restaurantInfo).length) && !this.state.loading) {
            categorizedRestList = [];
            restaurantList = Object
                .entries(this.state.restaurantInfo)
                .map(([el, index], i) => {
                    if ((this.props.kategorija !== null) && (this.props.kategorija === index)) {
                        return (categorizedRestList.push(
                            <Link
                                to={'/restaurants/' + fixURL(el)}
                                key={i}
                                onClick={this.clickedRestaurant}>
                                <Restaurant
                                    name={el}
                                    value={index}
                                    image={this.state.images.sort()[i]}
                                    alt={el}/>
                            </Link>
                        ));
                    } else {
                        return (
                            <Link
                                to={'/restaurants/' + fixURL(el)}
                                key={i}
                                onClick={this.clickedRestaurant}>
                                <Restaurant
                                    name={el}
                                    value={index}
                                    image={this.state.images.sort()[i]}
                                    alt={el}/>
                            </Link>
                        );
                    }
                });
        }

        return (
            <React.Fragment>
                <main>
                    <h1 className={styles.ContainerText}>Meniu</h1>
                    <div className={styles.Restaurants}>
                        <Route path='/restaurants' exact render={() => restaurantList}/> 
                        <Route path="/categories" render={() => categorizedRestList}/>
                    </div>
                </main>
            </React.Fragment>
        )
    }
};

export default Restaurants;