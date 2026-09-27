import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Cloud, Code2, Database, Globe2, Layers3, Menu, Network, Quote, ShieldCheck, Smartphone, X, Zap } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';

const queryClient = new QueryClient();

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: 0.14 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

const services = [
  { icon: Globe2, index: '01', title: 'Web Development', body: 'Digital products that make complex businesses easier to choose, use, and grow.', tags: ['Strategy', 'Design', 'Build'], tone: 'cream' },
  { icon: Smartphone, index: '02', title: 'Mobile App Development', body: 'Focused mobile experiences that turn useful moments into habitual value.', tags: ['iOS', 'Android', 'React Native'], tone: 'coral' },
  { icon: Cloud, index: '03', title: 'Cloud Services', body: 'Infrastructure with the right amount of resilience, visibility, and room to scale.', tags: ['Architecture', 'Migration', 'DevOps'], tone: 'mint' },
  { icon: Network, index: '04', title: 'Real-Time Business Solutions', body: 'The connective tissue between your people, process, and the work that matters right now.', tags: ['Automation', 'Data', 'Enablement'], tone: 'ink' },
];

const cases = [
  { client: 'BSNL DSA Partner Website', type: 'Featured project', result: 'A clearer digital front door for BSNL DSA partners.', detail: 'A reliable, responsive business website designed to help BSNL DSA partners present their services clearly, build trust faster, and turn interest into action.', metric: '3.4×', label: 'more qualified enquiries', visual: 'case-rose', tags: ['Website Development', 'Business Solutions', 'Responsive Design'] },
  { client: 'Morrow & Co.', type: 'Commerce operations', result: 'Less admin. More momentum.', detail: 'One operating layer for a multi-site retailer that had outgrown its collection of spreadsheets.', metric: '41%', label: 'fewer manual handoffs', visual: 'case-sand', tags: [] },
  { client: 'Arcwell Energy', type: 'Cloud foundation', result: 'Ready for the next ten years.', detail: 'A secure, observable cloud platform that gave a technical team confidence to move faster.', metric: '62%', label: 'faster release cycles', visual: 'case-blue', tags: [] },
];

const careerOpenings = [
  ['01', 'Frontend Developer', 'Turn thoughtful interfaces into fast, accessible products.'],
  ['02', 'Mobile App Developer', 'Build useful mobile moments for people on the move.'],
  ['03', 'Cloud / DevOps Engineer', 'Make ambitious systems stable, observable, and ready.'],
  ['04', 'Business Development Executive', 'Find the right problems and start the right conversations.'],
];

