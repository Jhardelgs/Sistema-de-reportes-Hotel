import React, { useState } from 'react';

const ExpenseInput = ({ types, onAddExpense }) => {
  const [selectedType, setSelectedType] = useState(types[0].id);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    
    const type = types.find(t => t.id === Number(selectedType));
    onAddExpense({ type, amount: Number(amount), description });
    setAmount('');
    setDescription('');
  };

  return (
    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Agregar Gasto</h3>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
          >
            {types.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Monto"
          />
        </div>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          placeholder="Descripción"
        />
        <button
          type="submit"
          className="w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Agregar Gasto
        </button>
      </form>
    </div>
  );
};

export default ExpenseInput;