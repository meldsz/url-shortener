import React from 'react';
import ReactTimeAgo from 'react-time-ago'
import './UrlList.css';

const UrlList = (props) => {

    return (
        <div className=" table-container">
            <div className="table-header"> Latest Shortened Urls</div>
            <table className="highlight responsive-table">
                <thead>
                    <tr>
                        <th>Long Url</th>
                        <th>Short Url</th>
                        <th>Created At</th>
                        <th>Clicks</th>
                    </tr>
                </thead>

                <tbody>
                    {props.urlDataSource.map(row =>
                        <tr key={row._id}>
                            <td className="longurl-row"><a href={row.originalUrl} target="_blank">{row.originalUrl}</a></td>
                            <td><a href={row.shortUrl} target="_blank">{row.shortUrl}</a></td>
                            <td><ReactTimeAgo date={row.ctime}/></td>
                            <td>{row.clicks ? row.clicks : 0}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    )

}
export default UrlList;