import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { use } from "react";
import { getuserbyid, getuserwithNoConnections } from "@/app/neo4j.action";
import { json } from "stream/consumers";
import HomePage from "./components/Home";

export default async function Home() {
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return redirect(
      "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback"
    );
  }

  const user = await getUser();

  if (!user)
    return redirect(
      "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback"
    );

  const userwithNoConnections = await getuserwithNoConnections(user.id);
  const currentuser = await getuserbyid(user.id);
  return (
    <main>
      {currentuser && (
        <HomePage currentUser={currentuser} users={userwithNoConnections} />
      )}
    </main>
  );
}
