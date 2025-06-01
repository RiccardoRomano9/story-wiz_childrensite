import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Share2, BookOpen, ArrowLeft, Wand2 } from 'lucide-react';
import { useStory } from '../context/StoryContext';

const StoryViewer = () => {
  const { storyData, isLoading } = useStory();
  const navigate = useNavigate();

  useEffect(() => {
    if (!storyData.generatedStory && !isLoading) {
      navigate('/create');
    }
  }, [storyData, isLoading, navigate]);

  const downloadStory = () => {
    const element = document.createElement('a');
    const title = `La Storia di ${storyData.protagonistName} - ${storyData.storyType}`;
    const file = new Blob([title + '\n\n' + storyData.generatedStory], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = title.replace(/\s+/g, '_') + '.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const shareStory = () => {
    if (navigator.share) {
      navigator.share({
        title: `La Storia di ${storyData.protagonistName} - ${storyData.storyType}`,
        text: storyData.generatedStory,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(storyData.generatedStory).then(() => {
        alert('Storia copiata negli appunti!');
      }).catch(console.error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin h-12 w-12 border-4 border-purple-500 border-t-transparent rounded-full mb-4"></div>
        <p className="text-xl text-gray-700">Creazione della tua storia magica in corso...</p>
      </div>
    );
  }

  const formattedStory = storyData.generatedStory.split('\n\n').map((paragraph, index) => (
    <p key={index} className="mb-4">{paragraph}</p>
  ));

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/create')}
          className="flex items-center gap-1 text-purple-600 hover:text-purple-800 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Torna al Creatore</span>
        </button>
        <div className="flex gap-2">
          <button
            onClick={downloadStory}
            className="flex items-center gap-1 bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
            title="Scarica Storia"
          >
            <Download size={18} className="text-purple-600" />
          </button>
          <button
            onClick={shareStory}
            className="flex items-center gap-1 bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
            title="Condividi Storia"
          >
            <Share2 size={18} className="text-purple-600" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
          <div className="flex items-center justify-center gap-2 text-white mb-2">
            <BookOpen size={24} />
            <h1 className="text-2xl font-bold">La Tua Storia</h1>
          </div>
          <h2 className="text-center text-white text-xl">
            L'Avventura di {storyData.protagonistName} - {storyData.storyType}
          </h2>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="prose prose-purple max-w-none">
            {formattedStory}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">Vuoi creare un'altra storia magica?</p>
        <button
          onClick={() => navigate('/create')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-lg font-medium transition-transform hover:scale-105 inline-flex items-center gap-2"
        >
          <Wand2 size={20} />
          Crea Nuova Storia
        </button>
      </div>
    </div>
  );
};

export default StoryViewer;