import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <nav className="h-16 border-b">
        <div className="container h-full flex items-center justify-between">
          <div>
            <Logo />
          </div>
          <div>
            <Button asChild size="sm">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>
      </nav>
    </main>
  );
}
