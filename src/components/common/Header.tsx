import { FC } from "react";
import Link from "next/link";

const Header: FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          HY <span className="text-text-primary">Dev</span>
        </Link>
        <nav>
          <ul className="flex gap-8">
            <li>
              <Link href="/#about" className="text-text-secondary font-medium hover:text-primary transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/#skills" className="text-text-secondary font-medium hover:text-primary transition-colors">
                Skills
              </Link>
            </li>
            <li>
              <Link href="/#projects" className="text-text-secondary font-medium hover:text-primary transition-colors">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="text-text-secondary font-medium hover:text-primary transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
