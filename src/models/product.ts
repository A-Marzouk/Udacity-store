// @ts-ignore
import Client from "../database/db";
import { Product } from "../types/models";

export class ProductStore {
  static async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM products";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get product. Error: ${err}`);
    }
  }

  static async show(id: string): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find Product ${id}. Error: ${err}`);
    }
  }

  static async create(b: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [b.name, b.price, b.category]);
      const Product = result.rows[0];
      conn.release();
      return Product;
    } catch (err) {
      throw new Error(`Could not add new Product ${b.name}. Error: ${err}`);
    }
  }

  static async delete(id: string): Promise<Boolean> {
    try {
      const sql = "DELETE FROM products WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rowCount === 1;
    } catch (err) {
      throw new Error(`Could not delete Product ${id}. Error: ${err}`);
    }
  }
}
