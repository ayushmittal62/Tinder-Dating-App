"use server";
import { driver } from "@/db";
import { Record } from "neo4j-driver";
import { neo4jUser } from "@/types";
import exp from "constants";

export const getuserbyid = async (id: string) => {
  const result = await driver.executeQuery(
    `Match(u:User{applicationId: $applicationId}) RETURN u`,
    { applicationId: id }
  );

  const user = result.records.map((record) => record.get("u").properties);
  if (user.length === 0) return null;
  return user[0] as neo4jUser;
};

export const CreateUser = async (user: neo4jUser) => {
  const { applicationId, email, firstname, lastname } = user;
  await driver.executeQuery(
    `CREATE (u: User{applicationId: $applicationId, email: $email, firstname: $firstname, lastname: $lastname})`,
    { applicationId, email, firstname, lastname }
  );
};

export const getuserwithNoConnections = async (id: string) => {
  const result = await driver.executeQuery(
    `MATCH( cu: User{applicationId: $applicationId}) MATCH(ou: User)WHERE NOT (cu)-[:LIKE|:DISLIKE]->(ou) AND cu <> ou RETURN ou`,
    { applicationId: id }
  );
  const users = result.records.map((record) => record.get("ou").properties);
  return users as neo4jUser[];
};

export const neo4jSwipe = async (id: string, swipe: string, userId: string) => {
  const type = swipe === "left" ? "DISLIKE" : "LIKE";
  await driver.executeQuery(
    `MATCH (cu: User {applicationId: $id}), (ou:User {applicationId: $userId}) CREATE (cu)-[:${type}]->(ou)`,
    {
      id,
      userId,
    }
  );
  if (type === "LIKE") {
    const result = await driver.executeQuery(
      `MATCH (cu: User {applicationId: $id}), (ou:User {applicationId: $userId}) WHERE (ou)-[:LIKE]->(cu) RETURN ou as match`,
      {
        id,
        userId,
      }
    );
    const matches = result.records.map(
      (record) => record.get("match").properties
    );
    return Boolean(matches.length > 0);
  }
};

export const getMatches = async (currentUserId: string) => {
  const result = await driver.executeQuery(
    `MATCH (cu: User {applicationId: $id})-[:LIKE]-(ou: User)-[:LIKE]->(cu) RETURN ou as match`,
    {
      id: currentUserId,
    }
  );
  const matches = result.records.map(
    (record) => record.get("match").properties
  );
  return matches as neo4jUser[];
};
