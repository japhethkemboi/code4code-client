"use client";
import { ModalProvider } from "c4cui";
import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { ServiceProvider } from "./ServiceContext";
import { BlogProvider } from "./BlogProvider";

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ServiceProvider>
        <BlogProvider>
          <ModalProvider>{children}</ModalProvider>
        </BlogProvider>
      </ServiceProvider>
    </AuthProvider>
  );
};
