import React from 'react';
import { mount } from 'enzyme';
import AppHeader from './AppHeader';

describe('app header', () => {
    const wrapper = mount(<AppHeader />);

    it('component renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('display application title and icon', () => {
        expect(wrapper.find('i').hasClass('fa fa-link'))
        expect(wrapper.find('.title').text()).toEqual('PerfURL The website for the perfect URL')
    })
});