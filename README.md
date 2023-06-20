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
You can specify output directory by providing second argument like this: `vt-palette <path/to/obj.meta> <path/to/output/dir>`

Script also allows to specify which material maps to create, just pass flags listed bellow:
-d: Include diffuse map image
-e: Include emission map image
-g: Include glassiness map image
-s: Include smoothness map image
-sp: Include specular map image
-a: Include all maps images
