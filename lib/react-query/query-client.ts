import { QueryClient } from "@tanstack/react-query";

interface CustomNodeJsGlobal {
  queryClient: QueryClient;
}

declare const global: CustomNodeJsGlobal;

const queryClient = global.queryClient || new QueryClient();

if (process.env.NODE_ENV === "development") global.queryClient = queryClient;

export default queryClient;
