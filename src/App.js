import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core'
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  return (
    <div className="App">
      <div className="app-title">
        URL Shortener
      </div>
      <div>
        <div className="input-container">
          <TextField variant="outlined"
            className="input-url"
            fullWidth
            label="Enter your URL here"
            onChange={(e) => setLongUrl(e.target.value)} />
        </div>
        <div><Button color="primary"
          variant="contained"
          onClick={submitUrl} >Submit</Button></div>
      </div>

      {shortUrl &&
        <div className="display-short-url">
          Shortened URL: <span><a href={longUrl} target="_blank">{shortUrl}</a></span>
        </div>
      }

    </div>
  );
}

export default App;
