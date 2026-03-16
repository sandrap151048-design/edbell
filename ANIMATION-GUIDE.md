# 🎬 EDBELL Animation System Guide

## Overview
Complete animation system with 6 categories of animations for a modern, engaging UI.

---

## 1️⃣ Entrance Animations (Scroll-Triggered)

Used when sections appear on scroll. Perfect for course cards, features, and testimonials.

### Available Animations:
- **fade-up** - Content appears from bottom with fade
- **fade-down** - Content appears from top with fade
- **fade-left** - Content appears from left with fade
- **fade-right** - Content appears from right with fade

### Usage:
```tsx
import AnimatedSection from '@/components/AnimatedSection';

<AnimatedSection animation="fade-up" delay={0.2}>
  <div>Your content here</div>
</AnimatedSection>
```

### CSS Classes:
```html
<div class="animate-fade-up">Content</div>
<div class="animate-fade-down">Content</div>
<div class="animate-fade-left">Content</div>
<div class="animate-fade-right">Content</div>
```

---

## 2️⃣ Slide Animations

Used for hero sections and text blocks. More dramatic than fade animations.

### Available Animations:
- **slide-up** - Slides up from bottom
- **slide-down** - Slides down from top
- **slide-left** - Slides from left
- **slide-right** - Slides from right

### Usage:
```tsx
<AnimatedSection animation="slide-up" delay={0.3}>
  <h1>Hero Heading</h1>
</AnimatedSection>
```

### CSS Classes:
```html
<div class="animate-slide-up">Content</div>
<div class="animate-slide-down">Content</div>
<div class="animate-slide-left">Content</div>
<div class="animate-slide-right">Content</div>
```

---

## 3️⃣ Zoom Animations

Good for highlighting elements like course cards, icons, and buttons.

### Available Animations:
- **zoom-in** - Scales from 0.8 to 1
- **zoom-out** - Scales from 1.2 to 1
- **zoom-in-up** - Zooms in while moving up
- **zoom-in-down** - Zooms in while moving down

### Usage:
```tsx
<AnimatedSection animation="zoom-in" delay={0.2}>
  <div class="course-card">Course</div>
</AnimatedSection>
```

### CSS Classes:
```html
<div class="animate-zoom-in">Content</div>
<div class="animate-zoom-out">Content</div>
<div class="animate-zoom-in-up">Content</div>
<div class="animate-zoom-in-down">Content</div>
```

---

## 4️⃣ AI-Style Floating Animations

Makes the website feel modern and dynamic. Perfect for icons and illustrations.

### Available Animations:
- **floating** - Gentle up-down floating motion
- **float-up-down** - Slower floating motion
- **pulse** - Opacity pulse effect
- **pulse-bright** - Glowing pulse with shadow
- **bounce** - Bouncing motion
- **bounce-slow** - Slower bounce
- **wiggle** - Slight rotation wiggle
- **swing** - Swinging motion

### Usage:
```tsx
<div class="animate-floating">
  <Icon />
</div>

<div class="animate-pulse-bright">
  <Button />
</div>
```

### CSS Classes:
```html
<div class="animate-floating">Content</div>
<div class="animate-float-up-down">Content</div>
<div class="animate-pulse-bright">Content</div>
<div class="animate-bounce-slow">Content</div>
<div class="animate-wiggle">Content</div>
<div class="animate-swing">Content</div>
```

---

## 5️⃣ Hover Animations

For interactive UI elements. Applied automatically on hover.

### Available Animations:
- **hover-grow** - Scales up on hover
- **hover-lift** - Moves up on hover
- **hover-glow** - Glowing shadow on hover
- **hover-scale** - Scales up more on hover
- **hover-rotate** - Rotates on hover

### Usage:
```tsx
<div class="hover-grow">
  <button>Click me</button>
</div>

<div class="hover-lift">
  <Card />
</div>
```

### CSS Classes:
```html
<div class="hover-grow">Content</div>
<div class="hover-lift">Content</div>
<div class="hover-glow">Content</div>
<div class="hover-scale">Content</div>
<div class="hover-rotate">Content</div>
```

---

## 6️⃣ Text Animations

Perfect for headings and text content.

### Available Animations:
- **typewriter** - Typewriter effect
- **text-reveal** - Text appears with fade
- **gradient-shift** - Animated gradient background
- **text-slide-up** - Text slides up

### Usage:
```tsx
<h1 class="animate-typewriter">
  Transform Your Future
</h1>

<p class="animate-text-reveal">
  Your paragraph here
</p>

<h2 class="animate-gradient-shift bg-gradient-to-r from-blue-400 to-cyan-400">
  Gradient Text
</h2>
```

### CSS Classes:
```html
<div class="animate-typewriter">Content</div>
<div class="animate-text-reveal">Content</div>
<div class="animate-gradient-shift">Content</div>
<div class="animate-text-slide-up">Content</div>
```

---

## Animation Delays

Control when animations start:

```tsx
<AnimatedSection animation="fade-up" delay={0.1}>
  First item
</AnimatedSection>

<AnimatedSection animation="fade-up" delay={0.2}>
  Second item
</AnimatedSection>

<AnimatedSection animation="fade-up" delay={0.3}>
  Third item
</AnimatedSection>
```

