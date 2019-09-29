export const host = "http://localhost:5000";

export const endpoints = {
    getUrls: `${host}/api/urls`,
    getShortUrl: (shortId) => `${host}/api/urls/:${shortId}`,
}