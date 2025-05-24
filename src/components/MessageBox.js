import React from 'react';

const MessageBox = ({ location, payments, expenses, sender, date, shift, notes }) => {
  // Validación segura para location
  const safeLocation = location || { 
    name: 'Sede no especificada', 
    color: 'bg-gray-100 text-gray-800' 
  };

  // Cálculo de totales con validación
  const totalPayments = payments?.reduce((sum, payment) => sum + (payment.amount || 0), 0) || 0;
  const totalExpenses = expenses?.reduce((sum, expense) => sum + (expense.amount || 0), 0) || 0;
  const netAmount = totalPayments - totalExpenses;

  return (
    <div className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow mb-4 border-l-4" 
         style={{ borderColor: safeLocation.color.replace('bg-', '').replace('-100', '') }}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            <span className={`px-2 py-1 rounded-full ${safeLocation.color} text-xs mr-2`}>
              {safeLocation.name}
            </span>
            Turno: {shift}
          </h3>
          <p className="text-sm text-gray-600">{sender}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">{new Date(date).toLocaleDateString()}</p>
          <p className={`text-sm font-medium ${netAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            Neto: ${Math.abs(netAmount).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mb-3">
        <h4 className="text-sm font-medium text-gray-700 mb-1">Pagos</h4>
        <div className="space-y-1">
          {payments?.map((payment, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-xs text-gray-600">{payment.method?.name || 'Método no especificado'}</span>
              <span className="text-sm">${(payment.amount || 0).toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between border-t pt-1">
            <span className="text-sm font-medium">Total Pagos:</span>
            <span className="text-sm font-medium">${totalPayments.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {expenses?.length > 0 && (
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Gastos</h4>
          <div className="space-y-1">
            {expenses.map((expense, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-xs text-gray-600">{expense.type?.name || 'Tipo no especificado'}: {expense.description}</span>
                <span className="text-sm text-red-600">-${(expense.amount || 0).toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between border-t pt-1">
              <span className="text-sm font-medium">Total Gastos:</span>
              <span className="text-sm font-medium text-red-600">-${totalExpenses.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {notes && (
        <div className="mt-2 pt-2 border-t">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Notas del turno</h4>
          <p className="text-sm text-gray-600">{notes}</p>
        </div>
      )}
    </div>
  );
};

export default MessageBox;