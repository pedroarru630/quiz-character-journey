
import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CircleDollarSign } from 'lucide-react';

interface RewardPopupProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
}

const RewardPopup = ({ isOpen, onClose, amount }: RewardPopupProps) => {
  const [showAmount, setShowAmount] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Create cash register "cha-ching" sound using Web Audio API
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Create multiple tones for a cash register effect
        const playTone = (frequency: number, startTime: number, duration: number, volume: number) => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime + startTime);
          gainNode.gain.setValueAtTime(volume, audioContext.currentTime + startTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + startTime + duration);
          
          oscillator.start(audioContext.currentTime + startTime);
          oscillator.stop(audioContext.currentTime + startTime + duration);
        };
        
        // Cash register sound sequence
        playTone(800, 0, 0.1, 0.3);      // First ding
        playTone(1200, 0.05, 0.1, 0.2);  // Higher ding
        playTone(600, 0.15, 0.3, 0.15);  // Cash drawer opening sound
        playTone(400, 0.2, 0.2, 0.1);    // Lower rumble
        
      } catch (error) {
        console.log('Audio not supported');
      }
      
      setTimeout(() => setShowAmount(true), 500);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-sm">
        <div className="text-center py-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <CircleDollarSign className="w-8 h-8 text-black" />
            </div>
          </div>
          
          <h2 className="text-lg font-bold mb-2 text-white">Você Recebeu:</h2>
          
          <div className={`text-3xl font-bold text-green-400 transition-all duration-500 ${
            showAmount ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}>
            U${amount}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RewardPopup;
