/**
 * Calculates and draws the daily routine element on the screen, and keeps it up to date.
 * 
 * @author  Gareth Palmer
 * 
 * @requires    ES6
 * 
 * @version NEW
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

        this.selected_cell;

        this.editing = false;


        /**
         * TO BE ESTABLISHED - BELOW
         */

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

        this.listener();
        this.selector();
    }


    /**
     * Perform all of the onExample actions required by the spreadsheet.
     * 
     * @since   ???
     */

    listener() {
        const current_object = this;
        document.addEventListener("keydown", function (action) {
            if (current_object.selected_cell) {
                const row = current_object.selected_cell.dataset.row;
                const col = current_object.selected_cell.dataset.col;
                let id;
                switch (action.key) {
                    case 'ArrowUp': // Move up
                        id = `${current_object.id}__r${eval(row) - 1}c${col}`;
                        if (document.getElementById(id)) {
                            document.getElementById(id).focus();
                        }
                        break;
                    case 'ArrowDown': // Move down
                        id = `${current_object.id}__r${eval(row) + 1}c${col}`;
                        if (document.getElementById(id)) {
                            document.getElementById(id).focus();
                        }
                        break;
                    case 'ArrowRight': // Move right
                        id = `${current_object.id}__r${row}c${eval(col) + 1}`;
                        if (document.getElementById(id)) {
                            document.getElementById(id).focus();
                        }
                        break;
                    case 'ArrowLeft': // Move left
                        id = `${current_object.id}__r${row}c${eval(col) - 1}`;
                        if (document.getElementById(id)) {
                            document.getElementById(id).focus();
                        }
                        break;
                    case 'Enter': // confirm and down one
                        if (current_object.editing) {
                            current_object.editing = false;
                            id = `${current_object.id}__r${eval(row) + 1}c${col}`;
                            if (document.getElementById(id)) {
                                document.getElementById(id).focus();
                            }
                        } else {
                            current_object.edit_cell();
                        }
                        break;
                        // case 'Escape': // Cancel action
                        //     this.value = ''; // @todo Must functionally go back to the origonal text if there was one
                        //    break;
                }
                const new_selected_cell = document.getElementById(id);
                if (new_selected_cell) {
                    new_selected_cell.classList.add('sprss_cell_selected');
                    current_object.selected_cell.classList.remove('sprss_cell_selected');
                    current_object.selected_cell = new_selected_cell;
                }
            }
        });
    }


    /**
     * Observe if a cell is being selected and highlight as needed.
     * 
     * @since   ???
     */

    selector() {
        const current_object = this;
        let selected_cell = this.selected_cell;
        this.cells.forEach(cell => {
            cell.ondblclick = function () {
                // Load the text editor / etc.
                this.edit_cell();
            };
            cell.onmousedown = function () {
                if (selected_cell) {
                    selected_cell.classList.remove('sprss_cell_selected');
                }
                this.classList.add('sprss_cell_selected');
                this.focus();
                selected_cell = document.getElementById(this.id);
                current_object.selected_cell = selected_cell;
            };
        });
    }


    /**
     * Begin editing the selected cell.
     * 
     * @since   ???
     */

    edit_cell() {
        // Begin editing the cell.
        this.editing = true;
        console.log("Start Editing Cell");
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