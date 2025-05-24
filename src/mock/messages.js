import locations from './locations';
import paymentMethods from './paymentMethods';
import expenseTypes from './expenseTypes';

const mockMessages = [
  {
    id: 1,
    location: locations[0] || { 
      id: 1, 
      name: 'ATLANTIS', 
      color: 'bg-blue-100 text-blue-800' 
    },
    payments: [
      { method: paymentMethods[0], amount: 1500 },
      { method: paymentMethods[1], amount: 800 }
    ],
    expenses: [
      { type: expenseTypes[0], amount: 200, description: "Materiales" }
    ],
    sender: "Recepcionista 1",
    date: "2023-05-15T10:30:00",
    shift: "Mañana",
    notes: "Todo normal"
  }
];

export default mockMessages;


// DONE