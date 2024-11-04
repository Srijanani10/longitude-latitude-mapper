// src/FileUpload.js

import React from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

const FileUpload = ({ onDataProcessed }) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        const extension = file.name.split('.').pop().toLowerCase();
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = e.target.result;

            if (extension === 'xlsx' || extension === 'xls') {
                const workbook = XLSX.read(data, { type: 'binary' });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(firstSheet);
                onDataProcessed(jsonData);
            } else if (extension === 'csv') {
                Papa.parse(data, {
                    complete: (results) => {
                        onDataProcessed(results.data);
                    },
                    header: true,
                });
            }
        };

        reader.readAsBinaryString(file);
    };

    return (
        <div>
            <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} />
        </div>
    );
};

export default FileUpload;
