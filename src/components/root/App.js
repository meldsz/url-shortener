import React, { Component } from 'react';
import './App.css';
import { endpoints, host } from '../../utils/endpoints';
import AppHeader from '../root/AppHeader';
import ShortUrl from '../short-url/ShortUrl';
import UrlList from '../url-list/UrlList';
import Spinner from '../spinner/Spinner';
import validUrl from 'valid-url';

class App extends Component {
  constructor() {
    super();
    this.state = {
      longUrl: '',
      shortUrl: '',
      isInputInValid: false,
      errorMsg: '',
      urlDataSource: [],
      loading: false,
    }
  }

  async componentDidMount() {
    let response = await fetch(endpoints.getUrls);
    response = await response.json();
    this.setState({ urlDataSource: response });
  }

  submitUrl = async (event) => {
    event.preventDefault();
    const { longUrl } = this.state;
    // validate the input for url before submission
    if (longUrl.length > 0 && validUrl.isUri(longUrl)) {
      // submit the longUrl to the api to construct shorturl
      const postData = { originalUrl: longUrl, host };
      this.setState({ loading: true });
      try {
        let response = await fetch(endpoints.getUrls, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData)
        });
        response = await response.json();
        // update the state with shorturl obtained from the api
        if (response.shortUrl) {
          setTimeout(() =>
            this.setState({ shortUrl: response.shortUrl, loading: false }), 1000)

        } else {
          setTimeout(() =>
            this.setState({ errorMsg: 'URL not valid', isInputInValid: true, loading: false }), 1000);
        }

      } catch (err) {
        console.log('Error:', err);
      }
    } else {
      // update the state
      this.setState({
        isInputInValid: true,
        errorMsg: longUrl.length === 0 ? 'Please enter URL' : 'URL not valid'
      });
    }

  }

  render() {
    const { shortUrl, isInputInValid, errorMsg, urlDataSource, loading } = this.state;
    return (
      <div className="App">
        {/* app header */}
        <AppHeader />

        {/* form */}
        <form>
          <div className="form-container">
            <div className="input-container">
              <input placeholder="Paste your long URL here"
                color="primary"
                className="longurl-input"
                autoFocus
                onChange={(e) => this.setState({
                  longUrl: e.target.value.trim(), errorMsg: '', shortUrl: ''
                })} />

              <button type="submit"
                color="primary"
                className="submit-btn btn waves-effect waves-light"
                onClick={this.submitUrl}>Shorten</button>
              <div className="error-container">
                {isInputInValid && <span className="errorMsg">{errorMsg}</span>}
              </div>

            </div>
          </div>
        </form>
        <div className={loading || shortUrl ? "shorturl-container" : "element-hidden"}>
          {/* spinner */}
          {loading && <Spinner />}

          {/* display the short url section only if the short url is created */}
          <div className={shortUrl ? "shorturl-revealed" : "element-hidden"}>
            <ShortUrl shortUrl={shortUrl} />
          </div>
        </div>
        {urlDataSource.length > 0 &&
          <UrlList urlDataSource={urlDataSource} />
        }
      </div>
    );
  }
}

export default App;
