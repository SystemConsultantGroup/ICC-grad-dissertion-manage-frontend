import { Role } from "@/api/_types/common";
import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  type: Role;
}
