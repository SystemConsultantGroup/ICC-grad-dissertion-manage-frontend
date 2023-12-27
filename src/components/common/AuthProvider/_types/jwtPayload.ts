import { Role } from "@/api/_types/user";
import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  type: Role;
}
