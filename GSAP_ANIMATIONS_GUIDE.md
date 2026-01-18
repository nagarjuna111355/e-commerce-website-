# GSAP Scroll-Based Text Reveal Animations

## Overview

This implementation provides advanced scroll-based text reveal animations using GSAP (GreenSock Animation Platform) and ScrollTrigger. The animations are optimized for performance and provide a premium feel to your e-commerce website.

## Features

✨ **5 Animation Types:**
- Character-by-character reveal
- Word-by-word reveal
- Fade & Slide animations (4 directions)
- Scale reveal with bounce effects
- Clip-path reveal animations (4 directions)

⚡ **Performance Optimized:**
- GPU-accelerated animations
- Lazy loading with scroll triggers
- Automatic cleanup on unmount
- Backface visibility optimization

🎨 **Fully Customizable:**
- Adjust timing, easing, and stagger
- Control trigger points
- Mix and match animations
- Responsive and mobile-friendly

## Installation

GSAP is already installed in your project. If you need to install it manually:

\`\`\`bash
npm install gsap
\`\`\`

## Usage

### 1. Import Components

\`\`\`jsx
import { 
  WordReveal, 
  CharReveal, 
  FadeSlide, 
  ScaleReveal, 
  ClipReveal 
} from '../components/TextReveal';
\`\`\`

### 2. Character-by-Character Reveal

\`\`\`jsx
<CharReveal 
  stagger={0.03}      // Delay between each character
  duration={1}         // Animation duration
  ease="power4.out"    // Easing function
  start="top 80%"      // When to trigger (when element is 80% from top)
>
  Your Amazing Text Here
</CharReveal>
\`\`\`

### 3. Word-by-Word Reveal

\`\`\`jsx
<WordReveal 
  stagger={0.08}
  duration={0.8}
  start="top 75%"
>
  <h1>Premium Quality Products</h1>
</WordReveal>
\`\`\`

### 4. Fade & Slide Animations

\`\`\`jsx
<FadeSlide 
  direction="up"        // Options: "up", "down", "left", "right"
  distance={60}         // Distance to slide (in pixels)
  duration={1.2}
  start="top 80%"
>
  <div className="content">
    Your content here
  </div>
</FadeSlide>
\`\`\`

### 5. Scale Reveal

\`\`\`jsx
<ScaleReveal 
  scale={0.7}              // Initial scale (0-1)
  duration={1}
  stagger={0.15}           // For multiple children
  ease="back.out(1.7)"     // Bounce effect
  start="top 80%"
>
  <div className="grid">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </div>
</ScaleReveal>
\`\`\`

### 6. Clip Path Reveal

\`\`\`jsx
<ClipReveal 
  direction="left"          // Options: "left", "right", "top", "bottom"
  duration={1.5}
  ease="power4.inOut"
  start="top 75%"
>
  <div className="hero-image">
    Content reveals with clip-path animation
  </div>
</ClipReveal>
\`\`\`

## Animation Options

### Common Options (Available for all components)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| \`start\` | String | "top 80%" | ScrollTrigger start position |
| \`duration\` | Number | 0.8-1.2 | Animation duration in seconds |
| \`ease\` | String | "power3.out" | GSAP easing function |
| \`stagger\` | Number | 0.05-0.2 | Delay between child animations |

### FadeSlide Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| \`direction\` | String | "up" | Direction: "up", "down", "left", "right" |
| \`distance\` | Number | 100 | Slide distance in pixels |

### ScaleReveal Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| \`scale\` | Number | 0.5 | Initial scale (0-1) |

### ClipReveal Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| \`direction\` | String | "left" | Reveal direction: "left", "right", "top", "bottom" |

## GSAP Easing Functions

Common easing options:
- \`"power1.out"\` - Gentle deceleration
- \`"power3.out"\` - Strong deceleration
- \`"power4.out"\` - Very strong deceleration
- \`"back.out(1.7)"\` - Bounce effect
- \`"elastic.out(1, 0.3)"\` - Elastic bounce
- \`"circ.out"\` - Circular easing

## Advanced Usage

### Combining Multiple Animations

\`\`\`jsx
<ClipReveal direction="left" duration={1.2}>
  <div className="card">
    <WordReveal stagger={0.05}>
      <h2>Amazing Product</h2>
    </WordReveal>
    <FadeSlide direction="up" distance={30}>
      <p>Product description goes here</p>
    </FadeSlide>
    <ScaleReveal scale={0.8}>
      <button>Add to Cart</button>
    </ScaleReveal>
  </div>
</ClipReveal>
\`\`\`

### Custom Scroll Triggers

\`\`\`jsx
<WordReveal 
  start="top center"     // Trigger when top of element hits center of viewport
  end="bottom center"    // End when bottom hits center
  scrub={true}           // Scrub animation with scroll
>
  Scroll-linked text
</WordReveal>
\`\`\`

## Using Custom Hooks

For more control, use the hooks directly:

\`\`\`jsx
import { useTextReveal, useFadeSlide } from '../hooks/useGSAP';

function MyComponent() {
  const textRef = useTextReveal({
    start: 'top 80%',
    stagger: 0.05,
    duration: 1,
  });
  
  const slideRef = useFadeSlide({
    direction: 'up',
    distance: 50,
  });
  
  return (
    <div>
      <h1 ref={textRef}>
        <span className="word">Animated</span>
        <span className="word">Text</span>
      </h1>
      <div ref={slideRef}>
        <p>Sliding content</p>
      </div>
    </div>
  );
}
\`\`\`

## Demo Page

Visit \`/gsap-demo\` to see all animations in action with examples:

\`\`\`
http://localhost:5173/gsap-demo
\`\`\`

## Implementation Examples

### Home Page
The Home page uses:
- WordReveal for hero title
- FadeSlide for subtitle and sections
- ScaleReveal for feature cards and products
- ClipReveal for CTA section

### About Page
The About page demonstrates:
- WordReveal for section headings
- FadeSlide for content blocks
- ScaleReveal for value cards and stats
- ClipReveal for story section

## Performance Tips

1. **Use \`start\` prop wisely**: Trigger animations when elements are 70-90% visible
2. **Limit stagger count**: For large lists, consider pagination
3. **Avoid nested animations**: Can cause performance issues on mobile
4. **Use will-change**: Already included in CSS for optimization
5. **Test on mobile**: Reduce animation complexity if needed

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Troubleshooting

### Animations not triggering
- Check that elements are within viewport range
- Verify \`start\` trigger position
- Ensure GSAP is properly imported

### Performance issues
- Reduce \`stagger\` count for large lists
- Use simpler animations on mobile
- Check browser DevTools for layout shifts

### Text splitting issues
- Ensure text is a string, not JSX
- For JSX content, pass as children without wrapping

## Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP Ease Visualizer](https://greensock.com/ease-visualizer/)

## License

This implementation uses GSAP under their standard license. For commercial projects, please review [GSAP licensing](https://greensock.com/licensing/).
