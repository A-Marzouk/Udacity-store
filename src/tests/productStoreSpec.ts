import { ProductStore } from "../models/product";

const store = new ProductStore();

describe("Book Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("create method should add a book", async () => {
    const result = await store.create({
      id: 1,
      name: "Ferrari car",
      price: 9999999,
      category: "cars",
    });

    expect(result.name).toEqual("Ferrari car");
    expect(result.price).toEqual(9999999);
  });

  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(result).toBeTruthy();
  });
});
