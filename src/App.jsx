import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';

// Colorful Particle background component
const ColorfulParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }} />;
};

// Navigation component
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = ['Services', 'Process', 'Tools', 'Work'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg' : 'bg-white/90 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.a
          href="#"
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
          className="cursor-pointer"
        >
          <img src="/logo.png" alt="TechForge Logo" className="h-12 w-auto" />
        </motion.a>

        <div className="hidden md:flex gap-8">
          {menuItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -2, scale: 1.05 }}
              className="text-lg font-bold text-gray-700 hover:text-[#0D3430] relative group transition-colors"
            >
              {item}
              <motion.span 
                className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-[#0D3430] to-[#16A085] rounded-full transition-all group-hover:w-full" 
              />
            </motion.a>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center"
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
            className="w-6 h-0.5 bg-pink-600 mb-1.5 transition-all origin-center rounded-full"
          />
          <motion.span
            animate={{ opacity: isOpen ? 0 : 1 }}
            className="w-6 h-0.5 bg-purple-600 mb-1.5 rounded-full"
          />
          <motion.span
            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
            className="w-6 h-0.5 bg-indigo-600 transition-all origin-center rounded-full"
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t-2 border-pink-300 overflow-hidden"
          >
            {menuItems.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setIsOpen(false)}
                className="block px-6 py-4 text-lg font-bold text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:text-pink-600 transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Hero section with vibrant colors
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
    <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0D3430] via-[#1ABC9C] to-[#2D5A52]">
      <ColorfulParticleBackground />
      
      <motion.div
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#E8A54B]/40 to-[#D4AF37]/40 rounded-full blur-3xl"
      />
      <motion.div
        style={{
          transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
        }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-[#16A085]/40 to-[#0D3430]/40 rounded-full blur-3xl"
      />
      <motion.div
        style={{
          transform: `translate(${mousePosition.y}px, ${mousePosition.x}px)`,
        }}
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-[#1ABC9C]/30 to-[#16A085]/30 rounded-full blur-3xl"
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
                  'linear-gradient(135deg, #0D3430, #16A085)' : 
                  'linear-gradient(135deg, #1ABC9C, #E8A54B)',
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
          className="text-3xl md:text-5xl font-black mb-6 tracking-tight bg-gradient-to-r from-[#0D3430] via-[#16A085] to-[#E8A54B] bg-clip-text text-transparent"
        >
          {subtitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto font-semibold"
        >
          Accelerating digital transformation with smart technology and streamlined development 💡
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
            className="px-8 py-4 bg-gradient-to-r from-[#0D3430] via-[#16A085] to-[#1ABC9C] text-white text-lg font-black rounded-full shadow-2xl relative overflow-hidden group"
          >
            <span className="relative z-10">Get Started 🚀</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#E8A54B] via-[#D4AF37] to-[#0D3430]"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white border-4 border-[#0D3430] text-[#0D3430] text-lg font-black rounded-full hover:bg-gray-100 transition-colors shadow-xl"
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

// Service Detail Modal
const ServiceDetailModal = ({ isOpen, onClose, service }) => {
  if (!isOpen || !service) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25 }}
          className="relative max-w-6xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`p-8 bg-gradient-to-r ${service.gradient} text-white relative`}>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 text-4xl font-light hover:text-gray-200"
            >
              ×
            </motion.button>
            
            <div className="text-7xl mb-4">{service.icon}</div>
            <h2 className="text-4xl font-black mb-2">{service.title}</h2>
            <p className="text-xl opacity-90">{service.description}</p>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h3 className="text-3xl font-black mb-6 text-gray-900">Key Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {service.detailedFeatures?.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-4 bg-gradient-to-br ${service.bgGradient} border-2 ${service.borderColor} rounded-2xl`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{feature.icon}</span>
                      <div>
                        <h4 className="font-black text-lg mb-1">{feature.title}</h4>
                        <p className="text-gray-600 text-sm">{feature.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-3xl font-black mb-6 text-gray-900">Technology Stack</h3>
              <div className="flex flex-wrap gap-3">
                {service.techStack?.map((tech, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`px-4 py-2 bg-gradient-to-r ${service.gradient} text-white font-bold rounded-full text-sm`}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-3xl font-black mb-6 text-gray-900">Pricing Plans</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {service.pricing?.map((plan, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -10 }}
                    className={`p-6 border-2 rounded-2xl ${
                      plan.popular ? `border-transparent bg-gradient-to-br ${service.gradient} text-white` : 'border-gray-200 bg-white'
                    }`}
                  >
                    {plan.popular && (
                      <div className="text-xs font-black mb-2 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full inline-block">
                        MOST POPULAR 🔥
                      </div>
                    )}
                    <h4 className={`text-2xl font-black mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                      {plan.name}
                    </h4>
                    <div className={`text-4xl font-black mb-4 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                      {plan.price}
                      <span className="text-lg font-normal opacity-70">{plan.period}</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className={`flex items-center gap-2 ${plan.popular ? 'text-white' : 'text-gray-700'}`}>
                          <span className="text-lg">✓</span>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-3 rounded-xl font-black ${
                        plan.popular ? 'bg-white text-gray-900' : `bg-gradient-to-r ${service.gradient} text-white`
                      }`}
                    >
                      Get Started
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-black mb-6 text-gray-900">Perfect For</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {service.useCases?.map((useCase, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                  >
                    <span className="text-2xl">{useCase.icon}</span>
                    <div>
                      <h4 className="font-black mb-1">{useCase.title}</h4>
                      <p className="text-gray-600 text-sm">{useCase.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Advanced Services section
const AdvancedServices = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedService, setSelectedService] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const services = [
    {
      icon: '📊',
      title: 'Custom CRM',
      category: 'business',
      image: '/images/service-crm.jpeg',
      description: 'Streamline your workflow with a custom CRM tailored to your business—boost efficiency, improve customer relationships, and drive growth.',
      gradient: 'from-[#0D3430] via-[#16A085] to-[#1ABC9C]',
      bgGradient: 'from-[#0D3430]/5 to-[#16A085]/5',
      borderColor: 'border-[#16A085]',
      features: ['Contact Management', 'Sales Pipeline', 'Analytics Dashboard', 'Email Integration'],
      detailedFeatures: [
        { icon: '👥', title: 'Contact Management', desc: 'Centralized database with 360° customer view' },
        { icon: '📈', title: 'Sales Pipeline', desc: 'Visual pipeline with drag-and-drop stages' },
        { icon: '📊', title: 'Analytics', desc: 'Real-time dashboards and custom reports' },
        { icon: '📧', title: 'Email Integration', desc: 'Sync with Gmail, Outlook, and more' },
        { icon: '📱', title: 'Mobile App', desc: 'iOS and Android native applications' },
        { icon: '🔔', title: 'Notifications', desc: 'Smart alerts and reminders' },
      ],
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'TypeScript'],
      pricing: [
        {
          name: 'Starter',
          price: '$499',
          period: '/month',
          features: ['Up to 1,000 contacts', '3 users', 'Basic analytics', 'Email support'],
        },
        {
          name: 'Professional',
          price: '$999',
          period: '/month',
          popular: true,
          features: ['Up to 10,000 contacts', '10 users', 'Advanced analytics', 'Priority support', 'Custom fields', 'API access'],
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          period: '',
          features: ['Unlimited contacts', 'Unlimited users', 'White-label', 'Dedicated support', 'SLA', 'On-premise option'],
        },
      ],
      useCases: [
        { icon: '🏢', title: 'B2B Sales Teams', desc: 'Manage complex sales cycles and enterprise deals' },
        { icon: '🏪', title: 'Retail Businesses', desc: 'Track customer preferences and purchase history' },
        { icon: '💼', title: 'Consulting Firms', desc: 'Manage client relationships and projects' },
        { icon: '🏥', title: 'Healthcare', desc: 'HIPAA-compliant patient relationship management' },
      ],
    },
    {
      icon: '🛠️',
      title: 'Internal Tools',
      category: 'productivity',
      image: '/images/service-automation.jpeg',
      description: 'Empower your team with custom AI-driven internal tools that automate workflows, enhance collaboration, and boost productivity.',
      gradient: 'from-[#16A085] via-[#1ABC9C] to-[#E8A54B]',
      bgGradient: 'from-[#16A085]/5 to-[#1ABC9C]/5',
      borderColor: 'border-[#1ABC9C]',
      features: ['Workflow Automation', 'Team Collaboration', 'Custom Dashboards', 'API Integration'],
      detailedFeatures: [
        { icon: '⚡', title: 'Workflow Automation', desc: 'Automate repetitive tasks with AI' },
        { icon: '👥', title: 'Team Collaboration', desc: 'Real-time collaboration tools' },
        { icon: '📊', title: 'Custom Dashboards', desc: 'Build dashboards without coding' },
        { icon: '🔗', title: 'API Integration', desc: 'Connect to 1000+ apps' },
        { icon: '🤖', title: 'AI Assistant', desc: 'Built-in AI for data analysis' },
        { icon: '🔒', title: 'Security', desc: 'Enterprise-grade security' },
      ],
      techStack: ['React', 'Python', 'FastAPI', 'MongoDB', 'Docker', 'Kubernetes'],
      pricing: [
        {
          name: 'Team',
          price: '$299',
          period: '/month',
          features: ['Up to 5 tools', '10 users', 'Basic integrations', 'Email support'],
        },
        {
          name: 'Business',
          price: '$799',
          period: '/month',
          popular: true,
          features: ['Unlimited tools', '50 users', 'Advanced integrations', 'Priority support', 'Custom branding'],
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          period: '',
          features: ['Unlimited everything', 'SSO', 'Dedicated support', 'SLA', 'On-premise deployment'],
        },
      ],
      useCases: [
        { icon: '📝', title: 'HR Operations', desc: 'Manage hiring, onboarding, and performance reviews' },
        { icon: '💰', title: 'Finance Teams', desc: 'Expense tracking and budget management' },
        { icon: '🎯', title: 'Marketing', desc: 'Campaign management and lead tracking' },
        { icon: '🔧', title: 'IT Operations', desc: 'Asset management and ticket systems' },
      ],
    },
    {
      icon: '🛒',
      title: 'E-commerce Platform',
      category: 'commerce',
      image: '/images/service-ecommerce.jpeg',
      description: 'Launch, manage, and scale your online store effortlessly with powerful and customizable e-commerce solutions.',
      gradient: 'from-[#1ABC9C] via-[#E8A54B] to-[#D4AF37]',
      bgGradient: 'from-[#1ABC9C]/5 to-[#E8A54B]/5',
      borderColor: 'border-[#E8A54B]',
      features: ['Product Management', 'Payment Processing', 'Inventory Tracking', 'Order Fulfillment'],
      detailedFeatures: [
        { icon: '📦', title: 'Product Management', desc: 'Unlimited products with variants' },
        { icon: '💳', title: 'Payment Processing', desc: 'Multiple payment gateways' },
        { icon: '📊', title: 'Inventory Tracking', desc: 'Real-time stock management' },
        { icon: '🚚', title: 'Order Fulfillment', desc: 'Integrated shipping solutions' },
        { icon: '🎨', title: 'Customizable Storefront', desc: 'Drag-and-drop page builder' },
        { icon: '📱', title: 'Mobile Commerce', desc: 'Native mobile apps' },
      ],
      techStack: ['Next.js', 'Medusa', 'Stripe', 'PostgreSQL', 'Redis', 'Vercel'],
      pricing: [
        {
          name: 'Starter',
          price: '$99',
          period: '/month',
          features: ['Up to 100 products', '2% transaction fee', 'Basic themes', 'Email support'],
        },
        {
          name: 'Growth',
          price: '$299',
          period: '/month',
          popular: true,
          features: ['Unlimited products', '1% transaction fee', 'Custom themes', 'Priority support', 'Marketing tools'],
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          period: '',
          features: ['Unlimited everything', '0% transaction fee', 'White-label', 'Dedicated support', 'Multi-store'],
        },
      ],
      useCases: [
        { icon: '👕', title: 'Fashion Brands', desc: 'Sell clothing with size variants and images' },
        { icon: '📚', title: 'Digital Products', desc: 'Sell ebooks, courses, and downloads' },
        { icon: '🍽️', title: 'Food & Beverage', desc: 'Restaurant and food delivery platforms' },
        { icon: '🎨', title: 'Handmade Goods', desc: 'Artisan marketplaces and craft stores' },
      ],
    },
    {
      icon: '⚙️',
      title: 'Automation Engineering',
      category: 'automation',
      description: 'Design, optimize, and automate your processes for smarter, faster operations using AI automation agents.',
      gradient: 'from-[#1ABC9C] via-[#16A085] to-[#0D3430]',
      bgGradient: 'from-[#1ABC9C]/5 to-[#0D3430]/5',
      borderColor: 'border-[#0D3430]',
      features: ['Process Automation', 'AI Agents', 'Workflow Optimization', 'Integration Hub'],
      detailedFeatures: [
        { icon: '🔄', title: 'Process Automation', desc: 'Automate end-to-end workflows' },
        { icon: '🤖', title: 'AI Agents', desc: 'Custom AI agents for any task' },
        { icon: '⚡', title: 'Workflow Optimization', desc: 'AI-powered process improvement' },
        { icon: '🔗', title: 'Integration Hub', desc: 'Connect all your tools' },
        { icon: '📊', title: 'Analytics', desc: 'Track automation performance' },
        { icon: '🛡️', title: 'Error Handling', desc: 'Automatic retry and fallback' },
      ],
      techStack: ['n8n', 'Python', 'Crew AI', 'OpenAI', 'Zapier', 'Make'],
      pricing: [
        {
          name: 'Starter',
          price: '$199',
          period: '/month',
          features: ['5 automations', '10,000 tasks/month', 'Basic integrations', 'Email support'],
        },
        {
          name: 'Professional',
          price: '$599',
          period: '/month',
          popular: true,
          features: ['Unlimited automations', '100,000 tasks/month', 'Advanced integrations', 'Priority support', 'Custom AI agents'],
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          period: '',
          features: ['Unlimited everything', 'Dedicated infrastructure', 'White-label', '24/7 support', 'SLA'],
        },
      ],
      useCases: [
        { icon: '📧', title: 'Email Automation', desc: 'Automate email campaigns and responses' },
        { icon: '📊', title: 'Data Processing', desc: 'Automate data entry and analysis' },
        { icon: '🔔', title: 'Notifications', desc: 'Smart alerts and escalations' },
        { icon: '📝', title: 'Document Generation', desc: 'Auto-generate reports and contracts' },
      ],
    },
    {
      icon: '📱',
      title: 'Mobile App Development',
      category: 'development',
      description: 'Build beautiful, high-performance native mobile apps for iOS and Android with cutting-edge technology.',
      gradient: 'from-[#0D3430] via-[#16A085] to-[#E8A54B]',
      bgGradient: 'from-[#0D3430]/5 to-[#E8A54B]/5',
      borderColor: 'border-blue-300',
      features: ['Native Development', 'Cross-Platform', 'Push Notifications', 'Offline Support'],
      detailedFeatures: [
        { icon: '📱', title: 'Native Development', desc: 'Swift for iOS, Kotlin for Android' },
        { icon: '🔄', title: 'Cross-Platform', desc: 'React Native or Flutter' },
        { icon: '🔔', title: 'Push Notifications', desc: 'Firebase Cloud Messaging' },
        { icon: '📴', title: 'Offline Support', desc: 'Local database sync' },
        { icon: '🎨', title: 'UI/UX Design', desc: 'Custom design system' },
        { icon: '🔒', title: 'Security', desc: 'Biometric auth and encryption' },
      ],
      techStack: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'Redux', 'TypeScript'],
      pricing: [
        {
          name: 'MVP',
          price: '$15k',
          period: 'one-time',
          features: ['Single platform', 'Basic features', '3 months support', 'App store submission'],
        },
        {
          name: 'Full App',
          price: '$35k',
          period: 'one-time',
          popular: true,
          features: ['iOS + Android', 'Advanced features', '6 months support', 'Backend included', 'Analytics'],
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          period: '',
          features: ['Complex apps', 'Unlimited features', '12 months support', 'Dedicated team', 'White-label'],
        },
      ],
      useCases: [
        { icon: '🏃', title: 'Fitness Apps', desc: 'Workout tracking and health monitoring' },
        { icon: '🎮', title: 'Gaming', desc: 'Mobile games with social features' },
        { icon: '💬', title: 'Social Networks', desc: 'Chat and community platforms' },
        { icon: '🏦', title: 'Fintech', desc: 'Banking and payment apps' },
      ],
    },
    {
      icon: '🤖',
      title: 'AI/ML Solutions',
      category: 'ai',
      description: 'Leverage artificial intelligence and machine learning to solve complex business problems and gain competitive advantages.',
      gradient: 'from-[#E8A54B] via-[#1ABC9C] to-[#16A085]',
      bgGradient: 'from-[#E8A54B]/5 to-[#16A085]/5',
      borderColor: 'border-violet-300',
      features: ['Custom AI Models', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics'],
      detailedFeatures: [
        { icon: '🧠', title: 'Custom AI Models', desc: 'Train models on your data' },
        { icon: '💬', title: 'NLP', desc: 'Chatbots and text analysis' },
        { icon: '👁️', title: 'Computer Vision', desc: 'Image and video analysis' },
        { icon: '📈', title: 'Predictive Analytics', desc: 'Forecast trends and patterns' },
        { icon: '🎯', title: 'Recommendation Systems', desc: 'Personalized recommendations' },
        { icon: '🔍', title: 'Anomaly Detection', desc: 'Identify unusual patterns' },
      ],
      techStack: ['TensorFlow', 'PyTorch', 'OpenAI', 'Hugging Face', 'Python', 'MLflow'],
      pricing: [
        {
          name: 'Starter',
          price: '$2k',
          period: '/month',
          features: ['Pre-trained models', 'API access', 'Basic customization', 'Email support'],
        },
        {
          name: 'Professional',
          price: '$5k',
          period: '/month',
          popular: true,
          features: ['Custom models', 'Model training', 'Advanced features', 'Priority support', 'Model monitoring'],
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          period: '',
          features: ['Dedicated infrastructure', 'Research team', 'Unlimited training', '24/7 support', 'On-premise option'],
        },
      ],
      useCases: [
        { icon: '🛒', title: 'E-commerce', desc: 'Product recommendations and search' },
        { icon: '🏥', title: 'Healthcare', desc: 'Disease prediction and diagnosis' },
        { icon: '💰', title: 'Finance', desc: 'Fraud detection and risk analysis' },
        { icon: '🏭', title: 'Manufacturing', desc: 'Quality control and predictive maintenance' },
      ],
    },
  ];

  const categories = [
    { id: 'all', name: 'All Services', icon: '🌟' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'productivity', name: 'Productivity', icon: '⚡' },
    { id: 'commerce', name: 'Commerce', icon: '🛒' },
    { id: 'automation', name: 'Automation', icon: '⚙️' },
    { id: 'development', name: 'Development', icon: '💻' },
    { id: 'ai', name: 'AI/ML', icon: '🤖' },
  ];

  const filteredServices = filterCategory === 'all' 
    ? services 
    : services.filter(s => s.category === filterCategory);

  return (
    <>
      <section id="services" ref={ref} className="py-32 bg-gradient-to-br from-white via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-purple-400 via-blue-400 to-cyan-400" />
        
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tight bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Our Advanced Solutions ✨
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '400px' } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-8 rounded-full mx-auto"
            />
            <p className="text-xl text-gray-700 font-semibold max-w-3xl mx-auto mb-8">
              Comprehensive suite of AI-powered services to transform your business 🚀
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setFilterCategory(cat.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full font-black text-sm transition-all ${
                    filterCategory === cat.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300'
                  }`}
                >
                  {cat.icon} {cat.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, i) => (
                <motion.div
                  layout
                  key={service.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -15, rotate: 2 }}
                  onClick={() => setSelectedService(service)}
                  className="relative group cursor-pointer"
                >
                  <motion.div
                    className={`absolute -inset-2 bg-gradient-to-r ${service.gradient} opacity-50 group-hover:opacity-75 transition-opacity duration-500 blur-2xl rounded-3xl`}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  
                  <div className={`relative bg-gradient-to-br ${service.bgGradient} p-8 border-4 ${service.borderColor} rounded-3xl shadow-2xl h-full flex flex-col`}>
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className="text-7xl mb-6 filter drop-shadow-lg"
                    >
                      {service.icon}
                    </motion.div>

                    {service.image && (
                      <motion.img 
                        src={service.image}
                        alt={service.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-full h-48 object-cover rounded-2xl mb-6 shadow-lg"
                      />
                    )}

                    <h3 className={`text-3xl font-black mb-4 tracking-tight bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                      {service.title}
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed mb-6 font-medium flex-grow">
                      {service.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                          <span className="text-lg">✨</span>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-3 bg-gradient-to-r ${service.gradient} text-white font-black rounded-full shadow-lg`}
                    >
                      View Details →
                    </motion.button>

                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      className={`h-2 bg-gradient-to-r ${service.gradient} mt-4 rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <ServiceDetailModal
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        service={selectedService}
      />
    </>
  );
};

// Colorful Process section
const Process = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const steps = [
    {
      number: '01',
      emoji: '🤖',
      title: 'AI Driven',
      description: 'Applications built using AI agents and designed for agent interaction, with custom agents when required.',
      gradient: 'from-pink-500 to-rose-500',
      bg: 'from-pink-100 to-rose-100'
    },
    {
      number: '02',
      emoji: '🧩',
      title: 'Modular',
      description: 'Component-based architecture for easy customization and expansion as your business grows.',
      gradient: 'from-purple-500 to-violet-500',
      bg: 'from-purple-100 to-violet-100'
    },
    {
      number: '03',
      emoji: '🌟',
      title: 'Open Source',
      description: 'Built on transparent, community-supported foundations to avoid vendor lock-in.',
      gradient: 'from-amber-500 to-orange-500',
      bg: 'from-amber-100 to-orange-100'
    },
    {
      number: '04',
      emoji: '☁️',
      title: 'Cloud Native',
      description: 'Your code and data, running on your cloud, giving you full control and ownership.',
      gradient: 'from-cyan-500 to-blue-500',
      bg: 'from-cyan-100 to-blue-100'
    },
  ];

  return (
    <motion.section
      id="process"
      ref={ref}
      style={{ scale, opacity }}
      className="py-32 bg-gradient-to-br from-yellow-50 via-white to-cyan-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tight bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            Simple & Efficient Process 🎯
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '400px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-2 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 mb-8 rounded-full mx-auto"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -15, rotate: 3 }}
              className="relative group"
            >
              <div className={`bg-gradient-to-br ${step.bg} p-6 border-4 border-white group-hover:border-opacity-50 rounded-3xl shadow-xl transition-all`}>
                <div className="text-5xl mb-4 filter drop-shadow-lg">
                  {step.emoji}
                </div>

                <div className={`text-6xl font-black mb-4 bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                  {step.number}
                </div>

                <h3 className={`text-2xl font-black mb-3 tracking-tight bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                  {step.title}
                </h3>
                <p className="text-gray-700 leading-relaxed font-medium">{step.description}</p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`h-2 bg-gradient-to-r ${step.gradient} mt-6 rounded-full origin-left`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Colorful Tools section
const Tools = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const tools = [
    { name: 'AI Agents', desc: 'Advanced coding assistants like Cursor, Replit Agent, Lovable, and custom in-house agents.', emoji: '🤖', gradient: 'from-[#0D3430] to-[#16A085]' },
    { name: 'Crew AI', desc: 'Orchestration platform enabling seamless multi-agent collaboration and workflow automation.', emoji: '👥', gradient: 'from-[#16A085] to-[#1ABC9C]' },
    { name: 'Refine', desc: 'React-powered framework for rapidly building sophisticated internal applications.', emoji: '⚡', gradient: 'from-[#1ABC9C] to-[#E8A54B]' },
    { name: 'Retool', desc: 'Low-code platform for assembling internal tools quickly with drag-and-drop components.', emoji: '🛠️', gradient: 'from-[#E8A54B] to-[#D4AF37]' },
    { name: 'Medusa', desc: 'Flexible, open-source commerce engine for building modern e-commerce experiences.', emoji: '🛍️', gradient: 'from-[#D4AF37] to-[#0D3430]' },
    { name: 'n8n', desc: 'Visual workflow automation tool connecting apps and services to streamline operations.', emoji: '🔗', gradient: 'from-indigo-500 to-purple-500' },
  ];

  return (
    <section id="tools" ref={ref} className="py-32 bg-gradient-to-br from-pink-50 via-white to-blue-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tight bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Toolkit 🧰
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '400px' } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 mb-8 rounded-full mx-auto"
          />
          <p className="text-xl text-gray-700 font-semibold">
            AI-powered solutions. Lightning-fast delivery.🚀
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, i) => (
            <ColorfulToolCard key={tool.name} tool={tool} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ColorfulToolCard = ({ tool, index }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateY((x - centerX) / 10);
    setRotateX((centerY - y) / 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
      className="bg-white p-8 border-4 border-gray-200 hover:border-transparent cursor-pointer group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl"
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10`}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.2 }}
      />

      <div className="text-6xl mb-4 filter drop-shadow-lg">{tool.emoji}</div>

      <h3 className={`text-3xl font-black mb-3 tracking-tight bg-gradient-to-r ${tool.gradient} bg-clip-text text-transparent`}>
        {tool.name}
      </h3>
      <p className="text-gray-700 leading-relaxed font-medium relative z-10">{tool.desc}</p>

      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${tool.gradient} rounded-b-3xl`}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// Colorful Work section
const Work = () => {
  const projects = [
    {
      date: 'January 2025',
      title: 'E-commerce Platform',
      image: '/images/ecommerce-project.jpeg',
      description: 'Scalable online marketplace with AI-powered product recommendations and automated inventory management.',
      emoji: '🛒',
      gradient: 'from-[#0D3430] to-[#16A085]',
    },
    {
      date: 'December 2024',
      title: 'Sales CRM',
      image: '/images/crm-project.jpeg',
      description: 'Custom relationship management system with intelligent lead scoring and automated follow-up workflows.',
      emoji: '📊',
      gradient: 'from-[#16A085] to-[#1ABC9C]',
    },
    {
      date: 'November 2024',
      title: 'Operations Dashboard',
      image: '/images/dashboard-project.jpeg',
      description: 'Real-time internal tool for tracking team performance, resource allocation, and project milestones.',
      emoji: '📈',
      gradient: 'from-[#E8A54B] to-[#D4AF37]',
    },
    {
      date: 'October 2024',
      title: 'Fintech App',
      image: '/images/fintech-project.jpeg',
      description: 'Decentralized finance application with smart contract integration and automated trading strategies.',
      emoji: '💰',
      gradient: 'from-[#1ABC9C] to-[#0D3430]',
    },
  ];

  return (
    <section id="work" className="py-32 bg-gradient-to-br from-[#0D3430]/5 via-white to-[#1ABC9C]/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tight bg-gradient-to-r from-[#0D3430] via-[#16A085] to-[#E8A54B] bg-clip-text text-transparent">
            Our Amazing Work 🎨
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '400px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-2 bg-gradient-to-r from-[#0D3430] via-[#16A085] to-[#E8A54B] mb-8 rounded-full mx-auto"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -15, rotate: 2 }}
              className="bg-white p-8 border-4 border-gray-200 group cursor-pointer relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl"
            >
              <motion.div
                className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${project.gradient} rounded-b-3xl`}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />

              {project.image && (
                <motion.img 
                  src={project.image}
                  alt={project.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="w-full h-64 object-cover rounded-2xl mb-6 shadow-lg"
                />
              )}

              <div className="text-6xl mb-4 filter drop-shadow-lg">{project.emoji}</div>

              <span className={`text-sm font-black bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent mb-3 block`}>
                {project.date}
              </span>
              <h3 className={`text-4xl font-black mb-4 tracking-tight group-hover:bg-gradient-to-r ${project.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all text-gray-900`}>
                {project.title}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6 font-medium">{project.description}</p>

              <motion.span
                whileHover={{ x: 10 }}
                className={`inline-flex items-center text-gray-900 font-black group-hover:bg-gradient-to-r ${project.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all text-lg`}
              >
                Read case study
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="ml-2 text-2xl"
                >
                  →
                </motion.span>
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Colorful Footer
const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#0D3430] via-[#16A085] to-[#1ABC9C] text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-cyan-400/10" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.1 }}
            className="inline-block mb-6"
          >
            <img src="/logo.png" alt="TechForge" className="h-20 w-auto mx-auto" />
          </motion.a>

          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="text-6xl mb-6"
          >
            🎉
          </motion.div>

          <p className="text-xl mb-4 max-w-3xl mx-auto leading-relaxed font-bold text-yellow-200">
            Accelerating digital transformation with smart technology and streamlined development 💡
          </p>

          <p className="text-2xl mb-8 max-w-3xl mx-auto leading-relaxed font-bold">
            AI-powered solutions. Lightning-fast delivery. 🚀
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-10"
          >
            <motion.a
              href="tel:+919142031933"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-md border-2 border-white rounded-full font-black text-lg hover:bg-white/30 transition-all shadow-lg"
            >
              <span className="text-2xl">📞</span>
              <div className="text-left">
                <div className="text-sm opacity-80">Call Direct</div>
                <div>+91 914 203 1933</div>
              </div>
            </motion.a>

            <motion.a
              href="mailto:kumarvinay16244@gmail.com"
              whileHover={{ scale: 1.1, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-md border-2 border-white rounded-full font-black text-lg hover:bg-white/30 transition-all shadow-lg"
            >
              <span className="text-2xl">📧</span>
              <div className="text-left">
                <div className="text-sm opacity-80">Email Us</div>
                <div className="text-sm">kumarvinay16244@gmail.com</div>
              </div>
            </motion.a>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {['Privacy Policy', 'Contact', 'LinkedIn', 'Twitter'].map((link, i) => (
              <motion.a
                key={link}
                href="#"
                whileHover={{ y: -5, scale: 1.1 }}
                className="font-black text-lg hover:text-yellow-300 transition-colors"
              >
                {link} {['🔒', '📧', '💼', '🐦'][i]}
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 mb-8 origin-center rounded-full"
          />

          <p className="text-lg font-bold">© TechForge 2025. Made with ❤️ TechForge 🌈</p>
        </motion.div>
      </div>
    </footer>
  );
};

// Main App component
export default function App() {
  return (
    <div className="relative">
      <Navigation />
      <Hero />
      <AdvancedServices />
      <Process />
      <Tools />
      <Work />
      <Footer />
    </div>
  );
}