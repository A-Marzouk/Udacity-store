// @ts-ignore
import Client from "../database/db";
import { User } from "../modelTypes/types";
import bcrypt from "bcrypt";

export class UserStore {
  static async create(u: User): Promise<User> {
    const saltRounds = process.env.SALT_ROUNDS || "10";
    const secret = process.env.BCRYPT_SECRET || "";

    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users (id, firstName, lastName, username, password) VALUES($1, $2, $3, $4, $5) RETURNING *";

      const hash = bcrypt.hashSync(u.password + secret, parseInt(saltRounds));

      const result = await conn.query(sql, [
        u.id,
        u.firstName,
        u.lastName,
        u.username,
        hash,
      ]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.username}): ${err}`);
    }
  }
}
