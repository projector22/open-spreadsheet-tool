<?php

namespace OpenSpreadsheetTool\Engine;

/**
 * This class the loading of Javascript elements onto the page
 * 
 * use OpenSpreadsheetTool\Engine\JS;
 * 
 * @author  Gareth Palmer  @evangeltheology
 * 
 * @since   ???
 */

class JS {


    /**
     * Method for drawing inline <script type='module'> for importing the spreadsheet tool.
     * 
     * @access  public
     * @since   ???
     */

    public function load_js_onload(): void {
        $path = __DIR__ . '\..\js\SpreadsheetEngine.js';
        $path = str_replace( 
            $_SERVER['DOCUMENT_ROOT'], 
            '', 
            str_replace( "\\", "/", $path ) 
        );

        echo "<script type='module'>
        import SpreadsheetTool from '{$path}';
        const spreadsheet = new SpreadsheetTool('{$this->table_id}');
        </script>";
    }

}