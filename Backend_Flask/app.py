from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json
import traceback

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from the React frontend

# Load Data Once at Startup
with open("data.json", "r") as file:
    data = json.load(file)

freelancers = data["freelancers"]
jobs = data["jobs"]

# Utility Function: Save Data Back to File
def save_data():
    with open("data.json", "w") as file:
        json.dump(data, file, indent=4)

# Utility: Recommend Jobs for a Freelancer
def recommend_jobs(freelancer_id):
    freelancer = next((f for f in freelancers if f["id"] == freelancer_id), None)
    if not freelancer:
        return []

    freelancer_skills = [" ".join(freelancer["skills"])]
    job_skills = [" ".join(j["skills_required"]) for j in jobs]

    # Compute similarity
    vectorizer = CountVectorizer()
    skill_matrix = vectorizer.fit_transform(freelancer_skills + job_skills)
    freelancer_matrix = skill_matrix[:1]
    job_matrix = skill_matrix[1:]

    similarity_scores = cosine_similarity(freelancer_matrix, job_matrix).flatten()

    recommendations = [
        {
            "job_id": jobs[i]["id"],
            "title": jobs[i]["title"],
            "skills_required": jobs[i]["skills_required"],
            "budget": jobs[i]["budget"],
            "score": round(similarity_scores[i], 2),
        }
        for i in range(len(jobs))
        if similarity_scores[i] > 0  # Exclude jobs with 0 similarity
    ]
    recommendations.sort(key=lambda x: x["score"], reverse=True)
    return recommendations

# API Endpoint: Recommend Jobs for a Freelancer
@app.route("/recommend", methods=["POST"])
def recommend_jobs_api():
    try:
        freelancer_id = request.json.get("freelancer_id")
        if not freelancer_id:
            return jsonify({"error": "Invalid freelancer ID"}), 400

        recommendations = recommend_jobs(int(freelancer_id))
        if not recommendations:
            return jsonify({"error": "No recommendations available for this freelancer ID"}), 404

        return jsonify(recommendations)

    except Exception as e:
        print("Error occurred in /recommend:", traceback.format_exc())
        return jsonify({"error": "Internal server error"}), 500

# API Endpoint: Add Freelancer
@app.route("/add_freelancer", methods=["POST"])
def add_freelancer():
    try:
        freelancer_data = request.json

        # Validate freelancer data
        if not freelancer_data.get("name") or not freelancer_data.get("skills"):
            return jsonify({"error": "Name and skills are required"}), 400

        if not isinstance(freelancer_data.get("skills"), list):
            return jsonify({"error": "Skills must be a list"}), 400

        new_freelancer_id = len(freelancers) + 1  # Generate a new ID

        new_freelancer = {
            "id": new_freelancer_id,
            "name": freelancer_data["name"],
            "skills": freelancer_data["skills"],
            "hourly_rate": freelancer_data["hourly_rate"],
            "rating": freelancer_data["rating"],
        }

        # Append the new freelancer to the list
        freelancers.append(new_freelancer)
        save_data()  # Save changes to file

        print("Updated Freelancer Data:", new_freelancer)  # Log the new freelancer

        return jsonify({"message": "Freelancer added successfully!", "freelancer_id": new_freelancer_id})

    except Exception as e:
        print("Error occurred in /add_freelancer:", traceback.format_exc())
        return jsonify({"error": str(e)}), 500

# API Endpoint: Recommend Freelancers for a Job
@app.route("/recommend_freelancers", methods=["POST"])
def recommend_freelancers_api():
    try:
        job_id = request.json.get("job_id")
        if not job_id:
            return jsonify({"error": "Invalid job ID"}), 400

        recommendations = recommend_freelancers(int(job_id))
        if not recommendations:
            return jsonify({"error": "No recommendations available for this job ID"}), 404

        return jsonify(recommendations)

    except Exception as e:
        print("Error occurred in /recommend_freelancers:", traceback.format_exc())
        return jsonify({"error": "Internal server error"}), 500

# Utility: Recommend Freelancers for a Job
def recommend_freelancers(job_id):
    job = next((j for j in jobs if j["id"] == job_id), None)
    if not job:
        return []

    freelancer_skills = [" ".join(f["skills"]) for f in freelancers]
    job_skills = [" ".join(job["skills_required"])]

    # Compute similarity
    vectorizer = CountVectorizer()
    skill_matrix = vectorizer.fit_transform(freelancer_skills + job_skills)
    freelancer_matrix = skill_matrix[:len(freelancers)]
    job_matrix = skill_matrix[len(freelancers):]

    similarity_scores = cosine_similarity(freelancer_matrix, job_matrix).flatten()

    recommendations = [
        {
            "freelancer_id": freelancers[i]["id"],
            "name": freelancers[i]["name"],
            "skills": freelancers[i]["skills"],
            "rating": freelancers[i]["rating"],
            "hourly_rate": freelancers[i]["hourly_rate"],
            "score": round(similarity_scores[i], 2),
        }
        for i in range(len(freelancers))
        if similarity_scores[i] > 0  # Exclude freelancers with 0 similarity
    ]
    recommendations.sort(key=lambda x: x["score"], reverse=True)
    return recommendations

# API Endpoint: Add Employer
@app.route("/add_employer", methods=["POST"])
def add_employer():
    try:
        employer_data = request.json

        new_employer_job = {
            "id": len(jobs) + 1,  # Generate a new job ID
            "company": employer_data["company"],
            "title": employer_data["title"],
            "skills_required": employer_data["skills_required"],
            "budget": employer_data["budget"],
        }

        # Append the new employer job to the list
        jobs.append(new_employer_job)
        save_data()  # Save changes to file

        return jsonify({"message": "Employer job added successfully!"})

    except Exception as e:
        print("Error occurred in /add_employer:", traceback.format_exc())
        return jsonify({"error": str(e)}), 500

# Test the Application
if __name__ == "__main__":
    app.run(debug=True)
