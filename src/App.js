import React from 'react';
import { TextField, Button } from '@material-ui/core'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="app-title">
        URL Shortener
      </div>
      <div>
        <div className="input-container">
          <TextField variant="outlined" fullWidth
            label="Enter your URL here" />
        </div>
        <div><Button color="primary" variant="contained">Submit</Button></div>
      </div>
      <div className="display-short-url">
        Shortened URL:
      </div>
    </div>
  );
}

export default App;
