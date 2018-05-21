'use strict';

const fs = require('fs');

const Canvas = require('canvas');
const Image = Canvas.Image;

const canvasMap = new Map();
const memoizedCanvasContext = (width, height) => {
	const id = `${width},${height}`;
	if (canvasMap.has(id)) {
		return canvasMap.get(id);
	}
	const canvas = new Canvas(width, height);
	const context = canvas.getContext('2d');
	const result = { canvas, context };
	canvasMap.set(id, result);
	return result;
};

const getPixels = (fileName) => {
	return new Promise((resolve, reject) => {
		fs.readFile(fileName, (error, buffer) => {
			if (error) {
				reject(error);
			}
			const image = new Image();
			image.src = buffer;
			const { width, height } = image;
			const { context } = memoizedCanvasContext(width, height);
			context.drawImage(
				image, 0, 0, width, height
			);
			const pixels = context.getImageData(0, 0, image.width, image.height);
			resolve(pixels);
		});
	});
};

// https://tibiamaps.io/guides/minimap-file-format#pathfinding-data
const UNEXPLORED = { r: 0xFA, g: 0xFA, b: 0xFA };
const NON_WALKABLE = { r: 0xFF, g: 0xFF, b: 0x00 };

const countWalkablePixels = (pixels) => {
	const data = pixels.data;
	let totalWalkableTiles = 0;
	for (let offset = 0; offset < data.length; offset += 4) {
		const r = data[offset];
		const g = data[offset + 1];
		const b = data[offset + 2];
		// Discard alpha channel data; it’s always 0xFF anyway.
		//const a = data[offset + 3];
		if (
			(r == UNEXPLORED.r && b == UNEXPLORED.b && g == UNEXPLORED.g) ||
			(r == NON_WALKABLE.r && b == NON_WALKABLE.b && g == NON_WALKABLE.g)
		) {
			continue;
		}
		++totalWalkableTiles;
	}
	return totalWalkableTiles;
};

const countWalkableTiles = async (fileName) => {
	const pixels = await getPixels(fileName);
	const count = countWalkablePixels(pixels);
	return count;
};

module.exports = {
	countWalkableTiles
};
