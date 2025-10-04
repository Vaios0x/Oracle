'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ConnectButton } from '@/components/wallet/ConnectButton';
import { WalletInfo } from '@/components/wallet/WalletInfo';
import { NetworkSelector } from '@/components/wallet/NetworkSelector';
import { GradientText } from '@/components/ui/GradientText';
import { motion, AnimatePresence } from 'framer-motion';

export function ResponsiveNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/markets', label: 'Markets' },
    { href: '/governance', label: 'Governance' },
    { href: '/portfolio', label: 'Portfolio' },
  ];

  return (
    <nav className={`relative z-20 border-b border-white/10 backdrop-blur-xl glass-enhanced transition-all duration-300 ${
      isScrolled ? 'py-2' : 'py-3 sm:py-4'
    }`}>
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 mobile-touch">
            <h1 className={`font-bold transition-all duration-300 ${
              isScrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
            } mobile-h3`}>
              <GradientText>Oráculo</GradientText>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium mobile-touch"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 xl:gap-3">
              <NetworkSelector />
              <WalletInfo />
              <ConnectButton />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none mobile-touch"
            aria-label="Toggle menu"
          >
            <motion.span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <motion.span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <motion.span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-4 pb-6 space-y-3 sm:space-y-4 mobile-gap-2">
                {/* Mobile Navigation Links */}
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="block text-white/80 hover:text-white transition-colors duration-200 text-base sm:text-lg font-medium py-2 mobile-touch mobile-text-sm"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Wallet Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="pt-4 border-t border-white/10 space-y-3 mobile-gap-2"
                >
                  <div className="flex flex-col gap-2 sm:gap-3 mobile-gap-2">
                    <NetworkSelector />
                    <WalletInfo />
                    <ConnectButton />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
