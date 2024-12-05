import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from the React frontend

# Path to job.json file
JOB_FILE = "job.json"
FREELANCER_FILE = "freelancer.json"

# Example data
with open('job.json', 'r') as file:
    job_data = json.load(file)

with open('freelancer.json', 'r') as file:
    freelancer_data = json.load(file)

@app.route('/job_details/<int:job_id>', methods=['GET'])
def get_job_details(job_id):
    # Find job by ID
    job = next((job for job in job_data if job["id"] == job_id), None)
    if not job:
        return jsonify({"error": "Job not found"}), 404
    return jsonify(job), 200

@app.route('/freelancer_details/<int:freelancer_id>', methods=['GET'])
def get_freelancer_details(freelancer_id):
    # Find freelancer by ID
    freelancer = next((freelancer for freelancer in freelancer_data if freelancer["id"] == freelancer_id), None)
    if not freelancer:
        return jsonify({"error": "Freelancer not found"}), 404
    return jsonify(freelancer), 200

def calculate_recommendation_score(job, freelancer):

    # 1. Skill Matching
    job_skills = set(job["skills"])
    freelancer_skills = set(freelancer["skills"])
    matched_skills = job_skills.intersection(freelancer_skills)

    # Exclude freelancer if no skills match
    if not matched_skills:
        return None  # Return None to indicate this freelancer should be excluded
    
    score = 0


    skill_score = len(matched_skills) / len(job_skills) * 50  # Weighted 50
    score += skill_score

    # 2. Budget Compliance
    start_rate = job["startRate"]
    end_rate = job["endRate"]
    if freelancer["hourlyRate"] <= end_rate:
        score += 20  # Weighted 20
    else:
        score -= 10  # Penalize if out of budget

    # 3. Experience
    experience_score = (
        (freelancer["jobSuccess"] * 0.4) +
        (freelancer["totalHours"] * 0.2) +
        (freelancer["totalJobs"] * 0.2)
    )
    score += experience_score

    # 4. Location Match
    if job["clientCountry"] == freelancer["country"]:
        score += 5  # Small bonus for location match

    return score

def calculate_job_recommendation_score(freelancer, job):
    score = 0

    # 1. Skill Matching
    job_skills = set(job["skills"])
    freelancer_skills = set(freelancer["skills"])
    matched_skills = job_skills.intersection(freelancer_skills)
    if len(matched_skills) == 0:
        return None  # Skip this job if no skills match
    
    skill_score = len(matched_skills) / len(job_skills) * 60  # Weighted 50
    score += skill_score

    # 2. Budget Compliance (Freelancer's hourlyRate should be within job's startRate and endRate)
    start_rate = job["startRate"]
    end_rate = job["endRate"]
    if freelancer["hourlyRate"] <= end_rate:
        score += 20  # Weighted 20
    else:
        score -= 10  # Penalize if out of budget

    # 3. Experience Level Demand (Penalize if job demands more experience than freelancer has)
    if job["exLevelDemand"] > freelancer["jobSuccess"]:
        score -= 5  # Penalize if the freelancer doesn't meet the experience demand

    # 4. Location Match (Small bonus for location match)
    if job["clientCountry"] == freelancer["country"]:
        score += 5  # Small bonus for location match

    # 5. Ratings and feedback
    rating_score = (
        (job["rating"] * 0.6) +
        (job["feedbackNum"] * 0.07) 
    )
    score += rating_score

    return score


