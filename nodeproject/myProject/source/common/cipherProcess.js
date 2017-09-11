const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const Rsa = require("node-rsa");

// fs.readFile("./key/rsa_private.key", 'utf-8', (err, data) => {
//   if (err) {
//     console.log(data);
//   } else {
//     console.log(data);
//     var privateKey = new Rsa(data);
//     var test = "tttt";
//     var encrypted = privateKey.encrypt(test, 'base64');
//     console.log("encrypted:" + encrypted);
//     var decrypted = privateKey.decrypt(encrypted, 'utf8');
//     console.log("decrypted:" + decrypted);
//   }
// })

simpleTest4Rsa2();

async function simpleTest4Rsa() {
  let privateKeyData = await getFileDataPromise("./key/rsa_private.key");
  let publicKeyData = await getFileDataPromise("./key/rsa_public_key.pem");
  let privateKey = new Rsa(privateKeyData)
    ,publicKey = new Rsa(publicKeyData)
    ,testStr = "tttt";
  let encrypted = privateKey.encrypt(testStr, 'base64');
  let decrypted = privateKey.decrypt(encrypted, 'utf8');
  console.log(decrypted);

}

function getFileDataPromise(path) {
  let promise = new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data)
      }
    })
  });
  return promise;
}

function simpleTest4Rsa2() {
  let myDecrypter = new Rsa({b:512});
  myDecrypter.setOptions({encryptionScheme: 'pkcs1'})
  let public = myDecrypter.exportKey('public');
  let private = myDecrypter.exportKey('private');
  let testStr = "Test";
  let encryptResut = myDecrypter.encrypt(testStr, "base64");
  console.log(myDecrypter.decrypt(encryptResut, "utf8"));
}

// 
exports.createDecrypter = function() {
  let decrypter = new Rsa({b:512});
  decrypter.setOptions({encryptionScheme: 'pkcs1'});
  let publicKey = decrypter.exportKey('public')
    ,privateKey = decrypter.exportKey('private');

  return {
    'decrypter':decrypter
    ,'publicKey':publicKey
    ,'privateKey':privateKey
  };
};
