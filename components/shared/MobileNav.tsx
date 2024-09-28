"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 z-50 w-full flex items-center justify-between p-4 md:px-6 md:py-2 bg-white shadow-md">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={180}
          height={28}
          priority
        />
      </Link>

      {/* Mobile Nav and User Menu */}
      <nav className="flex items-center gap-4">
        <SignedIn>
          {/* User Button */}
          <UserButton afterSignOutUrl="/" />

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Image
                  src="/assets/icons/menu.svg"
                  alt="menu"
                  width={32}
                  height={32}
                  className="cursor-pointer"
                />
              </Button>
            </SheetTrigger>

            <SheetContent className="w-64 bg-white p-4">
              {/* Inside Mobile Menu */}
              <div className="flex flex-col gap-6">
                {/* Logo */}
                <Image
                  src="/assets/images/logo-text.svg"
                  alt="logo"
                  width={152}
                  height={23}
                />

                {/* Navigation Links */}
                <ul className="flex flex-col gap-4">
                  {navLinks.map((link) => {
                    const isActive = link.route === pathname;

                    return (
                      <li
                        key={link.route}
                        className={`p-4 ${
                          isActive ? "text-purple-600" : "text-gray-700"
                        }`}
                      >
                        <Link
                          href={link.route}
                          className="flex items-center gap-2 hover:text-purple-600"
                        >
                          <Image
                            src={link.icon}
                            alt={`${link.label} icon`}
                            width={24}
                            height={24}
                          />
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
          {/* Login Button */}
          <Button asChild className="button bg-purple-gradient bg-cover">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;
