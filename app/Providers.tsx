"use client";
import { ModalProvider } from "c4cui";
import { ReactNode } from "react";
import { ServiceProvider } from "./ServiceContext";
import { BlogProvider } from "./BlogProvider";

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ServiceProvider>
      <BlogProvider>
        <ModalProvider>{children}</ModalProvider>
      </BlogProvider>
    </ServiceProvider>
  );
};
