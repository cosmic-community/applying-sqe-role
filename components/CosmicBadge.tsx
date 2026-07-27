'use client'

import { useEffect, useState } from 'react'

interface CosmicBadgeProps {
  bucketSlug: string
}

export default function CosmicBadge({ bucketSlug }: CosmicBadgeProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const isDismissed = localStorage.getItem('cosmic-badge-dismissed')
    if (!isDismissed) {
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem('cosmic-badge-dismissed', 'true')
  }

  if (!isVisible) return null

  return (
    <a
      href={`https://www.cosmicjs.com?utm_source=bucket_${bucketSlug}&utm_medium=referral&utm_campaign=app_badge&utm_content=built_with_cosmic`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 text-sm font-medium text-gray-800 no-underline transition-colors duration-200"
      style={{
        position: 'fixed',
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        padding: '12px 16px',
        width: '180px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f9fafb'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'white'
      }}
    >
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleDismiss()
        }}
        className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-800 transition-colors duration-200 hover:bg-gray-200"
        aria-label="Dismiss badge"
      >
        ×
      </button>

      <img
        src="https://cdn.cosmicjs.com/b67de7d0-c810-11ed-b01d-23d7b265c299-logo508x500.svg"
        alt="Cosmic Logo"
        className="h-5 w-5"
      />
      Built with Cosmic
    </a>
  )
}