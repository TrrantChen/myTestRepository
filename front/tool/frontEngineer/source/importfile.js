/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-05-06 17:39:40
 * @version $Id$
 */

 import * as exportfile from "./exportfile"
	exportfile.print();
	console.log(process.env.NODE_ENV);
	if (process.env.NODE_ENV === "development") {
  		console.log('development only');
  	}

