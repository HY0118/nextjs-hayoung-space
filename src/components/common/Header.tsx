import Link from 'next/link';

const Header = () => (
  <header className="header">
    <nav>
      <ul className="nav-list">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/#about">About</Link></li>
        <li><Link href="/#projects">Projects</Link></li>
        <li><Link href="/#contact">Contact</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
