const baseUrl = "https://futurhealth.atlassian.net/browse/";

interface TestStep {
  test: string;
  expectedResults: string;
}

interface TestParts {
  title: string;
  objectives: string;
  preconditions: string;
  test: string;
  folder: string;
}

interface ProcessedTest {
  title: string;
  objectives: string;
  preconditions: string;
  test: TestStep[];
  testLegth: number;
  folder: string;
}

export function splitTests(wholeTests: string): string[] {
  return wholeTests.split("*****");
}

export function splitText(test: string): TestParts {
  const cleanedText = test.replaceAll(/\n/g, "");
  const parts = cleanedText.split("/*-*/");

  const objs = parts[1].trim().split("*");

  return {
    title: parts[0].replaceAll("//", "").trim(),
    objectives: getObjetives(objs.map((ob: string) => ob.trim())),
    preconditions: parts[3].trim().replaceAll("*", "\n"),
    test: parts[4],
    folder: parts[5],
  };
}

export function getStepsAndResults(test: string): TestStep[] {
  const individualTest = test.split("-+");

  const result = individualTest.map((test: string) => {
    const splittedTest = test.split("//");
    const testPrompt = splittedTest[0].trim();
    const expectedResults = splittedTest[1].trim();
    return {
      test: (testPrompt[0].toUpperCase() + testPrompt.substring(1)).replaceAll(
        "*",
        "\n"
      ),
      expectedResults: (expectedResults
        ? expectedResults[0].toUpperCase() + expectedResults.substring(1)
        : ""
      ).replaceAll("*", "\n"),
    };
  });
  return result;
}

export function getObjetives(objs: string[]): string {
  return objs.map((objective: string) => {
    const firstSapceIndex = objective.indexOf(" ");
    const ticket = objective.substring(0, firstSapceIndex).trim();
    return `${objective}: ${baseUrl}${ticket}`
  }).join("\n")
}

export function getTests(testSuite: string): ProcessedTest[] {
  const tests = splitTests(testSuite);
  return tests.map((test: string) => {
    const testParts = splitText(test);
    const testSteps = getStepsAndResults(testParts.test);
    return {
      title: testParts.title,
      objectives: testParts.objectives,
      preconditions: testParts.preconditions,
      test: testSteps,
      testLegth: testSteps.length,
      folder: testParts.folder,
    };
  });
}
