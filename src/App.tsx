import { useEffect } from "react";
import { Layout, Cart, ProductList } from "./components";
import { Modal } from "./components/modal";
import { Product } from "./domain";
import { useApp, useProducts, useToggle } from "./hooks";

function App() {
  const [isModalOpen, toggleModal] = useToggle();
  const [productListOrError, state] = useProducts();
  const app = useApp([]);

  useEffect(() => {
    app.onListLoaded(
      {
        pending: [],
        rejected: [],
        resolved: productListOrError as Product[],
      }[state]
    );
  }, [state]);

  return (
    <Layout>
      <button onClick={toggleModal}>Ver Produtos</button>
      <Cart items={app.products.inCart} />
      <Modal title="Produtos" open={isModalOpen} onClose={toggleModal}>
        <ProductList products={app.products.list} onAddToCart={app.addToCart} />
      </Modal>
    </Layout>
  );
}

export default App;
