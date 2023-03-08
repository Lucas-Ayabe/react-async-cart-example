export const toBrl = (value: number) => {
  return value.toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
  });
};
