import React from 'react';
import { mount } from 'enzyme';
import ShortUrl from './ShortUrl';

const props = {
    longUrl: 'http://originalurl.com',
    shortUrl: 'http://localhost/jagdasd'
};

describe('ShortUrl Component', () => {
    const shortUrlWrapper = mount(<ShortUrl {...props} />);

    it('renders component correctly', () => {
        expect(shortUrlWrapper).toMatchSnapshot();
      });

    it('renders short url in as a link', () => {
        expect(shortUrlWrapper.find('a').text()).toEqual(props.shortUrl);
    });
})