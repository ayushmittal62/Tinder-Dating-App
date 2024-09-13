import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { use } from "react";
import {
  getMatches,
  getuserbyid,
  getuserwithNoConnections,
} from "@/app/neo4j.action";
import { json } from "stream/consumers";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default async function MatchPage() {
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

  const matches = await getMatches(user.id);
  return;
  <main>
    {matches.map((user) => (
      <Card key={user.applicationId}>
        <CardHeader>
          <CardTitle>
            {user.firstname}
            {user.lastname}
          </CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
      </Card>
    ))}
  </main>;
}
