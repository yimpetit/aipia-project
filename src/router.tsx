import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import ItemDetail from "./pages/ItemDetail.tsx";
import Header from "./components/layout/Header.tsx";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/item">
          <Route path=":id" element={<ItemDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);
