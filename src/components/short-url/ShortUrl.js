import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ShortUrl.css';

const ShortUrl = (props) => {
    console.log(props)
    const { shortUrl } = props;
    const [isCopied, setIsCopied] = React.useState(false);
    const copyRef = React.createRef();

    const hideCopiedMsg = () => {
        setTimeout(() => {
            setIsCopied(false);
        }, 4000)
    }


    return (
        <div>
            <a href={shortUrl} target="_blank" className="shorturl">{shortUrl}</a>
            <CopyToClipboard
                text={shortUrl}
                onCopy={() => setIsCopied(true)}>

                <button color="primary"
                    className="btn waves-effect waves-light copy-btn"
                    onClick={hideCopiedMsg}
                    variant={isCopied ? "success" : "outline-success"}>
                    <i className="fa fa-copy"></i>
                </button>


            </CopyToClipboard>

            <div ref={copyRef} className={isCopied ? "copy-revealed " : "copy-hidden"}>Copied to clipboard</div>
        </div >
    )
}

export default ShortUrl;