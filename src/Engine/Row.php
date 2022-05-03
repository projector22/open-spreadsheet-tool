<?php

namespace OpenSpreadsheetTool\Engine;

/**
 * Commands for starting and ending a table row.
 * 
 * use OpenSpreadsheetTool\Engine\Row;
 * 
 * @author  Gareth Palmer  @evangeltheology
 * 
 * @since   ???
 */

class Row {

    /**
     * Start a row of cells.
     * 
     * @param   integer $row    Row being drawn
     * 
     * @access  public
     * @since   ???
     */

    public function start_row( int $row ): void {
        echo "<tr
            data-row={$row}
            class='sprss_std_row'
        >";
    }


    /**
     * End the row being drawn.
     * 
     * @access  public
     * @since   ???
     */

    public function end_row(): void {
        echo "</tr>";
    }
    
}