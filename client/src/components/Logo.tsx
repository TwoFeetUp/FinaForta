import { Link } from "wouter";
import logoImage from "@assets/images.jpg";

interface LogoProps {
  className?: string;
  linkToHome?: boolean;
}

export default function Logo({ className = "", linkToHome = true }: LogoProps) {
  const logo = (
    <img
      src={logoImage}
      alt="FinaForte Logo"
      className={`h-12 md:h-16 w-auto ${className}`}
    />
  );

  if (linkToHome) {
    return (
      <Link href="/">
        <a className="inline-block hover:opacity-80 transition-opacity">
          {logo}
        </a>
      </Link>
    );
  }

  return logo;
}
