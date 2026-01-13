import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import router from "./router.jsx";
import { SupabaseProvider } from "./SupabaseProvider.tsx";

const hotRed = [
  "#ffe8e9",
  "#ffd1d1",
  "#fba0a0",
  "#f76d6d",
  "#f44141",
  "#f22625",
  "#f21616",
  "#d8070b",
  "#c10007",
  "#a90003",
];

const theme = createTheme({
  colors: {
    hotRed,
  },
  primaryColor: "hotRed",
});

export const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Notifications />
      <QueryClientProvider client={queryClient}>
        <SupabaseProvider>
          <RouterProvider router={router}></RouterProvider>
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-left"
          />
        </SupabaseProvider>
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>
);
