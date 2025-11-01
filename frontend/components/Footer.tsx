'use client';

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-background py-6">
      <div className="container">
        <Card className="border-muted bg-gradient-to-t from-muted/10 to-background shadow-sm backdrop-blur">
          <CardContent className="flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>

            <nav className="flex gap-6 text-sm">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/contact"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </nav>
          </CardContent>
        </Card>
      </div>
    </footer>
  );
}

export default Footer;
