import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

/**
 * Embeds a built Slidev deck via an <iframe>.
 *
 * Decks live in `slides/<name>.md` and are built by `npm run slidev:build`
 * into `static/slides/<name>/`, served at `/slides/<name>/`.
 *
 * Usage in MDX:
 *   import Slides from '@site/src/components/Slides';
 *   <Slides name="intro" />
 */
export interface SlidesProps {
  /** Deck name, matching `slides/<name>.md`. */
  name: string;
  /** Aspect ratio of the embed, e.g. "16 / 9". */
  aspectRatio?: string;
  /** Optional explicit height (overrides aspectRatio). */
  height?: number | string;
  /** Accessible title for the iframe. */
  title?: string;
}

export default function Slides({
  name,
  aspectRatio = '16 / 9',
  height,
  title,
}: SlidesProps): React.ReactElement {
  const src = useBaseUrl(`/slides/${name}/`);
  const style: React.CSSProperties = {
    width: '100%',
    border: '1px solid var(--ifm-color-emphasis-300)',
    borderRadius: 'var(--ifm-global-radius)',
    ...(height ? {height} : {aspectRatio}),
  };

  return (
    <iframe
      src={src}
      title={title ?? `Slidev deck: ${name}`}
      style={style}
      allow="fullscreen"
      loading="lazy"
    />
  );
}
