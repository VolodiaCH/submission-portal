import React from "react";
import ErrorComponent from "@/components/common/Error";
import SubmissionField from "@/components/pages/SubmissionPortal/SubmissionPortal";

interface HomePageProps {
  levels?: string[];
  error?: string;
}

const HomePage: React.FC<HomePageProps> = ({ levels, error }) => {
  if (error) return <ErrorComponent message={error} />;

  return <SubmissionField levels={levels || []} />;
};

export const getServerSideProps = async () => {
  try {
    const levelsResponse = await fetch(
      "https://tools.qa.ale.ai/api/tools/candidates/levels",
    );

    if (!levelsResponse.ok) {
      throw new Error("Failed to fetch levels");
    }

    const levelsData = await levelsResponse.json();

    return {
      props: {
        levels: levelsData.levels,
      },
    };
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return {
        props: {
          error: error.message,
        },
      };
    } else {
      return {
        props: {
          error: `${error}`,
        },
      };
    }
  }
};

export default HomePage;
