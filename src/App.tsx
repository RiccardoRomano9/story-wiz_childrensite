import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import StoryCreator from './pages/StoryCreator';
import StoryViewer from './pages/StoryViewer';
import { StoryProvider } from './context/StoryContext';

function App() {
  return (
    <StoryProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-purple-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<StoryCreator />} />
            <Route path="/story" element={<StoryViewer />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </StoryProvider>
  );
}

export default App;