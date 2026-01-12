// The output format is slightly different between smart/dumb if server is
// smart. Else, it may just be a dumb server sending a static file over
// regardless of query parameters. We have to check both formats regardless
const refinfo_smart_ending = '/info/refs?service=git-upload-pack';
const refinfo_dumb_ending = '/info/refs';

/**
 * Asynchronously retrieves URL with a GET request
 *
 * @param str url URL to retrieve
 */
function get(url) {
	var meth = "GET";
	var asyn = true;
	var body = null;

// For Command Line Development
	if (typeof XMLHttpRequest === "undefined") {
		const XMLHttpRequest = require('xhr2');
	}
	
	var req = new XMLHttpRequest();
	req.open(meth, url, asyn);

	req.setRequestHeader('Git-Protocol', 'version=2');

	req.onreadystatechange = () => {
		state = req.readyState;
		status = req.status;
		body = req.responseText;
//	body = req.response.valueOf;

		if (state === XMLHttpRequest.DONE) {
			console.debug(`FGD Response (${status}): ${body}`);
		}
	};

	req.send(body);
}

/**
 * Normalizes URL for further processing
 *
 * @param str url URL to normalize
 * @param str loc current page's HREF
 * 
 * @return str normalized URL
 */
function clean_url(url, loc) {
	if (loc == null && typeof window !== "undefined") {
		var loc = window.location.href;
	}

	var href = URL.parse(url, loc).href;
	return href.replace(/\/$/i, '');
}

/**
 * Source Code Management repo checker
 *
 * Checks different URLs for traces of a source code management repo
 *
 * @param str base URL for checking for traces of SCM repos
 */
function checkSCM(url) {
	if (typeof window === "undefined") {
		var loc = new URL(url);
	} else {
		var loc = new URL(url, window.location.href);
	}

	var git = new URL(clean_url(loc.href) + refinfo_smart_ending, loc.href);

	console.debug(`FGD Location: ${loc.href}`);
	console.debug(`FGD Checking Git: ${git.href}`);
	get(git.href);
}

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

	if (typeof window === "undefined") {
		console.error(`FGD (No Window): Unfortunately, the main function needs a window at the moment...`);
		return 1;
	}

	checkSCM(window.location.href);
	return 0;
}

if (typeof window !== "undefined") {
	main(0, []);
} else if (typeof process !== "undefined" && process.argv !== "undefined") {
	var argc = process.argv.length;
	var argv = process.argv;

	console.debug(`FGD (${argc}): ${argv}`);

	if (argc >= 3) {
		checkSCM(argv[2]);
	}
//main(argc, argv);
}