### CSS Classes:
```html
<div class="animation-delay-100">0.1s delay</div>
<div class="animation-delay-200">0.2s delay</div>
<div class="animation-delay-300">0.3s delay</div>
<div class="animation-delay-400">0.4s delay</div>
<div class="animation-delay-500">0.5s delay</div>
<div class="animation-delay-600">0.6s delay</div>
<div class="animation-delay-700">0.7s delay</div>
<div class="animation-delay-800">0.8s delay</div>
<div class="animation-delay-1000">1s delay</div>
```

---

## Animation Durations

Control animation speed:

```tsx
<AnimatedSection animation="fade-up" duration={0.5}>
  Fast animation
</AnimatedSection>

<AnimatedSection animation="fade-up" duration={1.5}>
  Slow animation
</AnimatedSection>
```

### CSS Classes:
```html
<div class="animation-duration-300">0.3s</div>
<div class="animation-duration-500">0.5s</div>
<div class="animation-duration-700">0.7s</div>
<div class="animation-duration-1000">1s</div>
<div class="animation-duration-1500">1.5s</div>
<div class="animation-duration-2000">2s</div>
```

---

## Stagger Animation (For Lists)

Automatically stagger animations for list items:

```tsx
<div>
  {items.map((item, index) => (
    <div key={index} class="stagger-item">
      {item}
    </div>
  ))}
</div>
```

The `stagger-item` class automatically applies delays:
- Item 1: 0.1s
- Item 2: 0.2s
- Item 3: 0.3s
- ... up to Item 10: 1s

---

## Scroll Animation Hook

For custom scroll-triggered animations:

```tsx
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function MyComponent() {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={isVisible ? 'animate-fade-up' : 'opacity-0'}
    >
      Content appears when scrolled into view
    </div>
  );
}
```

---

## Best Practices

### 1. **Use Entrance Animations for:**
- Course cards
- Feature boxes
- Testimonials
- List items

### 2. **Use Slide Animations for:**
- Hero headings
- Section titles
- Large text blocks
- Images

### 3. **Use Zoom Animations for:**
- Course cards
- Icons
- Buttons
- Highlighted elements

### 4. **Use Floating Animations for:**
- Education icons
- AI illustrations
- Hero images
- Decorative elements

### 5. **Use Hover Animations for:**
- Buttons
- Cards
- Feature boxes
- Interactive elements

### 6. **Use Text Animations for:**
- Main headings
- Taglines
- Important text
- Call-to-action text

---

## Performance Tips

1. **Limit animations per page** - Use 3-5 different animation types
2. **Use `triggerOnce: true`** - Animations trigger only once on scroll
3. **Stagger delays** - Use 0.1s-0.2s between items
4. **Avoid too many floating animations** - Limit to 2-3 per section
5. **Use `will-change` CSS** - For performance-critical animations

---

## Configuration

Edit animation settings in `/src/config/animations.ts`:

```typescript
export const animationConfig = {
  entrance: {
    fadeUp: {
      duration: 0.8,
      delay: 0,
      easing: 'ease-out',
    },
    // ... more animations
  },
  stagger: {
    small: 0.1,
    medium: 0.15,
    large: 0.2,
  },
  scroll: {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true,
  },
};
```

---

## Examples

### Hero Section
```tsx
<section>
  <AnimatedSection animation="slide-up" delay={0.1}>
    <h1>Transform Your Future</h1>
  </AnimatedSection>
  
  <AnimatedSection animation="fade-up" delay={0.2}>
    <p>Description text</p>
  </AnimatedSection>
  
  <AnimatedSection animation="zoom-in" delay={0.3}>
    <button>Get Started</button>
  </AnimatedSection>
</section>
```

### Course Cards
```tsx
<div className="grid grid-cols-3 gap-8">
  {courses.map((course, index) => (
    <AnimatedSection
      key={course.id}
      animation="fade-up"
      delay={index * 0.1}
    >
      <div className="course-card-animate hover-lift">
        {/* Card content */}
      </div>
    </AnimatedSection>
  ))}
</div>
```

### Features Section
```tsx
<div className="grid grid-cols-3 gap-8">
  {features.map((feature, index) => (
    <AnimatedSection
      key={index}
      animation="fade-up"
      delay={index * 0.1}
      className="stagger-item"
    >
      <div className="feature-box-animate hover-grow">
        <Icon className="animate-floating" />
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
    </AnimatedSection>
  ))}
</div>
```

---

## Troubleshooting

### Animation not triggering?
- Check if element is in viewport
- Verify `threshold` value (0.1 is default)
- Check browser console for errors

### Animation too fast/slow?
- Adjust `duration` prop
- Use `animation-duration-*` classes

### Animation not smooth?
- Check for `will-change` CSS
- Reduce number of animations
- Use `transform` instead of `left/top`

---

## Browser Support

All animations use standard CSS and are supported in:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

---

## Additional Resources

- Animation Config: `/src/config/animations.ts`
- Scroll Hook: `/src/hooks/useScrollAnimation.ts`
- Animated Component: `/src/components/AnimatedSection.tsx`
- Global Styles: `/src/app/globals.css`

---

**Last Updated:** 2024
**Version:** 1.0.0
