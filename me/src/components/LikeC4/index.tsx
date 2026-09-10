import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

/**
 * Renders a LikeC4 view from the generated model.
 *
 * The model is produced by `npm run likec4:codegen` which writes
 * `src/likec4/likec4-model.ts`. Diagrams rely on browser APIs, so we render
 * them client-side only via <BrowserOnly>.
 *
 * Usage in MDX:
 *   import LikeC4 from '@site/src/components/LikeC4';
 *   <LikeC4 viewId="index" />
 */
export interface LikeC4Props {
  /** The id of the view defined in the LikeC4 model (e.g. "index"). */
  viewId: string;
  /** Fixed height of the diagram container. */
  height?: number | string;
  /** Allow panning the diagram. */
  pannable?: boolean;
  /** Allow zooming the diagram. */
  zoomable?: boolean;
  /** Show the view title inside the diagram. */
  showTitle?: boolean;
}

export default function LikeC4({
  viewId,
  height = 480,
  pannable = true,
  zoomable = true,
  showTitle = true,
}: LikeC4Props): React.ReactElement {
  return (
    <BrowserOnly fallback={<div style={{ height }} />}>
      {() => {
        // Imported lazily so it never runs during SSR.
        const { LikeC4ModelProvider, ReactLikeC4 } = require('@likec4/diagram');
        const { likec4model } = require('@site/src/likec4/likec4-model');

        return (
          <div style={{ height, width: '100%' }}>
            <LikeC4ModelProvider model={likec4model}>
              <ReactLikeC4
                viewId={viewId}
                pannable={pannable}
                zoomable={zoomable}
                keepAspectRatio
                showNavigationButtons
                enableElementDetails
                enableRelationshipDetails
                showDiagramTitle={showTitle}
              />
            </LikeC4ModelProvider>
          </div>
        );
      }}
    </BrowserOnly>
  );
}
