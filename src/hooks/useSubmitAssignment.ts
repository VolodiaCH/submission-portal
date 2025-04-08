import { useState } from "react";

interface SubmissionData {
  name: string;
  email: string;
  assignment_description: string;
  github_repo_url: string;
  candidate_level: string;
}

const useSubmitAssignment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitAssignment = async (data: SubmissionData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        "https://tools.qa.ale.ai/api/tools/candidates/assignments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();
      if (response.ok) {
        return result.message;
      } else {
        throw new Error(result.errors || "Unknown error");
      }
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitAssignment, isSubmitting, error };
};

export default useSubmitAssignment;
