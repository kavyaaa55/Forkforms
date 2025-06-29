import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobilePopupProps {
  onClose: () => void;
}

const MobilePopup: React.FC<MobilePopupProps> = ({ onClose }) => {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-[#164A41] text-white p-4 rounded-lg shadow-lg flex items-center justify-between">
        <p className="text-sm">For better experience, please use desktop mode</p>
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:text-[#E1B564]"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MobilePopup;
