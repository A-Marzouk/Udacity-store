export type Product = {
  id: Number;
  name: String;
  category: String;
  price: Number;
};

export type User = {
  id: String | null;
  username: String;
  firstName: String;
  lastName: String;
  password: String;
};

export type Order = {
  id: Number;
  user_id: Number;
  status: string;
};
