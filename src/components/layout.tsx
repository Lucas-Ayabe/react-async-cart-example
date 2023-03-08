import React from "react";
import { Header } from "./header";

export function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <section className="container">
      <Header title="Carrinho de Compras" />
      <div className="flow">{children}</div>
    </section>
  );
}
