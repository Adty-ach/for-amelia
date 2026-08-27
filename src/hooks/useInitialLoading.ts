import { useCallback, useState } from "react";

/**
 * Mengontrol apakah Birthday Loading Screen harus ditampilkan.
 *
 * Sengaja hanya React state biasa (bukan localStorage/sessionStorage):
 * state ini hidup di App.tsx (root, tidak pernah unmount selama SPA
 * berjalan), jadi begitu completeLoading() dipanggil sekali, loading
 * screen tidak akan muncul lagi untuk sisa sesi — termasuk saat pindah
 * route atau kembali ke homepage. Refresh browser penuh secara alami
 * me-reset module JS, sehingga state kembali ke `true` — itu memang
 * perilaku yang diinginkan ("refresh = initial visit baru").
 */
export function useInitialLoading() {
  const [isLoading, setIsLoading] = useState(true);

  const completeLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return { isLoading, completeLoading };
}
