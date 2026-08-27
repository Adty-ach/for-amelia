/**
 * siteConfig.ts
 * ---------------------------------
 * Teks & pengaturan global yang dipakai lintas section.
 * Ubah nilai di sini untuk mengubah copy global — jangan hardcode di komponen.
 */

export interface SiteConfig {
  title: string;
  subtitle: string;
  theme: "editorial-cinematic";
  /** Placeholder — isi tanggal ulang tahun asli saat sudah ditentukan (format ISO: YYYY-MM-DD). */
  birthdayDate: string | null;
}

export const siteConfig: SiteConfig = {
  title: "FOR AMELIA",
  subtitle: "A little place made just for you.",
  theme: "editorial-cinematic",
  birthdayDate: null,
};
