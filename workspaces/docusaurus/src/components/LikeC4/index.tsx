import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

/**
 * Renders a LikeC4 view from the generated model.
 *
 * The model is produced by `npm run likec4:codegen` which writes
 * `src/likec4/likec4-model.ts`. Diagrams rely on browser APIs, so we render
 * them client-side only via <BrowserOnly>.
 *
 * Uses `LikeC4View` (not the lower-level `ReactLikeC4`) so the diagram opens in
 * a fullscreen **popup browser** when clicked — pan/zoom, element & relationship
 * details, and view-to-view navigation, matching the LikeC4 Vite demo.
 *
 * Usage in MDX:
 *   import LikeC4 from '@site/src/components/LikeC4';
 *   <LikeC4 viewId="index" />
 */
/** LikeC4 projects under `likec4/`, each generated to its own model file. */
export type LikeC4Project = 'kirocrew-kata' | 'agentic-platform';

export interface LikeC4Props {
  /** The id of the view defined in the LikeC4 model (e.g. "index"). */
  viewId: string;
  /** Which LikeC4 project the view belongs to. Defaults to "kirocrew-kata". */
  project?: LikeC4Project;
  /** Fixed height of the diagram container. */
  height?: number | string;
  /** Show the view title inside the diagram. */
  showTitle?: boolean;
}

export default function LikeC4({
  viewId,
  project = 'kirocrew-kata',
  height = 480,
  showTitle = true,
}: LikeC4Props): React.ReactElement {
  return (
    <BrowserOnly fallback={<div style={{ height }} />}>
      {() => {
        // Imported here so it never runs during SSR.
        const { LikeC4ModelProvider, LikeC4View } = require('@likec4/diagram');
        // Literal paths so the bundler can statically resolve both models.
        const { likec4model } =
          project === 'agentic-platform'
            ? require('@site/src/likec4/agentic-platform-model')
            : require('@site/src/likec4/likec4-model');

        // Render built-in icons referenced in the model. We import only the
        // single icon we use (tech:docusaurus) instead of the full
        // @likec4/icons bundle, which is too large for the production bundler.
        const DocusaurusIcon = require('@likec4/icons/tech/docusaurus').default;
        const renderIcon = ({
          node,
        }: {
          node: { icon?: string | null };
        }): React.ReactNode => {
          if (node.icon === 'tech:docusaurus') {
            return <DocusaurusIcon />;
          }
          return null;
        };

        return (
          <div style={{ height, width: '100%' }}>
            <LikeC4ModelProvider likec4model={likec4model}>
              <LikeC4View
                viewId={viewId}
                browser
                showDiagramTitle={showTitle}
                renderIcon={renderIcon}
              />
            </LikeC4ModelProvider>
          </div>
        );
      }}
    </BrowserOnly>
  );
}
