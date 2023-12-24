import { AuthSSR } from "@/components/AuthSSR";
import MainImage from "@/components/MainImage";

export default async function ProfessorPage() {
  await AuthSSR({ userType: "PROFESSOR" });

  return (
    <>
      <MainImage />
    </>
  );
}
