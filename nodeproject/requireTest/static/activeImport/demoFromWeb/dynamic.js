console.log('dynamic');

import('./a.js').then(()=>{
    console.log('a.js is loaded dynamically');
});

import('./b.js').then((module)=>{
    const b = module.default;
    b('isDynamic');
});

import('./c.js').then(({c})=>{
    c('isDynamic');
});