@app.route('/store_job', methods=['POST'])
def store_job():
    try:
        # Get the new job data from the request
        new_job = request.json

        # Ensure proper types for numeric fields
        new_job['exLevelDemand'] = int(new_job.get('exLevelDemand', 0))
        new_job['rating'] = float(new_job.get('rating', 0.0))
        new_job['feedbackNum'] = int(new_job.get('feedbackNum', 0))
        new_job['startRate'] = int(new_job.get('startRate', 0))
        new_job['endRate'] = int(new_job.get('endRate', 0))

        # Check if the job file exists
        if not os.path.exists(JOB_FILE):
            with open(JOB_FILE, 'w') as file:
                json.dump([], file)

        # Load existing jobs
        with open(JOB_FILE, 'r') as file:
            jobs = json.load(file)

        # Assign a new ID
        new_job['id'] = jobs[-1]['id'] + 1 if jobs else 1

        # Append the job and save
        jobs.append(new_job)
        with open(JOB_FILE, 'w') as file:
            json.dump(jobs, file, indent=4)

        return jsonify({"message": "Job stored successfully!", "id": new_job['id']}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500
    
@app.route('/store_freelancer', methods=['POST'])
def store_freelancer():
    try:
        new_freelancer = request.json

        # Ensure proper types for numeric fields
        new_freelancer['hourlyRate'] = float(new_freelancer.get('hourlyRate', 0.0))
        new_freelancer['jobSuccess'] = float(new_freelancer.get('jobSuccess', 0.0))
        new_freelancer['totalHours'] = int(new_freelancer.get('totalHours', 0))
        new_freelancer['totalJobs'] = int(new_freelancer.get('totalJobs', 0))

        # Check if the job file exists
        if not os.path.exists(FREELANCER_FILE):
            with open(FREELANCER_FILE, 'w') as file:
                json.dump([], file)

        # Load existing jobs
        with open(FREELANCER_FILE, 'r') as file:
            freelancers = json.load(file)

        # Assign a new ID
        new_freelancer['id'] = freelancers[-1]['id'] + 1 if freelancers else 1

        # Append the job and save
        freelancers.append(new_freelancer)
        with open(FREELANCER_FILE, 'w') as file:
            json.dump(freelancers, file, indent=4)

        return jsonify({"message": "Freelancer stored successfully!", "id": new_freelancer['id']}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500





@app.route('/get_job/<int:job_id>', methods=['GET'])
def get_job(job_id):
    try:
        # Load existing jobs
        with open(JOB_FILE, 'r') as file:
            jobs = json.load(file)

        # Find the job with the given ID
        job = next((job for job in jobs if job['id'] == job_id), None)

        if job is None:
            return jsonify({"error": "Job not found"}), 404

        return jsonify(job), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500
    
@app.route('/get_freelancer/<int:freelancer_id>', methods=['GET'])
def get_freelancer(freelancer_id):
    try:
        # Load existing jobs
        with open(FREELANCER_FILE, 'r') as file:
            freelancers = json.load(file)

        # Find the job with the given ID
        freelancer = next((freelancer for freelancer in freelancers if freelancer['id'] == freelancer_id), None)

        if freelancer is None:
            return jsonify({"error": "Freelancer not found"}), 404

        return jsonify(freelancer), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500



@app.route('/freelancers', methods=['GET'])
def get_freelancers():
    try:
        with open('freelancer.json', 'r') as file:
            freelancers = json.load(file)
        return jsonify(freelancers), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route('/jobs', methods=['GET'])
def get_jobs():
    try:
        with open('job.json', 'r') as file:
            jobs = json.load(file)
        return jsonify(jobs), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


@app.route("/recommend_freelancers", methods=["POST"])
def recommend_freelancers():
    try:
        # Load job and freelancer data
        job = request.json
        with open("freelancer.json", "r") as file:
            freelancers = json.load(file)

        # Calculate recommendation scores
        recommendations = []
        for freelancer in freelancers:
            score = calculate_recommendation_score(job, freelancer)
            if score is not None:  # Only include freelancers with matching skills
                recommendations.append({
                    "freelancer": freelancer,
                    "score": score
                })

        # Sort freelancers by recommendation score (high to low)
        sorted_recommendations = sorted(recommendations, key=lambda x: x["score"], reverse=True)

        # Return the sorted list of freelancers
        return jsonify(sorted_recommendations), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
@app.route("/recommend_jobs", methods=["POST"])
def recommend_jobs():
    try:
        # Load freelancer and job data
        freelancer = request.json
        with open("job.json", "r") as file:
            jobs = json.load(file)

        # Calculate recommendation scores for each job
        job_recommendations = []
        for job in jobs:
            score = calculate_job_recommendation_score(freelancer, job)
            if score is not None:  # Only include jobs with a valid score
                job_recommendations.append({
                    "job": job,
                    "score": score
                })

        # Sort jobs by recommendation score (high to low)
        sorted_job_recommendations = sorted(job_recommendations, key=lambda x: x["score"], reverse=True)

        # Return the sorted list of jobs
        return jsonify(sorted_job_recommendations), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
if __name__ == '__main__':
    app.run(debug=True)