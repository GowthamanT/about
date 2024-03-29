main();

/**
 * A main function that lists all the necessary functions that needs to run when loading the page.
 */
function main() {
    setCurrentYearInCopyrightElm();
    buildConsistencyGraph();
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
 * A function that builds the consistency graph in the HTML.
 */
function buildConsistencyGraph() {
    /**
     * TODO: Need to change this to get data from the API and load the table cells.
     */
    fetch('assets/habit-tracker-data.json')
        .then((response) => response.json())
        .then((data) => {
            renderTableCells(data);
        })
        .catch((error) =>
            console.error('Error in building consistency graph.\n\n', error)
        );
}

/**
 * Render the data into the table cell.
 *
 * @param data - The habit tracker data.
 */
function renderTableCells(data) {
    data.forEach((item) => {
        const weekday = getWeekday(item.date);
        const row = document.getElementById(weekday);

        const titleText = `Completed ${item.completedTasks}/${
            item.outOff
        } tasks on ${formatDisplayDate(item.displayData)}.`;

        const tableCell = document.createElement('td');
        tableCell.title = titleText;
        tableCell.classList.add('graph-table-cell');

        const graphCell = document.createElement('span');
        graphCell.classList.add('graph-cell');
        graphCell.classList.add(`level-${item.completedTasks}`);

        tableCell.appendChild(graphCell);

        row.appendChild(tableCell);
    });
}

/**
 * Get the weekday from the given date string.
 *
 * @param dateString - A data string to which we need the weekday.
 * @returns the weekday for the particular date.
 */
function getWeekday(dateString) {
    const days = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
    ];

    const date = new Date(dateString);

    return days[date.getDay()];
}

/**
 * Formats the date to display in the tooltip.
 *
 * @param date - A date string from data.
 * @returns the date to display in the tooltip.
 */
function formatDisplayDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const displayDate = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
    });

    let suffix = '';

    if (day === 1 || day === 21 || day === 31) {
        suffix = 'st';
    } else if (day === 2 || day === 22) {
        suffix = 'nd';
    } else if (day === 3 || day === 23) {
        suffix = 'rd';
    } else {
        suffix = 'th';
    }

    return `${displayDate}${suffix}`;
}
