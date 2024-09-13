import { CreateUser, getuserbyid } from "@/app/neo4j.action";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function CallBackPage() {
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated()))
    return redirect(
      "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback"
    );

  const user = await getUser();
  if (!user)
    return redirect(
      "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback"
    );

  const dbUser = await getuserbyid(user.id);
  if (!dbUser) {
    await CreateUser({
      applicationId: user.id,
      email: user.email!,
      firstname: user.given_name!,
      lastname: user.family_name!,
    });
  }

  return redirect('/'); 
}
