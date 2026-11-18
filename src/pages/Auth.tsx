import { Link } from 'react-router';
import { Brand } from '../components/Brand';
import { Footer } from '../components/Navigation';
export function Auth({ signup = false }: { signup?: boolean }) {
  return <div className="auth-layout"><header className="site-header auth-header"><div className="site-header-row"><Brand linked className="site-header-brand" /></div></header>
    <div className="auth-body"><aside className="auth-animation" aria-label="kanreki"><div><Brand /><p>read. write. everything.</p></div></aside>
      <main className="auth-panel" id="main-content" tabIndex={-1}><div className="auth-container" key={signup ? 'signup' : 'signin'}><header className="auth-intro"><h1>{signup ? 'create account' : 'sign in'}</h1><p>{signup ? 'your own space to publish.' : 'a place for your perspectives.'}</p></header>
        <p className="auth-restriction" id="access-notice">{signup ? 'Account creation for the publishing platform is currently restricted. This public website does not provide registration.' : 'Access to the publishing platform is currently restricted. This public website does not provide account sign-in.'}</p>
        <form className="auth-form" onSubmit={e => e.preventDefault()} aria-describedby="access-notice" autoComplete="off"><fieldset disabled>
          {signup && <div className="auth-field"><label htmlFor="full-name">full name</label><input id="full-name" type="text" placeholder="your name" autoComplete="off" /></div>}
          <div className="auth-field"><label htmlFor="email">email</label><input id="email" type="email" placeholder="you@example.com" autoComplete="off" /></div>
          <div className="auth-field"><label htmlFor="password">password</label><input id="password" type="password" placeholder={signup ? 'create a password' : 'enter your password'} autoComplete="off" /></div>
          {signup && <div className="auth-field"><label htmlFor="confirm-password">confirm password</label><input id="confirm-password" type="password" placeholder="confirm your password" autoComplete="off" /></div>}
          <button type="submit" className="auth-submit" disabled>{signup ? 'create account' : 'sign in'} — restricted</button>
        </fieldset></form><div className="auth-auth-switch"><span>{signup ? 'already have an account?' : 'new here?'}</span><Link to={signup ? '/sign-in' : '/create-account'}>{signup ? 'sign in' : 'create an account'}</Link></div>
      </div></main></div><Footer auth /></div>;
}
