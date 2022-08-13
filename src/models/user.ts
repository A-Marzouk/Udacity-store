// @ts-ignore
import Client from "../database/db";
import { Order, User } from "../types/models";
import bcrypt from "bcrypt";
import { OrderStore } from "./order";

export class UserStore {
  static async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get user. Error: ${err}`);
    }
  }

  static async getById(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

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

      const order: Order = {
        id: null,
        status: "created",
        user_id: user.id,
      };

      await OrderStore.create(order);

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.username}): ${err}`);
    }
  }

  static async delete(id: string): Promise<Boolean> {
    try {
      const sql = "DELETE FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rowCount === 1;
    } catch (err) {
      throw new Error(`Could not delete User ${id}. Error: ${err}`);
    }
  }
}
