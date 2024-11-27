import json
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load Data
with open("data.json", "r") as file:
    data = json.load(file)

freelancers = data["freelancers"]
jobs = data["jobs"]

# Combine Skills into Strings
freelancer_skills = [" ".join(f["skills"]) for f in freelancers]
job_skills = [" ".join(j["skills_required"]) for j in jobs]

# Create Skill Vectors
vectorizer = CountVectorizer()
skill_matrix = vectorizer.fit_transform(freelancer_skills + job_skills)

# Split into Freelancer and Job Matrices
freelancer_matrix = skill_matrix[:len(freelancers)]
job_matrix = skill_matrix[len(freelancers):]

# Compute Similarity
similarity_matrix = cosine_similarity(freelancer_matrix, job_matrix)

# Print Recommendations
print("Similarity Matrix:")
for i, freelancer in enumerate(freelancers):
    print(f"\nFreelancer: {freelancer['name']}")
    recommendations = sorted(
        enumerate(similarity_matrix[i]),
        key=lambda x: x[1],
        reverse=True
    )
    for job_idx, score in recommendations:
        print(f"  Job: {jobs[job_idx]['title']} | Similarity: {score:.2f}")
