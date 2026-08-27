import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { BirthdayLoadingScreen } from "./components/BirthdayLoadingScreen";
import { useInitialLoading } from "./hooks/useInitialLoading";
import { RootLayout } from "./layout/RootLayout";
import HomePage from "./sections/home/HomePage";

/**
 * Semua section selain Home di-lazy-load. Home tetap eager karena selalu
 * jadi titik masuk pertama — memuatnya secara lazy hanya akan menambah
 * jeda yang tidak perlu di paint pertama.
 */
const StoryPage = lazy(() => import("./sections/story/StoryPage"));
const GalleryPage = lazy(() => import("./sections/gallery/GalleryPage"));
const IRememberPage = lazy(() => import("./sections/i-remember/IRememberPage"));
const TimelinePage = lazy(() => import("./sections/timeline/TimelinePage"));
const SoundtrackPage = lazy(() => import("./sections/soundtrack/SoundtrackPage"));
const DreamModePage = lazy(() => import("./sections/dream-mode/DreamModePage"));
const LetterPage = lazy(() => import("./sections/letter/LetterPage"));
const NotFoundPage = lazy(() => import("./sections/NotFoundPage"));

export default function App() {
  // Loading screen hanya untuk initial visit — lihat useInitialLoading.
  const { isLoading, completeLoading } = useInitialLoading();

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <BirthdayLoadingScreen key="birthday-loader" onComplete={completeLoading} />
      ) : (
        <Suspense fallback={null} key="app">
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="story" element={<StoryPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="remember" element={<IRememberPage />} />
              <Route path="timeline" element={<TimelinePage />} />
              <Route path="soundtrack" element={<SoundtrackPage />} />
              <Route path="dream" element={<DreamModePage />} />
              <Route path="letter" element={<LetterPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      )}
    </AnimatePresence>
  );
}
