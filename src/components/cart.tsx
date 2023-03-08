import { Product } from "../domain";
import { toBrl } from "../utils/money";
import { CartItem } from "./cart-item";

export type CartProps = { items: Product[] };

export function Cart({ items }: CartProps) {
  const total = items.reduce(
    (totalPrice, { price, quantity }) => totalPrice + price * quantity,
    0
  );

  return (
    <section className="flex-1">
      <ul className="cart-items">
        {items.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </ul>

      <footer className="total">Total: {toBrl(total)}</footer>
    </section>
  );
}
