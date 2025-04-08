import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Error from "@/components/common/Error";
import InputField from "@/components/common/InputField";
import CustomSelect from "@/components/common/CustomSelect";
import CustomTextArea from "@/components/common/CustomTextArea";
import useSubmitAssignment from "@/hooks/useSubmitAssignment";
import {
  isEmpty,
  validateEmail,
  validateURL,
  checkMinSymbols,
} from "@/utils/formValidators";

interface FormErrors {
  name?: string;
  email?: string;
  assignmentDescription?: string;
  gitHubRepoURL?: string;
  candidateLevel?: string;
}

interface SubmissionFieldProps {
  levels: string[];
}

const SubmissionField: React.FC<SubmissionFieldProps> = ({ levels }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [gitHubRepoURL, setGitHubRepoURL] = useState("");
  const [candidateLevel, setCandidateLevel] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors | null>(null);

  const router = useRouter();

  const { submitAssignment, isSubmitting, error } = useSubmitAssignment();

  const submit = async () => {
    const validationErrors = validateFields();
    setErrors(validationErrors);

    if (validationErrors === null) {
      const submissionData = {
        name: name.trim(),
        email: name.trim(),
        assignment_description: assignmentDescription.trim(),
        github_repo_url: gitHubRepoURL.trim(),
        candidate_level: candidateLevel,
      };

      const message = await submitAssignment(submissionData);
      if (message) {
        console.log(message);
        router.push("/thank-you");
      }
    }
  };

  const validateFields = (): FormErrors | null => {
    let nameError,
      emailError,
      assignmentDescriptionError,
      gitHubRepoURLError,
      candidateLevelError;

    if (isEmpty(name)) nameError = "Name field can't be empty!";

    if (isEmpty(email)) emailError = "Email field can't be empty!";
    else if (validateEmail(email)) emailError = "Please, enter real email!";

    if (isEmpty(assignmentDescription))
      assignmentDescriptionError = "Please, write assignment description.";
    else if (checkMinSymbols(assignmentDescription, 10))
      assignmentDescriptionError =
        "Assignment description should contain at least 10 symbols.";

    if (isEmpty(gitHubRepoURL))
      gitHubRepoURLError = "You should add GitHub repository url!";
    else if (validateURL(gitHubRepoURL))
      gitHubRepoURLError = "Please, enter real GitHub repository url.";

    if (isEmpty(candidateLevel))
      candidateLevelError = "Please, select candidate Level";

    if (
      nameError ||
      emailError ||
      assignmentDescriptionError ||
      gitHubRepoURLError ||
      candidateLevelError
    ) {
      return {
        name: nameError,
        email: emailError,
        assignmentDescription: assignmentDescriptionError,
        gitHubRepoURL: gitHubRepoURLError,
        candidateLevel: candidateLevelError,
      };
    } else {
      return null;
    }
  };

  if (error) return <Error message={error} />;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8 border-b-black">
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-xl shadow-md p-6">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-8 pb-6 border-b-1">
          Assignment Submission
        </h2>

        <div className="space-y-6">
          <InputField
            label="Name *"
            name="assignment-name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            error={errors?.name}
          />
          <InputField
            label="Email *"
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={errors?.email}
          />
          <CustomTextArea
            label="Assignment Description *"
            name="assignmentDescription"
            value={assignmentDescription}
            onChange={e => setAssignmentDescription(e.target.value)}
            error={errors?.assignmentDescription}
          />
          <InputField
            label="GitHub Repository URL *"
            name="github-repo"
            type="text"
            value={gitHubRepoURL}
            onChange={e => setGitHubRepoURL(e.target.value)}
            error={errors?.gitHubRepoURL}
          />
          <CustomSelect
            label="Candidate Level *"
            name="candidateLevel"
            value={candidateLevel}
            onChange={e => setCandidateLevel(e.target.value)}
            options={levels.map(level => ({
              value: level,
              label: level,
            }))}
            error={errors?.candidateLevel}
          />
        </div>

        <div className="text-center mt-10">
          <button
            onClick={submit}
            disabled={isSubmitting}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-700 transition"
          >
            {isSubmitting ? "Submitting..." : "Submit Assignment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionField;
