export default function Sticker({ emoji, className = '', anim = 'float', size = 'text-4xl' }) {
  const animClass = anim === 'wiggle' ? 'animate-wiggle' : anim === 'pulse' ? 'animate-pulseGlow' : 'animate-float'
  return (
    <span className={`sticker ${size} ${animClass} ${className}`} aria-hidden="true">
      {emoji}
    </span>
  )
}
