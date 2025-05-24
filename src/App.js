import React, { useState, useEffect } from 'react';
import mockMessages from './mock/messages';
import ReceptionistView from './components/ReceptionistView';
import AdminView from './components/AdminView';
import AuthModal from './components/AuthModal';

const App = () => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('cashflow-reports');
    return savedMessages ? JSON.parse(savedMessages) : mockMessages;
  });
  const [view, setView] = useState('home'); // 'home', 'receptionist', 'admin'
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('TODAS');
  const [dateFilter, setDateFilter] = useState('');

  // Cargar datos iniciales
  useEffect(() => {
    localStorage.setItem('cashflow-reports', JSON.stringify(messages));
  }, [messages]);

  const handleSendReport = (newReport) => {
    const reportWithSafeLocation = {
      ...newReport,
      location: newReport.location || { 
        id: 0, 
        name: 'Sin sede', 
        color: 'bg-gray-100 text-gray-800' 
      }
    };
    const updatedMessages = [{ ...reportWithSafeLocation, id: Date.now() }, ...messages];
    setMessages(updatedMessages);
    setView('home');
  };

  const handleAdminAccess = () => {
    setView('admin');
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setView('home');
  };

  const filteredMessages = messages.filter(msg => {
    const locationMatch = selectedLocation === 'TODAS' 
      ? true 
      : msg.location?.name === selectedLocation;
    
    const dateMatch = !dateFilter 
      ? true 
      : new Date(msg.date).toLocaleDateString() === new Date(dateFilter).toLocaleDateString();
    
    return locationMatch && dateMatch;
  });

  const clearFilters = () => {
    setSelectedLocation('TODAS');
    setDateFilter('');
  };

  const HomeScreen = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">CASHFLOW PRO</h1>
        <div className="space-y-4">
          <button
            onClick={() => setView('receptionist')}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
          >
            MODO RECEPCIONISTA
          </button>
          <button
            onClick={() => setShowAuthModal(true)}
            className="w-full px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-lg font-medium"
          >
            MODO ADMINISTRADOR
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {view === 'home' && <HomeScreen />}
      
      {view === 'receptionist' && (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
          <div className="max-w-md mx-auto">
            <button
              onClick={() => setView('home')}
              className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium"
            >
              VOLVER AL INICIO
            </button>
            <ReceptionistView onSendReport={handleSendReport} />
          </div>
        </div>
      )}

      {view === 'admin' && (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h1 className="text-3xl font-bold text-gray-800">PANEL ADMINISTRADOR</h1>
              
              <div className="flex flex-col md:flex-row gap-3">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="TODAS">TODAS LAS SEDES</option>
                  <option value="ATLANTIS">ATLANTIS</option>
                  <option value="IBIZA">IBIZA</option>
                  <option value="BLESS">BLESS</option>
                  <option value="Sin sede">SIN SEDE</option>
                </select>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                >
                  LIMPIAR
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                >
                  SALIR
                </button>
              </div>
            </div>
            <AdminView messages={filteredMessages} />
          </div>
        </div>
      )}

      {showAuthModal && (
        <AuthModal 
          onAuthenticate={handleAdminAccess} 
          onClose={() => setShowAuthModal(false)} 
        />
      )}
    </div>
  );
};

export default App;