import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import manifest from '@site/src/slides-manifest.json';

/**
 * Renders a gallery of all built Slidev decks, read from the generated
 * `src/slides-manifest.json` (produced by `npm run slidev:build`).
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
  // Decks are static assets, not Docusaurus routes. Resolve against baseUrl
  // with the `pathname://` prefix so <Link> renders a plain anchor and the
  // broken-link checker does not treat it as an SPA route.
  const href = useBaseUrl(`pathname://${deck.path}`);
  return (
    <Link
      to={href}
      style={{
        display: 'block',
        padding: '1rem 1.25rem',
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: 'var(--ifm-global-radius)',
        textDecoration: 'none',
        color: 'inherit',
        background: 'var(--ifm-card-background-color)',
      }}
    >
      <strong style={{ display: 'block', fontSize: '1.05rem' }}>
        {deck.title}
      </strong>
      <span
        style={{ color: 'var(--ifm-color-emphasis-600)', fontSize: '0.85rem' }}
      >
        {deck.path}
      </span>
    </Link>
  );
}

export default function SlidesIndex(): React.ReactElement {
  const decks = (manifest as { decks: DeckEntry[] }).decks ?? [];

  if (decks.length === 0) {
    return <p>No slide decks have been built yet.</p>;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1rem',
        margin: '1rem 0',
      }}
    >
      {decks.map((deck) => (
        <DeckCard key={deck.name} deck={deck} />
      ))}
    </div>
  );
}
