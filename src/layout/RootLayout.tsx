import { HomeAnchor } from "../components/HomeAnchor";
import { MusicPlayer } from "../components/MusicPlayer";
import { RouteTransition } from "../components/RouteTransition";

/**
 * Layout tertinggi aplikasi. Dirender sekali oleh router dan tidak pernah
 * unmount saat user berpindah section — inilah yang membuat home anchor
 * dan music player terasa "menempel di dunia", bukan bagian dari halaman
 * yang di-reset setiap navigasi.
 */
export function RootLayout() {
  return (
    <>
      <a href="#main-content" className="visually-hidden">
        Lewati ke konten utama
      </a>
      <HomeAnchor />
      <main id="main-content">
        <RouteTransition />
      </main>
      <MusicPlayer />
    </>
  );
}
