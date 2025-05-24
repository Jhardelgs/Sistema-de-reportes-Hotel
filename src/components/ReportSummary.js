import React from 'react';

const ReportSummary = ({ messages }) => {
  // Validación segura para mensajes
  const validMessages = messages.map(msg => ({
    ...msg,
    location: msg.location || { 
      id: 0, 
      name: 'Sin sede', 
      color: 'bg-gray-100 text-gray-800' 
    },
    payments: msg.payments || [],
    expenses: msg.expenses || []
  }));

  // Cálculo de totales con validación
  const summaryByLocation = validMessages.reduce((acc, msg) => {
    const locId = msg.location.id;
    if (!acc[locId]) {
      acc[locId] = {
        location: msg.location,
        payments: 0,
        expenses: 0,
        count: 0
      };
    }
    
    const paymentsTotal = msg.payments.reduce((sum, p) => sum + (p.amount || 0), 0);
    const expensesTotal = msg.expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
    
    acc[locId].payments += paymentsTotal;
    acc[locId].expenses += expensesTotal;
    acc[locId].count += 1;
    
    return acc;
  }, {});

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Resumen por Sede</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.values(summaryByLocation).map((locData, index) => {
          const netTotal = locData.payments - locData.expenses;
          return (
            <div key={index} className={`p-3 rounded-lg border-l-4 ${locData.location.color || 'bg-gray-100'}`}>
              <h3 className="font-semibold text-gray-800">{locData.location.name}</h3>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm">Turnos:</span>
                  <span className="text-sm font-medium">{locData.count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Ingresos:</span>
                  <span className="text-sm font-medium">${locData.payments.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Gastos:</span>
                  <span className="text-sm font-medium text-red-600">-${locData.expenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-1">
                  <span className="text-sm font-medium">Neto:</span>
                  <span className={`text-sm font-medium ${netTotal >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${Math.abs(netTotal).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReportSummary;


// DONE