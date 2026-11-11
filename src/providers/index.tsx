"use client";

import { ReactNode } from "react";
import QueryProviders from "./queryProviers";

const Providers = ({ children }: { children: ReactNode }) => {
  return <QueryProviders>{children}</QueryProviders>;
};

export default Providers;
