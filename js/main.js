main();

/**
 * A main function that lists all the necessary functions that needs to run when loading the page.
 */
function main() {
    setCurrentYearInCopyrightElm();
    setCurrentVersionNumber();
}

/**
 * Sets the current year in the copyright element in the HTML.
 */
function setCurrentYearInCopyrightElm() {
    const copyrightYearElement = document.getElementById('copyrightYear');
    const currentYear = new Date().getFullYear();
    copyrightYearElement.textContent = currentYear;
}

/**
 * Sets the current version number in the package.json to the version element in the HTML.
 */
function setCurrentVersionNumber() {
    fetch('package.json')
        .then((response) => response.json())
        .then((data) => {
            document.getElementById('version').innerText = data.version;
        })
        .catch((error) =>
            console.error(
                'Error in fetching the current version in package.json\n\n',
                error
            )
        );
}