function Header() {
  const [open, setOpen] = useState(false);
  const links = [['Home', '#top'], ['About Us', '#about'], ['Services', '#services'], ['Projects', '#work'], ['Careers', '#careers'], ['Contact', '#contact']];
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="container-wide flex h-[86px] items-center justify-between">
        <a href="#top" className="flex items-center gap-3" data-testid="link-brand">
          <span className="h-7 w-7 border border-[#ef765d] bg-transparent" aria-hidden="true" />
          <span className="font-mono-brand text-[11px] font-semibold tracking-[.18em] text-[#f4f0e7]">TOXIN <span className="text-[#ef765d]">SOLUTIONS</span></span>
        </a>
        <nav className="hidden items-center gap-5 lg:gap-7 md:flex" aria-label="Main navigation">
          {links.map(([label, href]) => <a key={href} href={href} className="text-[12px] text-[#b8c6bf] transition-colors hover:text-[#f4f0e7]" data-testid={`link-nav-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</a>)}
        </nav>
        <a href="#contact" className="hidden border border-[#ef765d] px-4 py-2.5 text-[11px] font-semibold tracking-[.1em] text-[#f4f0e7] transition-colors hover:bg-[#ef765d] md:block" data-testid="link-header-contact">START A PROJECT <ArrowUpRight className="ml-2 inline h-3.5 w-3.5" /></a>
        <button className="text-[#f4f0e7] md:hidden" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="border-t border-white/10 bg-[#102d2b] px-5 pb-7 pt-4 md:hidden" aria-label="Mobile navigation">
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="block border-b border-white/10 py-4 text-sm text-[#f4f0e7]" data-testid={`link-mobile-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</a>)}
        <a href="#contact" onClick={() => setOpen(false)} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#ef765d]" data-testid="link-mobile-contact">Start a project <ArrowRight className="h-4 w-4" /></a>
      </nav>}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="noise relative min-h-[760px] overflow-hidden bg-[#102d2b] text-[#f4f0e7]">
      <div className="grid-paper absolute inset-0 opacity-[.12]" />
      <div className="absolute -right-40 top-28 h-[600px] w-[600px] rounded-full border border-[#ef765d]/20 md:right-[-110px]">
        <div className="hero-orbit absolute inset-[10%] rounded-full border border-dashed border-[#ef765d]/30"><span className="absolute left-[14%] top-[9%] h-3 w-3 rounded-full bg-[#ef765d]" /></div>
        <div className="hero-orbit-reverse absolute inset-[24%] rounded-full border border-[#b7d8c7]/25"><span className="absolute bottom-[8%] right-[15%] h-2 w-2 rounded-full bg-[#b7d8c7]" /></div>
        <div className="float-slow absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[#ef765d]/60 bg-[#193b37]"><Zap className="h-8 w-8 text-[#ef765d]" strokeWidth={1.2} /></div>
      </div>
      <div className="container-wide relative flex min-h-[760px] flex-col justify-end pb-20 pt-32 md:pb-28">
        <div className="max-w-[850px]">
          <Reveal><p className="eyebrow eyebrow-dark mb-7">Technology for the business ahead</p></Reveal>
          <Reveal className="reveal-delay-1"><h1 className="max-w-5xl text-balance font-display text-[clamp(3.7rem,8.8vw,8.5rem)] leading-[.84] tracking-[-.055em]">Next-Gen IT Solutions<br /><em className="text-[#ef765d]">for Real Business Growth.</em></h1></Reveal>
          <Reveal className="reveal-delay-2"><div className="mt-10 flex max-w-2xl flex-col gap-7 sm:flex-row sm:items-end"><p className="max-w-[390px] text-[16px] leading-7 text-[#b8c6bf]">TOXIN SOLUTIONS provides reliable web, mobile, cloud, and digital solutions that help real businesses grow.</p><div className="flex flex-wrap gap-3"><a href="#contact" className="solid-button w-fit shrink-0 text-xs font-semibold tracking-[.1em]" data-testid="link-hero-start-project">START A PROJECT <ArrowUpRight className="h-4 w-4" /></a><a href="tel:+919123540453" className="outline-button dark-button w-fit shrink-0 text-xs font-semibold tracking-[.1em]" data-testid="link-hero-call">CALL US <ArrowUpRight className="h-4 w-4" /></a></div></div></Reveal>
        </div>
        <div className="mt-20 flex items-center justify-between border-t border-white/15 pt-5 text-[10px] uppercase tracking-[.14em] text-[#93aaa0]"><span>Independent technology partner</span><span className="hidden sm:block">Based in the useful middle</span><a href="#services" className="flex items-center gap-2 text-[#f4f0e7]" data-testid="link-scroll-services">Explore <ChevronDown className="h-4 w-4 text-[#ef765d]" /></a></div>
      </div>
    </section>
  );
}

function TrustBar() {
  return <section className="overflow-hidden border-b border-[#102d2b]/10 bg-[#ef765d] py-4 text-[#102d2b]"><div className="marquee-track flex items-center gap-8 font-mono-brand text-[10px] font-semibold uppercase tracking-[.18em]"><span>Built for the real world</span><span className="text-[#f4f0e7]" aria-hidden="true">/</span><span>Clarity over complexity</span><span className="text-[#f4f0e7]" aria-hidden="true">/</span><span>Small team. Serious outcomes.</span><span className="text-[#f4f0e7]" aria-hidden="true">/</span><span>Built for the real world</span><span className="text-[#f4f0e7]" aria-hidden="true">/</span><span>Clarity over complexity</span><span className="text-[#f4f0e7]" aria-hidden="true">/</span><span>Small team. Serious outcomes.</span></div></section>;
}

