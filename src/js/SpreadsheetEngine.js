/**
 * Calculates and draws the daily routine element on the screen, and keeps it up to date.
 * 
 * @author  Gareth Palmer
 * 
 * @requires    ES6
 * 
 * @since   ???
 */


/**
 * Handle drawn spreadsheets as and when required.
 * 
 * @param {string} id   The id of the table being worked on.
 * 
 * @since   ???
 */
export default class SpreadsheetEngine {
    constructor(id) {

        /**
         * The id of the spreadsheet being worked on.
         * 
         * @var {string} id
         * 
         * @since   ???
         */
        this.id = id;

        /**
         * A dom list of all of the cells within the spreadsheet.
         * Created from calling document.getElementsByName.
         * 
         * @var {object} cells
         * 
         * @since   ???
         */
        this.cells = document.getElementsByName(`${this.id}__spreadsheet_cell`);

        /**
         * Disable if the contents are empty, something common if on a an AJAX load, for example
         */
        if (this.cells.length == 0) {
            console.warn("No cells detected for table " + this.id);
            return;
        }

        /**
         * The last column in the current spreadsheet.
         * 
         * @var {integer} last_column
         * 
         * @since   ???
         */
        this.last_column = this.cells[this.cells.length - 1].dataset.column;

        /**
         * The last row in the current spreadsheet.
         * 
         * @var {integer} last_row
         * 
         * @since   ???
         */
        this.last_row = this.cells[this.cells.length - 1].dataset.row;

        /**
         * The canvas element.
         * 
         * @var {DOM} canvas
         * 
         * @since   ???
         */
        this.canvas = document.getElementById(`${this.id}__canvas`);

        /**
         * The current cell being focused on. It has 2 properties -> column & row.
         * 
         * @var {object} focused
         * 
         * @since   ???
         */
        this.focus = {
            column: null,
            row: null,
        };

        // this.listener();
        this.selector();
    }


    /**
     * Perform all of the onExample actions required by the spreadsheet.
     * 
     * @since   ???
     */

    listener() {
        if (this.cells.length == 0) {
            return;
        }
        const current_object = this;
        this.cells.forEach(cell => {
            cell.onfocus = function () {
                // Does not appear to have a purpose yet
                current_object.focus = {
                    column: this.dataset.column,
                    row: this.dataset.row,
                };
            };
            cell.onkeydown = function (action) {
                let id;
                switch (action.key) {
                    case 'ArrowUp': // Move up
                        id = `${current_object.id}__row_${eval(this.dataset.row) - 1}__column_${this.dataset.column}`;
                        if (document.getElementById(id)) {
                            document.getElementById(id).focus();
                        }
                        break;
                    case 'ArrowDown': // Move down
                        id = `${current_object.id}__row_${eval(this.dataset.row) + 1}__column_${this.dataset.column}`;
                        if (document.getElementById(id)) {
                            document.getElementById(id).focus();
                        }
                        break;
                    case 'ArrowRight': // Move right
                        id = `${current_object.id}__row_${this.dataset.row}__column_${eval(this.dataset.column) + 1}`;
                        if (document.getElementById(id)) {
                            document.getElementById(id).focus();
                        }
                        break;
                    case 'ArrowLeft': // Move left
                        id = `${current_object.id}__row_${this.dataset.row}__column_${eval(this.dataset.column) - 1}`;
                        if (document.getElementById(id)) {
                            document.getElementById(id).focus();
                        }
                        break;
                    case 'Enter': // confirm and down one
                        id = `${current_object.id}__row_${eval(this.dataset.row) + 1}__column_${this.dataset.column}`;
                        if (document.getElementById(id)) {
                            document.getElementById(id).focus();
                        }
                        break;
                    case 'Escape': // Cancel action
                        this.value = ''; // @todo Must functionally go back to the origonal text if there was one
                        break;
                }
            };
        });
    }


    /**
     * Observe if a cell is being selected and highlight as needed.
     * 
     * @since   ???
     */

    selector() {
        let selected_cell, selected_cell_id;
        this.cells.forEach(cell => {
            cell.onmousedown = function () {
                if (selected_cell) {
                    selected_cell.classList.remove('sprss_cell_selected');
                }
                this.classList.add('sprss_cell_selected');
                selected_cell = document.getElementById(this.id);
                console.log(this.dataset)
            };
            cell.ondblclick = function () {
                // Load the text editor / etc.
                console.log("Double Click");
            };
        });

    }

}


/**
 * Clear all the selected cells on the spreadsheet.
 * 
 * @param {string} id ID of the spreadsheet.
 * 
 * @since   ???
 */

function clear_all_selected(id) {
    const cells = document.querySelectorAll(`.${id}__cell_selected`);
    console.log(cells.length);
    cells.forEach(cell => {
        cell.classList.remove(`${id}__cell_selected`);
        cell.classList.remove(`${id}__cell_selected-top`);
        cell.classList.remove(`${id}__cell_selected-bottom`);
        cell.classList.remove(`${id}__cell_selected-left`);
        cell.classList.remove(`${id}__cell_selected-right`);
        cell.dataset.selected = 0;
    });
    console.log('cleared');
}