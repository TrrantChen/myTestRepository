export default (isDynamic)=>{
    let phrase = 'b.js';
    if(isDynamic){
        phrase += ' is invoked dynamically';
    }
    console.log(phrase);
};
