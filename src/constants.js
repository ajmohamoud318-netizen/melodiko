// Centralized asset URLs. Large story-card SVGs are hosted on Cloudflare R2
// because they exceed Cloudflare Pages' 25 MiB per-file deploy limit.
export const R2_BASE = 'https://pub-c1edc5d9b28640d9b50b09a1b2602c59.r2.dev'

// Map of oversized story cards: source filename -> R2 object key.
export const R2_STORY_CARDS = {
  'iyi-ki-dogdun.svg': 'story-cards/iyi-ki-dogdun.svg',
  'story-10.svg': 'story-cards/story-10.svg',
  'story-11.svg': 'story-cards/story-11.svg',
  'story-12.svg': 'story-cards/story-12.svg',
}

export const storyCardUrl = (filename) => {
  const key = R2_STORY_CARDS[filename]
  return key ? `${R2_BASE}/${key}` : `/story-cards/${filename}`
}
