import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/500-italic.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

import { MotionConfig } from "framer-motion";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { MusicPlayerProvider } from "./context/MusicPlayerContext.tsx";
import "./styles/tokens.css";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* reducedMotion="user" -> Framer Motion otomatis menghormati preferensi
        sistem prefers-reduced-motion sebagai lapisan pengaman tambahan,
        di luar penanganan manual yang sudah ada di RouteTransition & HomePage. */}
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <MusicPlayerProvider>
          <App />
        </MusicPlayerProvider>
      </BrowserRouter>
    </MotionConfig>
  </StrictMode>,
);
