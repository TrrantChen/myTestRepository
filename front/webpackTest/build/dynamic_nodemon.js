const webpack = require('webpack');

let config = require(`./${process.argv[2]}`);
if (config) {
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
    console.log('config is empty');
}
