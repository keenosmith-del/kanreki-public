import { Link } from 'react-router';
export function Brand({ className = '', linked = false }: { className?: string; linked?: boolean }) {
  const text = <span className="brand-text" aria-hidden="true">kanreki<span className="brand-punctuation">.</span></span>;
  return linked ? <Link to="/" aria-label="kanreki." className={`brand ${className}`}>{text}</Link>
    : <span role="img" aria-label="kanreki." className={`brand ${className}`}>{text}</span>;
}
