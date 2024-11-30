<h1>Setup of the application</h2>
<h2><strong>Step-1: </strong>Copy the code link and paste it in your IDE terminal</h2>
<p>All codes and dependencies will be downloaded onto your system.</p>

<h2>Now we need to run frontend and backend simultaneously on two different ports:</h2>
<p>Frontend - <b>Client Side</b></p>
<p>Backend - <b>Server Side</b></p>

<h2><strong>Step-2: </strong>We need to install some libraries and packages for both frontend and backend</h2>
<p><b>For server side</b> go to terminal and get into Backend_Flask folder to install libraries for flask locally</p>

<p>Run this command to install for <strong>server side:</strong></p>
<strong>pip install Flask Flask-Cors scikit-learn geopy jsonify</strong>

</br>

<p>Run this command to install for <strong>client side:</strong></p>
<p>You need to install Node.js from <br>https://nodejs.org/en</b> and in terminal write the command <b>npm install</b>.</p>
<p>Then in terminal write in commands:</p>
<u><strong>npm install react-router-dom</strong></u>

<h2><strong>Step-3: </strong>When all these libraries and packages are installed your application is ready to run</h2>
<p>Get into the directory in terminal using <strong><u>cd SkillMingle</u></strong> and write the command <strong><u>npm start</u></strong></p>
<p>This will run the frontend on port no. 8000 or your desired port.</p>

<p>Now for backend get into the directory in terminal using <strong><u>cd SkillMingle Backend_Flask</u></strong> which will led you to backend directory and then run the command <strong><u>python app.py</u></strong></p>
<p>This will run the server on port no. 5000 or your desired port.</p>

<h2><strong>Step-4: </strong>Both Client and Server side should run simultaneously to make API calls smoothly.</h2>
<p>Just to check API calls fluency you can use <u>Postman</u>and hit the end point <u>http://127.0.0.1:5000/recommend</u> in POST method and in Body request for <b><u>{"freelancer_id": 1}</u></b></p>
<p>More details for frontend is given below.</p>

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


