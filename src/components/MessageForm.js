import React, { useState } from 'react';

const MessageForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [sender, setSender] = useState('');
  const [shift, setShift] = useState('Mañana');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !sender) return;
    
    const newMessage = {
      amount: Number(amount),
      sender,
      date: new Date().toISOString(),
      shift
    };
    
    onSubmit(newMessage);
    setAmount('');
    setSender('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Registrar Monto</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ingrese el monto"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Su nombre"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Turno</label>
          <select
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Noche">Noche</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Enviar Monto
        </button>
      </div>
    </form>
  );
};

export default MessageForm;