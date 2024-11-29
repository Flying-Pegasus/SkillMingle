from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from geopy.distance import geodesic  # Install geopy using `pip install geopy`
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


def calculate_average_rating(past_freelancers):
    if not past_freelancers:
        return 0
    return round(
        sum(freelancer.get("rating", 0) for freelancer in past_freelancers) / len(past_freelancers), 2
    )


def recommend_jobs(freelancer_id):
    # Retrieve freelancer details
    freelancer = next((f for f in freelancers if f["id"] == freelancer_id), None)
    if not freelancer:
        return []

    # Prepare freelancer skills
    freelancer_skills = set(freelancer["skills"])

    recommendations = []
    for job in jobs:
        # Ensure at least one matching skill
        job_skills = set(job["skills_required"])
        skill_overlap = freelancer_skills.intersection(job_skills)
        if not skill_overlap:
            continue  # Skip jobs with no matching skills

        # Base Skill Score using cosine similarity
        skill_vectorizer = CountVectorizer()
        skill_matrix = skill_vectorizer.fit_transform(
            [" ".join(freelancer_skills), " ".join(job_skills)]
        )
        skill_similarity_score = cosine_similarity(skill_matrix[0], skill_matrix[1])[0][0]

        # Additional Factors
        score = skill_similarity_score

        # Location Boost
        if freelancer.get("location") and job.get("location"):
            if freelancer["location"].lower() == job["location"].lower():
                score += 0.2  # Boost for exact location match

        # Budget Boost
        try:
            budget = int(job["budget"])  # Ensure budget is an integer
            hourly_rate = freelancer.get("hourly_rate", 0)
            if hourly_rate > 0 and budget / hourly_rate >= 10:
                score += 0.1  # Boost if budget supports at least 10 hours
        except ValueError:
            print(f"Invalid budget format for job ID {job['id']}: {job['budget']}")

        # Rating Boost
        past_jobs = freelancer.get("past_jobs", [])
        avg_rating = (
            sum(job.get("rating", 0) for job in past_jobs) / len(past_jobs) if past_jobs else 0
        )
        if avg_rating > 0:
            score += (avg_rating / 5) * 0.2  # Boost proportional to average rating (scaled to 20%)

        # Add job details and final score to recommendations
        recommendations.append({
            "job_id": job["id"],
            "company": job["company"],
            "title": job["title"],
            "skills_required": list(job_skills),
            "budget": job["budget"],
            "location": job.get("location", "Not specified"),
            "preferred_experience": job.get("preferred_experience", "Not specified"),
            "past_freelancers": job.get("past_freelancers", []),
            "score": round(score, 2)
        })

    # Sort recommendations by Final Score in descending order
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
            "hourly_rate": freelancer_data.get("hourly_rate"),
            "location": freelancer_data.get("location", None),
            "past_jobs": []
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

def recommend_freelancers(job_id):
    # Retrieve job details
    job = next((j for j in jobs if j["id"] == job_id), None)
    if not job:
        return []

    # Prepare job skills for comparison
    job_skills = set(job["skills_required"])

    recommendations = []
    for freelancer in freelancers:
        # Ensure at least one matching skill
        freelancer_skills = set(freelancer["skills"])
        skill_overlap = job_skills.intersection(freelancer_skills)
        if not skill_overlap:
            continue  # Skip freelancers with no matching skills

        # Skill Score using cosine similarity
        skill_vectorizer = CountVectorizer()
        skill_matrix = skill_vectorizer.fit_transform(
            [" ".join(job_skills), " ".join(freelancer_skills)]
        )
        skill_similarity_score = cosine_similarity(skill_matrix[0], skill_matrix[1])[0][0]
        score = skill_similarity_score

        # Location Boost
        if freelancer.get("location") and job.get("location"):
            if freelancer["location"].lower() == job["location"].lower():
                score += 0.2  # Boost for exact location match

        # Hourly Rate Alignment Boost
        try:
            budget = int(job["budget"])  # Ensure budget is an integer
            hourly_rate = int(freelancer.get("hourly_rate", 0))  # Convert hourly_rate to integer
            if hourly_rate > 0 and budget / hourly_rate >= 10:
                score += 0.1  # Boost if freelancer fits within budget for at least 10 hours
        except (ValueError, TypeError):
            print(f"Invalid budget or hourly_rate for freelancer {freelancer['name']}: "
                  f"budget={job.get('budget')}, hourly_rate={freelancer.get('hourly_rate')}")

        # Past Job Experience Boost
        past_jobs = freelancer.get("past_jobs", [])
        avg_rating = (
            sum(job.get("rating", 0) for job in past_jobs) / len(past_jobs) if past_jobs else 0
        )
        if avg_rating > 0:
            score += (avg_rating / 5) * 0.2  # Boost proportional to average rating (scaled to 20%)

        # Add freelancer details and final score to recommendations
        recommendations.append({
            "freelancer_id": freelancer["id"],
            "name": freelancer["name"],
            "skills": list(freelancer_skills),
            "location": freelancer.get("location", "Not specified"),
            "past_jobs": freelancer.get("past_jobs", []),
            "hourly_rate": freelancer.get("hourly_rate", "Not specified"),
            "score": round(score, 2)
        })

    # Sort recommendations by Final Score in descending order
    recommendations.sort(key=lambda x: x["score"], reverse=True)
    return recommendations



