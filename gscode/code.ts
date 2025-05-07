
const columns = {
    name: (rowNumber) => "A" + rowNumber,
    status: (rowNumber) => "B" + rowNumber,
    preconditions: (rowNumber) => "C" + rowNumber,
    objetive: (rowNumber) => "D" + rowNumber,
    folder: (rowNumber) => "E" + rowNumber,
    priority: (rowNumber) => "F" + rowNumber,
    ownerId: (rowNumber) => "I" + rowNumber,
    testScriptStep: (rowNumber) => "M" + rowNumber,
    expectedResult: (rowNumber) => "O" + rowNumber,
}

const ownerId = "712020:5b54b977-d1b1-42de-a892-f938691bc8e3";
const status = "Draft";
const priority = "Normal";

const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
const sheet = spreadSheet.getActiveSheet();


let curretStart = 2;

function myFunction() {
    plotTestParameters(curretStart);

}

function plotTestParameters(initialRowNumber) {
    const test = getTests(GLOBALTEST);
    let rowNumber = initialRowNumber;




    test.forEach((bigTest) => {
        // Add test name
        sheet.getRange(columns.name(rowNumber)).setValue(bigTest.title);

        // Add status
        sheet.getRange(columns.status(rowNumber)).setValue(status);

        // Add precondition
        sheet.getRange(columns.preconditions(rowNumber)).setValue(bigTest.preconditions);

        // Add folder
        sheet.getRange(columns.folder(rowNumber)).setValue(bigTest.folder);

        // Add owner
        sheet.getRange(columns.ownerId(rowNumber)).setValue(ownerId);

        // Add objetive
        sheet.getRange(columns.objetive(rowNumber)).setValue(bigTest.objetives);



        const currentTestLength = bigTest.testLegth;

        bigTest.test.forEach((test, index) => {
            console.log(test);

            // Test step
            sheet.getRange(columns.testScriptStep(rowNumber + index)).setValue(test.test);

            // Test expected result
            sheet.getRange(columns.expectedResult(rowNumber + index)).setValue(test.expectedResults);
        })

        rowNumber = rowNumber + currentTestLength;
    })
}