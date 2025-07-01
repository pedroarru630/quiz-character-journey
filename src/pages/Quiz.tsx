
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import QuizLayout from '@/components/QuizLayout';
import RewardPopup from '@/components/RewardPopup';

const artists = [
  {
    name: "Gilberto Gil",
    image: "/lovable-uploads/66220ce7-963b-479f-a6b7-4f42b5532008.png",
    listeners: "3.579.324 ouvintes mensais"
  },
  {
    name: "Jorge & Mateus", 
    image: "/lovable-uploads/d36dd3ca-7980-49ca-a56f-4d6d11e119b0.png",
    listeners: "14.170.226 ouvintes mensais"
  },
  {
    name: "Ivete Sangalo",
    image: "/lovable-uploads/b3823900-ede2-407c-aa75-9b53f6a6f920.png", 
    listeners: "3.971.079 ouvintes mensais"
  },
  {
    name: "Gusttavo Lima",
    image: "/lovable-uploads/e4b25a8f-4b89-43a9-9835-70a7dd41292c.png",
    listeners: "11.322.316 ouvintes mensais"
  }
];

const Quiz = () => {
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);
  const [allAnswers, setAllAnswers] = useState<any[]>([]);
  const [currentAnswers, setCurrentAnswers] = useState({
    rating: '',
    recommendation: '',
    ageGroup: ''
  });
  const [showReward, setShowReward] = useState(false);
  const [rewardAmount, setRewardAmount] = useState('');
  const navigate = useNavigate();

  const currentArtist = artists[currentArtistIndex];

  const generateReward = () => {
    const amount = (Math.random() * (15 - 5) + 5).toFixed(2);
    return amount;
  };

  const handleSubmit = () => {
    if (currentAnswers.rating && currentAnswers.recommendation && currentAnswers.ageGroup) {
      const amount = generateReward();
      setRewardAmount(amount);
      setShowReward(true);
      
      // Update total earnings
      const currentTotal = parseFloat(localStorage.getItem('totalEarnings') || '0');
      const newTotal = currentTotal + parseFloat(amount);
      localStorage.setItem('totalEarnings', newTotal.toString());
      
      // Dispatch custom event to update header
      window.dispatchEvent(new Event('earningsUpdated'));
      
      // Save current answers
      const newAnswers = [...allAnswers, { 
        artist: currentArtist.name, 
        ...currentAnswers 
      }];
      setAllAnswers(newAnswers);
      
      setTimeout(() => {
        setShowReward(false);
        
        // Check if there are more artists
        if (currentArtistIndex < artists.length - 1) {
          // Move to next artist
          setCurrentArtistIndex(currentArtistIndex + 1);
          setCurrentAnswers({ rating: '', recommendation: '', ageGroup: '' });
        } else {
          // All artists completed, go to final result
          navigate('/result');
        }
      }, 2000);
    }
  };

  const handleRatingSelect = (rating: string) => {
    setCurrentAnswers(prev => ({ ...prev, rating }));
  };

  const handleRecommendationSelect = (recommendation: string) => {
    setCurrentAnswers(prev => ({ ...prev, recommendation }));
  };

  const handleAgeGroupSelect = (ageGroup: string) => {
    setCurrentAnswers(prev => ({ ...prev, ageGroup }));
  };

  return (
    <QuizLayout showProgress={true} currentStep={currentArtistIndex + 1} totalSteps={artists.length}>
      <div className="text-center space-y-8">
        {/* Artist Image and Name */}
        <div className="mb-8">
          <div className="w-full aspect-[9/4] rounded-2xl overflow-hidden bg-gray-800 mb-4">
            <img
              src={currentArtist.image}
              alt={currentArtist.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{currentArtist.name}</h2>
          <p className="text-white text-sm opacity-75">{currentArtist.listeners}</p>
        </div>
        
        {/* Question 1: Rating */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-6 text-white">
            De 1 a 5, qual nota você daria para as músicas do {currentArtist.name}?
          </h3>
          
          <div className="grid grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => handleRatingSelect(num.toString())}
                className={`aspect-square ${
                  currentAnswers.rating === num.toString() 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : 'bg-[#292929] border-[#292929] text-white hover:bg-green-500 hover:border-green-500'
                } border-2 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all duration-200`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Question 2: Recommendation */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-6 text-white">
            Recomendaria o(a) artista {currentArtist.name} para seus amigos e familiares?
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => handleRecommendationSelect('sim')}
              className={`${
                currentAnswers.recommendation === 'sim'
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'bg-[#292929] border-[#292929] text-white hover:bg-green-500 hover:border-green-500'
              } border-2 font-bold py-6 rounded-2xl text-lg transition-all duration-200`}
            >
              Sim
            </Button>
            
            <Button
              onClick={() => handleRecommendationSelect('nao')}
              className={`${
                currentAnswers.recommendation === 'nao'
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'bg-[#292929] border-[#292929] text-white hover:bg-green-500 hover:border-green-500'
              } border-2 font-bold py-6 rounded-2xl text-lg transition-all duration-200`}
            >
              Não
            </Button>
          </div>
        </div>

        {/* Question 3: Age Group */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-6 text-white">
            Qual faixa etária você acha que mais escuta o(a) artista {currentArtist.name}?
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => handleAgeGroupSelect('-18')}
              className={`${
                currentAnswers.ageGroup === '-18'
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'bg-[#292929] border-[#292929] text-white hover:bg-green-500 hover:border-green-500'
              } border-2 font-bold py-6 rounded-2xl text-lg transition-all duration-200`}
            >
              -18 anos
            </Button>
            
            <Button
              onClick={() => handleAgeGroupSelect('+18')}
              className={`${
                currentAnswers.ageGroup === '+18'
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'bg-[#292929] border-[#292929] text-white hover:bg-green-500 hover:border-green-500'
              } border-2 font-bold py-6 rounded-2xl text-lg transition-all duration-200`}
            >
              +18 anos
            </Button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!currentAnswers.rating || !currentAnswers.recommendation || !currentAnswers.ageGroup}
          className="w-full bg-[#292929] hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 text-white font-bold py-4 rounded-2xl text-lg transition-all duration-200"
        >
          Enviar respostas
        </Button>
      </div>
      
      <RewardPopup
        isOpen={showReward}
        onClose={() => setShowReward(false)}
        amount={rewardAmount}
      />
    </QuizLayout>
  );
};

export default Quiz;
