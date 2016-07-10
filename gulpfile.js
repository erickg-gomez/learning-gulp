'use strict';

var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({lazy: false});

gulp.task('vet', function(){
    log('Analyzing source with JSHint and JSCS');

    return gulp.src(config.allJs)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe($.jshint.reporter('fail'));
});

///////

function log(msg){
    if(typeof(msg) === 'object'){
        for(var item in msg){
            if(msg.hasOwnproperty(item)){
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    }else{
        $.util.log($.util.colors.blue(msg));
    }
}
