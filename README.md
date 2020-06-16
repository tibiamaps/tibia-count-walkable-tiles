# `tibia-count-walkable-tiles` [![Build status](https://travis-ci.org/tibiamaps/tibia-count-walkable-tiles.svg?branch=main)](https://travis-ci.org/tibiamaps/tibia-count-walkable-tiles)

Given a set of PNGs containing Tibia 11-compatible pathfinding data, `tibia-count-walkable-tiles` calculates the total number of walkable tiles, i.e. the number of tiles that are [not unexplored or non-walkable](https://tibiamaps.io/guides/minimap-file-format#pathfinding-data).

## Installation

```sh
npm install -g tibia-count-walkable-tiles
```

## Usage

```sh
tibia-count-walkable-tiles /path/to/minimap/Minimap_WaypointCost_*.png
```

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |
