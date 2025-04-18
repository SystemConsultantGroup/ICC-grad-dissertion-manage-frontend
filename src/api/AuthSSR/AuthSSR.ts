import { JWT_COOKIE_NAME } from "@/components/common/AuthProvider/constant/jwt";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { CustomJwtPayload } from "@/components/common/AuthProvider/_types/jwtPayload";
import { Role } from "@/api/_types/user";

interface Props {
  userType: Role;
  otherUserType?: Role;
}

export async function AuthSSR({ userType, otherUserType }: Props): Promise<{ token: string }> {
  const token = cookies().get(JWT_COOKIE_NAME)?.value;
  if (token) {
    // already logged in
    const claims: CustomJwtPayload = jwtDecode(token);

    if (claims.type === userType) {
      return { token };
    } else if (otherUserType && claims.type === otherUserType) {
      return { token };
    }
  }

  redirect("/");
}
