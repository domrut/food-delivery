import reducer from './dishInformation';
import * as actionTypes from '../actions/actionTypes';

describe("dishes reducer", () => {
    it("should reset to initial state", () => {
        expect(reducer({
            dishes: ["a", "b", "c"],
            totalPrice: 15,
        }, {
            type: actionTypes.RESET_APP,
            dishes: null,
            totalPrice: 0
        })).toEqual({
            dishes: null,
            totalPrice: 0
        })
    })
})