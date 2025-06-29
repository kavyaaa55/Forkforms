import React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onToggle }) => {
  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-white"
        onClick={onToggle}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[#164A41] md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <Link
              href="/"
              className="text-white text-xl hover:text-[#E1B564] transition-colors"
              onClick={onToggle}
            >
              Home
            </Link>
            <Link
              href="/templates"
              className="text-white text-xl hover:text-[#E1B564] transition-colors"
              onClick={onToggle}
            >
              Templates
            </Link>
            <Link
              href="/docs"
              className="text-white text-xl hover:text-[#E1B564] transition-colors"
              onClick={onToggle}
            >
              Docs
            </Link>
            <Link
              href="/createform"
              className="text-white text-xl hover:text-[#E1B564] transition-colors"
              onClick={onToggle}
            >
              Create Form
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;
