"use client";  //  Required for React hooks in Next.js App Router

import { useEffect, useState } from "react";
import Link from "next/link";

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("/jobs.json") //  Fetch mock job data from public folder
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">AI Job Match Dashboard</h1>

      {/* Job List */}
      {jobs.length === 0 ? (
        <p>Loading jobs...</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id} className="mb-4 p-4 border rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.company} - {job.location}</p>
              <p className="font-medium">Salary: {job.salary}</p>

              {/*  Match Score */}
              <p>
                Match Score:{" "}
                <span
                  className={`font-bold text-${job.matchScore >= 80 ? "green" : job.matchScore >= 50 ? "yellow" : "red"}-500`}
                >
                  {job.matchScore}%
                </span>
              </p>

              {/*  View Details */}
              <Link href={`/job/${job.id}`}>
                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
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
