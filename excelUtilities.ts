import ExcelJS from 'exceljs';

export interface TestExcelRow {
    key: string;
    name: string;
    status: string;
    precondition: string;
    objective: string;
    folder: string;
    priority: string;
    component: string;
    labels: string;
    owner: string;
    estimatedTime: string;
    coverageIssues: string;
    coveragePages: string;
    automation: string;
    peerReview: string;
    step: string;
    testData: string;
    expectedResult: string;
    plainText: string;
    bdd: string;
}

export function setupExcelColumns(worksheet: ExcelJS.Worksheet): void {
    const columns = [
        { header: 'Key', key: 'key', width: 15 },
        { header: 'Name', key: 'name', width: 30 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'Precondition', key: 'precondition', width: 30 },
        { header: 'Objective', key: 'objective', width: 30 },
        { header: 'Folder', key: 'folder', width: 20 },
        { header: 'Priority', key: 'priority', width: 15 },
        { header: 'Component', key: 'component', width: 20 },
        { header: 'Labels', key: 'labels', width: 20 },
        { header: 'Owner', key: 'owner', width: 20 },
        { header: 'Estimated Time', key: 'estimatedTime', width: 15 },
        { header: 'Coverage (Issues)', key: 'coverageIssues', width: 20 },
        { header: 'Coverage (Pages)', key: 'coveragePages', width: 20 },
        { header: 'Automation', key: 'automation', width: 15 },
        { header: 'Peer Review', key: 'peerReview', width: 15 },
        { header: 'Test Script (Step-by-Step) - Step', key: 'step', width: 30 },
        { header: 'Test Script (Step-by-Step) - Test Data', key: 'testData', width: 30 },
        { header: 'Test Script (Step-by-Step) - Expected Result', key: 'expectedResult', width: 30 },
        { header: 'Test Script (Plain Text)', key: 'plainText', width: 40 },
        { header: 'Test Script (BDD)', key: 'bdd', width: 40 }
    ];

    worksheet.columns = columns;

    // Style the header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
    };
}

// Helper function to get column letter from column name
function getColumnLetter(columnName: string): string {
    const columnMap: { [key: string]: string } = {
        'key': 'A',
        'name': 'B',
        'status': 'C',
        'precondition': 'D',
        'objective': 'E',
        'folder': 'F',
        'priority': 'G',
        'labels': 'I',
        'owner': 'J',
        'coverageIssues': 'L',
        'automation': 'N',
        'peerReview': 'O',
        'step': 'P',
        'expectedResult': 'R'
    };
    return columnMap[columnName] || '';
}

// Function to fill a specific cell in the worksheet
export function fillCell(worksheet: ExcelJS.Worksheet, rowNumber: number, columnName: string, value: string): void {
    const columnLetter = getColumnLetter(columnName);
    if (!columnLetter) {
        throw new Error(`Invalid column name: ${columnName}`);
    }
    
    const cell = worksheet.getCell(`${columnLetter}${rowNumber}`);
    cell.value = value;
}

// Convenience functions for each column
export function fillKey(worksheet: ExcelJS.Worksheet, rowNumber: number, value: string): void {
    fillCell(worksheet, rowNumber, 'key', value);
}

export function fillName(worksheet: ExcelJS.Worksheet, rowNumber: number, value: string): void {
    fillCell(worksheet, rowNumber, 'name', value);
}

export function fillStatus(worksheet: ExcelJS.Worksheet, rowNumber: number, value: string): void {
    fillCell(worksheet, rowNumber, 'status', value);
}

export function fillPrecondition(worksheet: ExcelJS.Worksheet, rowNumber: number, value: string): void {
    fillCell(worksheet, rowNumber, 'precondition', value);
}

export function fillObjective(worksheet: ExcelJS.Worksheet, rowNumber: number, value: string): void {
    fillCell(worksheet, rowNumber, 'objective', value);
}

export function fillFolder(worksheet: ExcelJS.Worksheet, rowNumber: number, value: string): void {
    fillCell(worksheet, rowNumber, 'folder', value);
}

export function fillPriority(worksheet: ExcelJS.Worksheet, rowNumber: number, value: string): void {
    fillCell(worksheet, rowNumber, 'priority', value);
}

export function fillLabels(worksheet: ExcelJS.Worksheet, rowNumber: number, value: string): void {
    fillCell(worksheet, rowNumber, 'labels', value);
}

export function fillOwner(worksheet: ExcelJS.Worksheet, rowNumber: number, value: string): void {
    fillCell(worksheet, rowNumber, 'owner', value);
}

export function fillCoverageIssues(worksheet: ExcelJS.Worksheet, rowNumber: number, value: string): void {
    fillCell(worksheet, rowNumber, 'coverageIssues', value);
}

export function fillAutomation(worksheet: ExcelJS.Worksheet, rowNumber: number, value: string): void {
    fillCell(worksheet, rowNumber, 'automation', value);
}

export function fillPeerReview(worksheet: ExcelJS.Worksheet, rowNumber: number, value: string): void {
    fillCell(worksheet, rowNumber, 'peerReview', value);
}

export function fillStep(worksheet: ExcelJS.Worksheet, rowNumber: number, value: string): void {
    fillCell(worksheet, rowNumber, 'step', value);
}

export function fillExpectedResult(worksheet: ExcelJS.Worksheet, rowNumber: number, value: string): void {
    fillCell(worksheet, rowNumber, 'expectedResult', value);
}
