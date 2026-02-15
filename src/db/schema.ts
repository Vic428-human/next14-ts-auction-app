// this is where you can find your table and database
// we need to use drizzle to look what kind of database's properties on this table


import { pgTable, serial } from "drizzle-orm/pg-core"; 

// define the table's columns type
export const bids = pgTable('bb_bids', {
	id: serial().primaryKey(),
});
