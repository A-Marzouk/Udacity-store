// @ts-ignore
import Client from "../database/db";
import { Order } from "../types/models";

export class OrderStore {
  static async addProductToOrder(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order> {
    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      //@ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }

  static async create(o: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [o.user_id, o.status]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not create order. Error: ${err}`);
    }
  }

  static async getOrderByUserId(userId: String): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE user_id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [userId]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order for user ${userId}. Error: ${err}`);
    }
  }
}
