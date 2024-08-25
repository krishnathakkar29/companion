"use client";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Menu, Sparkles } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";

type Props = {};

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const Navbar = (props: Props) => {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 h-16 border-b border-primary/10 bg-secondary">
      <div className="flex items-center">
        <Menu className="block md:hidden" />
        <Link href={"/"}>
          <h1
            className={cn(
              "hidden md:block text-xl md:text-3xl font-bold text-primary",
              font.className
            )}
          >
            Companion.AI
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <Button size="sm" variant="premium">
          Upgrade <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
        </Button>
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
