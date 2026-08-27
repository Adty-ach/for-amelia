import type { StoryPage } from "../../data/chapters";
import styles from "./StoryPageContent.module.css";

interface StoryPageContentProps {
  page: Exclude<StoryPage, { type: "turning-point" }>;
}

/**
 * Merender isi satu page berdasarkan `page.type`. Sengaja jadi satu
 * komponen (bukan dipecah per-tipe jadi banyak file) karena setiap
 * cabang render-nya kecil dan lebih mudah dibaca berdampingan.
 * "turning-point" ditangani terpisah oleh <TurningPointPage> karena
 * punya orkestrasi animasi sendiri.
 */
export function StoryPageContent({ page }: StoryPageContentProps) {
  switch (page.type) {
    case "narrative":
      return (
        <div className={styles.page}>
          <div className={styles.narrative}>
            {page.content.map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      );

    case "quote":
      return (
        <div className={styles.page}>
          <div className={styles.quote}>
            <span className={styles.quoteMark} aria-hidden="true">
              “
            </span>
            <p className={styles.quoteText}>{page.content}</p>
            {page.attribution && <span className={styles.quoteAttribution}>{page.attribution}</span>}
          </div>
        </div>
      );

    case "chat":
      return (
        <div className={styles.page}>
          <div className={styles.chat}>
            {page.messages.map((message, index) => (
              <div key={index} className={styles.bubbleRow} data-from={message.from}>
                <span className={styles.bubble}>{message.text}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "image":
      return (
        <div className={styles.page}>
          <div className={styles.imagePlaceholder}>
            <span className={styles.imagePlaceholderIcon} aria-hidden="true">
              ◇
            </span>
            {page.caption && <span className={styles.imageCaption}>{page.caption}</span>}
          </div>
        </div>
      );

    case "divider":
      return (
        <div className={styles.page}>
          <div className={styles.divider}>
            <span className={styles.dividerLine} aria-hidden="true" />
            {page.label && <span className={styles.dividerLabel}>{page.label}</span>}
            <span className={styles.dividerLine} aria-hidden="true" />
          </div>
        </div>
      );

    default:
      return null;
  }
}

interface ChapterTitleScreenProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

/** Layar pembatas antar chapter — "halaman judul" sebelum isi chapter dimulai. */
export function ChapterTitleScreen({ eyebrow, title, subtitle }: ChapterTitleScreenProps) {
  return (
    <div className={styles.chapterTitleScreen}>
      <span className={styles.chapterEyebrow}>{eyebrow}</span>
      <h1 className={styles.chapterTitle}>{title}</h1>
      {subtitle && <p className={styles.chapterSubtitle}>{subtitle}</p>}
    </div>
  );
}
