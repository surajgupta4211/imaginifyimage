"use client";

import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar-logo w-72 h-screen bg-white p-6 shadow-lg ">
      {/* Logo */}
      <Link href="/" className="flex justify-center mb-8">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={180}
          height={28}
          priority
        />
      </Link>

      <nav className="sidebar-logo flex-1">
        <SignedIn>
          {/* Main Navigation Links */}
          <ul className="space-y-4 ">
            {navLinks.slice(0, 6).map((link) => {
              const isActive = link.route === pathname;

              return (
                <li
                  key={link.route}
                  className={`group flex items-center gap-5 p-5 rounded-md cursor-pointer transition-all ${
                    isActive
                      ? "bg-purple-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Link className="flex items-center gap-2" href={link.route}>
                    <Image
                      src={link.icon}
                      alt={link.label}
                      width={24}
                      height={24}
                      className={`transition-transform ${
                        isActive ? "brightness-200" : ""
                      }`}
                    />
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Secondary Navigation Links */}
          <ul className="mt-8 space-y-4">
            {navLinks.slice(6).map((link) => {
              const isActive = link.route === pathname;

              return (
                <li
                  key={link.route}
                  className={`group flex items-center gap-5 p-5 rounded-md cursor-pointer transition-all ${
                    isActive
                      ? "bg-purple-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Link className="flex items-center gap-2" href={link.route}>
                    <Image
                      src={link.icon}
                      alt={link.label}
                      width={24}
                      height={24}
                      className={`transition-transform ${
                        isActive ? "brightness-200" : ""
                      }`}
                    />
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}

            {/* UserButton for Signing Out */}
            <li className="flex items-center justify-center p-4">
              <UserButton afterSignOutUrl="/" showName />
            </li>
          </ul>
        </SignedIn>

        <SignedOut>
          {/* Login Button */}
          <div className="mt-auto flex justify-center p-4">
            <Button asChild className="w-full bg-purple-500 text-white">
              <Link href="/sign-in">Login</Link>
            </Button>
          </div>
        </SignedOut>
      </nav>
    </aside>
  );
};

export default Sidebar;
