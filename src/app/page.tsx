"use client"; 

import { useEffect, useState } from "react";
import Link from "next/link";

// Define the Job type
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
}

const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]); // Ensure jobs is typed as an array of Job objects
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/jobs.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load jobs");
        return res.json();
      })
      .then((data: Job[]) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setError("Failed to load job listings. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">🚀 AI Job Match Dashboard</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs available at the moment.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="p-4 border rounded-lg shadow-lg transition hover:shadow-xl bg-white"
            >
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">
                {job.company} - {job.location}
              </p>
              <p className="font-medium">💰 Salary: {job.salary}</p>

              {/* Match Score */}
              <p className="mt-2">
                Match Score:{" "}
                <span
                  className={`font-bold ${
                    job.matchScore >= 80
                      ? "text-green-500"
                      : job.matchScore >= 50
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {job.matchScore}%
                </span>
              </p>

              {/* View Details Button */}
              <Link href={`/job/${job.id}`} passHref>
                <button className="mt-3 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                  View Details
                </button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
