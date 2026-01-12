/*
 * Load global constants
 */
import { TAG, code } from './global.mjs'

/**
 * Main function
 *
 * Allows loading all functions into memory before running
 *
 * @param  int      argc number of parameters in argv
 * @param  string[] argv parameters to control program flow
 * 
 * @return int      exit status code
 */
function main(argc, argv) {
	if (argc == null || argv == null) {
		var argc = 0;
		var argv = [];
	};

//console.warn(`${TAG} (all): Not Implemented Yet...`);
	return code.OK;
}


if (typeof window !== "undefined") {
	main(0, []);
} else if (typeof process !== "undefined" && process.argv !== "undefined") {
	var argc = process.argv.length;
	var argv = process.argv;

	console.debug(`${TAG} (${argc}): ${argv}`);
	console.debug("-".repeat(80));
	argv.forEach(function(value, index, array) {
		console.debug(`${TAG} (${index}): ${value}`)
	});

//main(argc, argv);
}

