
import { useState, useEffect } from 'react';

interface QuizState {
  currentArtistIndex: number;
  allAnswers: any[];
  currentAnswers: {
    rating: string;
    recommendation: string;
    ageGroup: string;
  };
  hasStarted: boolean;
}

const defaultQuizState: QuizState = {
  currentArtistIndex: 0,
  allAnswers: [],
  currentAnswers: {
    rating: '',
    recommendation: '',
    ageGroup: ''
  },
  hasStarted: false
};

export const useQuizState = () => {
  const [quizState, setQuizState] = useState<QuizState>(defaultQuizState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setQuizState(parsedState);
      } catch (error) {
        console.log('Failed to load quiz state:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('quizState', JSON.stringify(quizState));
    }
  }, [quizState, isLoaded]);

  const updateQuizState = (updates: Partial<QuizState>) => {
    setQuizState(prev => ({ ...prev, ...updates }));
  };

  const resetQuizState = () => {
    setQuizState(defaultQuizState);
    localStorage.removeItem('quizState');
  };

  return {
    quizState,
    updateQuizState,
    resetQuizState,
    isLoaded
  };
};