function About() {
  const principles = [
    { icon: ShieldCheck, title: 'Reliability, built in', body: 'We design for the busy Tuesday after launch, not just the exciting day it goes live.' },
    { icon: Code2, title: 'Innovation with purpose', body: 'The newest tool is only useful when it creates a better result for your people and customers.' },
    { icon: Database, title: 'Impact you can measure', body: 'Every decision connects back to the business: faster work, clearer journeys, or room to grow.' },
  ];
  return <section id="about" className="section-pad bg-[#ebe6dc] text-[#102d2b]"><div className="container-wide"><div className="grid gap-12 md:grid-cols-[.75fr_1.25fr] md:gap-24"><Reveal><p className="eyebrow">About us</p><h2 className="mt-6 max-w-md font-display text-[clamp(3.4rem,6vw,6.5rem)] leading-[.86] tracking-[-.045em]">The useful<br /><em>kind of different.</em></h2></Reveal><Reveal className="reveal-delay-1 md:pt-14"><p className="max-w-2xl text-[clamp(1.25rem,2.2vw,2rem)] leading-[1.35] tracking-[-.02em]">TOXIN SOLUTIONS is a forward-thinking, scalable, and client-focused technology agency. We combine dependable engineering with a sharp understanding of business impact.</p><p className="mt-7 max-w-lg text-sm leading-7 text-[#44605a]">From the first conversation to the next phase of growth, we stay close to the work and the people it needs to serve. That means fewer handoffs, clearer decisions, and technology that earns its place in the business.</p></Reveal></div><div className="mt-20 grid gap-px border-y border-[#102d2b]/15 bg-[#102d2b]/15 md:grid-cols-3">{principles.map(({ icon: Icon, title, body }, index) => <Reveal key={title} className={`reveal-delay-${index + 1}`}><article className="h-full bg-[#ebe6dc] px-6 py-8 md:px-8 md:py-10"><Icon className="h-7 w-7 text-[#ef765d]" strokeWidth={1.2} /><h3 className="mt-12 font-display text-3xl leading-none">{title}</h3><p className="mt-4 max-w-xs text-sm leading-6 text-[#44605a]">{body}</p></article></Reveal>)}</div></div></section>;
}

function Services() {
  return <section id="services" className="section-pad bg-[#f4f0e7]"><div className="container-wide">
    <div className="grid gap-10 md:grid-cols-[.72fr_1.28fr] md:gap-20"><Reveal><p className="eyebrow">What we do</p><h2 className="mt-6 max-w-sm font-display text-[clamp(3rem,6vw,6rem)] leading-[.9] tracking-[-.04em]">Useful by<br /><em>design.</em></h2></Reveal><Reveal className="reveal-delay-1 md:pt-12"><p className="max-w-lg text-lg leading-8 text-[#44605a]">Technology should remove friction, not add a new layer of it. We bring strategy, design, engineering, and operational thinking into one accountable team.</p><a href="#contact" className="mt-8 inline-flex items-center gap-3 text-xs font-semibold tracking-[.12em] text-[#102d2b] underline decoration-[#ef765d] decoration-2 underline-offset-8" data-testid="link-services-contact">SEE HOW WE CAN HELP <ArrowUpRight className="h-4 w-4 text-[#ef765d]" /></a></Reveal></div>
    <div className="mt-20 grid gap-4 md:grid-cols-2">{services.map(({ icon: Icon, ...service }, index) => <Reveal key={service.index} className={`reveal-delay-${index % 3 + 1}`}><article className={`service-card min-h-[290px] border border-[#102d2b]/15 p-7 md:p-9 ${service.tone === 'coral' ? 'bg-[#ef765d] text-[#102d2b]' : service.tone === 'mint' ? 'bg-[#c8d9cc] text-[#102d2b]' : service.tone === 'ink' ? 'bg-[#173b37] text-[#f4f0e7]' : 'bg-[#ebe6dc] text-[#102d2b]'}`} data-testid={`card-service-${service.index}`}><div className="flex items-start justify-between"><span className="font-mono-brand text-[10px] opacity-60">{service.index}</span><Icon className="h-7 w-7" strokeWidth={1.2} /><ArrowUpRight className="service-arrow h-5 w-5 opacity-70" /></div><div className="mt-16"><h3 className="font-display text-4xl leading-none">{service.title}</h3><p className="mt-4 max-w-sm text-sm leading-6 opacity-75">{service.body}</p><div className="mt-6 flex flex-wrap gap-2">{service.tags.map(tag => <span key={tag} className="border border-current/25 px-2 py-1 font-mono-brand text-[9px] uppercase tracking-wider opacity-70">{tag}</span>)}</div></div></article></Reveal>)}</div>
  </div></section>;
}

