import ExcelJS from 'exceljs';
import {
    fillCoverageIssues, fillExpectedResult,
    fillFolder,
    fillKey,
    fillName,
    fillOwner, fillPeerReview, fillPrecondition,
    fillPriority,
    fillStatus, fillStep,
    setupExcelColumns
} from "./excelUtilities";
import {parseTest, Test} from "./testManagement";


export async function generateExcel(testSuite: string[], outputPath: string, owner: string): Promise<string> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Test Cases');

    // Set up headers
    worksheet.columns = [
        {header: 'Title', key: 'title', width: 40},
        {header: 'Objectives', key: 'objectives', width: 50},
        {header: 'Preconditions', key: 'preconditions', width: 40},
        {header: 'Test Steps', key: 'testSteps', width: 50},
        {header: 'Expected Results', key: 'expectedResults', width: 50},
        {header: 'Folder', key: 'folder', width: 20}
    ];

    // Style the header row
    worksheet.getRow(1).font = {bold: true};
    worksheet.getRow(1).alignment = {vertical: 'middle', horizontal: 'center'};

    setupExcelColumns(worksheet);

    let rowNumber = 2;
    testSuite.forEach((testSuite) => {
        const test = parseTest(testSuite);
        rowNumber = plotTestToExcel(worksheet, test, owner, rowNumber);
    })

    // Save the workbook
    await workbook.xlsx.writeFile(outputPath);

    return outputPath;
}

function plotTestToExcel(worksheet: ExcelJS.Worksheet, test: Test, owner: string, startingNumber: number): number {
    let rowNumber = startingNumber;
    fillName(worksheet, rowNumber, test.title);
    fillStatus(worksheet, rowNumber, "Draft");
    fillFolder(worksheet, rowNumber, test.folder || "");
    fillPriority(worksheet, rowNumber, "Normal");
    fillOwner(worksheet, rowNumber, owner);
    fillCoverageIssues(worksheet, rowNumber, test.coverageIssues);
    fillPrecondition(worksheet, rowNumber, test.preconditions);
    fillPeerReview(worksheet, rowNumber, "Needs Review");
    test.steps.forEach(step => {
        fillStep(worksheet, rowNumber, step.step);
        fillExpectedResult(worksheet, rowNumber, step.expectedResults);
        rowNumber++;
    })
    return rowNumber;
}