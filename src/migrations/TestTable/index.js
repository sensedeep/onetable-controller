/*
    Migrations index for table-1
 */

import v001 from './0.0.1.js'
import latest from './latest.js'

/*
    If supporting migrations for multiple database tables, put the migrations into per-table
    directories and export a map indexed by table name.
*/
const Migrations = [
    v001,
    latest,
]

export default Migrations
