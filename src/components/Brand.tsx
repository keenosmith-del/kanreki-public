import { Link } from 'react-router';
export function Brand({ className = '', linked = false }: { className?: string; linked?: boolean }) {
  const text = <span className="brand-text">kanreki<span className="brand-period">.</span></span>;
  return linked ? <Link to="/" aria-label="kanreki home" className={`brand ${className}`}>{text}</Link>
    : <span className={`brand ${className}`}>{text}</span>;
}
