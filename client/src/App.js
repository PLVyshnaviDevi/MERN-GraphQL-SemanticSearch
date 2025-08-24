import React, { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useLazyQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const SEMANTIC_SEARCH = gql`
  query SemanticSearch($query: String!) {
    semanticSearch(query: $query) {
      id
      title
      plot
      poster
    }
  }
`;

function SearchApp() {
  const [query, setQuery] = useState("");
  const [semanticSearch, { data, loading, error }] = useLazyQuery(SEMANTIC_SEARCH);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      semanticSearch({ variables: { query } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold">
        Semantic Movie Search
      </header>

      <main className="p-6 flex flex-col items-center">
        <form onSubmit={handleSearch} className="w-full max-w-md flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        {loading && <p className="mt-4 text-gray-600">Searching...</p>}
        {error && <p className="mt-4 text-red-500">Error: {error.message}</p>}

        {data?.semanticSearch?.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
            {data.semanticSearch.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
              >
                <img
                  src={movie.poster || "https://via.placeholder.com/150"}
                  alt={movie.title}
                  className="w-32 h-32 object-cover mb-3"
                />
                <p className="font-medium text-gray-700 text-center">{movie.title}</p>
                <p className="text-sm text-gray-500 mt-2">{movie.plot}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SearchApp />
    </ApolloProvider>
  );
}
