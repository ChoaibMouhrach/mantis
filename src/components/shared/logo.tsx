import { Bug } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center text-xl gap-2 font-semibold italic"
    >
      <Bug className="w-6 h-6 text-primary" />
      Mantis
    </Link>
  );
};

export default Logo;
