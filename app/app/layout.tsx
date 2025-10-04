import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppKitProvider } from '@/components/providers/AppKitProvider';
import { NeuralOrchestrator } from '@/components/ui/NeuralOrchestrator';
import { ConnectButton } from '@/components/wallet/ConnectButton';
import { NetworkSelector } from '@/components/wallet/NetworkSelector';
import { GradientText } from '@/components/ui/GradientText';
import Link from 'next/link';
import { ResponsiveNavbar } from '@/components/ui/ResponsiveNavbar';
import { ChatbotButton } from '@/components/chat/ChatbotButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Oráculo - Permissionless Prediction Markets',
  description: 'Create, trade, and resolve ANY prediction market in 60 seconds on Solana',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen overflow-x-hidden`}>
        <AppKitProvider>
          <NeuralOrchestrator mode="standard" neuralIntensity="medium" particleCount={40} interactive={true}>
            {/* Responsive Navigation */}
            <ResponsiveNavbar />

          {/* Main Content */}
          <main className="relative z-10">
            {children}
          </main>

          {/* Responsive Footer */}
          <footer className="relative z-20 border-t border-white/10 backdrop-blur-xl glass-enhanced py-8 mt-20">
            <div className="container mx-auto px-4">
              <div className="text-center text-white/60">
                <p className="text-sm sm:text-base mb-4 sm:mb-6">
                  Built on Solana for the Cypherpunk Hackathon 2025
                </p>
                <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener" 
                    className="hover:text-white transition text-sm sm:text-base"
                  >
                    Twitter
                  </a>
                  <a 
                    href="https://discord.com" 
                    target="_blank" 
                    rel="noopener" 
                    className="hover:text-white transition text-sm sm:text-base"
                  >
                    Discord
                  </a>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener" 
                    className="hover:text-white transition text-sm sm:text-base"
                  >
                    GitHub
                  </a>
                  <a 
                    href="/docs" 
                    className="hover:text-white transition text-sm sm:text-base"
                  >
                    Docs
                  </a>
                </div>
              </div>
            </div>
          </footer>
          </NeuralOrchestrator>
          
          {/* SuperIntelligence Chatbot */}
          <ChatbotButton />
        </AppKitProvider>
      </body>
    </html>
  );
}
