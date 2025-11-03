'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Creative Loading Screen
 * Simple, clean, and elegant loading animation
 */
export function LoadingScreen() {
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          <div className="relative">
            {/* Elegant Tiles Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.h1
                className="font-playfair text-4xl md:text-5xl font-bold text-luxury-gradient mb-8"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                Elegant Tiles
              </motion.h1>

              {/* Animated Loading Tiles */}
              <div className="flex gap-2 justify-center">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-sm bg-primary"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>

              {/* Loading Text */}
              <motion.p
                className="text-sm text-muted-foreground mt-6"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Creating your experience...
              </motion.p>
            </motion.div>

            {/* Circular Progress */}
            <svg
              className="absolute -inset-16 w-48 h-48"
              viewBox="0 0 100 100"
            >
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary/20"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }}
                style={{
                  rotate: -90,
                  transformOrigin: 'center',
                }}
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

