"use client";
import * as React from "react";
import { neo4jUser } from "@/types";
import TinderCard from "react-tinder-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { neo4jSwipe } from "../neo4j.action";

interface HomePageComponentsProps {
  currentUser: neo4jUser;
  users: neo4jUser[];
}
const HomePage: React.FC<HomePageComponentsProps> = ({
  currentUser,
  users,
}) => {
  const handleswipe = async (direction: string, userId: string) => {
    const ismatch = await neo4jSwipe(
      currentUser.applicationId,
      direction,
      userId
    );
    if (ismatch) alert(`Congrats You found a Match`);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <div>
          <h1 className="text-3xl">
            Welcome, {currentUser.firstname} {currentUser.lastname}
          </h1>
        </div>
        <div className="mt-4 relative">
          {users.map((user) => (
            <TinderCard
              onSwipe={(direction) =>
                handleswipe(direction, user.applicationId)
              }
              className="absolute"
              key={user.applicationId}
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    {user.firstname}
                    {user.lastname}
                  </CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </CardHeader>
              </Card>
            </TinderCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
