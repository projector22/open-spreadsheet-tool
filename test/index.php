<?php

use Debugger\Debug;
use OpenSpreadsheetTool\SpreadsheetTool;

function autoload( string $class ) {
    $class_name = $class;
    $path = realpath( __DIR__ . '/../src/' );
    $class = str_replace( 'OpenSpreadsheetTool', '', $class );
    $require_path = str_replace( '\\', '/', $path. $class );
    require_once $require_path . '.php';

    /**
     * THIS IS REQUIRED FOR PAGE AUTOLOAD
     */
    if ( method_exists( $class_name, '__constructStatic' ) ) {
        $class_name::__constructStatic();
    }
}

spl_autoload_register( 'autoload' );
require '..\vendor\autoload.php';
Debug::__constructStatic();

echo "<h1> Open Speadsheet Tool - Test Page</h1>";

$ss = new SpreadsheetTool( 'test_ss', 10, 25 );
$ss->construct_blank_sheet();

