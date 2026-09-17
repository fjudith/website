import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import manifest from '@site/src/slides-manifest.json';

/**
 * Renders a gallery of all built Slidev decks, read from the generated
 * `src/slides-manifest.json` (produced by `npm run slidev:build`).
 *
 * Each card shows a live preview of the deck's first slide plus a link to the
 * full-screen version.
 *
 * Usage in MDX:
 *   import SlidesIndex from '@site/src/components/SlidesIndex';
 *   <SlidesIndex />
 */
interface DeckEntry {
  name: string;
  title: string;
  path: string;
}

function DeckCard({ deck }: { deck: DeckEntry }): React.ReactElement {
  // The deck is a static asset served under baseUrl, not a Docusaurus route.
  // `pathname://` makes <Link> render a plain anchor and keeps the
  // broken-link checker from treating it as an SPA route.
  const fullscreenHref = useBaseUrl(`pathname://${deck.path}`);
  // The preview iframe points at the same static asset (baseUrl-resolved).
  const previewSrc = useBaseUrl(deck.path);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: 'var(--ifm-global-radius)',
        overflow: 'hidden',
        background: 'var(--ifm-card-background-color)',
      }}
    >
      {/* Preview: non-interactive iframe of the first slide. Clicking anywhere
          on the thumbnail opens the deck full screen. */}
      <Link
        to={fullscreenHref}
        aria-label={`Ouvrir « ${deck.title} » en plein écran`}
        style={{
          position: 'relative',
          display: 'block',
          aspectRatio: '16 / 9',
          overflow: 'hidden',
          borderBottom: '1px solid var(--ifm-color-emphasis-300)',
        }}
      >
        <iframe
          src={previewSrc}
          title={`Aperçu : ${deck.title}`}
          tabIndex={-1}
          loading="lazy"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            // Let the card's <Link> receive the click, not the iframe.
            pointerEvents: 'none',
          }}
        />
      </Link>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
          padding: '0.85rem 1rem',
        }}
      >
        <strong style={{ fontSize: '1rem', lineHeight: 1.25 }}>
          {deck.title}
        </strong>
        <Link to={fullscreenHref} style={{ fontSize: '0.85rem' }}>
          Ouvrir en plein écran →
        </Link>
      </div>
    </div>
  );
}

export default function SlidesIndex(): React.ReactElement {
  const decks = (manifest as { decks: DeckEntry[] }).decks ?? [];

  if (decks.length === 0) {
    return <p>Aucun deck n'a encore été généré.</p>;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.25rem',
        margin: '1.5rem 0',
      }}
    >
      {decks.map((deck) => (
        <DeckCard key={deck.name} deck={deck} />
      ))}
    </div>
  );
}
