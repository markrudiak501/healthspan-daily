import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'

export const metadata: Metadata = {
  title: 'Healthspan Daily | Science-Backed Wellness for Adults 40+',
  description: 'Practical, science-backed tools and protocols to improve energy, sleep, and long-term health after 40.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}

        {/* ========== FOOTER ========== */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-16">
          <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-gray-600">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p>© {new Date().getFullYear()} Healthspan Daily. All rights reserved.</p>
                <p className="mt-1 text-xs text-gray-500">
                  Not medical advice. Always consult your physician before making changes to your health routine.
                </p>
              </div>

              <div className="flex items-center gap-6">
                <a 
                  href="https://x.com/HealthspanDaily" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 transition-colors"
                >
                  Follow on X
                </a>
                <a href="#resources" className="hover:text-gray-900 transition-colors">
                  Resources
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}