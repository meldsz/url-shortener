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
    // fetch the url history and store it in state
    let response = await fetch(endpoints.getUrls);
    response = await response.json();
    this.setState({ urlDataSource: response });
  }

  submitUrl = async (event) => {
    // prevent default behaviour of the submit button
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
          this.setState({ shortUrl: response.shortUrl, loading: false })
        } else {
          // update state with error message if url does not exist
          this.setState({ errorMsg: 'URL not valid', isInputInValid: true, loading: false });
        }

      } catch (err) {
        console.log('Error:', err);
      }
    } else {
      // update the state for error messages when url is not entered or is not in url format
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
        {/* renders app header */}
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

          {/* spinner is rendered while fetch operation is processing */}
          {loading && <Spinner />}

          {/* display the short url section only if the short url is created */}
          <div className={shortUrl ? "shorturl-revealed" : "element-hidden"}>
            <ShortUrl shortUrl={shortUrl} />
          </div>

        {/* renders the url history in a table */}
        {urlDataSource.length > 0 &&
          <UrlList urlDataSource={urlDataSource} />
        }
      </div>
    );
  }
}

export default App;
