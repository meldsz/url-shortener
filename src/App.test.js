import React, { useState } from 'react';
import { mount } from 'enzyme';
import App from './App';
import { TextField } from '@material-ui/core';

const originalUrl = 'http://google.com';

describe('app', () => {
  const app = mount(<App />);

  it('app renders correctly', () => {
    expect(app).toMatchSnapshot();
  });

  it('renders title', () => {
    expect(app.find('.app-title').text()).toEqual('URL Shortener');

  });

  
});
