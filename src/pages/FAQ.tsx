
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import QuizLayout from '@/components/QuizLayout';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (item: string) => {
    setOpenItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const faqItems = [
    {
      id: 'what-is-spotify-avalia',
      question: 'O que é o Spotify Avalia?',
      answer: 'Spotify Avalia é uma plataforma em colaboração com o Spotify onde você pode ganhar dinheiro respondendo pesquisas sobre artistas e suas músicas.'
    },
    {
      id: 'withdrawal-fee',
      question: 'Como funciona a taxa de saque?',
      answer: 'Para garantir a segurança das transações, existe uma taxa única de verificação que é cobrada apenas no primeiro saque. Após essa verificação inicial, todos os saques posteriores são totalmente gratuitos.'
    },
    {
      id: 'how-to-earn',
      question: 'Como ganho dinheiro?',
      answer: 'Você ganha dinheiro ao responder pesquisas sobre artistas. Cada pesquisa completa te recompensa com valores entre U$5 e U$15.'
    },
    {
      id: 'how-to-withdraw',
      question: 'Como posso sacar meu dinheiro?',
      answer: 'Você pode solicitar um saque na página de Saque. Os valores são transferidos para a conta bancária cadastrada via pix.'
    },
    {
      id: 'data-security',
      question: 'Meus dados fornecidos estão em segurança?',
      answer: 'Sim, todos os dados fornecidos são tratados com segurança e confidencialidade de acordo com nossa política de privacidade.'
    },
    {
      id: 'survey-frequency',
      question: 'Com que frequência posso responder as pesquisas?',
      answer: 'Novas pesquisas são disponibilizadas a cada 24 horas. Fique atento ao aplicativo para maximizar seus ganhos.'
    }
  ];

  return (
    <QuizLayout showProgress={false}>
      <div>
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Perguntas Frequentes
        </h1>
        
        <div className="space-y-4">
          {faqItems.map((item) => (
            <Collapsible key={item.id}>
              <CollapsibleTrigger
                onClick={() => toggleItem(item.id)}
                className="w-full bg-gray-800 hover:bg-gray-700 p-4 rounded-lg text-left flex items-center justify-between transition-colors"
              >
                <span className="font-medium text-white">{item.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-white transition-transform ${
                    openItems.includes(item.id) ? 'rotate-180' : ''
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 py-3 text-blue-400 bg-gray-900 rounded-b-lg">
                {item.answer}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </QuizLayout>
  );
};

export default FAQ;
