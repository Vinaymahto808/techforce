import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      date: 'January 2025',
      title: 'E-commerce Platform',
      category: 'E-commerce',
      client: 'FashionHub Inc.',
      description: 'Scalable online marketplace with AI-powered product recommendations and automated inventory management.',
      emoji: '🛒',
      gradient: 'from-pink-500 to-rose-500',
      image: '/images/ecommerce-project.jpg', // Placeholder
      tags: ['Next.js', 'Medusa', 'Stripe', 'AI'],
      results: [
        { metric: '250%', label: 'Sales Increase' },
        { metric: '45%', label: 'Faster Checkout' },
        { metric: '99.9%', label: 'Uptime' },
      ],
      features: [
        'AI-Powered Product Recommendations',
        'Real-time Inventory Management',
        'Multi-currency Support',
        'Advanced Analytics Dashboard',
        'Mobile-First Design',
        'Integrated Payment Gateway'
      ],
      challenge: 'FashionHub needed to modernize their outdated e-commerce platform to compete with major retailers while handling 10,000+ daily visitors.',
      solution: 'We built a headless commerce solution using Medusa with a Next.js frontend, implementing AI-driven personalization and real-time inventory sync across 3 warehouses.',
      testimonial: {
        quote: "TechForge transformed our online store completely. Sales tripled in the first quarter!",
        author: "Sarah Johnson",
        role: "CEO, FashionHub Inc."
      }
    },
    {
      id: 2,
      date: 'December 2024',
      title: 'Sales CRM System',
      category: 'Business Software',
      client: 'SalesForce Pro',
      description: 'Custom relationship management system with intelligent lead scoring and automated follow-up workflows.',
      emoji: '📊',
      gradient: 'from-purple-500 to-indigo-500',
      image: '/images/crm-project.jpg',
      tags: ['React', 'Node.js', 'PostgreSQL', 'AI'],
      results: [
        { metric: '180%', label: 'Lead Conversion' },
        { metric: '60%', label: 'Time Saved' },
        { metric: '95%', label: 'User Satisfaction' },
      ],
      features: [
        'AI Lead Scoring',
        '360° Customer View',
        'Automated Email Campaigns',
        'Sales Pipeline Visualization',
        'Mobile CRM App',
        'Advanced Reporting'
      ],
      challenge: 'SalesForce Pro was losing leads due to manual processes and lack of follow-up automation, resulting in missed opportunities.',
      solution: 'Custom CRM with AI-powered lead scoring, automated workflows, and predictive analytics to prioritize high-value prospects.',
      testimonial: {
        quote: "Our sales team efficiency increased by 60%. This CRM changed the game for us.",
        author: "Michael Chen",
        role: "VP of Sales, SalesForce Pro"
      }
    },
    {
      id: 3,
      date: 'November 2024',
      title: 'Operations Dashboard',
      category: 'Internal Tools',
      client: 'LogisticsX Global',
      description: 'Real-time internal tool for tracking team performance, resource allocation, and project milestones.',
      emoji: '📈',
      gradient: 'from-orange-500 to-amber-500',
      image: '/images/dashboard-project.jpg',
      tags: ['React', 'Python', 'FastAPI', 'D3.js'],
      results: [
        { metric: '40%', label: 'Efficiency Gain' },
        { metric: '85%', label: 'Faster Reporting' },
        { metric: '100%', label: 'Real-time Accuracy' },
      ],
      features: [
        'Real-time Data Visualization',
        'Custom KPI Tracking',
        'Team Performance Metrics',
        'Resource Allocation Tools',
        'Predictive Analytics',
        'Automated Alerts'
      ],
      challenge: 'LogisticsX was using multiple disconnected tools, making it impossible to get real-time visibility into operations.',
      solution: 'Unified dashboard aggregating data from 15+ sources with real-time updates, custom visualizations, and predictive insights.',
      testimonial: {
        quote: "Finally, we have one source of truth. Decision-making has never been faster.",
        author: "Jennifer Lee",
        role: "COO, LogisticsX Global"
      }
    },
    {
      id: 4,
      date: 'October 2024',
      title: 'Fintech Payment App',
      category: 'Fintech',
      client: 'PayFlow Solutions',
      description: 'Decentralized finance application with smart contract integration and automated trading strategies.',
      emoji: '💰',
      gradient: 'from-cyan-500 to-blue-500',
      image: '/images/fintech-project.jpg',
      tags: ['React Native', 'Blockchain', 'Web3', 'Node.js'],
      results: [
        { metric: '$50M+', label: 'Transactions' },
        { metric: '<2s', label: 'Processing Time' },
        { metric: '50K+', label: 'Active Users' },
      ],
      features: [
        'Instant Peer-to-Peer Payments',
        'Multi-currency Wallet',
        'Smart Contract Integration',
        'Biometric Security',
        'Transaction History & Analytics',
        'Low Transaction Fees'
      ],
      challenge: 'PayFlow needed a secure, fast payment solution that could handle high transaction volumes while maintaining regulatory compliance.',
      solution: 'Built a blockchain-based payment system with smart contracts, multi-layer security, and real-time transaction processing.',
      testimonial: {
        quote: "The app is lightning fast and our users love the simplicity. Best investment we made.",
        author: "David Martinez",
        role: "Founder, PayFlow Solutions"
      }
    },
    {
      id: 5,
      date: 'September 2024',
      title: 'Healthcare Portal',
      category: 'Healthcare',
      client: 'MediCare Plus',
      description: 'HIPAA-compliant patient portal with telemedicine, appointment scheduling, and medical records management.',
      emoji: '🏥',
      gradient: 'from-emerald-500 to-teal-500',
      image: '/images/healthcare-project.jpg',
      tags: ['React', 'HIPAA', 'WebRTC', 'AWS'],
      results: [
        { metric: '300%', label: 'Patient Engagement' },
        { metric: '70%', label: 'Admin Time Saved' },
        { metric: '98%', label: 'Appointment Attendance' },
      ],
      features: [
        'Telemedicine Video Calls',
        'Electronic Health Records',
        'Appointment Scheduling',
        'Prescription Management',
        'Secure Messaging',
        'HIPAA Compliance'
      ],
      challenge: 'MediCare needed to digitize patient interactions while ensuring strict HIPAA compliance and data security.',
      solution: 'HIPAA-compliant portal with end-to-end encryption, secure video conferencing, and integrated EHR system.',
      testimonial: {
        quote: "Our patients can now access care from anywhere. The platform is secure and easy to use.",
        author: "Dr. Amanda Williams",
        role: "Chief Medical Officer, MediCare Plus"
      }
    },
    {
      id: 6,
      date: 'August 2024',
      title: 'AI Content Generator',
      category: 'AI/ML',
      client: 'ContentPro AI',
      description: 'AI-powered content creation platform for marketing teams with SEO optimization and brand voice training.',
      emoji: '✍️',
      gradient: 'from-violet-500 to-purple-500',
      image: '/images/ai-content-project.jpg',
      tags: ['Python', 'GPT-4', 'React', 'NLP'],
      results: [
        { metric: '10x', label: 'Content Output' },
        { metric: '90%', label: 'Time Reduction' },
        { metric: '4.5/5', label: 'Quality Rating' },
      ],
      features: [
        'AI Content Generation',
        'SEO Optimization',
        'Brand Voice Training',
        'Multi-language Support',
        'Plagiarism Detection',
        'Content Calendar'
      ],
      challenge: 'ContentPro needed to scale content production without sacrificing quality or brand consistency.',
      solution: 'Custom AI platform trained on brand guidelines with SEO optimization and quality control mechanisms.',
      testimonial: {
        quote: "We went from 10 articles per week to 100. The AI nails our brand voice every time.",
        author: "Rachel Green",
        role: "CMO, ContentPro AI"
      }
    },
  ];

  return (
    <>
      <section id="work" className="py-32 bg-gradient-to-br from-purple-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-4 tracking-tight bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Our Amazing Work 🎨
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '400px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mb-8 rounded-full mx-auto"
            />
            <p className="text-xl text-gray-700 font-semibold max-w-3xl mx-auto">
              Transforming businesses with cutting-edge technology solutions 🚀
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -15, rotate: 2 }}
                onClick={() => setSelectedProject(project)}
                className="bg-white border-4 border-gray-200 group cursor-pointer relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl"
              >
                {/* Project Image Placeholder */}
                <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <div className="text-8xl filter drop-shadow-lg">{project.emoji}</div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-black text-2xl">View Details →</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-black bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                      {project.date}
                    </span>
                    <span className="text-xs font-bold px-3 py-1 bg-gray-100 rounded-full">
                      {project.category}
                    </span>
                  </div>

                  <h3 className={`text-2xl font-black mb-2 tracking-tight group-hover:bg-gradient-to-r ${project.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all text-gray-900`}>
                    {project.title}
                  </h3>

                  <p className="text-sm text-gray-500 font-semibold mb-3">
                    Client: {project.client}
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-4 font-medium text-sm line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-xs font-bold px-2 py-1 bg-gray-100 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Results Preview */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {project.results.map((result, idx) => (
                      <div key={idx} className="text-center">
                        <div className={`text-lg font-black bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                          {result.metric}
                        </div>
                        <div className="text-xs text-gray-600 font-semibold">
                          {result.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className={`w-full py-2 bg-gradient-to-r ${project.gradient} text-white font-black rounded-full text-sm`}
                  >
                    View Case Study →
                  </motion.button>
                </div>

                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${project.gradient} rounded-b-3xl`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-6xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`p-8 bg-gradient-to-r ${selectedProject.gradient} text-white relative`}>
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-6 right-6 text-4xl font-light hover:text-gray-200"
                >
                  ×
                </motion.button>

                <div className="text-7xl mb-4">{selectedProject.emoji}</div>
                <span className="text-sm opacity-90 mb-2 block">{selectedProject.date} • {selectedProject.category}</span>
                <h2 className="text-4xl font-black mb-2">{selectedProject.title}</h2>
                <p className="text-xl opacity-90">Client: {selectedProject.client}</p>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Results */}
                <div className="mb-8">
                  <h3 className="text-3xl font-black mb-6 text-gray-900">Key Results 📊</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {selectedProject.results.map((result, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl"
                      >
                        <div className={`text-5xl font-black mb-2 bg-gradient-to-r ${selectedProject.gradient} bg-clip-text text-transparent`}>
                          {result.metric}
                        </div>
                        <div className="text-gray-700 font-bold text-lg">
                          {result.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Challenge & Solution */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-2xl font-black mb-4 text-gray-900">🎯 Challenge</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedProject.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-4 text-gray-900">💡 Solution</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedProject.solution}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-3xl font-black mb-6 text-gray-900">Key Features ✨</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedProject.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                      >
                        <span className="text-2xl">✓</span>
                        <span className="font-semibold text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h3 className="text-3xl font-black mb-6 text-gray-900">Technology Stack 🛠️</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.tags.map((tag, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`px-4 py-2 bg-gradient-to-r ${selectedProject.gradient} text-white font-bold rounded-full`}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className={`p-6 bg-gradient-to-br ${selectedProject.gradient} rounded-2xl text-white`}>
                  <div className="text-4xl mb-4">💬</div>
                  <p className="text-xl italic mb-4">"{selectedProject.testimonial.quote}"</p>
                  <div className="font-bold">
                    <div>{selectedProject.testimonial.author}</div>
                    <div className="text-sm opacity-90">{selectedProject.testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Work;