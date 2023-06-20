# vt-palette-cli
Voxel Tycoon palette image creator

Helper for creating 3D models for Voxel Tycoon game. It converts .obj.meta file to png image, for usage in 3d modelling software

## Install
- Make sure the node is installed on your system
- clone this repo
- go to repo and `npm i`
- after installation run `npm run build`
- add bin directory from repo to your system $PATH

## Usage
From terminal invoke `vt-palette <path/to/obj.meta>`. This will create palette.png file next to obj.meta file.
You can specify output path by providing second argument like this: `vt-palette <path/to/obj.meta> <path/to/save/palette.png>`
