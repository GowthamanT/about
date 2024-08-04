main();

/**
 * A main function that lists all the necessary functions that needs to run when loading the page.
 */
function main() {
    calculateTotalYearInDevelopment();
    setCurrentYearInCopyrightElm();
    setCurrentVersionNumber();
}

/**
 * Sets the current year in the copyright element in the HTML.
 */
function setCurrentYearInCopyrightElm() {
    const copyrightYearElement = document.getElementById('copyrightYear');
    const currentYear = new Date().getFullYear();

    if (copyrightYearElement) {
        copyrightYearElement.textContent = currentYear;
    }
}

/**
 * Sets the current version number in the package.json to the version element in the HTML.
 */
function setCurrentVersionNumber() {
    fetch('package.json')
        .then((response) => response.json())
        .then((data) => {
            const versionElement = document.getElementById('version');
            if (versionElement) {
                versionElement.innerText = data.version;
            }
        })
        .catch((error) =>
            console.error(
                'Error in fetching the current version in package.json\n\n',
                error
            )
        );
}

/**
 * Calculates and sets the total year in development.
 */
function calculateTotalYearInDevelopment() {
    // Total Year in development
    const totalDevelopmentYearElement = document.getElementById(
        'totalDevelopmentInYear'
    );

    const startDate = new Date('August 23, 2021');
    const currentDate = new Date();

    let years = currentDate.getFullYear() - startDate.getFullYear();
    let months = currentDate.getMonth() - startDate.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    let totalYearInDevelopement;

    if (months) {
        totalYearInDevelopement = `(${years} years ${months} months)`;
    } else {
        totalYearInDevelopement = `(${years} years)`;
    }

    totalDevelopmentYearElement.textContent = totalYearInDevelopement;
}
