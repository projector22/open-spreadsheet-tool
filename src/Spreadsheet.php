<?php

namespace OpenSpreadsheetTool;

use OpenSpreadsheetTool\Engine\Engine;

class Spreadsheet extends Engine {
    
    public function __construct(

        /**
         * @access  protected
         * @since   ???
         */

        public string $table_id,
    ) {
        $this->build_engine();
    }


    /**
     * Start a spreadsheet.
     * 
     * @access  public
     * @since   ???
     */

    public function start_spreadsheet(): void {
        echo "<style>{$this->css->spreadsheet_styles()}</style>";
        echo "<div class='sprss_table_wrapper'>";
        echo "<div class='sprss_selection_tool' = id='{$this->table_id}__selector'></div>";
        echo "<table
            id='{$this->table_id}__canvas'
            class='sprss_std_spreadsheet'
            cellspacing='0'
            cellpadding='0'
            >";
    }

    /**
     * End a spreadsheet.
     * 
     * @access  public
     * @since   ???
     */
    public function end_spreadsheet(): void {
        echo "</table>";
        $this->js->load_js_onload();
        echo "</div>"; // sprss_table_wrapper
    }


    /**
     * Draw out a blank spreadsheet.
     * 
     * @param   integer $rows       Number of rows to draw
     * @param   integer $columns    Number of columns to draw
     * 
     * @access  public
     * @since   ???
     */
    public function construct_blank_sheet( int $rows, int $columns ): void {
        $this->start_spreadsheet();
        for ( $row = 1; $row <= $rows; $row++ ) {
            $this->rows->start_row( $row );
            for ( $col = 1; $col <= $columns; $col++ ) {
                $this->cells->cell( 
                    '', // "column {$col} row {$row}",
                    $row,
                    $col,
                );
            }            
            $this->rows->end_row();
        }
        $this->end_spreadsheet();
    }
}