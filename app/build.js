#!/usr/bin/nodejs

var browserify = require('browserify'),
    fs = require('fs'),
    outFile = '../app.js',
    mapFile = outFile+'.map',
    staticFile = '../static.js',
    staticMapFile = staticFile+'.map',
    tsify = require('tsify');

/*
 * Determine static dependencies to add to a single file, once, and exclude from the main build (makes things faster).
 */
var depends = JSON.parse(
                    fs.readFileSync('package.json', { encoding: 'utf8' })
                ).dependencies;

var external = Object.keys(depends);

if(!fs.existsSync(staticFile)){
    console.log('Building static file.');
    browserify([], {debug: true})
        .require(external)
        .plugin('minifyify', {map: staticMapFile, output: staticMapFile})
        .bundle()
        .pipe(fs.createWriteStream(staticFile, 'utf8'));
}
else {
    console.log('Static file exists. Delete to rebuild.');
}

var app = browserify({entries: ['app.ts'], debug: true});
console.log('Ignoring modules included in static file: '+external.join(', '));
for(var e in external){
     app.external(external[e]);
}
app
    .plugin('tsify')
//    .plugin('minifyify', {map: mapFile, output: mapFile})
    .bundle()
    .on('error', function (error) { console.error(error.toString()); })
    .pipe(fs.createWriteStream(outFile, 'utf8'));
