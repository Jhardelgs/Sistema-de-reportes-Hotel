import React, { useState } from 'react';

const PaymentInput = ({ methods, onAddPayment }) => {
  const [selectedMethod, setSelectedMethod] = useState(methods[0].id);
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    
    const method = methods.find(m => m.id === Number(selectedMethod));
    onAddPayment({ method, amount: Number(amount) });
    setAmount('');
  };

  return (
    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Agregar Pago</h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <select
          value={selectedMethod}
          onChange={(e) => setSelectedMethod(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
        >
          {methods.map(method => (
            <option key={method.id} value={method.id}>{method.name}</option>
          ))}
        </select>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
          placeholder="Monto"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          +
        </button>
      </form>
    </div>
  );
};

export default PaymentInput;