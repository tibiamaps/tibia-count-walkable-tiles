#!/usr/bin/env node

'use strict';

const { countWalkableTiles } = require('./index.js');
const info = require('./package.json');

if (process.argv.length == 2) {
	console.log(`${info.name} v${info.version} - ${info.homepage}`);
	console.log('\nUsage:\n');
	console.log(`\t${info.name} /path/to/minimap/Minimap_WaypointCost_*.png`);
	process.exit(1);
}

(async () => {
	const fileNames = process.argv.slice(2);
	let total = 0;
	for (const fileName of fileNames) {
		const count = await countWalkableTiles(fileName);
		total += count;
	}
	console.log(total);
})();
