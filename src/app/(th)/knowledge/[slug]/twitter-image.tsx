// Reuse this route's OpenGraph card for the Twitter/X summary_large_image card.
// `generateStaticParams` has to be re-exported too, or this route is left
// dynamic and the font read in `ogCard.tsx` breaks in production.
export {
  default,
  alt,
  size,
  contentType,
  generateStaticParams,
} from "./opengraph-image";
