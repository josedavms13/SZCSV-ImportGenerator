import { generateExcel } from './excelGenerator';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
    try {
        // Define the tests directory path
        const testsDir = path.join(__dirname, 'tests');
        const outputPath = path.join(__dirname, 'output.xlsx');

        const owner = process.argv[2];
        if (!owner) {
            console.error('Please provide the owner name as a command line argument.');
            process.exit(1);
        }

        // Check if tests directory exists
        if (!fs.existsSync(testsDir)) {
            console.error('Tests directory not found. Please create a tests directory with your test files.');
            process.exit(1);
        }

        // Read all .txt files from the tests directory
        const testFiles = fs.readdirSync(testsDir)
            .filter(file => file.endsWith('.txt'))
            .map(file => path.join(testsDir, file));

        if (testFiles.length === 0) {
            console.error('No .txt test files found in the tests directory.');
            process.exit(1);
        }

        // Read and process all test files
        const testSuites = testFiles.map(file => fs.readFileSync(file, 'utf-8'));

        testSuites.forEach(testSuite => {

        })

        // Generate Excel file
        const outputFile = await generateExcel(testSuites, outputPath, owner);
        console.log(`Excel file generated successfully at: ${outputFile}`);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();






