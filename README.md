# MERN-GraphQL-SemanticSearch

**MERN-GraphQL-SemanticSearch** is a full-stack web application that enables **AI-powered semantic search** across movies using the **MongoDB Sample-Mflix dataset**. It allows users to search by context, retrieving relevant movie titles, plots, and languages.

## Features
- **Semantic Search:** Understands the meaning of queries, not just keywords.
- **GraphQL API:** Flexible and efficient queries for movies, plots, and languages.
- **MERN Stack:** React frontend, Node.js/Express backend, MongoDB database.
- **Responsive UI:** Clean and intuitive interface.

## Tech Stack
- **Frontend:** React, TailwindCSS
- **Backend:** Node.js, Express, Apollo Server (GraphQL)
- **Database:** MongoDB (Sample-Mflix dataset)
- **Other Tools:** dotenv for environment variables

## Getting Started

1. **Clone the repository:**
```bash
git clone https://github.com/PLVyshnaviDevi/MERN-GraphQL-SemanticSearch.git
```

2. **Install dependencies:**

    **react, react-dom** → Core React

    **@apollo/client** → Apollo Client for GraphQL queries/mutations

    **graphql** → Required for Apollo

    **tailwindcss, postcss, autoprefixer** → For styling (your code uses Tailwind classes)

Backend
```bash
npm install express apollo-server-express graphql mongoose mongodb dotenv @huggingface/inference
```
   
Frontend

```bash
npm install react react-dom @apollo/client graphql
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
```



3. **Configure environment variables:**
    Create a **.env** file with your MongoDB connection string and hugging face API key - "**HF_API_KEY**" and "**MONGO_URI**".


4. **Run the project**
```bash
cd backend && npm start
cd ../frontend && npm start
```

