import { AuthMain } from "@/components/AuthSSR/AuthMain";

export default async function HomePage() {
  await AuthMain();

  return <></>;
}
