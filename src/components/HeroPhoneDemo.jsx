import { motion } from 'framer-motion';
import PhoneFrame from './PhoneFrame.jsx';
import AppScreensDemo from './AppScreensDemo.jsx';
import heroCatPng from '../assets/hero.png';
import mobileHeroCatPng from '../assets/mobile_hero.png';

export default function HeroPhoneDemo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto flex items-center justify-center lg:ml-auto lg:mr-0 lg:translate-x-6 pt-4 pb-28 sm:pb-36 lg:pb-4"
    >
      {/* 1. Desktop Mascot (hero.png) - Presenting the phone with open palm */}
      <motion.div
        initial={{ opacity: 0, x: -40, scale: 0.92 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none hidden lg:block absolute -left-[290px] top-[18%] z-0 select-none"
      >
        <img
          src={heroCatPng}
          alt="StoreQL Mascot"
          className="w-[500px] max-w-none object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.85)] filter brightness-[1.02] contrast-[1.04]"
        />
      </motion.div>

      {/* 2. Mobile Mascot (mobile_hero.png) - Centered and enlarged at the bottom pointing up */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none block lg:hidden absolute -bottom-20 sm:-bottom-24 left-1/2 -translate-x-1/2 z-20 select-none"
      >
        <img
          src={mobileHeroCatPng}
          alt="StoreQL Mascot"
          className="w-[300px] sm:w-[360px] max-w-none object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.95)] filter brightness-[1.02] contrast-[1.04]"
        />
      </motion.div>

      {/* Ambient Radial Glows around the phone */}
      <div className="pointer-events-none absolute -inset-8 rounded-[60px] bg-accent/15 blur-[64px] z-0" />
      <div className="pointer-events-none absolute -inset-4 rounded-[54px] bg-accent-bright/10 blur-[32px] z-0" />

      {/* Floating Phone Demo Container */}
      <motion.div
        animate={{
          y: [-5, 5, -5],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative z-10 drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]"
      >
        {/* Soft shadow under the phone */}
        <div className="pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] h-6 bg-black/60 blur-xl rounded-full" />

        <PhoneFrame className="relative" showNotch={false}>
          <AppScreensDemo />
        </PhoneFrame>
      </motion.div>
    </motion.div>
  );
}
