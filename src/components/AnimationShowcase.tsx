'use client';

import React from 'react';
import AnimatedSection from './AnimatedSection';
import { Sparkles, Zap, Heart, Star, Rocket, Target } from 'lucide-react';

export default function AnimationShowcase() {
  const animations = [
    { name: 'fade-up', description: 'Fades in while moving up' },
    { name: 'fade-down', description: 'Fades in while moving down' },
    { name: 'fade-left', description: 'Fades in while moving left' },
    { name: 'fade-right', description: 'Fades in while moving right' },
    { name: 'slide-up', description: 'Slides up from bottom' },
    { name: 'slide-down', description: 'Slides down from top' },
    { name: 'slide-left', description: 'Slides from left' },
    { name: 'slide-right', description: 'Slides from right' },
    { name: 'zoom-in', description: 'Zooms in from small' },
    { name: 'zoom-in-up', description: 'Zooms in while moving up' },
    { name: 'zoom-in-down', description: 'Zooms in while moving down' },
  ] as const;

  const floatingAnimations = [
    { name: 'floating', icon: <Sparkles className="w-8 h-8" /> },
    { name: 'float-up-down', icon: <Zap className="w-8 h-8" /> },
    { name: 'pulse-bright', icon: <Heart className="w-8 h-8" /> },
    { name: 'bounce-slow', icon: <Star className="w-8 h-8" /> },
    { name: 'wiggle', icon: <Rocket className="w-8 h-8" /> },
    { name: 'swing', icon: <Target className="w-8 h-8" /> },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection animation="slide-up" className="text-center mb-16">
          <h1 className="text-5xl font-bold text-cyan-100 mb-4">
            Animation Showcase
          </h1>
          <p className="text-xl text-cyan-300">
            Scroll down to see all animations in action
          </p>
        </AnimatedSection>

        {/* Entrance Animations */}
        <section className="mb-20">
          <AnimatedSection animation="slide-up" className="mb-12">
            <h2 className="text-3xl font-bold text-cyan-100 mb-8">
              1️⃣ Entrance Animations
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {animations.map((anim, index) => (
              <AnimatedSection
                key={anim.name}
                animation={anim.name as any}
                delay={index * 0.1}
              >
                <div className="bg-slate-800/50 border border-blue-500/30 rounded-xl p-8 text-center hover:border-cyan-400 transition-all duration-300">
                  <div className="text-4xl mb-4">✨</div>
                  <h3 className="text-lg font-bold text-cyan-100 mb-2">
                    {anim.name}
                  </h3>
                  <p className="text-sm text-cyan-300">{anim.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Floating Animations */}
        <section className="mb-20">
          <AnimatedSection animation="slide-up" className="mb-12">
            <h2 className="text-3xl font-bold text-cyan-100 mb-8">
              4️⃣ Floating Animations
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {floatingAnimations.map((anim, index) => (
              <AnimatedSection
                key={anim.name}
                animation="fade-up"
                delay={index * 0.1}
              >
                <div className="bg-slate-800/50 border border-blue-500/30 rounded-xl p-8 text-center hover:border-cyan-400 transition-all duration-300">
                  <div className={`text-cyan-400 mb-4 flex justify-center animate-${anim.name}`}>
                    {anim.icon}
                  </div>
                  <h3 className="text-lg font-bold text-cyan-100 mb-2">
                    {anim.name}
                  </h3>
                  <p className="text-sm text-cyan-300">Continuous animation</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Hover Animations */}
        <section className="mb-20">
          <AnimatedSection animation="slide-up" className="mb-12">
            <h2 className="text-3xl font-bold text-cyan-100 mb-8">
              5️⃣ Hover Animations
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'hover-grow', description: 'Scales up on hover' },
              { name: 'hover-lift', description: 'Moves up on hover' },
              { name: 'hover-glow', description: 'Glows on hover' },
              { name: 'hover-scale', description: 'Scales more on hover' },
              { name: 'hover-rotate', description: 'Rotates on hover' },
            ].map((anim, index) => (
              <AnimatedSection
                key={anim.name}
                animation="fade-up"
                delay={index * 0.1}
              >
                <div className={`bg-slate-800/50 border border-blue-500/30 rounded-xl p-8 text-center hover:border-cyan-400 transition-all duration-300 ${anim.name}`}>
                  <div className="text-4xl mb-4">👆</div>
                  <h3 className="text-lg font-bold text-cyan-100 mb-2">
                    {anim.name}
                  </h3>
                  <p className="text-sm text-cyan-300">{anim.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Text Animations */}
        <section className="mb-20">
          <AnimatedSection animation="slide-up" className="mb-12">
            <h2 className="text-3xl font-bold text-cyan-100 mb-8">
              6️⃣ Text Animations
            </h2>
          </AnimatedSection>

          <div className="space-y-8">
            <AnimatedSection animation="fade-up">
              <div className="bg-slate-800/50 border border-blue-500/30 rounded-xl p-8">
                <h3 className="text-lg font-bold text-cyan-100 mb-4">
                  Typewriter Effect
                </h3>
                <p className="animate-typewriter text-2xl font-bold text-cyan-300">
                  Transform Your Future
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={0.1}>
              <div className="bg-slate-800/50 border border-blue-500/30 rounded-xl p-8">
                <h3 className="text-lg font-bold text-cyan-100 mb-4">
                  Gradient Shift
                </h3>
                <p className="animate-gradient-shift text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Animated Gradient Text
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={0.2}>
              <div className="bg-slate-800/50 border border-blue-500/30 rounded-xl p-8">
                <h3 className="text-lg font-bold text-cyan-100 mb-4">
                  Text Reveal
                </h3>
                <p className="animate-text-reveal text-lg text-cyan-300">
                  This text reveals with a smooth fade-up animation
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Stagger Animation */}
        <section className="mb-20">
          <AnimatedSection animation="slide-up" className="mb-12">
            <h2 className="text-3xl font-bold text-cyan-100 mb-8">
              Staggered List Animation
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="stagger-item">
                <div className="bg-slate-800/50 border border-blue-500/30 rounded-xl p-6 hover:border-cyan-400 transition-all duration-300">
                  <p className="text-cyan-300">
                    Item {item} - Each item has automatic staggered delay
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Combined Animation Example */}
        <section>
          <AnimatedSection animation="slide-up" className="mb-12">
            <h2 className="text-3xl font-bold text-cyan-100 mb-8">
              Combined Animations
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection animation="zoom-in">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-8 text-white hover-lift">
                <div className="animate-floating mb-4">
                  <Sparkles className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Zoom + Hover + Float</h3>
                <p>Multiple animations combined for maximum impact</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={0.2}>
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-8 text-white hover-glow">
                <div className="animate-pulse-bright mb-4">
                  <Heart className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Fade + Hover + Pulse</h3>
                <p>Smooth entrance with glowing hover effect</p>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </div>
  );
}
