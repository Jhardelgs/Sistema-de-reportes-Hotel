import React, { useState } from 'react';
import PaymentMethodsInput from './PaymentMethodsInput';
import paymentMethods from '../mock/paymentMethods';
import locations from '../mock/locations';

const expenseTypes = [
  { id: 1, name: 'SERVICIOS' },
  { id: 2, name: 'MANTENIMIENTO' },
  { id: 3, name: 'INSUMOS' },
  { id: 4, name: 'OTROS' }
];

const ReceptionistView = ({ onSendReport }) => {
  const [paymentValues, setPaymentValues] = useState({});
  const [selectedExpenseType, setSelectedExpenseType] = useState(expenseTypes[0].id);
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(locations[0].id);
  const [sender, setSender] = useState('');
  const [shift, setShift] = useState('MAÑANA');
  const [notes, setNotes] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePaymentChange = (methodId, value) => {
    setPaymentValues({
      ...paymentValues,
      [methodId]: value
    });
  };

  const handleClearForm = () => {
    setPaymentValues({});
    setSelectedExpenseType(expenseTypes[0].id);
    setExpenseAmount('');
    setExpenseDescription('');
    setSender('');
    setNotes('');
    setSuccessMessage('');
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value.toUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const location = locations.find(l => l.id === Number(selectedLocation));
    const payments = paymentMethods
      .filter(method => paymentValues[method.id] && paymentValues[method.id] > 0)
      .map(method => ({
        method,
        amount: Number(paymentValues[method.id])
      }));
    
    const expenses = [];
    if (expenseAmount && expenseAmount > 0) {
      const expenseType = expenseTypes.find(et => et.id === Number(selectedExpenseType));
      expenses.push({
        type: expenseType || { id: Date.now(), name: 'OTROS' },
        amount: Number(expenseAmount),
        description: expenseDescription
      });
    }

    if (payments.length === 0 || !sender) return;
    
    const newReport = {
      location,
      payments,
      expenses,
      sender,
      date: new Date().toISOString(),
      shift,
      notes
    };
    
    onSendReport(newReport);
    setSuccessMessage('REPORTE ENVIADO CORRECTAMENTE');
    setTimeout(() => setSuccessMessage(''), 3000);
    handleClearForm();
  };

  const hasPayments = Object.values(paymentValues).some(val => val && val > 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">REGISTRO DE TURNO</h1>
        {successMessage && (
          <div className="mt-2 p-2 bg-green-100 text-green-800 rounded-lg font-medium">
            {successMessage}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SEDE</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
              required
            >
              {locations.map(location => (
                <option key={location.id} value={location.id}>{location.name}</option>
              ))}
            </select>
          </div>

          <PaymentMethodsInput 
            methods={paymentMethods} 
            values={paymentValues} 
            onChange={handlePaymentChange} 
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">GASTOS DEL TURNO (OPCIONAL)</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">TIPO DE GASTO</label>
            <select
              value={selectedExpenseType}
              onChange={(e) => setSelectedExpenseType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
            >
              {expenseTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">MONTO</label>
            <input
              type="number"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">DESCRIPCIÓN</label>
            <input
              type="text"
              value={expenseDescription}
              onChange={handleInputChange(setExpenseDescription)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
              placeholder="BREVE DESCRIPCIÓN"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NOMBRE DEL RECEPCIONISTA</label>
            <input
              type="text"
              value={sender}
              onChange={handleInputChange(setSender)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
              placeholder="NOMBRE COMPLETO"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">TURNO</label>
            <select
              value={shift}
              onChange={(e) => setShift(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
            >
              <option value="MAÑANA">MAÑANA</option>
              <option value="TARDE">TARDE</option>
              <option value="NOCHE">NOCHE</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NOTAS DEL TURNO</label>
            <textarea
              value={notes}
              onChange={handleInputChange(setNotes)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
              rows="2"
              placeholder="OBSERVACIONES, INCIDENTES, ETC."
            ></textarea>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleClearForm}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium"
          >
            LIMPIAR
          </button>
          <button
            type="submit"
            disabled={!hasPayments}
            className={`flex-1 px-4 py-2 rounded-lg font-medium text-white ${hasPayments ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            ENVIAR REPORTE
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReceptionistView;


// DONE