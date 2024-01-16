// Copyright
const copyrightYearElement = document.getElementById('copyrightYear');
const currentYear = new Date().getFullYear();
copyrightYearElement.textContent = currentYear;

// Consistency graph

function buildConsistencyGraph() {
    /**
     * TODO: We need to change this to get data from the API and load the table cells.
     */
    loadJSON(function (data) {
        renderTableCells(data);
    });
}

/**
 * Loads the data from the JSON file.
 *
 * @param callback - A callback function.
 */
function loadJSON(callback) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType('application/json');

    xhr.open('GET', 'assets/habit-tracker-data.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        }
    };

    xhr.send(null);
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

buildConsistencyGraph();
