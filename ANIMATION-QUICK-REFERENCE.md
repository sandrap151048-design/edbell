# 🎬 Animation Quick Reference Card

## Copy-Paste Examples

### 1. Hero Section with All Animations
```tsx
<section className="min-h-screen">
  <AnimatedSection animation="slide-up" delay={0.1}>
    <h1 className="text-6xl font-bold">Main Heading</h1>
  </AnimatedSection>
  
  <AnimatedSection animation="fade-up" delay={0.2}>
    <p className="text-xl">Description text</p>
  </AnimatedSection>
  
  <AnimatedSection animation="zoom-in" delay={0.3}>
    <button className="btn-animate">Get Started</button>
  </AnimatedSection>
  
  <div className="animate-floating">
    <Icon />
  </div>
</section>
```

### 2. Feature Cards with Stagger
```tsx
<div className="grid grid-cols-3 gap-8">
  {features.map((feature, index) => (
    <AnimatedSection
      key={index}
      animation="fade-up"
      delay={index * 0.1}
    >
      <div className="feature-box-animate hover-grow">
        <div className="animate-floating">
          {feature.icon}
        </div>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
    </AnimatedSection>
  ))}
</div>
```

### 3. Course Cards
```tsx
<div className="grid grid-cols-3 gap-8">
  {courses.map((course, index) => (
    <AnimatedSection
      key={course.id}
      animation="fade-up"
      delay={index * 0.1}
    >
      <div className="course-card-animate hover-lift">
        <h3>{course.name}</h3>
        <p>{course.description}</p>
        <button className="btn-animate">Learn More</button>
      </div>
    </AnimatedSection>
  ))}
</div>
```

### 4. Testimonials
```tsx
<div className="grid grid-cols-3 gap-8">
  {testimonials.map((testimonial, index) => (
    <AnimatedSection
      key={index}
      animation="fade-up"
      delay={index * 0.15}
    >
      <div className="testimonial-animate hover-glow">
        <p className="italic">"{testimonial.text}"</p>
        <h4>{testimonial.name}</h4>
        <p className="text-sm">{testimonial.role}</p>
      </div>
    </AnimatedSection>
  ))}
</div>
```

### 5. Text with Gradient Animation
```tsx
<h2 className="text-4xl font-bold animate-gradient-shift bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
  Animated Gradient Text
</h2>
```

### 6. Typewriter Effect
```tsx
<h1 className="animate-typewriter text-4xl font-bold">
  Transform Your Future
</h1>
```

### 7. Floating Icon
```tsx
<div className="animate-floating">
  <GraduationCap className="w-16 h-16" />
</div>
```

### 8. Pulsing Button
```tsx
<button className="animate-pulse-bright bg-blue-600 text-white px-8 py-4 rounded-xl">
  Click Me
</button>
```

### 9. Bouncing Element
```tsx
<div className="animate-bounce-slow">
  <Icon />
</div>
```

### 10. Wiggling Animation
```tsx
<div className="animate-wiggle">
  <Icon />
</div>
```

---

## Animation Classes Cheat Sheet

### Entrance (Scroll-Triggered)
```
.animate-fade-up
.animate-fade-down
.animate-fade-left
.animate-fade-right
.animate-fade-in
```

### Slide
```
.animate-slide-up
.animate-slide-down
.animate-slide-left
.animate-slide-right
```

### Zoom
```
.animate-zoom-in
.animate-zoom-out
.animate-zoom-in-up
.animate-zoom-in-down
```

### Floating
```
.animate-floating
.animate-float-up-down
.animate-pulse-bright
.animate-bounce-slow
.animate-wiggle
.animate-swing
```

### Hover
```
.hover-grow
.hover-lift
.hover-glow
.hover-scale
.hover-rotate
```

### Text
```
.animate-typewriter
.animate-text-reveal
.animate-gradient-shift
.animate-text-slide-up
```

### Delays
```
.animation-delay-100 (0.1s)
.animation-delay-200 (0.2s)
.animation-delay-300 (0.3s)
.animation-delay-400 (0.4s)
.animation-delay-500 (0.5s)
.animation-delay-600 (0.6s)
.animation-delay-700 (0.7s)
.animation-delay-800 (0.8s)
.animation-delay-1000 (1s)
```

### Durations
```
.animation-duration-300 (0.3s)
.animation-duration-500 (0.5s)
.animation-duration-700 (0.7s)
.animation-duration-1000 (1s)
.animation-duration-1500 (1.5s)
.animation-duration-2000 (2s)
```

---

## Component Props

### AnimatedSection
```tsx
<AnimatedSection
  animation="fade-up"           // Animation type
  delay={0.2}                   // Delay in seconds
  duration={0.8}                // Duration in seconds
  className="custom-class"      // Additional classes
  threshold={0.1}               // Scroll trigger threshold
>
  {children}
</AnimatedSection>
```

---

## Common Patterns

### Staggered List
```tsx
{items.map((item, index) => (
  <div key={index} className="stagger-item">
    {item}
  </div>
))}
```

### Card with Hover
```tsx
<div className="course-card-animate hover-lift">
  {/* Card content */}
</div>
```

### Icon with Float
```tsx
<div className="animate-floating">
  <Icon className="w-12 h-12" />
</div>
```

### Button with Shine
```tsx
<button className="btn-animate bg-blue-600">
  Click Me
</button>
```

---

## Performance Tips

✅ **DO:**
- Use `triggerOnce: true` for scroll animations
- Stagger animations with 0.1-0.2s delays
- Limit to 3-5 animation types per page
- Use `transform` for animations

❌ **DON'T:**
- Animate `left`, `top`, `width`, `height`
- Use too many floating animations
- Animate on every element
- Use long durations (>1s)

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Animation not showing | Check if element is in viewport |
| Animation too fast | Increase `duration` prop |
| Animation too slow | Decrease `duration` prop |
| Jittery animation | Use `will-change: transform` |
| Not triggering on scroll | Check `threshold` value |

---

## File Locations

- **Animations**: `/src/app/globals.css`
- **Component**: `/src/components/AnimatedSection.tsx`
- **Hook**: `/src/hooks/useScrollAnimation.ts`
- **Config**: `/src/config/animations.ts`
- **Guide**: `/ANIMATION-GUIDE.md`

---

**Quick Start:** Copy any example above and customize for your needs!
