<?php

namespace OpenSpreadsheetTool\Engine;

/**
 * This class the loading of CSS elements onto the page
 * 
 * use OpenSpreadsheetTool\Engine\CSS;
 * 
 * @author  Gareth Palmer  @evangeltheology
 * 
 * @since   ???
 */

class CSS {

    /**
     * Get the styles from template file and load them inline.
     * 
     * @return  string
     * 
     * @access  public
     * @since   ???
     */

    public function spreadsheet_styles(): string {
        $style = file_get_contents( realpath( __DIR__ . '\..\styles\styles.css' ) );
        return $style;
    }


}