import { ProductStore } from "../models/product";

describe("Product Model", () => {
  it("should have an index method", () => {
    expect(ProductStore.index).toBeDefined();
  });

  it("create method should add a product", async () => {
    const result = await ProductStore.create({
      id: 1,
      name: "Ferrari car",
      price: 9999999,
      category: "cars",
    });

    expect(result.name).toEqual("Ferrari car");
    expect(result.price).toEqual(9999999);
  });

  it("index method should return a list of products", async () => {
    const result = await ProductStore.index();
    expect(result).toBeTruthy();
  });
});
