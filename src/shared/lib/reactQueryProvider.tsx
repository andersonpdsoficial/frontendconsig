'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { useState } from "react";

interface Props { children: React.ReactNode }
export default function ({ children }: Props) {
    const [client] = useState(new QueryClient)
    return <>
        <QueryClientProvider client={client}>
            <ReactQueryStreamedHydration>
                { children }
            </ReactQueryStreamedHydration>
        </QueryClientProvider>
    </>
}

