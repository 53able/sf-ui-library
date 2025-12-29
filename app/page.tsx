import { GlowButton } from "@/registry/sf-ui/glow-button/glow-button";
import { GlowText } from "@/registry/sf-ui/glow-text/glow-text";

/**
 * Storybook URL from environment variable or default to localhost.
 * Set NEXT_PUBLIC_STORYBOOK_URL environment variable for production.
 */
const STORYBOOK_URL =
  process.env.NEXT_PUBLIC_STORYBOOK_URL ?? "http://localhost:6006";

/**
 * Minimal landing page that redirects to Storybook.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-lcars-dark flex items-center justify-center p-8">
      <div className="mx-auto max-w-2xl text-center space-y-8">
        <GlowText
          as="h1"
          color="blue"
          intensity="intense"
          size="4xl"
          weight="bold"
          animate="pulse"
          className="mb-4 uppercase tracking-wider"
        >
          SF UI Library
        </GlowText>
        <GlowText color="blue" intensity="normal" size="lg" className="opacity-80 mb-8">
          LCARS-inspired component library built with shadcn/ui
        </GlowText>
        <div className="flex justify-center">
          <GlowButton
            variant="default"
            size="lg"
            asChild
            className="text-lg px-8 py-6"
          >
            <a href={STORYBOOK_URL} target="_blank" rel="noopener noreferrer">
              Open Storybook
            </a>
          </GlowButton>
        </div>
        <GlowText color="blue" intensity="subtle" size="sm" className="opacity-60 mt-4">
          Component previews and documentation are available in Storybook
        </GlowText>
      </div>
    </main>
  );
}
