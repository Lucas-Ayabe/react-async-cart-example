import { Product as Product } from "../domain";
import { toBrl } from "../utils/money";

export type ProductProps = Omit<Product, "id"> & {
  onAdd: () => void;
};

export function ProductCard({ name, quantity, price, onAdd }: ProductProps) {
  const className = ["product", quantity === 0 ? "disabled" : ""].join(" ");

  return (
    <article className={className}>
      <h2 className="title">{name}</h2>
      <span className="quantity">Estoque: {quantity}</span>

      <span className="price">{toBrl(price)}</span>
      <button onClick={() => onAdd()}>Adicionar ao Carrinho</button>
    </article>
  );
}
