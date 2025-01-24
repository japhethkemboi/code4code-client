"use client";
import { ModalProvider } from "c4cui";
import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { ServiceProvider } from "./ServiceContext";

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ServiceProvider>
        <ModalProvider>{children}</ModalProvider>
      </ServiceProvider>
    </AuthProvider>
  );
};
