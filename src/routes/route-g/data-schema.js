const csv = '
  title, value, value, value, value, //add csv columns values
  title, value, value, value, value, //add csv columns values
  title, value, value, value, value, //add csv columns values
  title, value, value, value, value, //add csv columns values
  //add additional csv rows
'

const data = [
  'number',
  'number',
  'number',
  'number',
  //add additional dates based on numer of csv values
]

    
//const formattedDates = dates.map((el) => new Date(el));
//
//const seriesData = csv.split('
//').map(row => {
//  const rowData = row.split(',');
//  return { name: rowData[0], values: rowData.slice(1) };
//});
//
//export default {
//  'dates': formattedDates,
//  'series': seriesData
//}; 