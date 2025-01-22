function returnClean(input) {
    input += ",";
    let cleanInput = [];
    let i = 0;

    while (i < input.length) {
        let ch = input[i];
        if (ch !== "=") {
            // Proceed
            i++;
        } else {
            // Skip space
            i += 2;

            let str11 = "";
            let ndim = 0;

            while (input[i] === "[") {
                i++;
                ndim++;
            }

            if (ndim !== 0) { // Array is present
                i -= ndim;
                str11 = "";
                const closingBrackets = "]".repeat(ndim);

                while (input.slice(i, i + ndim) !== closingBrackets) {
                    str11 += input[i];
                    i++;
                }
                str11 += "]".repeat(ndim);

                const arr = JSON.parse(str11);
                const dimMatrix = findDimensions(arr);
                if (dimMatrix.length !== ndim && (dimMatrix.length === 0 && ndim !== 1)) {
                    throw new Error("Invalid dimensions");
                }

                const flattenedArray = [...flattenList(arr)];
                const resultantMatrix = dimMatrix.join(" ") + " " + flattenedArray.join(" ");
                cleanInput.push(resultantMatrix);
            } else {
                if (input[i] === '"') {
                    i++;
                    while (input[i] !== '"') {
                        str11 += input[i];
                        i++;
                    }
                } else {
                    while (input[i] !== ",") {
                        str11 += input[i];
                        i++;
                    }
                }
                cleanInput.push(str11);
            }
            i++;
        }
    }
    return cleanInput.join(" ");
}

function findDimensions(array) {
    // Base case: If the array is not an array or is empty, return an empty dimension
    if (!Array.isArray(array) || array.length === 0) {
        return [];
    }
    // Recursive case: Get the length of the current dimension and recurse deeper
    return [array.length].concat(findDimensions(array[0]));
}

function* flattenList(nestedList) {
    for (const element of nestedList) {
        if (Array.isArray(element)) {
            yield* flattenList(element);
        } else {
            yield element;
        }
    }
}

const puppeteer = require('puppeteer')

async function pupp(url){

    if (!url || typeof url !== 'string') {
        console.error("No valid URL provided. Exiting...");
        return; // Exit early if the URL is not provided or invalid
    }
    
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        
        await page.goto(url); // Replace with the target URL
        const elements = await page.$$('.elfjS pre');

        let formattedInput = [];
        let formattedOutput = [];
        console.log("Elements found:", elements.length);
        
        for (const element of elements) {
            let text = await page.evaluate(el => el.textContent, element);
            let cleanedText = text.replace(/(Input:|Output:|Explanation:)\s*/g, '').trim();
            let [input, expectedOutput] = cleanedText.split('\n');
            console.log( input ) ;
            console.log( expectedOutput ) ;
            let processedOutput = expectedOutput.startsWith('[') ? JSON.parse(expectedOutput) : expectedOutput;

            if (Array.isArray(processedOutput)) {
                let dimArray = findDimensions(processedOutput);
                processedOutput = dimArray.length > 1
                    ? processedOutput.map(subArray => subArray.join(' ')).join('\n')
                    : processedOutput.join(' ');
            } else if (typeof processedOutput === 'string' && processedOutput.startsWith('"')) {
                processedOutput = processedOutput.slice(1, -1);
            }

            formattedInput.push(returnClean(input));
            formattedOutput.push(processedOutput);
        }
        
        let a = [ formattedInput , formattedOutput];
        console.log( a ) ;

        return a;

    } catch (error) {
        console.error("Error occurred:", error);
    }

}

module.exports = {pupp};