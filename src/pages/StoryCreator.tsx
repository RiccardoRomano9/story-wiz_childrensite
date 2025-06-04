import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2, BookOpen, Map, Sparkles, PenTool, Rocket, Ghost, Sword, HeartHandshake } from 'lucide-react';
import { useStory } from '../context/StoryContext';

const storyTypes = [
  { id: 'fantasy', name: 'Fantasia', icon: <Sparkles size={24} /> },
  { id: 'adventure', name: 'Avventura', icon: <Map size={24} /> },
  { id: 'action', name: 'Azione', icon: <Sword size={24} /> },
  { id: 'mystery', name: 'Mistero', icon: <Ghost size={24} /> },
  { id: 'scifi', name: 'Fantascienza', icon: <Rocket size={24} /> },
  { id: 'friendship', name: 'Amicizia', icon: <HeartHandshake size={24} /> },
];

const StoryCreator = () => {
  const { storyData, setStoryData, isLoading, generateStory } = useStory();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{
    protagonistName?: string;
    storyType?: string;
    location?: string;
    superpower?: string;
    villain?: string;
    age?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: {
      protagonistName?: string;
      storyType?: string;
      location?: string;
      superpower?: string;
      villain?: string;
      age?: string;
    } = {};
    
    if (!storyData.protagonistName.trim()) {
      newErrors.protagonistName = 'Inserisci il nome del personaggio';
    }
    
    if (!storyData.storyType) {
      newErrors.storyType = 'Seleziona un tipo di storia';
    }

    if (!storyData.location.trim()) {
      newErrors.location = 'Inserisci il luogo della storia';
    }

    if (!storyData.superpower.trim()) {
      newErrors.superpower = 'Inserisci il superpotere desiderato';
    }

    if (!storyData.villain.trim()) {
      newErrors.villain = 'Inserisci il nome del cattivo';
    }

    if (!storyData.age || storyData.age < 3 || storyData.age > 12) {
      newErrors.age = 'Inserisci un\'età valida (3-12 anni)';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    await generateStory();
    navigate('/story');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoryData(prev => ({ 
      ...prev, 
      [name]: name === 'age' ? parseInt(value) || '' : value 
    }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleStoryTypeSelect = (type: string) => {
    setStoryData(prev => ({ ...prev, storyType: type }));
    
    if (errors.storyType) {
      setErrors(prev => ({ ...prev, storyType: undefined }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Crea la Tua Storia</h1>
        <p className="text-gray-600">
          Raccontaci della tua storia e il nostro mago dell'IA la renderà realtà!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
        <div className="mb-6">
          <label htmlFor="age" className="block text-gray-700 font-medium mb-2">
            Quanti anni ha il bambino?
          </label>
          <input
            type="number"
            id="age"
            name="age"
            min="3"
            max="12"
            value={storyData.age}
            onChange={handleInputChange}
            placeholder="Età (3-12 anni)"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
              errors.age ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.age && (
            <p className="mt-1 text-red-500 text-sm">{errors.age}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="protagonistName" className="block text-gray-700 font-medium mb-2">
            Chi è il protagonista?
          </label>
          <div className="relative">
            <input
              type="text"
              id="protagonistName"
              name="protagonistName"
              value={storyData.protagonistName}
              onChange={handleInputChange}
              placeholder="Inserisci il nome del personaggio"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
                errors.protagonistName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <PenTool size={20} className="absolute right-3 top-3.5 text-gray-400" />
          </div>
          {errors.protagonistName && (
            <p className="mt-1 text-red-500 text-sm">{errors.protagonistName}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Che tipo di storia vuoi?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {storyTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => handleStoryTypeSelect(type.name)}
                className={`p-4 rounded-lg border transition-all flex flex-col items-center justify-center gap-2 hover:border-purple-500 ${
                  storyData.storyType === type.name
                    ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-500'
                    : 'border-gray-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  storyData.storyType === type.name
                    ? 'bg-purple-100 text-purple-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {type.icon}
                </div>
                <span className={`font-medium ${
                  storyData.storyType === type.name
                    ? 'text-purple-700'
                    : 'text-gray-700'
                }`}>
                  {type.name}
                </span>
              </button>
            ))}
          </div>
          {errors.storyType && (
            <p className="mt-1 text-red-500 text-sm">{errors.storyType}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
            Dove si svolge la storia?
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={storyData.location}
            onChange={handleInputChange}
            placeholder="Es: un castello incantato, una galassia lontana..."
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
              errors.location ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.location && (
            <p className="mt-1 text-red-500 text-sm">{errors.location}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="superpower" className="block text-gray-700 font-medium mb-2">
            Quale superpotere ha il protagonista?
          </label>
          <input
            type="text"
            id="superpower"
            name="superpower"
            value={storyData.superpower}
            onChange={handleInputChange}
            placeholder="Es: volare, diventare invisibile, parlare con gli animali..."
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
              errors.superpower ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.superpower && (
            <p className="mt-1 text-red-500 text-sm">{errors.superpower}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="villain" className="block text-gray-700 font-medium mb-2">
            Chi è il cattivo della storia?
          </label>
          <input
            type="text"
            id="villain"
            name="villain"
            value={storyData.villain}
            onChange={handleInputChange}
            placeholder="Es: un drago malvagio, uno scienziato pazzo..."
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors ${
              errors.villain ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.villain && (
            <p className="mt-1 text-red-500 text-sm">{errors.villain}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="additionalNotes" className="block text-gray-700 font-medium mb-2">
            Hai qualche idea speciale? (opzionale)
          </label>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            value={storyData.additionalNotes}
            onChange={handleInputChange}
            placeholder="La storia dovrebbe includere una foresta magica, un animale parlante, ecc."
            className="w-full p-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-transform hover:scale-105 flex items-center justify-center gap-2 ${
            isLoading
              ? 'bg-purple-400 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              Creazione in Corso...
            </>
          ) : (
            <>
              <Wand2 size={20} />
              Crea la Mia Storia
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default StoryCreator;