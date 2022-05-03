<?php

namespace OpenSpreadsheetTool\Engine;

/**
 * Draw a spreadsheet cell onto the page.
 * 
 * use OpenSpreadsheetTool\Engine\Cell;
 * 
 * @author  Gareth Palmer  @evangeltheology
 * 
 * @since   ???
 */

class Cell {

    /**
     * Draw an ordinary cell.
     * 
     * @param   string|int  $content    The content to place in the cell.
     * @param   integer     $row        The row of the cell.
     * @param   integer     $col        The column of the cell.
     * @param   integer     $width      The width of the cell. Default: 180 (px).
     * 
     * @access  public
     * @since   ???
     */

    public function cell( 
        string|int $content,
        int $row,
        int $col,
        int $width = 180,
    ): void {
        $params = [
            'class'      => "sprss_std_cell",
            'id'         => "{$this->table_id}__r{$row}c{$col}",
            'name'       => "{$this->table_id}__spreadsheet_cell",
            'data-row'   => $row,
            'data-col'   => $col,
            'data-width' => $width + 12 + 1,
            'style'      => "width:{$width}px",
            'height'     => 30,
        ];

        echo "<td";
        foreach ( $params as $key => $value ) {
            echo " {$key}={$value}";
        }
        echo ">";
        echo $content;
        echo "</td>";
    }


    /**
     * Draw an heading cell.
     * 
     * @param   string|int  $content    The content to place in the cell.
     * 
     * @access  public
     * @since   ???
     */

    public function header_cell( string|int $content ): void {
        echo "<th>";
        echo $content;
        echo "</th>";
    }
    
}