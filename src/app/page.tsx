import { AuthMain } from "@/api/AuthSSR/AuthMain";

export default async function HomePage() {
  await AuthMain();

  return <></>;
}
