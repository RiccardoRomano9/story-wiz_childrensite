import React, { createContext, useState, useContext, ReactNode } from 'react';

interface StoryContextType {
  storyData: {
    protagonistName: string;
    storyType: string;
    location: string;
    superpower: string;
    villain: string;
    additionalNotes: string;
    generatedStory: string;
  };
  setStoryData: React.Dispatch<React.SetStateAction<{
    protagonistName: string;
    storyType: string;
    location: string;
    superpower: string;
    villain: string;
    additionalNotes: string;
    generatedStory: string;
  }>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  generateStory: () => Promise<void>;
}

const defaultStoryData = {
  protagonistName: '',
  storyType: '',
  location: '',
  superpower: '',
  villain: '',
  additionalNotes: '',
  generatedStory: '',
};

const StoryContext = createContext<StoryContextType>({
  storyData: defaultStoryData,
  setStoryData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  generateStory: async () => {},
});

export const useStory = () => useContext(StoryContext);

interface StoryProviderProps {
  children: ReactNode;
}

export const StoryProvider = ({ children }: StoryProviderProps) => {
  const [storyData, setStoryData] = useState(defaultStoryData);
  const [isLoading, setIsLoading] = useState(false);

  const generateStory = async () => {
    setIsLoading(true);
    try {
      const prompt = `Crea una storia ${storyData.storyType.toLowerCase()} per bambini su un personaggio chiamato ${storyData.protagonistName} che ha il superpotere di ${storyData.superpower}. La storia è ambientata in ${storyData.location} e il cattivo della storia è ${storyData.villain}. ${storyData.additionalNotes}. Rendi la storia coinvolgente, adatta all'età e di circa 300-400 parole con un chiaro inizio, sviluppo e fine.`;
      
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY || ''}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'StoryWiz',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat:free',
          messages: [
            { role: 'system', content: 'Sei un narratore creativo per bambini. Crea storie coinvolgenti e appropriate per l\'età con messaggi positivi. Rispondi in italiano.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error('Errore nella generazione della storia');
      }

      const data = await response.json();
      const generatedStory = data.choices[0]?.message?.content || 'C\'era una volta...';

      setStoryData(prev => ({
        ...prev,
        generatedStory
      }));
    } catch (error) {
      console.error('Errore nella generazione della storia:', error);
      setStoryData(prev => ({
        ...prev,
        generatedStory: `C'era una volta un personaggio chiamato ${storyData.protagonistName} che partì per un'avventura incredibile. Purtroppo, il nostro narratore sta facendo un pisolino in questo momento. Per favore, riprova più tardi!`
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StoryContext.Provider value={{ 
      storyData, 
      setStoryData, 
      isLoading, 
      setIsLoading,
      generateStory
    }}>
      {children}
    </StoryContext.Provider>
  );
};