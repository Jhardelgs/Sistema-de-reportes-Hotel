import React, { useEffect, useState } from 'react';
import MessageBox from './MessageBox';
import ReportSummary from './ReportSummary';
import { supabase } from '../supabaseClient';
import * as XLSX from 'xlsx';

const AdminPage = () => {
  const [messages, setMessages] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('TODAS');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase
        .from('reportes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error al cargar reportes:', error);
        return;
      }

      const formatted = data.map((row) => {
        const location = {
          name: row.sede || 'Sin sede',
          color: 'bg-blue-100 text-blue-800',
        };

        const payments = [
          { method: { name: 'Efectivo' }, amount: Number(row.efectivo) || 0 },
          { method: { name: 'Visa' }, amount: Number(row.visa) || 0 },
          { method: { name: 'MC' }, amount: Number(row.mc) || 0 },
          { method: { name: 'Yape' }, amount: Number(row.yape) || 0 },
          { method: { name: 'Transf' }, amount: Number(row.transf) || 0 },
        ].filter(p => p.amount > 0);

        const expenses = row.gasto_monto > 0 ? [
          {
            type: { name: row.tipo_gasto || 'OTROS' },
            amount: Number(row.gasto_monto) || 0,
            description: row.descripcion || '',
          },
        ] : [];

        return {
          id: row.id,
          location,
          payments,
          expenses,
          sender: row.recepcionista,
          date: row.created_at,
          shift: row.turno,
          notes: row.notas,
        };
      });

      setMessages(formatted);
    };

    fetchReports();
  }, []);

  const filteredMessages = messages.filter((msg) => {
    const locationMatch = selectedLocation === 'TODAS' || msg.location.name === selectedLocation;
    const dateMatch = !dateFilter || new Date(msg.date).toLocaleDateString() === new Date(dateFilter).toLocaleDateString();
    return locationMatch && dateMatch;
  });

  const exportReportsToExcel = () => {
    const rows = filteredMessages.map((r) => ({
      Fecha: new Date(r.date).toLocaleString(),
      Sede: r.location?.name || 'Sin sede',
      Turno: r.shift,
      Recepcionista: r.sender,
      'Notas del turno': r.notes || '',
      Ingreso: r.payments?.reduce((sum, p) => sum + (p.amount || 0), 0),
      Gasto: r.expenses?.reduce((sum, e) => sum + (e.amount || 0), 0),
      Neto:
        r.payments?.reduce((sum, p) => sum + (p.amount || 0), 0) -
        r.expenses?.reduce((sum, e) => sum + (e.amount || 0), 0),
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reportes');

    const sede = selectedLocation !== 'TODAS' ? selectedLocation : 'TODAS';
    const fecha = dateFilter ? new Date(dateFilter).toLocaleDateString('sv') : 'completo';
    const nombreArchivo = `reportes_${sede}_${fecha}.xlsx`;

    XLSX.writeFile(workbook, nombreArchivo);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
          <h2 className="text-xl font-bold text-gray-800">Resumen General</h2>
          <div className="flex flex-col md:flex-row gap-2">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={exportReportsToExcel}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              EXPORTAR
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Mostrando {filteredMessages.length} reporte{filteredMessages.length !== 1 ? 's' : ''}
        </p>
      </div>

      <ReportSummary messages={filteredMessages} />

      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Detalle de Turnos</h2>
        {filteredMessages.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No hay reportes registrados</p>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <MessageBox key={message.id} {...message} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
