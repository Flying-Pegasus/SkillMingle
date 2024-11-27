from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json

# Load Data
with open("data.json", "r") as file:
    data = json.load(file)

freelancers = data["freelancers"]
jobs = data["jobs"]

# Compute Freelancer Recommendations for a Job
def recommend_freelancers(job_id):
    # Find the job by ID
    job = next((j for j in jobs if j["id"] == job_id), None)
    if not job:
        return []

    # Prepare skill data
    freelancer_skills = [" ".join(f["skills"]) for f in freelancers]
    job_skills = [" ".join(job["skills_required"])]

    # Compute similarity
    vectorizer = CountVectorizer()
    skill_matrix = vectorizer.fit_transform(freelancer_skills + job_skills)
    freelancer_matrix = skill_matrix[:len(freelancers)]
    job_matrix = skill_matrix[len(freelancers):]

    similarity_scores = cosine_similarity(freelancer_matrix, job_matrix).flatten()

    # Generate recommendations
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
        if similarity_scores[i] > 0  # Filter out freelancers with 0 similarity
    ]
    recommendations.sort(key=lambda x: x["score"], reverse=True)
    return recommendations

# Testing the Function
if __name__ == "__main__":
    job_id = 1  # Example Job ID
    recommendations = recommend_freelancers(job_id)

    print(f"Recommendations for Job ID {job_id}:\n")
    for rec in recommendations:
        print(
            f"Freelancer ID: {rec['freelancer_id']}, "
            f"Name: {rec['name']}, "
            f"Skills: {', '.join(rec['skills'])}, "
            f"Rating: {rec['rating']}, "
            f"Hourly Rate: ${rec['hourly_rate']}/hr, "
            f"Score: {rec['score']}"
        )
