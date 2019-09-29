PerfUrl - The website for the perfect URL.

This application lets you create shorter urls making it easier for you to share.
The application is unit tested using Jest and Enzyme.
MongoDb has been used as the persistent database for the application.

### Stack

This application is built using MERN stack.

* MongoDb (NoSQL database)
* Express (Web Server Framework)
* React (UI)
* Node.js (Web Server)

Testing Libraries:
* Jest
* Enzyme

### Setup
You need to have Node.js, MongoDb installed on your computer

1. Clone this repository
2. Install all the dependencies: `npm install`
3. Run the application for development: `cd server` and `npm run dev`

### 3rd Party Libraries used:

Node.js app:

* [shortid](https://www.npmjs.com/package/shortid)
* [url-exists](https://www.npmjs.com/package/url-exists)
* [valid-url](https://www.npmjs.com/package/valid-url)

## Scripts

In the server directory, you can run:

### `npm run dev`

Runs both the Frontend and backend application

<br>
Open http://localhost:3000 to view the application it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>



### Features:
* Application converts long urls to shorter ones
* Statistics:
    * Creation time
    * Number of clicks on the shortened URL
* Improvements:
    * Application checks if the URL provided by user is valid and exists. If not, displays an error message.
    * Copy to clipboard functionality, so that the user does not have to select and copy it manually.
    * If the same URL has already been converted, it will not create a new short URL. Instead, it will use the existing shortened URL from the database.
    * Application shows a small history of the recent conversions.