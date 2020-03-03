const c = (isDynamic)=>{
    let phrase = 'c.js';
    if(isDynamic){
        phrase += ' is invoked dynamically';
    }
    console.log(phrase);
};

export {c};
