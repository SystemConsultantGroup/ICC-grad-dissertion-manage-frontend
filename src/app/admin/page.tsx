import { AuthSSR } from "@/api/AuthSSR";
import MainImage from "@/components/common/MainImage";

export default async function AdminPage() {
  await AuthSSR({ userType: "ADMIN" });

  return (
    <>
      <MainImage />
    </>
  );
}
