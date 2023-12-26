import { AuthSSR } from "@/api/AuthSSR";
import MainImage from "@/components/common/MainImage";

export default async function ProfessorPage() {
  await AuthSSR({ userType: "PROFESSOR" });

  return (
    <>
      <MainImage />
    </>
  );
}
