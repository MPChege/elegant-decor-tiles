'use client'

import * as React from 'react'
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { cn } from '@/lib/utils'
import { triggerHaptic } from '@/lib/utils'

interface SwipeableSectionProps {
  children: React.ReactNode[]
  className?: string
  onSwipe?: (direction: 'left' | 'right') => void
}

/**
 * SwipeableSection Component
 * Enables swipe gestures for mobile navigation with haptic feedback
 */
export function SwipeableSection({
  children,
  className,
  onSwipe,
}: SwipeableSectionProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const x = useMotionValue(0)
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5])

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50
    
    if (info.offset.x > threshold && currentIndex > 0) {
      // Swiped right
      setCurrentIndex(currentIndex - 1)
      triggerHaptic('light')
      onSwipe?.('right')
    } else if (
      info.offset.x < -threshold &&
      currentIndex < children.length - 1
    ) {
      // Swiped left
      setCurrentIndex(currentIndex + 1)
      triggerHaptic('light')
      onSwipe?.('left')
    }
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ x, opacity }}
        className="cursor-grab active:cursor-grabbing"
      >
        {children[currentIndex]}
      </motion.div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              triggerHaptic('light')
            }}
            className={cn(
              'w-2 h-2 rounded-full transition-all',
              currentIndex === index
                ? 'bg-primary w-6'
                : 'bg-muted-foreground/30'
            )}
          />
        ))}
      </div>
    </div>
  )
}

