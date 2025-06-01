import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, BookOpen, Wand2 } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center">
      <section className="max-w-4xl text-center mb-16 mt-8">
        <div className="inline-block bg-purple-100 p-2 px-4 rounded-full text-purple-700 font-medium mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={16} />
            <span>Libera la tua immaginazione</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Crea Storie Magiche con l'IA!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          StoryWiz ti aiuta a creare storie incredibili su qualsiasi cosa tu possa immaginare.
          Raccontaci qualche dettaglio e il nostro mago dell'IA creerà una storia unica solo per te!
        </p>
        <Link 
          to="/create"
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-transform hover:scale-105 inline-flex items-center gap-2"
        >
          <Wand2 size={20} />
          Inizia a Creare
        </Link>
      </section>

      <section className="w-full max-w-4xl mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
          Come Funziona
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <BookOpen className="text-purple-600" />,
              title: "Scegli la Tua Avventura",
              description: "Seleziona che tipo di storia vuoi creare - fantasia, azione, avventura e molto altro!"
            },
            {
              icon: <Wand2 className="text-purple-600" />,
              title: "Aggiungi i Dettagli",
              description: "Raccontaci del tuo personaggio principale, dell'ambientazione e delle tue idee speciali."
            },
            {
              icon: <Sparkles className="text-purple-600" />,
              title: "Goditi la Tua Storia",
              description: "Il nostro mago dell'IA creerà una storia unica solo per te in pochi secondi!"
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-4xl mb-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Pronto a Creare la Tua Storia?</h2>
          <p className="mb-6">
            Lascia correre la tua immaginazione e crea storie su eroi coraggiosi, mondi magici o avventure emozionanti!
          </p>
          <Link 
            to="/create"
            className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full text-lg font-medium transition-transform hover:scale-105 inline-flex items-center gap-2"
          >
            <Wand2 size={20} />
            Crea Ora
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;