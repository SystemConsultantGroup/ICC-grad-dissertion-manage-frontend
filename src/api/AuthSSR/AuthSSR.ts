import { JWT_COOKIE_NAME } from "@/components/common/AuthProvider/constant/jwt";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { CustomJwtPayload } from "@/components/common/AuthProvider/_types/jwtPayload";
import { Role } from "@/api/_types/common";

interface Props {
  userType: Role;
}

export async function AuthSSR({ userType }: Props) {
  const token = cookies().get(JWT_COOKIE_NAME)?.value;
  if (token) {
    // already logged in
    const claims: CustomJwtPayload = jwtDecode(token);

    if (claims.type === userType) {
      return;
    }
  }

  redirect("/");
}
