import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { registerSW } from "virtual:pwa-register"; // ✅ ADD THIS

import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/themes/light.css";

import App from "./App.tsx";
import { store } from "./store/index.js";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

// ✅ REGISTER SERVICE WORKER
registerSW({
  onNeedRefresh() {
    console.log("🔄 New version available");
  },
  onOfflineReady() {
    console.log("📴 App ready to work offline");
  },
});


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </Provider>
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>
);