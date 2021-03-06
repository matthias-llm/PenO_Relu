import { connectToDatabase } from "./mongodb";
import { user } from "../types";
import md5 from "md5";

//TODO?: getuserid, verifyUser ...
export async function createUser(userdata: user) {
  const { db } = await connectToDatabase();
  delete userdata.new;

  userdata.password = md5(userdata.password);

  const opts = { upsert: true };
  await db
    .collection("users")
    .updateOne({ _id: userdata._id }, { $set: userdata }, opts);
}

export async function verifyUser(credentials) {
  const { db } = await connectToDatabase();

  const user = await db
    .collection("users")
    .findOne({ email: credentials.email });

  if (!user || user.password != md5(credentials.password)) {
    return {
      authenticated: false,
      user: undefined,
    };
  } else {
    return {
      authenticated: true,
      user: user,
    };
  }
}

export async function delUser(userdata: user) {
  const { db } = await connectToDatabase();

  const result = await db.collection("users").deleteOne({ _id: userdata._id });
}
