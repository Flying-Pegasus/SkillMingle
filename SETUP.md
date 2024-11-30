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
<p>More details for frontend is given in ReadMe.MD file.</p>

