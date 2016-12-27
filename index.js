let gutil = require('gulp-util');
let through = require('through2');
let postcss = require('postcss');

const PLUGIN_NAME = 'gulp-css-mod-fixer';

module.exports = function(options, sync) {
    return through.obj(function(file, enc, cb) {
        let opts;

        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
        }

        if (!file.contents.length) {
            return cb(null, file);
        }

        let cssAST = postcss.parse(file.contents);

        cssAST.walkRules(rule => {
            rule.selectors = rule.selectors.map(selector => {
                if (selector.includes('__') && selector.indexOf('body ') === -1) {
                    return ('body ' + selector);
                } else {
                    return selector;
                }
            });
        });

        file.contents = Buffer.from(cssAST.toString());

        cb(null, file);
    });
};
