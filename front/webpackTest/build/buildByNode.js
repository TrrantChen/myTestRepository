const webpack = require('webpack');
const path = require('path');
const { emptyHtdocs } = require('../util.js');

let config = require(`./${process.argv[2]}`);

if (config) {
    const output_path =  path.resolve(__dirname, '../htdocs');

    // emptyHtdocs(output_path);

    const compiler = webpack(config);
    compiler.apply(new webpack.ProgressPlugin());
    compiler.run((err, stats) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log('success');
        }
    })
}
else {

}
