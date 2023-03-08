import { Product } from "../domain";
import { toBrl } from "../utils/money";

export type CartItemProps = Omit<Product, "id">;

export function CartItem({ name, price, quantity }: CartItemProps) {
  return (
    <li className="cart-item">
      <div>
        <h1 className="name">{name}</h1>
        <span className="quantity">(Qt: {quantity})</span>
      </div>

      <div>
        <span className="price">{toBrl(price * quantity)}</span>
      </div>
    </li>
  );
}
