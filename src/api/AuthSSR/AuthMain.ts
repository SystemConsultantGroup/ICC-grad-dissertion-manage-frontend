import { JWT_COOKIE_NAME } from "@/components/common/AuthProvider/constant/jwt";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { CustomJwtPayload } from "@/components/common/AuthProvider/_types/jwtPayload";

export async function AuthMain() {
  const token = cookies().get(JWT_COOKIE_NAME)?.value;
  if (token) {
    // already logged in
    const claims: CustomJwtPayload = jwtDecode(token);

    if (claims.type === "ADMIN") {
      redirect("/admin");
    } else if (claims.type === "PROFESSOR") {
      redirect("/prof");
    } else if (claims.type === "STUDENT" || claims.type === "PHD") {
      redirect("/student");
    }
  }
  redirect("/login");
}
