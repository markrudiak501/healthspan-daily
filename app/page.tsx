'use client'

import React, { useState } from 'react'

// Types
interface QuizQuestion {
  id: number
  question: string
  options: string[]
}

interface Product {
  id: number
  title: string
  description: string
  price: number
  type: string
}

interface CartItem extends Product {
  quantity: number
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How would you rate your typical energy levels between 2–4pm?",
    options: ["Strong and steady", "Slight dip but manageable", "Noticeable crash", "I feel wiped out"]
  },
  {
    id: 2,
    question: "How many nights per week do you wake up feeling well-rested?",
    options: ["5–7 nights", "3–4 nights", "1–2 nights", "Rarely or never"]
  },
  {
    id: 3,
    question: "How often do you experience brain fog or difficulty focusing?",
    options: ["Rarely", "A few times per week", "Most days", "Daily and significantly"]
  },
  {
    id: 4,
    question: "How would you describe your current recovery from exercise or daily activity?",
    options: ["Fast and strong", "Decent but could be better", "Slow and noticeable", "I feel constantly sore or drained"]
  },
  {
    id: 5,
    question: "How consistent is your sleep schedule (same bedtime/wake time)?",
    options: ["Very consistent (±30 min)", "Mostly consistent", "Somewhat inconsistent", "Very inconsistent"]
  }
]

const products: Product[] = [
  {
    id: 1,
    title: "7-Day Energy Reset Protocol",
    description: "Step-by-step daily micro-hacks to rebuild steady energy after 40. Includes exact timing and supplement timing.",
    price: 27,
    type: "PDF + Notion"
  },
  {
    id: 2,
    title: "Sleep Optimization After 40",
    description: "Complete 30-day system to improve deep sleep and morning energy. Includes wind-down checklist and supplement guide.",
    price: 37,
    type: "PDF + Checklists"
  },
  {
    id: 3,
    title: "The 40+ Supplement Starter Kit",
    description: "Evidence-based supplement stack builder with dosages, timing, and what to avoid. Personalized by goal.",
    price: 19,
    type: "Notion Dashboard"
  }
]

