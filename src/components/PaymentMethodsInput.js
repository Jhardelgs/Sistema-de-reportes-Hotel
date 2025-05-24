import React from 'react';

const PaymentMethodsInput = ({ methods, values, onChange }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-700">Métodos de Pago</h3>
      {methods.map(method => (
        <div key={method.id} className="flex items-center gap-3">
          <span className="w-20 text-sm text-gray-600">{method.shortName}</span>
          <input
            type="number"
            value={values[method.id] || ''}
            onChange={(e) => onChange(method.id, e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="0.00"
          />
        </div>
      ))}
    </div>
  );
};

export default PaymentMethodsInput;