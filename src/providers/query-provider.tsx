import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React, { ReactNode } from "react";
const client = new QueryClient();
function QueryProvider({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default QueryProvider;
