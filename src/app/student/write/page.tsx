import { AuthSSR } from "@/api/AuthSSR";
import PaperSubmissionForm from "@/components/pages/PaperSubmissionForm/PaperSubmissionForm";

export default async function StudentWritePage() {
  await AuthSSR({ userType: "STUDENT" });

  return <PaperSubmissionForm />;
}