# API Endpoint: Add Employer
@app.route("/add_employer", methods=["POST"])
def add_employer():
    try:
        employer_data = request.json

        new_job_id = len(jobs) + 1  # Generate a new job ID

        new_employer_job = {
            "id": new_job_id,
            "company": employer_data["company"],
            "title": employer_data["title"],
            "skills_required": employer_data["skills_required"],
            "budget": employer_data["budget"],
            "location": employer_data.get("location", None),
            "preferred_experience": employer_data.get("preferred_experience", None),
            "past_freelancers": []
        }

        # Append the new employer job to the list
        jobs.append(new_employer_job)
        save_data()  # Save changes to file

        print(f"New employer job added: {new_employer_job}")  # Log new job added

        return jsonify({"message": "Employer job added successfully!", "job_id": new_job_id})

    except Exception as e:
        print("Error occurred in /add_employer:", traceback.format_exc())
        return jsonify({"error": str(e)}), 500

#Check for already existing freelancer    
@app.route("/freelancers", methods=["GET"])
def get_freelancers():
    try:
        with open("data.json", "r") as file:
            data = json.load(file)
        return jsonify(data["freelancers"])  # Return the freelancers list
    except Exception as e:
        print("Error fetching freelancers:", traceback.format_exc())
        return jsonify({"error": "Failed to fetch freelancers"}), 500


#Check for already existing company    
@app.route("/employers", methods=["GET"])
def get_employers():
    try:
        with open("data.json", "r") as file:
            data = json.load(file)
        return jsonify(data["jobs"])  # Return the list of jobs
    except Exception as e:
        print("Error fetching employers:", traceback.format_exc())
        return jsonify({"error": "Failed to fetch employers"}), 500

@app.route("/rate_job", methods=["POST"])
def rate_job():
    try:
        data = request.json
        job_id = data["job_id"]
        rating = data["rating"]

        with open("data.json", "r") as file:
            json_data = json.load(file)

        # Find the job and append the freelancer's rating
        for job in json_data["jobs"]:
            if job["id"] == job_id:
                job["past_freelancers"].append({
                    "freelancer_id": 1,  # Replace with dynamic freelancer ID
                    "rating": rating
                })

        # Save the updated data.json
        with open("data.json", "w") as file:
            json.dump(json_data, file, indent=4)

        return jsonify({"message": "Rating submitted successfully!"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# API Endpoint: Rate Freelancer
@app.route("/rate_freelancer", methods=["POST"])
def rate_freelancer():
    try:
        data = request.json
        freelancer_id = data["freelancer_id"]
        new_rating = data["rating"]

        # Find the freelancer by ID and update their rating
        freelancer = next((f for f in freelancers if f["id"] == freelancer_id), None)
        if freelancer:
            freelancer["rating"] = new_rating  # Update freelancer's rating
            save_data()  # Save the changes to data.json
            return jsonify({"message": "Rating submitted successfully!"})
        else:
            return jsonify({"error": "Freelancer not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500




# Test the Application
if __name__ == "__main__":
    app.run(debug=True)
