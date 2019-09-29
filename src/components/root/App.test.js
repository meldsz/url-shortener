import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import { url } from '../../data/fixtures';

const inputUrl = 'http://url.com';
const shortUrl = "http://localhost:5000/qwerty";

describe('app component', () => {
  const app = mount(<App />);
  const mockEvent = { target: { value: inputUrl } };

  it('app renders correctly', () => {
    expect(app).toMatchSnapshot();
  });

  it('initial state', () => {
    expect(app.state()).toEqual({
      longUrl: '',
      shortUrl: '',
      isInputInValid: false,
      errorMsg: '',
      loading: false,
      urlDataSource: []
    });
  });

  it('should have input box', () => {
    expect(app.find('input')).toHaveLength(1);
  });

  it('renders a Button `Submit` ', () => {
    expect(app.find('.submit-btn').at(0).props().children).toEqual('Shorten');
  });

  describe('updating the input box longUrl', () => {

    beforeEach(() => {
      app.find('input').simulate('change', mockEvent);
    })

    it('update longUrl in the state', () => {
      expect(app.state().longUrl).toEqual(inputUrl);
    });

    describe('submitting the form with longUrl', () => {

      beforeEach(done => {
        global.fetch = jest.fn().mockImplementation(() => {
          return Promise.resolve(new Response(JSON.stringify(url)));
        });
        app.find('.submit-btn').simulate('click');
        setTimeout(done)
      });

      it('updates the state with shortUrl obtained from api', () => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(app.state().shortUrl).toEqual(shortUrl);
        global.fetch.mockClear();
      });
    });

    describe('updates errorMsg in state when the url does not exists', () => {
      beforeEach(done => {
        app.find('input').simulate('change', { target: { value: '' } });
        app.find('.submit-btn').simulate('click');
        setTimeout(done)
      });

      it('updates the errorMsg', () => {
        expect(app.state().errorMsg).toEqual('Please enter URL');
      });

    });

    describe('updates errorMsg in state when the user clicks submit without longurl', () => {
      beforeEach(done => {
        global.fetch = jest.fn().mockImplementation(() => {
          return Promise.resolve(new Response(JSON.stringify("Invalid Original Url")));
        });
        app.find('.submit-btn').simulate('click');
        setTimeout(done)
      });

      it('updates the errorMsg', () => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(app.state().errorMsg).toEqual('URL not valid');
        global.fetch.mockClear();
      });

    })

  });


});
