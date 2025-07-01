
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Depoimentos = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigate = useNavigate();

  const testimonials = [
    {
      id: 1,
      name: "Carla Silva",
      location: "São Paulo, SP",
      text: "Receber aqueles dólares do Spotify é incrível! Consegui juntar uma quantia considerável para comprar roupas para minha filha. Essa oportunidade mudou nossa vida.",
      earnings: "R$ 280,00",
      photo: "/lovable-uploads/9d2f25f5-6835-4fd8-98a6-5369b5fad82b.png"
    },
    {
      id: 2,
      name: "João Santos",
      location: "Rio de Janeiro, RJ", 
      text: "Nunca pensei que seria possível ganhar dinheiro ouvindo música. Com o programa do Spotify, consegui uma renda extra que me ajuda muito no final do mês.",
      earnings: "R$ 150,00",
      photo: "/lovable-uploads/9d2f25f5-6835-4fd8-98a6-5369b5fad82b.png"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleContinue = () => {
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4" style={{ backgroundColor: '#292929' }}>
        <img 
          src="/lovable-uploads/1cc76a91-706e-4d83-b1ff-759f4dedabee.png" 
          alt="Spotify" 
          className="h-8"
        />
        <div className="text-green-400 font-bold text-lg">
          U$11.61
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">
            Conheça histórias inspiradoras.
          </h1>
          <p className="text-gray-300 text-sm">
            Famílias brasileiras que tiveram suas vidas transformadas por conta dessa nova modalidade de emprego do Spotify.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
          <div className="text-center mb-4">
            <div className="w-32 h-32 bg-gray-700 rounded-lg mx-auto mb-4 overflow-hidden">
              <img 
                src={testimonials[currentTestimonial].photo} 
                alt={testimonials[currentTestimonial].name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-green-500 text-black px-4 py-2 rounded-full text-sm font-bold mb-3">
              + {testimonials[currentTestimonial].earnings} RECEBIDOS
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-white font-bold text-lg mb-1">
              {testimonials[currentTestimonial].name}
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              {testimonials[currentTestimonial].location}
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              "{testimonials[currentTestimonial].text}"
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={prevTestimonial}
            className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentTestimonial ? 'bg-green-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextTestimonial}
            className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Stats */}
        <div className="text-center mb-8">
          <h3 className="text-white font-bold text-lg mb-4">
            Impacto nas Famílias Brasileiras
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-green-400 font-bold text-2xl">12.847</div>
              <div className="text-gray-400 text-sm">Famílias beneficiadas</div>
            </div>
            <div>
              <div className="text-green-400 font-bold text-2xl">R$ 3BM</div>
              <div className="text-gray-400 text-sm">Distribuídos em 2024</div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-lg text-lg"
        >
          GARANTIR MINHA VAGA AGORA
        </Button>

        <p className="text-gray-500 text-xs text-center mt-4">
          Clique para prosseguir e validar sua conta na área de saque.
        </p>
      </div>
    </div>
  );
};

export default Depoimentos;
