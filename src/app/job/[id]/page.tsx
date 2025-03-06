"use client"; 

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";  // Use useParams instead of useRouter
import JobDetails from "../../../components/JobDetails";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  requiredSkills: string[];
  matchScore: number;
}

const JobPage: React.FC = () => {
  const { id } = useParams();  // Access params using useParams
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch the job data based on the id
      const fetchJob = async () => {
        const response = await fetch("/jobs.json");
        const jobs: Job[] = await response.json();
        const foundJob = jobs.find((job) => job.id === Number(id));

        if (foundJob) {
          setJob(foundJob);
        } else {
          console.log("Job not found");
        }
      };

      fetchJob();
    }
  }, [id]);  // Re-fetch data whenever the job ID changes

  if (!job) {
    return <p>Loading...</p>;  // Show loading message if job is not fetched yet
  }

  return (
    <div className="container mx-auto mt-6 px-4">
      <JobDetails
        title={job.title}
        company={job.company}
        location={job.location}
        salary={job.salary}
        requiredSkills={job.requiredSkills}
        matchScore={job.matchScore}
      />
    </div>
  );
};

export default JobPage;
