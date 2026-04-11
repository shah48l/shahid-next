# ReactBits Integration Guide

After `npm install`, run these commands to add ReactBits components:

```bash
npx jsrepo add https://reactbits.dev/default/TextAnimations/SplitText
npx jsrepo add https://reactbits.dev/default/Animations/SplashCursor
npx jsrepo add https://reactbits.dev/default/Animations/LogoLoop
npx jsrepo add https://reactbits.dev/default/Animations/Magnet
npx jsrepo add https://reactbits.dev/default/Components/SpotlightCard
npx jsrepo add https://reactbits.dev/default/Components/ProfileCard
npx jsrepo add https://reactbits.dev/default/Components/GooeyNav
```

Then swap each placeholder:

## 1. SplashCursor → `src/components/CursorEffect.tsx`
Replace the BlobCursor canvas with:
```tsx
import SplashCursor from '@/components/SplashCursor'; // jsrepo installed path
export default function CursorEffect() {
  return <SplashCursor />;
}
```

## 2. SplitText → `src/components/Loader.tsx`
In the Loader, replace the `<pre>` ASCII with:
```tsx
import SplitText from '@/components/SplitText';
<SplitText text="Welcome to Shahid's Space" className="text-[#00ffaa] text-4xl font-bold" />
```

## 3. LogoLoop → `src/components/Sections.tsx` → `LogoLoop`
Replace the manual marquee with:
```tsx
import LogoLoop from '@/components/LogoLoop';
// Pass TECH_LOGOS array as items
<LogoLoop items={TECH_LOGOS.map(t => t.url)} />
```

## 4. Magnet → Contact links
Wrap each contact `<a>` with:
```tsx
import Magnet from '@/components/Magnet';
<Magnet><a href="..." className="cl">...</a></Magnet>
```

## 5. SpotlightCard → Skill/Project/Edu cards
Replace `<div className="skill-card ...">` with:
```tsx
import SpotlightCard from '@/components/SpotlightCard';
<SpotlightCard spotlightColor="rgba(0,255,170,0.15)">
  {/* card content */}
</SpotlightCard>
```

## 6. ProfileCard → Hero section (optional)
Add a profile card in the hero or contact section.

## 7. GooeyNav → `src/components/Nav.tsx`
Replace the nav links with:
```tsx
import GooeyNav from '@/components/GooeyNav';
<GooeyNav items={[
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  // ...
]} />
```