function Manifesto() {
  return <section className="relative overflow-hidden bg-[#c8d9cc] text-[#102d2b]"><div className="container-wide grid min-h-[580px] items-center gap-12 py-20 md:grid-cols-[.8fr_1.2fr] md:py-28"><Reveal><p className="eyebrow">Our point of view</p><p className="mt-6 max-w-sm text-sm leading-7 text-[#44605a]">The best technology is not the loudest thing in the room. It is the thing that lets everyone else do their best work.</p></Reveal><Reveal className="reveal-delay-1"><blockquote className="max-w-3xl font-display text-[clamp(3.2rem,7vw,7.5rem)] leading-[.9] tracking-[-.04em]">“Build the thing people can <em>trust.</em>”</blockquote><div className="mt-8 flex items-center gap-3 font-mono-brand text-[10px] uppercase tracking-[.16em] text-[#44605a]"><span className="h-px w-8 bg-[#ef765d]" />The Toxin standard</div></Reveal></div><div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full border border-[#102d2b]/15 md:-right-5" /></section>;
}

function WhyChooseUs() {
  const reasons = [
    { icon: Quote, number: '01', title: 'Senior attention', body: 'The people who shape the direction stay close enough to shape the detail.' },
    { icon: Zap, number: '02', title: 'Decisive momentum', body: 'We make the complex clear, then move with the pace your opportunity deserves.' },
    { icon: Layers3, number: '03', title: 'One connected team', body: 'Strategy, design, engineering, and operations work together without the gaps.' },
    { icon: ShieldCheck, number: '04', title: 'Built to last', body: 'We leave behind systems your team can understand, own, and keep improving.' },
  ];
  return <section id="why-us" className="section-pad bg-[#f4f0e7]"><div className="container-wide"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><Reveal><p className="eyebrow">Why choose us</p><h2 className="mt-6 max-w-2xl font-display text-[clamp(3.3rem,6.5vw,6.8rem)] leading-[.86] tracking-[-.045em]">The difference is<br /><em>how we show up.</em></h2></Reveal><Reveal className="reveal-delay-1"><p className="max-w-xs text-sm leading-6 text-[#44605a]">A partner for decision makers who need technology to pull its weight.</p></Reveal></div><div className="mt-20 grid gap-4 sm:grid-cols-2">{reasons.map(({ icon: Icon, number, title, body }, index) => <Reveal key={number} className={`reveal-delay-${index % 3 + 1}`}><article className={`min-h-[245px] border border-[#102d2b]/15 p-7 ${index === 1 ? 'bg-[#ef765d]' : index === 2 ? 'bg-[#c8d9cc]' : index === 3 ? 'bg-[#173b37] text-[#f4f0e7]' : 'bg-[#ebe6dc]'}`}><div className="flex items-start justify-between"><Icon className="h-7 w-7" strokeWidth={1.2} /><span className="font-mono-brand text-[10px] opacity-60">{number}</span></div><h3 className="mt-16 font-display text-3xl leading-none">{title}</h3><p className="mt-4 max-w-sm text-sm leading-6 opacity-75">{body}</p></article></Reveal>)}</div></div></section>;
}

function Work() {
  return <section id="work" className="section-pad bg-[#ebe6dc]"><div className="container-wide"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><Reveal><p className="eyebrow">Selected work</p><h2 className="mt-5 max-w-xl font-display text-[clamp(3rem,6vw,6.2rem)] leading-[.88] tracking-[-.04em]">Outcomes,<br /><em>not output.</em></h2></Reveal><Reveal className="reveal-delay-1"><p className="max-w-xs text-sm leading-6 text-[#44605a]">A few examples of what happens when technology gets close to the actual business.</p></Reveal></div><div className="mt-20 space-y-24">{cases.map((item, index) => <Reveal key={item.client} className={index % 2 ? 'md:ml-auto md:max-w-[940px]' : 'md:max-w-[1060px]'}><article className="case-card grid gap-7 md:grid-cols-[1.3fr_1fr] md:items-center"><div className={`case-image relative aspect-[1.45] overflow-hidden ${item.visual}`}><div className="grid-paper absolute inset-0 opacity-30" /><div className="absolute inset-8 border border-[#102d2b]/20 md:inset-14" /><div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#102d2b]/30"><ArrowUpRight className="h-8 w-8" strokeWidth={1} /></div><div className="absolute bottom-5 left-5 font-mono-brand text-[10px] uppercase tracking-[.15em]">Case / 0{index + 1}</div></div><div><p className="eyebrow">{item.type}</p><h3 className="mt-4 font-display text-4xl leading-[.95] tracking-[-.03em] md:text-5xl">{item.result}</h3><p className="mt-5 max-w-sm text-sm leading-6 text-[#44605a]">{item.detail}</p><div className="mt-6 flex flex-wrap gap-2">{item.tags.map(tag => <span key={tag} className="border border-[#102d2b]/20 px-2 py-1 font-mono-brand text-[9px] uppercase tracking-wider text-[#44605a]">{tag}</span>)}</div><div className="mt-8 border-t border-[#102d2b]/15 pt-5"><strong className="font-display text-4xl">{item.metric}</strong><span className="ml-3 text-xs text-[#44605a]">{item.label}</span></div><p className="mt-6 font-mono-brand text-[10px] uppercase tracking-[.12em] text-[#44605a]">{item.client}</p></div></article></Reveal>)}</div></div></section>;
}

function Process() {
  const steps = [['01', 'Listen properly', 'We get close to the people, pressure, and potential behind the brief.'], ['02', 'Find the signal', 'We make the hard calls early, then turn a clear direction into a workable plan.'], ['03', 'Build with care', 'A senior team stays close from first sketch to the last meaningful detail.'], ['04', 'Keep improving', 'We leave your team with momentum, confidence, and a partner for what comes next.']];
  return <section id="process" className="section-pad bg-[#102d2b] text-[#f4f0e7]"><div className="container-wide"><div className="grid gap-14 md:grid-cols-[.7fr_1.3fr]"><Reveal><p className="eyebrow eyebrow-dark">How we work</p><h2 className="mt-6 max-w-md font-display text-[clamp(3rem,6vw,6rem)] leading-[.88] tracking-[-.04em]">Good work is a <em className="text-[#ef765d]">team sport.</em></h2></Reveal><div>{steps.map(([number, title, body], index) => <Reveal key={number} className={`reveal-delay-${index % 3 + 1}`}><div className="grid grid-cols-[50px_1fr] gap-5 border-t border-white/15 py-7 md:grid-cols-[80px_1fr_1fr] md:gap-8"><span className="font-mono-brand text-[10px] text-[#ef765d]">{number}</span><h3 className="text-xl font-medium">{title}</h3><p className="col-start-2 text-sm leading-6 text-[#b8c6bf] md:col-start-3">{body}</p></div></Reveal>)}</div></div></div></section>;
}

function Careers() {
  return <section id="careers" className="section-pad bg-[#c8d9cc] text-[#102d2b]"><div className="container-wide"><div className="grid gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-24"><Reveal><p className="eyebrow">Careers</p><h2 className="mt-6 max-w-md font-display text-[clamp(3.4rem,6vw,6.5rem)] leading-[.86] tracking-[-.045em]">Come build<br /><em>useful things.</em></h2></Reveal><Reveal className="reveal-delay-1 md:pt-14"><p className="max-w-xl text-xl leading-8">We are building a small, sharp team for the work ahead. If you care about good decisions, clean execution, and technology that improves a real business, we would like to hear from you.</p><a href="#contact" className="solid-button mt-8 w-fit text-xs font-semibold tracking-[.1em]" data-testid="link-careers-apply">APPLY NOW <ArrowUpRight className="h-4 w-4" /></a></Reveal></div><div className="mt-20 border-t border-[#102d2b]/20">{careerOpenings.map(([number, title, body], index) => <Reveal key={title} className={`reveal-delay-${index % 3 + 1}`}><a href="#contact" className="grid grid-cols-[42px_1fr_auto] items-center gap-4 border-b border-[#102d2b]/20 py-6 transition-colors hover:bg-[#b7cfbe] md:grid-cols-[70px_1fr_1.1fr_auto] md:gap-7 md:py-7" data-testid={`link-career-${number}`}><span className="font-mono-brand text-[10px] text-[#ef765d]">{number}</span><h3 className="font-display text-2xl md:text-3xl">{title}</h3><p className="hidden text-sm leading-6 text-[#44605a] md:block">{body}</p><ArrowUpRight className="h-5 w-5 text-[#ef765d]" /></a></Reveal>)}</div></div></section>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  return <section id="contact" className="noise relative overflow-hidden bg-[#ef765d] text-[#102d2b]"><div className="container-wide relative z-10 grid gap-14 py-24 md:grid-cols-[.95fr_1.05fr] md:py-32"><Reveal><p className="eyebrow">Start here</p><h2 className="mt-6 max-w-xl font-display text-[clamp(3.6rem,7vw,8rem)] leading-[.82] tracking-[-.05em]">Have a good<br /><em>problem?</em></h2><p className="mt-8 max-w-sm text-base leading-7 text-[#4e4938]">Tell us what is stuck, what is changing, or what could be better. We will come back with a useful next step.</p><a href="tel:+919123540453" className="mt-10 inline-flex items-center gap-3 font-mono-brand text-xs font-semibold tracking-[.12em]" data-testid="link-phone">+91 9123540453 <ArrowUpRight className="h-4 w-4" /></a></Reveal><Reveal className="reveal-delay-1"><div className="bg-[#102d2b] p-7 text-[#f4f0e7] md:p-10">{sent ? <div className="flex min-h-[400px] flex-col items-start justify-center"><div className="mb-7 flex h-12 w-12 items-center justify-center border border-[#ef765d] text-[#ef765d]"><Check /></div><h3 className="font-display text-5xl leading-none">Message received.</h3><p className="mt-5 max-w-sm text-sm leading-6 text-[#b8c6bf]">Thanks for reaching out. A real person from our team will be in touch shortly.</p><button onClick={() => setSent(false)} className="mt-8 text-xs font-semibold tracking-[.12em] text-[#ef765d] underline underline-offset-8" data-testid="button-send-another">SEND ANOTHER</button></div> : <form onSubmit={handleSubmit} className="space-y-8" aria-label="Contact form"><div className="grid gap-8 sm:grid-cols-2"><label className="text-xs text-[#b8c6bf]">Name<input required name="name" autoComplete="name" className="form-line mt-2" placeholder="What should we call you?" data-testid="input-name" /></label><label className="text-xs text-[#b8c6bf]">Email<input required type="email" name="email" autoComplete="email" className="form-line mt-2" placeholder="you@company.com" data-testid="input-email" /></label></div><div className="grid gap-8 sm:grid-cols-2"><label className="text-xs text-[#b8c6bf]">Phone<input required type="tel" name="phone" autoComplete="tel" className="form-line mt-2" placeholder="+91 9123540453" data-testid="input-phone" /></label><label className="text-xs text-[#b8c6bf]">Service Needed<select required name="service" defaultValue="" className="form-line mt-2" data-testid="select-service"><option value="" disabled>Select a service</option><option value="web-development">Web Development</option><option value="mobile-app-development">Mobile App Development</option><option value="cloud-services">Cloud Services</option><option value="real-time-business-solutions">Real-Time Business Solutions</option></select></label></div><label className="block text-xs text-[#b8c6bf]">Message<textarea required name="message" rows={3} className="form-line mt-2 resize-none" placeholder="A little context goes a long way." data-testid="input-message" /></label><div className="flex flex-col justify-between gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-center"><span className="max-w-[230px] text-xs leading-5 text-[#b8c6bf]">No sales theatre. Just a useful first conversation.</span><button type="submit" className="solid-button w-full text-xs font-semibold tracking-[.1em] sm:w-auto" data-testid="button-submit-contact">SEND ENQUIRY <ArrowUpRight className="h-4 w-4" /></button></div></form>}</div></Reveal></div><div className="absolute -bottom-44 -left-20 h-[500px] w-[500px] rounded-full border border-[#102d2b]/15" /></section>;
}

function Footer() {
  return <footer className="bg-[#102d2b] text-[#f4f0e7]"><div className="container-wide py-12"><div className="flex flex-col justify-between gap-8 border-b border-white/15 pb-12 md:flex-row md:items-end"><div><div className="flex items-center gap-3"><span className="h-6 w-6 border border-[#ef765d]" /><span className="font-mono-brand text-[11px] font-semibold tracking-[.18em]">TOXIN <span className="text-[#ef765d]">SOLUTIONS</span></span></div><p className="mt-5 max-w-xs text-sm leading-6 text-[#93aaa0]">Independent technology for businesses with somewhere to go.</p></div><div className="flex gap-7 text-xs text-[#b8c6bf]"><a href="#services" className="transition-colors hover:text-[#ef765d]" data-testid="link-footer-services">What we do</a><a href="#work" className="transition-colors hover:text-[#ef765d]" data-testid="link-footer-work">Work</a><a href="#contact" className="transition-colors hover:text-[#ef765d]" data-testid="link-footer-contact">Contact</a></div></div><div className="flex flex-col justify-between gap-3 pt-6 font-mono-brand text-[9px] uppercase tracking-[.15em] text-[#6e8b80] sm:flex-row"><span>© 2026 Toxin Solutions</span><span>Web · Mobile · Cloud · Operations</span><a href="#top" className="flex items-center gap-2 text-[#ef765d]" data-testid="link-back-to-top">Back to top <ArrowUpRight className="h-3.5 w-3.5" /></a></div></div></footer>;
}

function Home() {
  return <div className="site-shell"><Header /><main><Hero /><TrustBar /><About /><Services /><Manifesto /><WhyChooseUs /><Work /><Process /><Careers /><Contact /></main><Footer /></div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;