import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../michis-backend/src/trpc/_app';
import { authClient } from "@/lib/auth-client"; 
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCReact } from '@trpc/react-query';
 
const getBaseUrl = () => {
  if (__DEV__) {
    // Development - connect to local backend
    return 'http://localhost:3000';
  }
  // Production - replace with your actual API URL
  return 'https://your-api-domain.com';
};

export const api = createTRPCReact<AppRouter>();

 
export function TRPCProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api`,
          headers() {
            const headers = new Map<string, string>(); 
            const cookies = authClient.getCookie(); 
            if (cookies) { 
              headers.set("Cookie", cookies); 
            } 
            return Object.fromEntries(headers); 
          },
        }),
      ],
    }),
  );
 
  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </api.Provider>
  );
}