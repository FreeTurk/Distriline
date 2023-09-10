interface Order {
  id: number;
  name: string;
  price: number;
  quantity: number;
  status: string;
  date: string;
  customer: string;
  address: string;
  phone: string;
  email: string;
  payment: string;
  delivery: string;
  tracking: string;
}

interface Product {
  name: string;
  description?: string;
  currency: string;
  quantity: number;
  price: number;
}

const demo: Array<Order> = [];

for (let i: number = 0; i < 20; i++) {
  demo.push({
    id: i+1,
    name: "Apple iPhone 11 Pro 256GB Memory",
    price: Math.round(Math.random() * 1000),
    quantity: Math.round(Math.random() * 10),
    status: "Pending",
    date: "2020-01-01",
    customer: "John Doe",
    address: "Boulevard Street 123",
    phone: "+1 123 456 78 90",
    email: "demoemail@securemail.com",
    payment: "Credit Card",
    delivery: "FedEx",
    tracking: "1234567890",
  });
}



for (let i: number = 0; i < 20; i++) {
  demo.push({
    id: i+21,
    name: "Samsung Galaxy S22 Ultra 256GB Memory",
    price: Math.round(Math.random() * 1000),
    quantity: Math.round(Math.random() * 10),
    status: "Confirmed",
    date: "2020-01-01",
    customer: "John Doe",
    address: "Boulevard Street 123",
    phone: "+1 123 456 78 90",
    email: "demoemail@securemail.com",
    payment: "Credit Card",
    delivery: "FedEx",
    tracking: "1234567890",
  });
}

const demoproducts: Array<Product> = [];

export {demo, demoproducts, type Order};
