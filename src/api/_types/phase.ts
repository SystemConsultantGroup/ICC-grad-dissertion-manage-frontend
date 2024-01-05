import { CommonApiResponse } from "./common";

export interface Phase {
  id: number;
  title: string;
  start: string;
  end: string;
  createdAt: string;
  updatedAt: string;
}

export interface PhasesResponse extends CommonApiResponse {
  phases: Omit<Phase, "createdAt" | "updatedAt">[];
}

export interface UpdatePhaseRequestBody {
  start: string;
  end: string;
}
