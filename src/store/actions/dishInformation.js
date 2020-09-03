import * as actionTypes from './actionTypes';
import fixURL from '../../fixURLfunc';
import axios from '../../axios-instance';

export const addDish = dish => {
    return {
        type: actionTypes.ADD_DISH,
        dishName: dish
    }
};

export const removeDish = dish => {
    return {
        type: actionTypes.REMOVE_DISH,
        dishName: dish
    }
};

export const appResetas = () => {
    return {
        type: actionTypes.RESET_APP
    }
}

export const fetchingFailed = () => {
    return {
        type: actionTypes.FETCHING_FAILED
    }
}

export const setDishInfo = dishes => {
    return {
        type: actionTypes.SET_DISHINFORMATION,
        dishes: dishes
    }
}

export const fetchDishInfo = (restVardas) => {
    return dispatch => {
        axios.get(`/${fixURL(restVardas)}.json`)
            .then(resp => {
                dispatch(setDishInfo(resp.data))
            });
    }
}

export const setDishPriceInfo = dishPrices => {
    return {
        type: actionTypes.SET_PRICE_DISHINFORMATION,
        dishPrices: dishPrices
    }
}

export const fetchDishPriceInfo = (restVardas) => {
    return dispatch => {
        axios.get(`/${fixURL(restVardas)}-prices.json`)
            .then(resp => {
                dispatch(setDishPriceInfo(resp.data))
            })
            .catch(() => {
                dispatch(fetchingFailed());
            })
    }
}

export const setDishTextInfo = dishIngredientText => {
    return {
        type: actionTypes.SET_TEXT_DISHINFORMATION,
        dishIngredientText: dishIngredientText
    }
}

export const fetchDishTextInfo = (restVardas) => {
    return dispatch => {
        axios.get(`dishesText/${fixURL(restVardas)}.json`) 
            .then(resp => {
                dispatch(setDishTextInfo(resp.data))
            })
    }
}