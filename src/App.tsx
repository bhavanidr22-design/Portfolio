import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { ChevronDown, ChevronUp, ExternalLink, Download, Code, Briefcase, GraduationCap, Mail, MapPin, Menu, X } from 'lucide-react';
import resumeData from './data/resume.json';
import { AnimatedBackground } from './components/AnimatedBackground';

function Splash() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative w-24 h-24 flex items-center justify-center rounded-2xl glass-panel overflow-hidden">
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute bottom-0 w-full bg-gradient-to-t from-[var(--color-accent)] to-transparent opacity-50"
          />
          <span className="font-sans font-extrabold text-4xl text-white relative z-10 tracking-[-2px]">
            BD
          </span>
        </div>
        <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="h-full bg-[var(--color-accent)]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

const SectionHeading = ({ children, icon: Icon }: { children: React.ReactNode, icon?: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="flex items-center gap-4 mb-12"
  >
    {Icon && <div className="p-3 rounded-xl glass-panel text-[var(--color-accent)]"><Icon size={24} /></div>}
    <h2 className="text-4xl md:text-[56px] font-sans font-bold tracking-[-2px] leading-tight">{children}</h2>
  </motion.div>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openExp, setOpenExp] = useState<number | null>(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Splash key="splash" />}
      </AnimatePresence>

      <AnimatedBackground />

      {!loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative min-h-screen text-zinc-200 font-sans selection:bg-zinc-800"
        >
          {/* Progress Bar */}
          <motion.div 
            className="fixed top-0 left-0 right-0 h-1 bg-[var(--color-accent)] origin-left z-[100] shadow-[0_0_10px_var(--color-accent)]" 
            style={{ scaleX }} 
          />

          {/* Header */}
          <header className="fixed top-0 w-full z-40 px-6 py-4 mt-2">
            <div className="max-w-7xl mx-auto glass-panel px-6 py-4 flex justify-between items-center relative">
              <div className="flex items-center gap-2 font-sans font-extrabold text-[20px] md:text-[24px] tracking-[-1px] text-white z-50">
                <div className="w-8 h-8 border-[2px] border-[var(--color-accent)] flex items-center justify-center text-sm">B</div> 
                BHAVANI D.R.
              </div>
              <nav className="hidden md:flex gap-8 text-[12px] font-mono uppercase tracking-[2px] text-[var(--color-text-secondary)]">
                <a href="#experience" className="hover:text-white transition-colors">Experience</a>
                <a href="#skills" className="hover:text-white transition-colors">Skills</a>
                <a href="#education" className="hover:text-white transition-colors">Education</a>
              </nav>
              <div className="hidden md:block">
                <a 
                  href={resumeData.basics.links[0].url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-secondary !px-4 !py-2 !text-[12px]"
                >
                  LinkedIn <ExternalLink size={14} />
                </a>
              </div>
              <button className="md:hidden z-50 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </header>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed inset-0 z-30 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 font-mono text-xl uppercase tracking-widest text-white"
              >
                <a href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</a>
                <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a>
                <a href="#education" onClick={() => setMobileMenuOpen(false)}>Education</a>
                <a href={resumeData.basics.links[0].url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[var(--color-accent)] mt-8">
                  LinkedIn <ExternalLink size={20} />
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          <main className="px-6 pb-24 space-y-32">
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col justify-center max-w-5xl mx-auto pt-24 relative">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6 md:space-y-8"
              >
                <div className="font-mono text-[var(--color-accent)] text-[12px] tracking-[4px] uppercase mb-4 text-center md:text-left">
                  <span className="mr-2 inline-block w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
                  Available for new opportunities
                </div>
                
                <h1 className="text-6xl md:text-[88px] font-sans font-bold tracking-[-4px] leading-[0.9] text-white">
                  FULL STACK<br /><span className="text-outline">DEVELOPER</span>
                </h1>
                
                <p className="max-w-2xl text-[18px] leading-[1.6] text-[var(--color-text-secondary)] font-sans">
                  {resumeData.basics.summary}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-[12px] font-mono uppercase tracking-[1px] text-[var(--color-text-secondary)]">
                  <div className="flex items-center gap-2"><MapPin size={14} /> {resumeData.basics.location}</div>
                  <div className="flex items-center gap-2"><Mail size={14} /> {resumeData.basics.email}</div>
                </div>

                <div className="flex flex-wrap gap-4 pt-8">
                  <a href="#experience" className="btn-primary">
                    View Experience <ChevronDown size={16} />
                  </a>
                  <button className="btn-secondary">
                    <Download size={16} /> Download Resume
                  </button>
                </div>
                {/* Floating Side Note */ }
                <div className="hidden lg:block absolute left-[-60px] md:left-2 bottom-0 origin-left -rotate-90 -translate-y-24 font-mono text-[11px] text-[var(--color-text-secondary)] opacity-50 whitespace-nowrap tracking-widest">
                  SYSTEM VERSION 4.0.2 // {resumeData.basics.email.toUpperCase()}
                </div>

                {/* Impact Strip */ }
                <div className="hidden lg:flex absolute right-0 bottom-12 gap-6 w-full max-w-[380px] justify-end">
                  <div className="glass-card !p-6 w-[180px] hover:-translate-y-2 transition-transform">
                    <div className="text-[28px] font-bold text-[var(--color-accent)] mb-1">8+</div>
                    <div className="text-[11px] font-mono text-[var(--color-text-secondary)] uppercase leading-[1.4]">Years<br/>Experience</div>
                  </div>
                  <div className="glass-card !p-6 w-[180px] hover:-translate-y-2 transition-transform">
                    <div className="text-[28px] font-bold text-[var(--color-accent)] mb-1">50%</div>
                    <div className="text-[11px] font-mono text-[var(--color-text-secondary)] uppercase leading-[1.4]">Release Time<br/>Reduced</div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="max-w-5xl mx-auto scroll-mt-32">
              <SectionHeading icon={Briefcase}>Experience</SectionHeading>
              
              <div className="space-y-6">
                {resumeData.experience.map((job, idx) => {
                  const isOpen = openExp === idx;
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      className={`glass-card overflow-hidden transition-all duration-500 ${isOpen ? 'border-[var(--color-accent)] bg-white/[0.05] shadow-[0_0_30px_rgba(129,140,248,0.15)]' : ''}`}
                    >
                      <button 
                        onClick={() => setOpenExp(isOpen ? null : idx)}
                        className="w-full text-left p-6 md:p-8 flex flex-col md:flex-row md:items-start justify-between gap-4 cursor-pointer"
                      >
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold font-sans tracking-[-1px] text-white flex items-center gap-3">
                            {job.role}
                            <span className={`text-[var(--color-text-secondary)] transition-transform duration-300 ${isOpen ? 'rotate-180': ''}`}>
                              <ChevronDown size={24}/>
                            </span>
                          </h3>
                          <p className="text-[var(--color-accent)] text-lg mb-2">{job.company}</p>
                        </div>
                        <div className="text-[11px] font-mono tracking-[2px] uppercase text-[var(--color-text-secondary)] whitespace-nowrap self-start border border-[var(--color-glass-border)] bg-black/50 px-3 py-1 rounded">
                          {job.dates}
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-6 md:px-8 pb-6 md:pb-8 border-t border-[var(--color-glass-border)] pt-6"
                          >
                            <ul className="space-y-4">
                              {job.bullets.map((bullet, bIdx) => {
                                const parts = bullet.split(/(React|Angular|TypeScript|Spring Boot|Java|Kafka|RabbitMQ|AWS|Docker|Kubernetes|RESTful APIs|\d+%)/g);
                                return (
                                  <li key={bIdx} className="flex gap-4 text-[var(--color-text-secondary)] leading-[1.6] text-[15px] font-sans">
                                    <span className="text-[var(--color-accent)] mt-1">•</span>
                                    <span>
                                      {parts.map((p, i) => 
                                        /(React|Angular|TypeScript|Spring Boot|Java|Kafka|RabbitMQ|AWS|Docker|Kubernetes|RESTful APIs|\d+%)/.test(p) 
                                          ? <span key={i} className="bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-1.5 py-0.5 rounded text-xs mx-0.5 font-mono">{p}</span>
                                          : p
                                      )}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="max-w-5xl mx-auto scroll-mt-32">
              <SectionHeading icon={Code}>Technical Arsenal</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumeData.skills.map((skillGroup, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass-panel p-6 border-zinc-800/50 bg-black/20"
                  >
                    <h3 className="text-[11px] font-mono tracking-[2px] uppercase text-[var(--color-text-secondary)] mb-4">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, sIdx) => (
                        <span key={sIdx} className="px-3 py-1.5 bg-white/[0.03] border border-[var(--color-glass-border)] rounded text-[13px] text-white transition-colors cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section id="education" className="max-w-5xl mx-auto scroll-mt-32">
              <SectionHeading icon={GraduationCap}>Education & Certifications</SectionHeading>
              <div className="grid md:grid-cols-2 gap-6">
                {resumeData.education.map((edu, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass-card p-6"
                  >
                    <h3 className="font-bold text-[18px] tracking-[-0.5px] text-white mb-2">{edu.institution}</h3>
                    <p className="text-[14px] text-[var(--color-text-secondary)] leading-[1.6]">{edu.degree}</p>
                  </motion.div>
                ))}
                
                {resumeData.certifications.map((cert, idx) => (
                  <motion.div 
                    key={`cert-${idx}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass-card p-6"
                  >
                    <h3 className="font-bold text-[18px] tracking-[-0.5px] text-white mb-2">Certification</h3>
                    <p className="text-[14px] text-[var(--color-accent)] leading-[1.6]">{cert.name}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </main>
          
          <footer className="text-center py-12 text-sm text-zinc-600">
            <p>© {new Date().getFullYear()} Bhavani D. All rights reserved.</p>
          </footer>
        </motion.div>
      )}
    </>
  );
}
