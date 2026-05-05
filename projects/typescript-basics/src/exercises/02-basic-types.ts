// Q1
// typeは=を使う
type ProductType = {
  id: number;
  name: string;
  price: number;
}

const product: ProductType = {
  id: 10,
  name: "pen",
  price: 100
}

// Q2
interface ProductInterface {
  id: number;
  name: string;
  price: number;
}

const product2: ProductInterface = {
  id: 10,
  name: "pan",
  price: 100,
}

//Q3
function getProductName(product: ProductType): string {
  return product.name;
}
