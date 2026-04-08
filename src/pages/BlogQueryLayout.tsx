import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

const blogQueryClient = new QueryClient();

const BlogQueryLayout = () => (
  <QueryClientProvider client={blogQueryClient}>
    <Outlet />
  </QueryClientProvider>
);

export default BlogQueryLayout;
