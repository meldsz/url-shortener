import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const ShortUrl = (props) => {
    const { longUrl, shortUrl } = props;
    const [isCopied, setIsCopied] = React.useState(false);

    const copyToClipboard = () => {

    }

    return (
        <div className="col display-short-url">
            <div className="shorturl-title">Shortened URL</div>
            <div>
                <span>
                    <a href={longUrl} target="_blank">{shortUrl}</a>
                </span>
                <Button className="copy-btn"
                    variant="outline-secondary"
                    onClick={() => setIsCopied(true)}>
                    {isCopied ? "Copied!" : "Copy"}
                </Button>
            </div>

        </div>
    )
}

export default ShortUrl;