const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const csvPath = path.resolve(__dirname, '../../docs/test_tariff_history_5_rounds.csv');
const xlsxPath = path.resolve(__dirname, '../../docs/test_tariff_history_5_rounds.xlsx');

function main() {
  if (!fs.existsSync(csvPath)) {
    console.error('CSV not found at', csvPath);
    process.exit(1);
  }
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const workbook = xlsx.read(csvContent, { type: 'string' });
  // Rename first sheet to a friendly name if present
  const firstName = workbook.SheetNames[0];
  if (firstName && firstName !== 'Tariff History') {
    const ws = workbook.Sheets[firstName];
    delete workbook.Sheets[firstName];
    workbook.SheetNames[0] = 'Tariff History';
    workbook.Sheets['Tariff History'] = ws;
  }
  xlsx.writeFile(workbook, xlsxPath);
  console.log('Wrote', xlsxPath);
}

main();