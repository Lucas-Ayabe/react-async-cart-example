import { Product } from "../domain";
import { ProductCard } from "./product-card";

export type ProductListProps = {
  products: Product[];
  onAddToCart: (id: number) => void;
};

export const ProductList = ({ products, onAddToCart }: ProductListProps) => {
  return (
    <section className="auto-grid flex-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          onAdd={() => onAddToCart(product.id)}
        />
      ))}
    </section>
  );
};
