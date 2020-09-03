import { configure, shallow } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Modal from './Modal';
import Backdrop from '../../components/Backdrop/Backdrop';

configure({adapter: new Adapter()});

describe("Backdrop and modal animation", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Modal />);
    })

    it("modal should show backdrop and have show animation", () => {
        wrapper.setProps({visible: true});
        expect(wrapper.find(Backdrop).prop("visible")).toBe(true);
        expect(wrapper.find('.ModalIn')).toHaveLength(1);
    })

    it("modal should hide backdrop and have hide animation", () => {
        wrapper.setProps({visible: false});
        expect(wrapper.find(Backdrop).prop("visible")).toBe(false);
        expect(wrapper.find('.ModalOut')).toHaveLength(1);
    })
})