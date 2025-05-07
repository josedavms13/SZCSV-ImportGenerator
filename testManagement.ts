const a = `
Should visitor and engagement id be posted on Pendo

/*-*/

Have cloud connector setup and running.
Have pendo account with access.

/*-*/

Create 3 staff accounts // -+
Create an engagement and create an Excel document. // -+
Open the excel document in the engagement and select 'open in office' or 'open in excel' (depending on the browser) // The document is opened in office. -+
Click on 'enable editing' [picture] // The Excel top bar is shown. [picture] -+
Login to the addin // Cloud connector is logged in. [picture] -+
Go type something in the search bar and check if the visitor id and engagement id are posted on pendo. [picture] // The visitor id and engagement id are shown. [picture] -+
Go to the properties tab // -+

After waiting 20 min, go to the pendo dashboard and check the search events (https://app.pendo.io/s/5731118484946944/pages/XRYlODPpMUlVS5OIpFq9eE-QCkE) [2] // The Engagement Id is listed in the account panel. [1] -+
Scroll down to the Event breakdown section, look for the account id // The account Id is the same as the engagement id [3].

Take the visitorId at the left of the Account Id [4] // -+

Close Excel, open a new browser in incognito, open the same engagement and open the same excel document. * Enable editing, go to the cloud connector addin // The addin is opened and a modal to login pops up. -+
Login to the addin with the second account credentials // The addin is logged in and the user is able to see cloud connector options. [picture] -+

Repeat the steps you did with the first account // -+
After waiting 20 min, go to the pendo dashboard and check the search events (https://app.pendo.io/s/5731118484946944/pages/XRYlODPpMUlVS5OIpFq9eE-QCkE) // 


In another brower in incognito mode, open the same engagement and login to the addin. // The addin is logged in and the user is able to see cloud connector options. [picture] -+
repeat the steps above. // 

/*-*/
Folder
/*-*/

/*-*/
Objective
/*-*/

/*+*/
Coverage
/*+*/
`;

export function parseTest(test: string): Test {
    const testParts = test.split("/*-*/");
    const trimmedParts = testParts.map((part) => part.trim());

    let coverageIssues = "";
    if (test.includes("/*+*/")) {
        const parsedIssues = test.split("/*+*/")[1];
        coverageIssues = parsedIssues.trim();
    }
    const title = trimmedParts[0];
    const preconditions = trimmedParts[1].replaceAll(" * ", "\n");
    const steps = trimmedParts[2];
    const folder = trimmedParts[3];
    return {
        title,
        preconditions,
        coverageIssues,
        steps: getSteps(steps),
        folder: folder || "",
    };
}

export function getSteps(steps: string): TestStep[] {
    const isBadEnded = steps.substring(steps.length - 4).includes("-+");
    if (isBadEnded) throw new Error("Bad test ending. Please remove '-+'");

    const resultToReturn = steps.split("-+");
    const trimmedParts = resultToReturn.map((result) => result.trim());

    return trimmedParts.map((test: string) => {
        const ongoingTest = test.split(" //");
        return {
            step: ongoingTest[0].replaceAll(" * ", "\n"),
            expectedResults: ongoingTest[1].replaceAll(" * ", "\n"),
        };
    });
}

export interface TestStep {
    step: string;
    expectedResults: string;
}

export interface Test {
    title: string;
    preconditions: string;
    coverageIssues: string;
    steps: TestStep[];
    folder?: string;
}

// const result = parseTest(a);
// console.log(result);
