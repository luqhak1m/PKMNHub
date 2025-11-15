
"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// query client instance
const query_client=new QueryClient();

export default function Providers(
    { children }: { children: React.ReactNode }
){
    return <QueryClientProvider client={query_client}>{children}</QueryClientProvider>
}