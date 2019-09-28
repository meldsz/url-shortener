import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import sinon, { fakeServer } from 'sinon';
import { url } from '../../data/fixtures';

const inputUrl = 'http://dadaaaaa.com';
const apiUrl = 'http://localhost:5000/api/urls';
const shortUrl = "http://localhost:5000/lyMkFDYh";

describe('app', () => {
  let server;
  beforeEach(() => {
    server = fakeServer.create();
    server.respondWith('POST',
      apiUrl,
      [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(url)
      ]
    );

  });


  describe('app component', () => {
    const app = mount(<App />);
    const mockEvent = { target: { value: inputUrl } };

    it('app renders correctly', () => {
      expect(app).toMatchSnapshot();
    });

    it('initial state', () => {
      expect(app.state()).toEqual({ longUrl: '', shortUrl: '' });
    });

    it('does not render ShortUrl component initially', () => {
      expect(app.find('ShortUrl').exists()).toBe(false);
    });

    it('should have input box', () => {
      expect(app.find('FormControl')).toHaveLength(1);
    });

    it('renders a Button `Submit` ', () => {
      expect(app.find('.submit-btn').at(0).props().children).toEqual('Submit');
    });

    describe('updating the input box longUrl', () => {

      beforeEach(() => {
        app.find('FormControl').simulate('change', mockEvent);
      })

      it('update longUrl in the state', () => {
        expect(app.state().longUrl).toEqual(inputUrl);
      });

      describe('submitting the form with longUrl', () => {

        beforeEach(done => {
          global.fetch = jest.fn().mockImplementation(() => {
            return Promise.resolve(new Response(JSON.stringify(url)));
          });
          app.find('Button').simulate('click');
          setTimeout(done)
        });

        it('updates the state with shortUrl obtained from api', () => {
          expect(global.fetch).toHaveBeenCalledTimes(1);
          expect(app.state().shortUrl).toEqual(shortUrl);
          global.fetch.mockClear();
        })
      });

    });


  });



});
