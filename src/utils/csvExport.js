/**
 * Utility to export tabular JSON records to a downloadable CSV file.
 * @param {Array<Object>} data Array of objects to export.
 * @param {string} filename Output file name.
 */
export const exportToCSV = (data, filename = 'report-export.csv') => {
  if (!data || !data.length) {
    console.warn('Export warning: No data available to compile CSV.');
    return;
  }
  
  const headers = Object.keys(data[0]);
  const csvRows = [];
  
  // Compile headers row
  csvRows.push(headers.map(h => `"${h.toUpperCase()}"`).join(','));
  
  // Compile record rows
  for (const row of data) {
    const values = headers.map(header => {
      const val = row[header] === null || row[header] === undefined ? '' : row[header];
      const escaped = ('' + val).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }
  
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
