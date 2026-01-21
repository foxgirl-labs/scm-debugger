// The output format is slightly different between smart/dumb if server is
// smart. Else, it may just be a dumb server sending a static file over
// regardless of query parameters. We have to check both formats regardless
const git_refinfo_smart_ending = '/info/refs?service=git-upload-pack';
const git_refinfo_dumb_ending = '/info/refs';

// Fossil Client Request Headers/Settings
const fossil_http_method = 'POST';
const fossil_debug_content_type = 'application/x-fossil-debug';
const fossil_content_type = 'application/x-fossil';
const fossil_content_length = 0;


/*
 * Load global constants
 *
 * TODO: Fix so it works both as a firefox extension and node module
 */
//import { TAG, code } from './global.mjs';
var TAG = 'FSD';
var code = Object.freeze({
  OK:    0,
  NOWIN: 9
});

/**
 * Asynchronously retrieves URL with a GET request
 *
 * @param  @string url URL to retrieve
 */
async function get(url) {
	var meth = "GET";
	var asyn = true;
	var body = null;

	try {
		const head = new Headers();
		head.append('Git-Protocol', 'version=2');

		const response = await fetch(url, {
			method: meth,
			headers: head,
			body: body
		});
		
		if (!response.ok) {
			throw new Error(`${TAG} Response (${status}): ${body}`);
		}

//	TODO: Research parsing text with binary-aspects
//	https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView
		const bytes = await response.bytes();
		console.debug(bytes);
	} catch(error) {
		console.error(error.message);
	}	
}

/**
 * Normalizes URL for further processing
 *
 * @param  @string url URL to normalize
 * @param  @string loc current page's HREF
 * 
 * @return @string normalized URL
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
 * @param  @string base URL for checking for traces of SCM repos
 */
function checkSCM(url) {
	if (typeof window === "undefined") {
		var loc = new URL(url);
	} else {
		var loc = new URL(url, window.location.href);
	}

	var git = new URL(clean_url(loc.href) + git_refinfo_smart_ending, loc.href);

	console.debug(`${TAG} Location: ${loc.href}`);
	console.debug(`${TAG} Checking Git: ${git.href}`);
	get(git.href);
}

/**
 * Main function
 *
 * Allows loading all functions into memory before running
 *
 * @param  @int      argc number of parameters in argv
 * @param  @string[] argv parameters to control program flow
 * 
 * @return @int      exit status code
 */
function main(argc, argv) {
	if (argc == null || argv == null) {
		var argc = 0;
		var argv = [];
	};

	if (typeof window === "undefined") {
		console.error(`${TAG} (No Window): Unfortunately, the main function needs a window at the moment...`);
		return code.NOWIN;
	}

	checkSCM(window.location.href);
	return code.OK;
}

if (typeof window !== "undefined") {
	main(0, []);
} else if (typeof process !== "undefined" && process.argv !== "undefined") {
	var argc = process.argv.length;
	var argv = process.argv;

	console.debug(`${TAG} (${argc}): ${argv}`);

	if (argc >= 3) {
		checkSCM(argv[2]);
	}
//main(argc, argv);
}

