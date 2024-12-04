# SkillMingle

SkillMingle is a platform that connects freelancers with employers. It allows freelancers to showcase their skills and employers to post job opportunities.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [Python](https://www.python.org/downloads/) (v3.6 or higher)
- [pip](https://pip.pypa.io/en/stable/installation/)

### Backend Setup

1. Navigate to the `Backend_Flask` directory:
    ```sh
    cd Backend_Flask
    ```

2. Install the required Python packages:
    ```sh
    pip install Flask Flask-Cors scikit-learn geopy jsonify
    ```

3. Start the Flask server:
    ```sh
    python app.py
    ```

### Frontend Setup

1. Navigate to the root directory of the project:
    ```sh
    cd ..
    ```

2. Install the required Node.js packages:
    ```sh
    npm install
    ```

3. Start the React development server:
    ```sh
    npm start
    ```

## Usage

Once both the frontend and backend servers are running, you can access the application in your web browser at `http://localhost:3000`.

### API Testing

You can use [Postman](https://www.postman.com/) to test the API endpoints. For example, to test the recommendation endpoint, send a POST request to `http://127.0.0.1:5000/recommend` with the following JSON body:
```json
{
    "freelancer_id": 1
}
```

## Project Structure
.
├── Backend_Flask/
│   ├── app.py
│   ├── [data.json](http://_vscodecontentref_/1)
│   ├── [freelancer_details.json](http://_vscodecontentref_/2)
│   ├── [freelancer.json](http://_vscodecontentref_/3)
│   ├── [job_details.json](http://_vscodecontentref_/4)
│   ├── [job.json](http://_vscodecontentref_/5)
├── public/
│   ├── [index.html](http://_vscodecontentref_/6)
│   ├── [manifest.json](http://_vscodecontentref_/7)
│   ├── [robots.txt](http://_vscodecontentref_/8)
├── src/
│   ├── components/
│   │   ├── [EmployerApp.js](http://_vscodecontentref_/9)
│   │   ├── EmployerDashboard.js
│   │   ├── [FreeLancerApp.js](http://_vscodecontentref_/10)
│   │   ├── [FreelancerCard.js](http://_vscodecontentref_/11)
│   │   ├── [FreelancerDashboard.js](http://_vscodecontentref_/12)
│   │   ├── [HomePage.js](http://_vscodecontentref_/13)
│   │   ├── [JobCard.js](http://_vscodecontentref_/14)
│   ├── styles/
│   │   ├── EmployerDashboard.css
│   │   ├── [FreelancerCard.css](http://_vscodecontentref_/15)
│   ├── [App.css](http://_vscodecontentref_/16)
│   ├── [App.js](http://_vscodecontentref_/17)
│   ├── App.test.js
│   ├── [index.css](http://_vscodecontentref_/18)
│   ├── [index.js](http://_vscodecontentref_/19)
│   ├── reportWebVitals.js
│   ├── setupTests.js
├── .gitignore
├── [package.json](http://_vscodecontentref_/20)
├── [README.md](http://_vscodecontentref_/21)

## API Endpoints

### Freelancer Endpoints

- `GET /freelancers`: Retrieve a list of all freelancers.
- `GET /freelancers/:id`: Retrieve details of a specific freelancer.
- `POST /store_freelancer`: Store a new freelancer's details.

### Job Endpoints

- `GET /jobs`: Retrieve a list of all jobs.
- `GET /jobs/:id`: Retrieve details of a specific job.
- `POST /store_job`: Store a new job's details.

### Recommendation Endpoint

- `POST /recommend`: Get job recommendations for a freelancer.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.