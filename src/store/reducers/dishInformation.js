import * as actionTypes from '../actions/actionTypes';

const initialState = {
        dishes: null,
        dishIngredientText: null,
        dishPrices: null,
        totalPrice: 0,
        error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_DISH:
            return {
                ...state,
                dishes: {
                    ...state.dishes,
                    [action.dishName]: state.dishes[action.dishName] + 1
                },
                totalPrice: state.totalPrice + state.dishPrices[action.dishName]
            }
        case actionTypes.REMOVE_DISH:
            return {
                ...state,
                dishes: {
                    ...state.dishes,
                    [action.dishName]: state.dishes[action.dishName] - 1
                },
                totalPrice: state.totalPrice - state.dishPrices[action.dishName]
            }
        case actionTypes.SET_DISHINFORMATION:
            return {
                ...state,
                dishes: action.dishes
            };
        case actionTypes.SET_PRICE_DISHINFORMATION:
            return {
                ...state,
                dishPrices: action.dishPrices
            };
        case actionTypes.RESET_APP:
            return {
                ...state,
                totalPrice: 0,
                dishes: null
            }
        case actionTypes.FETCHING_FAILED:
            return {
                ...state,
                error: true
            };
            case actionTypes.SET_TEXT_DISHINFORMATION:
                return {
                    ...state,
                    dishIngredientText: action.dishIngredientText
                };
        default:
            return state;
    }
}

export default reducer;