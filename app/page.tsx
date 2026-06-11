"use client";

import React, { useState } from 'react';
import { 
  ArrowRight, Award, BookOpen, Check, Clock, Heart, Lock, 
  Mail, Menu, Shield, Star, Target, Users, X, Zap 
} from 'lucide-react';

const products = [
  {
    id: 1,
    title: "30-Day Energy Protocol",
    price: 27,
    description: "Complete Notion system with daily routines, tracking templates, and science-backed protocols to eliminate afternoon crashes.",
    features: ["Daily energy tracking", "Circadian rhythm guide", "Supplement timing", "30-day challenge"],
    badge: "Bestseller"
  },
  {
    id: 2,
    title: "Sleep Optimization Masterclass",
    price: 47,
    description: "Evidence-based guide + worksheets to improve sleep quality after 40.",
    features: ["Sleep score calculator", "Wind-down scripts", "Blue light protocol", "Pillow & mattress guide"]
  },
  {
    id: 3,
    title: "The Longevity Playbook",
    price: 37,
    description: "Practical strategies for healthspan extension. Covers VO2 max, muscle preservation, and cognitive protection.",
    features: ["Weekly habit stacks", "Biomarker tracking", "Zone 2 cardio guide", "Protein & muscle protocol"],
    badge: "New"
  },
  {
    id: 4,
    title: "Private Health Lab Access",
    price: 9,
    description: "Monthly deep-dive threads, live Q&A recordings, and early access to new protocols.",
    features: ["Exclusive research breakdowns", "Monthly office hours", "Protocol updates", "Member-only tools"]
  }
];

