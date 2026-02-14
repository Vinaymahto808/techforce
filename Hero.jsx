import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ColorfulParticleBackground from './ColorfulParticleBackground';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    }),
  };

  const title = "AI Driven Application Development";
  const subtitle = "Tailored to Your Business Needs";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      <ColorfulParticleBackground />
      
      <motion.div
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-yellow-300/40 to-orange-300/40 rounded-full blur-3xl"
      />
      <motion.div
        style={{
          transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
        }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-cyan-300/40 to-blue-300/40 rounded-full blur-3xl"
      />
      <motion.div
        style={{
          transform: `translate(${mousePosition.y}px, ${mousePosition.x}px)`,
        }}
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-pink-300/30 to-purple-300/30 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-block p-4 bg-white/50 backdrop-blur-md rounded-3xl shadow-xl mb-8">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </motion.div>

        <div className="mb-8 overflow-hidden">
          {title.split('').map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="inline-block text-5xl md:text-7xl lg:text-8xl font-black tracking-tight"
              style={{ 
                background: char === 'A' || char === 'I' ? 
                  'linear-gradient(135deg, #FF6B6B, #4ECDC4)' : 
                  'linear-gradient(135deg, #667EEA, #764BA2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-3xl md:text-5xl font-black mb-6 tracking-tight bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
        >
          {subtitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto font-semibold"
        >
          "Accelerating digital transformation with smart technology and streamlined development 💡"
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#services"
            whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-lg font-black rounded-full shadow-2xl relative overflow-hidden group"
          >
            <span className="relative z-10">Get Started 🚀</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white border-4 border-purple-500 text-purple-600 text-lg font-black rounded-full hover:bg-purple-50 transition-colors shadow-xl"
          >
            Book a Call 📞
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-20"
        >
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block text-5xl"
          >
            🎨
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;