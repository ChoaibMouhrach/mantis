import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Bug } from "lucide-react";
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
      <div className="container h-[600px] grid lg:grid-cols-2 gap-20 lg:gap-0 items-center py-16 ld:py-0" >
        <div>
          <div className="flex flex-col gap-4" >
            <h1 className="text-2xl md:text-5xl font-extrabold" >
              Revolutionize Your Development Process with Mantis – Your All-in-One Software Bug Tracker and Issue Management Platform
            </h1>
            <p>
              Empower Your Team to Efficiently Track, Prioritize, Collaborate on, and Resolve Software Bugs, All in One Place, for Faster, More Reliable Software Development.
            </p>
            <Button className="w-fit" size="lg" asChild >
              <Link href="/sign-in" >
                Get Started
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center lg:justify-end" >
          <Bug className="w-64 h-64 text-primary" />
        </div>
      </div>
    </main>
  );
}
