import { AuthSSR } from "@/api/AuthSSR";
import MainImage from "@/components/common/MainImage";

export default async function StudentPage() {
  await AuthSSR({ userType: "STUDENT" });

  return (
    <>
      <MainImage />
    </>
  );
}
