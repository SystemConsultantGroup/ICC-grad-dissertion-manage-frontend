import { AuthSSR } from "@/components/AuthSSR";
import MainImage from "@/components/MainImage";

export default async function StudentPage() {
  await AuthSSR({ userType: "STUDENT" });

  return (
    <>
      <MainImage />
    </>
  );
}
