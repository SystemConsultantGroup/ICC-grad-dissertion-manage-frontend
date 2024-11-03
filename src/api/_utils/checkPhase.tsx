import { PhasesResponse } from "../_types/phase";
import { API_ROUTES } from "../apiRoute";
import { fetcher } from "../fetcher";

type Params = {
  title: string;
  token: string;
};

export async function checkPhase({ title, token }: Params) {
  const data = (await fetcher({ url: API_ROUTES.phase.get(), token })) as PhasesResponse;

  const targetPhase = data.phases.find((phase) => phase.title.includes(title));

  const now = new Date();
  now.setHours(now.getHours() + 9);

  const start = new Date(targetPhase!.start);
  const end = new Date(targetPhase!.end);

  const within = start <= now && now <= end;
  const after = end < now;

  return { start, end, within, after };
}
