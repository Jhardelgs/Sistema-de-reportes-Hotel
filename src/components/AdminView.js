import React from 'react';
import MessageBox from './MessageBox';
import ReportSummary from './ReportSummary';

const AdminView = ({ messages }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Resumen General</h2>
        <p className="text-sm text-gray-600">
          Mostrando {messages.length} reporte{messages.length !== 1 ? 's' : ''}
        </p>
      </div>

      <ReportSummary messages={messages} />
      
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Detalle de Turnos</h2>
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No hay reportes registrados</p>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBox key={message.id} {...message} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminView;