const baseUrl = "https://futurhealth.atlassian.net/browse/";

function splitTests(wholeTests) {
  return wholeTests.split("*****");
}

function splitText(test) {
  const cleanedText = test.replaceAll(/\n/g, "");
  const parts = cleanedText.split("/*-*/");

  const objs = parts[1].trim().split("*");

  return {
    title: parts[0].replaceAll("//", "").trim(),
    objetives: getObjetives(objs.map((ob)=> ob.trim())),
    preconditions: parts[3].trim().replaceAll("*", "\n"),
    test: parts[4],
    folder: parts[5],
  };
}

function getStepsAndResults(test) {
  const individualTest = test.split("-+");

  const result = individualTest.map((test) => {
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

function getObjetives(objs) {
  return objs.map((objective) => {
    const firstSapceIndex = objective.indexOf(" ");
    const ticket = objective.substring(0, firstSapceIndex).trim();
    return `${objective}: ${baseUrl}${ticket}`
  }).join("\n")
}

function getTests(testSuite) {
  const tests = splitTests(testSuite);
  return tests.map((test) => {
    const testParts = splitText(test);
    const testSteps = getStepsAndResults(testParts.test);
    return {
      title: testParts.title,
      objetives: testParts.objetives,
      preconditions: testParts.preconditions,
      test: testSteps,
      testLegth: testSteps.length,
      folder: testParts.folder,
    };
  });
}
