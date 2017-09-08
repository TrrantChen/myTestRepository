import $ from 'jquery';
import  * as util from '../../js/common/util'; 
import { generalAjax } from '../../js/common/ajax';
import { getDomCount, action4EverySonDom, ButtonContent, setFrame, printDomTree} from '../../js/common/domoperation';

let encrypter = new JSEncrypt()
  ,userInput = document.querySelector("#user")
  ,passwordInput = document.querySelector("#password")
  ,register = document.querySelector("#register");

$(() => {
  register.addEventListener("click", clickHandle)
})

async function clickHandle(evt) {
  let user = userInput.value
    ,password = passwordInput.value;

  let publicKeyJson = await ajaxPromise({
    url:"http://" + document.domain  + ":8088/getPublicKey" 
    ,dataType:'json'
  });

  let publicKey = publicKeyJson.key;
  encrypter.setPublicKey(publicKey);

  let encryptUser = encrypter.encrypt(user);
  let encryptPassword = encrypter.encrypt(password);

  let result = await ajaxPromise({
    url:"http://" + document.domain  + ":8088/uploadEncryptData"
    ,type:'post'
    ,data:JSON.stringify({user:encryptUser, password:encryptPassword})
    ,contentType:'application/json'
    ,dataType:'json'
  })

  console.log(result);

}

function ajaxPromise(option) {
  let promise = new Promise((resolve, reject) => {
    option.success = resolve;
    option.error = reject;
    generalAjax(option);     
  })

  return promise;
}