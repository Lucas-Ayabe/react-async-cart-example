import React from "react";

export type ModalProps = React.PropsWithChildren<{
  open: boolean;
  title: string;
  onClose: () => void;
}>;

export const Modal = ({ open, title, onClose, children }: ModalProps) => {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <article className="modal" data-open={open}>
        <header className="header">
          <h2>{title}</h2>
          <button onClick={onClose}>Fechar</button>
        </header>

        <div className="content">{children}</div>
      </article>
    </div>
  );
};
