import React from 'react';
import { mount } from 'enzyme';
import ShortUrl from './ShortUrl';

const props = {
    longUrl: 'http://originalurl.com',
    shortUrl: 'http://localhost/jagdasd'
};

describe('ShortUrl', () => {
    const shortUrlWrapper = mount(<ShortUrl {...props} />);

    it('renders short url', () => {
        expect(shortUrlWrapper.find('a').text()).toEqual(props.shortUrl);
    });

    describe('state controlled button', () => {
        it('state changes upon clicking the button', () => {
            const mockSetIsCopied = jest.fn();
            React.useState = jest.fn(() => [false, mockSetIsCopied]);
            shortUrlWrapper.find('button').simulate('click');
            expect(mockSetIsCopied).toHaveBeenCalledWith("true");
        })
    })
})