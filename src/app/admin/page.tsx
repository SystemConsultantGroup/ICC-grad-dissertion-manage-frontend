import { AuthSSR } from "@/components/AuthSSR";
import MainImage from "@/components/MainImage";

export default async function AdminPage() {
  await AuthSSR({ userType: "ADMIN" });

  return (
    <>
      <MainImage />
    </>
  );
}
