<?php

namespace OpenSpreadsheetTool\Engine;

use OpenSpreadsheetTool\Engine\JS;
use OpenSpreadsheetTool\Engine\CSS;
use OpenSpreadsheetTool\Engine\Row;
use OpenSpreadsheetTool\Engine\Cell;

/**
 * Handle the loading of the Engine classes and properties into the
 * spreadsheet. Is extended to by the main class, and `build_engine` is
 * called in the constructor.
 * 
 * use OpenSpreadsheetTool\Engine\Engine;
 * 
 * @author  Gareth Palmer  @evangeltheology
 * 
 * @since   ???
 */

class Engine {

    /**
     * A column counter to indicate where we are in the spreadsheet
     * 
     * @var int $column
     * 
     * @access  protected
     * @since   ???
     */

    protected int $column;

    /**
     * A row counter to indicate where we are in the spreadsheet
     * 
     * @var int $row
     * 
     * @access  protected
     * @since   ???
     */

    protected int $row;

    /**
     * Object containing the class `OpenSpreadsheetTool\Engine\`
     * 
     * @var object  $css
     * 
     * @access  public
     * @since   ???
     */

    public object $css;

    /**
     * Object containing the class `OpenSpreadsheetTool\Engine\`
     * 
     * @var object  $js
     * 
     * @access  public
     * @since   ???
     */

    public object $js;

    /**
     * Object containing the class `OpenSpreadsheetTool\Engine\`
     * 
     * @var object  $cells
     * 
     * @access  public
     * @since   ???
     */

    public object $cells;

    /**
     * Object containing the class `OpenSpreadsheetTool\Engine\`
     * 
     * @var object  $rows
     * 
     * @access  public
     * @since   ???
     */

    public object $rows;


    /**
     * The engine builder, putting methods together and assigning them to properties
     * 
     * @access  public
     * @since   ???
     */

    public function build_engine(): void {
        $classes = [
            'css'   => new CSS,
            'js'    => new JS,
            'cells' => new Cell,
            'rows'  => new Row,
        ];
        foreach ( $classes as $prop => $obj ) {
            $this->$prop = $obj;
            $this->$prop->table_id = $this->table_id;
        }
    }
}