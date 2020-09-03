import { configure, mount, shallow } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Layout from './Layout';
import { MemoryRouter } from 'react-router';
import BackgroundPicture from '../../components/BackgroundPicture/BackgroundPicture';
import NotFoundError from '../../components/error_404/error_404';
import Loading from '../../components/Loading/Loading';

configure({adapter: new Adapter()});

describe("Layout", () => {
    it("should redirect to notfound component", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/randomRoute' ]}>
                <Layout />
            </MemoryRouter>
        );
        expect(wrapper.find(BackgroundPicture)).toHaveLength(0);
        expect(wrapper.find(NotFoundError)).toHaveLength(1);
    });

    it("should not redirect to notfound component", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={[ '/' ]}>
                <Layout />
            </MemoryRouter>
        );
        expect(wrapper.find(BackgroundPicture)).toHaveLength(1);
        expect(wrapper.find(NotFoundError)).toHaveLength(0);
    });

    it("should render loading component if restaurants are empty ", () => {
        const wrapper = shallow(<Layout />);
        wrapper.setState({loading: true});
        expect(wrapper.find(Loading)).toHaveLength(1);
    })
})


