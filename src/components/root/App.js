import React, { Component } from 'react';
import { FormGroup, Form, FormControl, Button, } from 'react-bootstrap'
import './App.css';
import { endpoints, host } from '../../utils/endpoints';
import ShortUrl from '../short-url/ShortUrl';

class App extends Component {
  constructor() {
    super();
    this.state = {
      longUrl: '',
      shortUrl: ''
    }
  }

  submitUrl = async () => {
    const postData = { originalUrl: this.state.longUrl, host };
    try {
      let response = await fetch(endpoints.longUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });
      response = await response.json();
      response &&
        this.setState({ shortUrl: response.shortUrl });
      // this.redirectToShortUrl(response.shortId);
    } catch (err) {
      console.log('Error:', err);
    }

  }

  redirectToShortUrl = async (shortId) => {
    let response = await fetch(endpoints.getShortUrl(shortId));
    await response.json();

  }

  render() {
    const { longUrl, shortUrl } = this.state;
    return (
      <div className="container App">
        <div className="col App-header">
          <div className="row">
            <span className="glyphicon glyphicon-link link-icon"></span>
          </div>

          <div className="row">
            URL Shortener
          </div>
        </div>


        <div className="col form-container">
          <Form>
            <FormGroup>
              <div className="row input-container">
                <FormControl placeholder="Enter your URL here"
                  onChange={(e) => this.setState({
                    longUrl: e.target.value
                  })} />
              </div>
              <div className="row btn-container">
                <Button variant="primary"
                  className="submit-btn"
                  onClick={this.submitUrl}>Submit</Button>
              </div>
            </FormGroup>
          </Form>

        </div>


        {
          shortUrl &&
          <div className="row display-short-url">
            <ShortUrl longUrl={longUrl} shortUrl={shortUrl} />
          </div>
        }


      </div>
    );
  }


}

export default App;
