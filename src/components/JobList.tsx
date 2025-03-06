// src/components/JobList.tsx
import React from 'react';
import Link from 'next/link';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
}

const JobList: React.FC<{ jobs: Job[] }> = ({ jobs }) => {
  const getMatchColor = (score: number): string => {
    if (score >= 80) return 'bg-green-500'; // Green for 80%+
    if (score >= 50) return 'bg-yellow-500'; // Yellow for 50%-79%
    return 'bg-red-500'; // Red for <50%
  };

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="flex justify-between items-center p-4 border rounded-lg shadow-md"
        >
          <div>
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-sm">{job.company} | {job.location}</p>
            <p className="text-sm">{job.salary}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`text-white p-1 px-3 rounded ${getMatchColor(job.matchScore)}`}
            >
              {job.matchScore}%
            </div>
            <Link href={`/job/${job.id}`}>
              <button className="text-blue-500 hover:underline">View Details</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;
