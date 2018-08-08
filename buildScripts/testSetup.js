// this file not transpiled, so must use CommJS and ESS

//register babel to transpile b4 our test run
require ('babel-register')();

//disable webpack features that Mocha doesn't understand
require.extensions['.css']=function(){};