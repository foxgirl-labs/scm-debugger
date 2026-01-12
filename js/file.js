/**
 * Main function
 *
 * Allows loading all functions into memory before running
 *
 * @param int argc number of parameters in argv
 * @param str[] argv parameters to control program flow
 * 
 * @return int exit status code
 */
function main(argc, argv) {
	if (argc == null || argv == null) {
		var argc = 0;
		var argv = [];
	};

	console.warning(`FGD (file): Not Implemented Yet...`);
	return 0;
}

if (typeof window !== "undefined") {
	main(0, []);
} else if (typeof process !== "undefined" && process.argv !== "undefined") {
	var argc = process.argv.length;
	var argv = process.argv;

	console.debug(`FGD (${argc}): ${argv}`);
//main(argc, argv);
}

