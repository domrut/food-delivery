import React, {Component} from 'react';
import Loading from '../../components/Loading/Loading';
import Category from '../../components/Category/Category';
import styles from './Categories.module.css';
import {Link} from 'react-router-dom';
import fire from '../../firebase';
import fixURL from '../../fixURLfunc';

class Categories extends Component {

    state = {
        categoryImages: [],
        loading: true
    }

    componentDidMount() {
        document.title = "Categories";
        fire.storage().ref("categoryImages/").listAll()
            .then(res => {
                res.items.forEach(imgRef => {
                    this.display(imgRef);
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    display = refLink => {
        refLink.getDownloadURL()
            .then(url => {
                this.setState({
                    categoryImages: [
                        ...this.state.categoryImages,
                        url
                    ]
                })
                this.setState({loading: false})
            })
    }

    render() {
        let restaurantCategories = null;
        let desserts = [];

        if (this.state.loading && (this.state.categoryImages.length !== Object.values(this.props.sorted).length)) {
            restaurantCategories = <Loading />;
        } else {
            restaurantCategories = Object
                .entries(this.props.sorted)
                .map(([el, index], i) => {
                    if (el === "Dessert") {
                        desserts.push(
                            <Link key={i} to={'categories/category/' + fixURL(el)}>
                                <Category name={el} pictures={this.state.categoryImages.sort()[i]} count={index} alt={`${el} category`}/>
                            </Link>
                        );
                    } else {
                        return (
                            <Link key={i} to={'categories/category/' + fixURL(el)}>
                                <Category name={el} pictures={this.state.categoryImages.sort()[i]} count={index} alt={`${el} category`}/>
                            </Link>
                        );
                    }
                    return null;
                });
        }

        return (
            <React.Fragment>
                <div className={styles.CategoriesContainer}>
                    <h2>Pagrindiniai patiekalai</h2>
                    <div className={styles.CategoriesList}>
                        {restaurantCategories}
                    </div>
                    <h2>Desertai</h2>
                    <div className={styles.CategoriesList}>
                        {desserts}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Categories;