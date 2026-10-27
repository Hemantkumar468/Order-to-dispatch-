import React from 'react';
import * as XLSX from 'xlsx';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Excel export
export const exportToExcel = (data, fileName = 'report.xlsx') => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, fileName);
};

// PDF styles
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10 },
  title: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  table: { display: 'flex', flexDirection: 'column', marginTop: 10 },
  row: { flexDirection: 'row', borderBottom: '1px solid #ccc', paddingVertical: 6 },
  headerRow: { flexDirection: 'row', backgroundColor: '#f0f0f0', paddingVertical: 8, fontWeight: 'bold' },
  cell: { flex: 1, paddingRight: 5 },
});

export const exportToPDF = async (data, title, columns) => {
  const MyDocument = () =>
    React.createElement(Document, null,
      React.createElement(Page, { size: 'A4', style: styles.page },
        React.createElement(Text, { style: styles.title }, title),
        React.createElement(View, { style: styles.table },
          React.createElement(View, { style: styles.headerRow },
            columns.map((col) => React.createElement(Text, { key: col.field, style: styles.cell }, col.headerName))
          ),
          data.map((row, idx) =>
            React.createElement(View, { key: idx, style: styles.row },
              columns.map((col) => React.createElement(Text, { key: col.field, style: styles.cell }, row[col.field] || '-'))
            )
          )
        )
      )
    );
  const blob = await pdf(React.createElement(MyDocument)).toBlob();
  saveAs(blob, `${title}.pdf`);
};