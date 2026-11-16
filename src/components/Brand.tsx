import { Link } from 'react-router';
export function Brand({ className = '', linked = false }: { className?: string; linked?: boolean }) {
  const text = <span className="brand-text">kailor<span className="brand-period">.</span>insider</span>;
  return linked ? <Link to="/" aria-label="kailor insider home" className={`brand ${className}`}>{text}</Link>
    : <span className={`brand ${className}`}>{text}</span>;
}
