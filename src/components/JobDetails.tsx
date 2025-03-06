import React from "react";
const handleApply = (requiredSkills: string[]) => {
    const userSkills = ['JavaScript', 'React']; // Mock user skills (this should come from a user profile in real apps)
    const missingSkills = requiredSkills.filter((skill) => !userSkills.includes(skill));
  
    if (missingSkills.length > 0) {
      alert(`You are missing the following skills: ${missingSkills.join(', ')}. Consider upskilling.`);
    } else {
      alert('You have successfully applied for the job!');
    }
  };
interface JobDetailsProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  requiredSkills: string[];
  matchScore: number;
}

const JobDetails: React.FC<JobDetailsProps> = ({
  title,
  company,
  location,
  salary,
  requiredSkills,
  matchScore,
}) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-gray-600">{company} - {location}</p>
      <p className="mt-2 text-lg font-semibold">💰 {salary}</p>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Required Skills:</h3>
        <ul className="list-disc ml-5 text-gray-700">
          {requiredSkills.map((skill, index) => (
            <li key={index} className="mt-1">{skill}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <p className="text-lg font-semibold">
          Match Score: <span className="font-bold">{matchScore}%</span>
        </p>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
          <div
            className={`h-4 rounded-full ${
              matchScore >= 80
                ? "bg-green-500"
                : matchScore >= 50
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{ width: `${matchScore}%` }}
          ></div>
        </div>
      </div>

      
<button
  onClick={() => handleApply(requiredSkills)}
  className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
>
  Apply Now
</button>
    </div>
  );
};

export default JobDetails;
