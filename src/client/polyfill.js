// Babel 7.x provides an experimental option of preset-env functionality which is 'useBuiltIns: usage'
// It can reduce bundler polyfill size but cannot work correctly with options 'include' according to
// https://github.com/babel/babel/issues/8932#issuecomment-435923658
// So instead of using option 'include' or 'useBuiltIns: entry', we have to manually add some here

// Some UI toolkit (eg. iview) uses this without shim
import 'core-js/modules/es6.string.includes'
// https://github.com/babel/babel/pull/7646 resolved.
import 'core-js/modules/es6.promise'
import 'core-js/modules/es7.promise.finally'