export default function HealthspanDaily() {
  // Quiz State
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Quiz Functions
  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex]
    setAnswers(newAnswers)

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate score (lower score = better energy habits)
      const totalScore = newAnswers.reduce((sum, answer) => sum + answer, 0)
      setQuizScore(totalScore)
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setQuizCompleted(false)
    setQuizScore(0)
  }

  const getQuizResult = () => {
    if (quizScore <= 4) return {
      level: "Excellent Foundation",
      message: "Your habits are already strong. Focus on fine-tuning recovery and consistency for even better results.",
      recommendation: "Prioritize sleep consistency and consider adding 1–2 targeted supplements (Magnesium + Omega-3)."
    }
    if (quizScore <= 8) return {
      level: "Good but Room to Improve",
      message: "You have a solid base but are likely leaving energy on the table in the afternoon and recovery.",
      recommendation: "Start with a consistent wind-down routine and test a simple 3-supplement stack."
    }
    return {
      level: "Needs Attention",
      message: "Your current patterns are likely contributing to low energy, brain fog, and poor recovery.",
      recommendation: "Focus first on sleep schedule + morning sunlight. Add a basic energy protocol before adding more supplements."
    }
  }

  // Cart Functions
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prev, { ...product, quantity: 1 }]
      }
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const result = quizCompleted ? getQuizResult() : null

  return (
    <div className="min-h-screen bg-white text-gray-900">
      
      {/* ========== HERO ========== */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 text-sm font-medium text-teal-700 bg-teal-100 rounded-full">
            Science-Backed • No Hype
          </div>

          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-gray-900 mb-6">
            Feel sharper, more energetic,<br className="hidden md:block" /> and in control after 40.
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10">
            Practical, science-backed micro-hacks and tools that actually move the needle on energy, sleep, and long-term health.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => document.getElementById('energy-quiz')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 text-lg font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-all active:scale-[0.985]"
            >
              Start the Energy Audit
            </button>

            <button 
              onClick={() => document.getElementById('free-guide')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-4 text-lg font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all"
            >
              Get the Free 7-Day Energy Guide
            </button>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Takes 60 seconds • Instant results • No email required to start
          </p>
        </div>
      </section>

      {/* ========== ENERGY AUDIT QUIZ ========== */}
      <section id="energy-quiz" className="section max-w-3xl mx-auto px-6 py-16 border-t border-gray-100">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 mb-4 text-sm font-medium text-teal-700 bg-teal-100 rounded-full">
            60-Second Assessment
          </div>
          <h2 className="text-4xl font-semibold tracking-tight mb-4">Energy Audit</h2>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            Answer 5 quick questions to see where your energy is leaking and get personalized micro-hacks.
          </p>
        </div>

        {!quizCompleted ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-medium text-gray-500">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <div className="h-1.5 w-32 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-600 transition-all duration-300" 
                  style={{ width: `${((currentQuestion) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-8 leading-tight">
              {quizQuestions[currentQuestion].question}
            </h3>

            <div className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="quiz-option w-full text-left p-5 border border-gray-200 rounded-xl hover:border-teal-600 hover:bg-teal-50/50 transition-all active:scale-[0.995]"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-3xl font-semibold mb-2">Your Energy Profile</h3>
              <p className="text-2xl font-medium text-teal-700">{result?.level}</p>
            </div>

            <div className="prose prose-gray max-w-none mb-8">
              <p className="text-lg">{result?.message}</p>
              <div className="mt-6 p-6 bg-gray-50 rounded-xl">
                <p className="font-semibold mb-2">Recommended Starting Point:</p>
                <p>{result?.recommendation}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={resetQuiz}
                className="flex-1 px-6 py-3.5 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Retake Quiz
              </button>
              <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex-1 px-6 py-3.5 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-colors"
              >
                See Recommended Protocols
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ========== TOOLS SECTION ========== */}
      <section id="tools" className="section bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold tracking-tight mb-4">Practical Tools</h2>
            <p className="text-xl text-gray-600 max-w-xl mx-auto">
              Simple, science-backed tools you can use today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Supplement Goal Builder */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="text-teal-600 text-3xl mb-4">🧪</div>
              <h3 className="text-2xl font-semibold mb-3">Supplement Goal Builder</h3>
              <p className="text-gray-600 mb-6">
                Tell us your main goal and we’ll give you a simple, evidence-based starting stack.
              </p>
              <div className="space-y-3">
                {["Better daily energy", "Deeper sleep & recovery", "Joint comfort & mobility", "Focus & mental clarity"].map((goal, i) => (
                  <button 
                    key={i}
                    onClick={() => alert(`Thanks! A personalized stack for "${goal}" will be added in the next update.`)}
                    className="w-full text-left p-4 border border-gray-200 rounded-xl hover:border-teal-600 hover:bg-teal-50/50 transition-all"
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Wins */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="text-teal-600 text-3xl mb-4">⚡</div>
              <h3 className="text-2xl font-semibold mb-3">Today’s Micro-Hacks</h3>
              <p className="text-gray-600 mb-6">Small changes with outsized impact after 40.</p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex gap-3">• Get 10–15 min of morning sunlight within 30 min of waking</li>
                <li className="flex gap-3">• Stop caffeine 8–10 hours before bedtime</li>
                <li className="flex gap-3">• Add 5–10 min of zone 2 walking after lunch</li>
                <li className="flex gap-3">• Finish eating at least 3 hours before bed</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PRODUCTS SECTION ========== */}
      <section id="products" className="section max-w-5xl mx-auto px-6 py-16 border-t border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold tracking-tight mb-4">Digital Protocols & Tools</h2>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            Ready-to-use systems designed specifically for adults 40+.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="product-card bg-white border border-gray-200 rounded-2xl p-8 flex flex-col">
              <div className="flex-1">
                <div className="text-xs font-medium text-teal-700 tracking-widest mb-3">{product.type}</div>
                <h3 className="text-2xl font-semibold mb-3 leading-tight">{product.title}</h3>
                <p className="text-gray-600 mb-6">{product.description}</p>
              </div>
              <div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-semibold">${product.price}</span>
                  <span className="text-gray-500">one-time</span>
                </div>
                <button 
                  onClick={() => addToCart(product)}
                  className="btn-primary w-full py-3.5 rounded-xl font-semibold"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== FREE GUIDE / LEAD MAGNET ========== */}
      <section id="free-guide" className="section bg-teal-600 text-white py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold tracking-tight mb-4">Get the Free 7-Day Energy Guide</h2>
          <p className="text-xl text-teal-100 mb-8">
            7 simple daily actions that deliver the biggest energy improvements after 40. No fluff.
          </p>
          <form 
            onSubmit={(e) => { e.preventDefault(); alert("Thank you! Check your email for the guide (demo)."); }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-5 py-4 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              required 
            />
            <button 
              type="submit"
              className="px-8 py-4 bg-white text-teal-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Send Me the Guide
            </button>
          </form>
          <p className="text-xs text-teal-200 mt-4">We respect your inbox. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* ========== RESOURCES ========== */}
      <section id="resources" className="section max-w-4xl mx-auto px-6 py-16 border-t border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold tracking-tight mb-3">Free Resources</h2>
          <p className="text-gray-600">Science-backed content to help you take control of your healthspan.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <a href="https://x.com/HealthspanDaily" target="_blank" className="block p-6 border border-gray-200 rounded-2xl hover:border-teal-600 transition-colors">
            <div className="font-semibold mb-1">Follow on X →</div>
            <p className="text-gray-600 text-sm">Daily micro-hacks, study breakdowns, and myth-busting for adults 40+.</p>
          </a>
          <div className="p-6 border border-gray-200 rounded-2xl">
            <div className="font-semibold mb-1">Coming Soon</div>
            <p className="text-gray-600 text-sm">Free email course: “The 6 Foundations of Energy After 40”</p>
          </div>
        </div>
      </section>

      {/* ========== CART MODAL ========== */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={() => setIsCartOpen(false)}>
          <div 
            className="modal bg-white rounded-2xl max-w-md w-full p-8" 
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold">Your Cart</h3>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-start border-b pb-4">
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${item.price * item.quantity}</div>
                        <button 
                          onClick={() => removeFromCart(item.id)} 
                          className="text-xs text-red-500 hover:underline mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-lg font-semibold mb-6">
                  <span>Total</span>
                  <span>${cartTotal}</span>
                </div>

                <button 
                  onClick={() => alert("Checkout flow coming soon! (This is a demo)")}
                  className="btn-primary w-full py-4 rounded-xl font-semibold text-lg"
                >
                  Proceed to Checkout
                </button>
                <p className="text-center text-xs text-gray-500 mt-3">Secure checkout powered by Stripe (coming soon)</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}