const quizQuestions = [
  { id: 1, question: "How often do you wake up feeling truly rested and energized?", options: ["Almost every day", "Most days", "About half the time", "Rarely or never"] },
  { id: 2, question: "How frequently do you experience a significant energy crash in the afternoon (2-4pm)?", options: ["Never or very rarely", "1-2 times per week", "3-4 times per week", "Almost every day"] },
  { id: 3, question: "How would you rate your current sleep quality overall?", options: ["Excellent - I wake up refreshed", "Good - mostly solid", "Fair - room for improvement", "Poor - consistently struggle"] },
  { id: 4, question: "How consistent is your daily movement/exercise routine?", options: ["Very consistent (5+ days/week)", "Mostly consistent (3-4 days)", "Inconsistent (1-2 days)", "Rarely active"] },
  { id: 5, question: "How often do you feel mentally sharp and focused throughout the day?", options: ["Most of the day", "Mornings only", "Afternoons only", "Struggle most of the day"] },
  { id: 6, question: "How would you describe your current stress and recovery balance?", options: ["Well balanced - I recover well", "Manageable most days", "Often feel overwhelmed", "Constantly running on empty"] }
];

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export default function HealthspanDaily() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [membershipUnlocked, setMembershipUnlocked] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeTool, setActiveTool] = useState<'quiz' | 'supplements'>('quiz');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const goalsList = ["Energy", "Sleep", "Focus", "Joint Health", "Longevity"];

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const getSupplementRecommendations = () => {
    const recs: any[] = [];
    if (selectedGoals.includes("Energy")) {
      recs.push({ name: "Creatine Monohydrate", reason: "Cellular energy & cognitive performance", dose: "5g daily" });
      recs.push({ name: "Rhodiola Rosea", reason: "Adaptogen for fatigue resistance", dose: "200-400mg morning" });
    }
    if (selectedGoals.includes("Sleep")) {
      recs.push({ name: "Magnesium Glycinate", reason: "Nervous system calm & sleep quality", dose: "300-400mg evening" });
      recs.push({ name: "Apigenin", reason: "GABA support for deeper sleep", dose: "50mg before bed" });
    }
    if (selectedGoals.includes("Focus")) {
      recs.push({ name: "L-Theanine + Caffeine", reason: "Smooth focus without jitters", dose: "200mg + 100mg" });
    }
    if (selectedGoals.includes("Joint Health")) {
      recs.push({ name: "Collagen Peptides", reason: "Connective tissue support", dose: "10-15g daily" });
    }
    if (selectedGoals.includes("Longevity")) {
      recs.push({ name: "Omega-3 (EPA/DHA)", reason: "Inflammation & cardiovascular health", dose: "2-3g combined" });
    }
    if (recs.length === 0) {
      recs.push({ name: "Start with Magnesium + Omega-3", reason: "Foundational for most adults 40+" });
    }
    return recs;
  };

  const calculateQuizScore = (answers: number[]) => {
    let points = 0;
    answers.forEach(answer => { points += (3 - answer); });
    const score = Math.round((points / (quizQuestions.length * 3)) * 100);
    
    let level = "";
    let recommendations: string[] = [];

    if (score >= 85) {
      level = "Excellent Healthspan Foundation";
      recommendations = ["Your habits are already strong. Focus on optimization.", "Protect your trajectory with regular biomarker tracking."];
    } else if (score >= 70) {
      level = "Strong Foundation — Room to Optimize";
      recommendations = ["Prioritize sleep consistency and morning sunlight.", "Add 2-3 structured strength sessions per week."];
    } else if (score >= 50) {
      level = "Building Momentum";
      recommendations = ["Start with sleep hygiene fundamentals.", "Implement a simple daily walk + protein goal."];
    } else {
      level = "Needs Immediate Attention";
      recommendations = ["Focus first on sleep quality and consistency.", "Our Sleep Masterclass + Energy Protocol would help."];
    }
    return { score, level, recommendations };
  };

  const handleQuizAnswer = (optionIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[quizStep] = optionIndex;
    setQuizAnswers(newAnswers);

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      const result = calculateQuizScore(newAnswers);
      setQuizResult(result);
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setQuizCompleted(false);
    setQuizResult(null);
  };

  const addToCart = (product: any) => {
    const existing = cart.findIndex(item => item.id === product.id);
    if (existing !== -1) {
      const updated = [...cart];
      updated[existing].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
  };

  const updateCartQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updated = [...cart];
    updated[index].quantity = newQuantity;
    setCart(updated);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCart([]);
      setCartOpen(false);
      setCheckoutSuccess(false);
    }, 2200);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLeadSubmitted(true);
    setTimeout(() => {
      setLeadSubmitted(false);
      setEmail("");
    }, 4000);
  };

  const unlockMembership = () => setShowLoginModal(true);
  const simulateLogin = () => {
    setShowLoginModal(false);
    setMembershipUnlocked(true);
    setTimeout(() => setMembershipUnlocked(false), 45000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  const supplementRecs = getSupplementRecommendations();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0D9488] to-[#134E4A] flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="font-semibold text-xl tracking-tight">Healthspan Daily</div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button onClick={() => scrollToSection('tools')} className="hover:text-[#0D9488]">Tools</button>
            <button onClick={() => scrollToSection('products')} className="hover:text-[#0D9488]">Products</button>
            <button onClick={() => scrollToSection('content')} className="hover:text-[#0D9488]">Content</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-[#0D9488]">About</button>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => scrollToSection('lead-magnet')} className="hidden md:block text-sm font-medium px-5 py-2.5 rounded-full border border-slate-300 hover:bg-slate-50">
              Get Free Guide
            </button>
            <button onClick={() => setCartOpen(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0F172A] text-white text-sm font-medium hover:bg-black">
              Cart {cart.length > 0 && <span className="bg-white text-[#0F172A] text-xs px-1.5 rounded-full">{cart.length}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0FDFA] text-[#0D9488] text-xs font-medium tracking-[1px] mb-6">
          <Award className="w-3.5 h-3.5" /> EVIDENCE-BASED • NO HYPE
        </div>
        <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-6">
          Science-backed strategies<br />to feel sharper after 40.
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10">
          Practical micro-hacks, deep-dive protocols, and interactive tools that actually move the needle on energy, sleep, and long-term health.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => scrollToSection('tools')} className="btn-primary px-9 py-4 rounded-2xl text-lg font-semibold flex items-center justify-center gap-3">
            Try the Energy Audit <Target className="w-5 h-5" />
          </button>
          <button onClick={() => scrollToSection('lead-magnet')} className="px-8 py-4 border border-slate-300 rounded-2xl text-lg font-semibold hover:bg-slate-50">
            Get Free 7-Day Energy Guide
          </button>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="border-y bg-[#F8FAFC] py-5">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-y-6 text-center text-sm">
          <div><div className="font-mono text-2xl font-semibold">100%</div><div className="text-slate-500">Science-referenced</div></div>
          <div><div className="font-mono text-2xl font-semibold">40+</div><div className="text-slate-500">Average reader age</div></div>
          <div><div className="font-mono text-2xl font-semibold">47</div><div className="text-slate-500">Protocols published</div></div>
          <div><div className="font-mono text-2xl font-semibold">No fluff</div><div className="text-slate-500">Only what works</div></div>
        </div>
      </div>

      {/* Tools Section */}
      <section id="tools" className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="mb-10">
          <div className="text-[#0D9488] text-xs font-semibold tracking-[2px] mb-3">INTERACTIVE TOOLS</div>
          <h2 className="text-5xl font-semibold tracking-tighter">Test. Understand. Take action.</h2>
        </div>

        <div className="flex border-b mb-8">
          <button onClick={() => setActiveTool('quiz')} className={`px-8 py-4 font-medium text-sm border-b-2 ${activeTool === 'quiz' ? 'border-[#0D9488] text-[#0D9488]' : 'border-transparent text-slate-500'}`}>Energy Audit Quiz</button>
          <button onClick={() => setActiveTool('supplements')} className={`px-8 py-4 font-medium text-sm border-b-2 ${activeTool === 'supplements' ? 'border-[#0D9488] text-[#0D9488]' : 'border-transparent text-slate-500'}`}>Supplement Stack Builder</button>
        </div>

        {/* Energy Quiz */}
        {activeTool === 'quiz' && (
          <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-10">
            {!quizCompleted ? (
              <div>
                <div className="flex justify-between mb-8">
                  <div className="text-2xl font-semibold">How’s your energy really doing?</div>
                  <div className="text-right font-mono text-3xl">{quizStep + 1}<span className="text-xl text-slate-400">/{quizQuestions.length}</span></div>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full mb-8"><div className="h-full bg-[#0D9488] rounded-full" style={{width: `${(quizStep / quizQuestions.length) * 100}%`}}></div></div>
                
                <div className="text-2xl mb-8">{quizQuestions[quizStep].question}</div>
                <div className="space-y-3">
                  {quizQuestions[quizStep].options.map((option, index) => (
                    <button key={index} onClick={() => handleQuizAnswer(index)} className="quiz-option w-full text-left px-6 py-5 rounded-2xl border border-slate-200 text-lg flex justify-between items-center hover:border-[#0D9488]">
                      {option} <ArrowRight className="text-slate-300" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-6xl font-bold tabular-nums mb-2">{quizResult?.score}<span className="text-3xl align-super text-slate-400">/100</span></div>
                <div className="text-2xl font-semibold mb-8">{quizResult?.level}</div>
                <div className="text-left max-w-md mx-auto mb-8">
                  {quizResult?.recommendations.map((rec: string, i: number) => (
                    <div key={i} className="flex gap-3 mb-3"><Check className="text-[#0D9488] mt-1" /> {rec}</div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button onClick={resetQuiz} className="flex-1 py-4 border rounded-2xl">Retake Quiz</button>
                  <button onClick={() => scrollToSection('products')} className="flex-1 py-4 bg-[#0D9488] text-white rounded-2xl">Get Matching Protocol</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Supplement Builder */}
        {activeTool === 'supplements' && (
          <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-3xl p-10">
            <div className="grid md:grid-cols-5 gap-10">
              <div className="md:col-span-2">
                <div className="text-xs tracking-widest text-[#0D9488] mb-4">SELECT YOUR GOALS</div>
                <div className="space-y-2">
                  {goalsList.map(goal => (
                    <button key={goal} onClick={() => toggleGoal(goal)} className={`w-full text-left px-5 py-4 rounded-2xl border flex justify-between ${selectedGoals.includes(goal) ? 'border-[#0D9488] bg-[#F0FDFA]' : 'border-slate-200'}`}>
                      {goal} {selectedGoals.includes(goal) && <Check className="text-[#0D9488]" />}
                    </button>
                  ))}
                </div>
              </div>
              <div className="md:col-span-3">
                <div className="text-xs tracking-widest text-[#0D9488] mb-4">RECOMMENDATIONS</div>
                <div className="space-y-4">
                  {supplementRecs.map((rec, i) => (
                    <div key={i} className="border border-slate-200 rounded-2xl p-5">
                      <div className="font-semibold">{rec.name}</div>
                      <div className="text-sm text-slate-600">{rec.reason}</div>
                      {rec.dose && <div className="text-xs mt-2 font-mono bg-slate-100 inline-block px-3 py-0.5 rounded">{rec.dose}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Products */}
      <section id="products" className="bg-[#F8FAFC] border-y py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-semibold tracking-tighter mb-10">Digital Products</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product.id} className="product-card bg-white border border-slate-200 rounded-3xl p-7 flex flex-col">
                {product.badge && <div className="text-xs bg-[#CCFBF1] text-[#0D9488] px-3 py-1 rounded-full w-fit mb-4">{product.badge}</div>}
                <div className="font-semibold text-2xl mb-4">{product.title}</div>
                <div className="text-4xl font-bold mb-6">${product.price}</div>
                <p className="text-sm text-slate-600 mb-6 flex-1">{product.description}</p>
                <ul className="text-sm mb-8 space-y-1.5">
                  {product.features.map((f, i) => <li key={i} className="flex gap-2"><Check className="text-[#0D9488] mt-0.5" />{f}</li>)}
                </ul>
                <button onClick={() => addToCart(product)} className="mt-auto w-full py-4 bg-[#0F172A] text-white rounded-2xl font-semibold">Get Instant Access</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section id="lead-magnet" className="max-w-xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-semibold tracking-tighter mb-4">Get the 7 Daily Energy Habits Guide</h2>
        <p className="text-slate-600 mb-8">Free high-impact checklist for adults 40+.</p>
        
        {!leadSubmitted ? (
          <form onSubmit={handleLeadSubmit} className="flex flex-col gap-3">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required className="px-6 py-4 rounded-2xl border text-lg" />
            <button type="submit" className="py-4 bg-[#0D9488] text-white rounded-2xl font-semibold">Send Me the Free Guide</button>
          </form>
        ) : (
          <div className="bg-[#F0FDFA] p-8 rounded-3xl">Check your inbox — the guide is on the way!</div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-slate-400 py-12 text-sm">
        <div className="max-w-6xl mx-auto px-6 text-center">
          © 2026 Healthspan Daily. This is educational content only, not medical advice.
        </div>
      </footer>

      {/* Cart Modal */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4" onClick={() => setCartOpen(false)}>
          <div className="bg-white w-full max-w-lg rounded-3xl p-8" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between mb-6">
              <div className="text-2xl font-semibold">Your Cart</div>
              <button onClick={() => setCartOpen(false)}><X /></button>
            </div>

            {checkoutSuccess ? (
              <div className="text-center py-10">Thank you! Your purchase was successful.</div>
            ) : cart.length > 0 ? (
              <>
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between mb-4">
                    <div>{item.title} × {item.quantity}</div>
                    <div className="flex gap-3">
                      <button onClick={() => updateCartQuantity(index, item.quantity - 1)}>-</button>
                      <button onClick={() => updateCartQuantity(index, item.quantity + 1)}>+</button>
                      <button onClick={() => removeFromCart(index)} className="text-red-500">Remove</button>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4 flex justify-between font-semibold text-xl">
                  <div>Total</div><div>${cartTotal}</div>
                </div>
                <button onClick={handleCheckout} className="mt-6 w-full py-4 bg-[#0F172A] text-white rounded-2xl">Complete Purchase</button>
              </>
            ) : <div>Your cart is empty.</div>}
          </div>
        </div>
      )}
    </div>
  );
}