
function query() {
    // let localEccX = document.querySelector('#localEccX').value;
    // let localEccY = document.querySelector('#localEccY').value;
    // let pwdstr = document.querySelector('#pwdstr').value;
    var localEccX = "dd8ed256555a4b748b9ea17de33449e7b578571f2f93917637fa3a6d3bdd6494";
    var localEccY = "dfedf198794efef8f69931aaea07f6b95556d464ddcfe8821aff0b3ffa8f93ef";
    var publicKey = "D275807D2EAD211604D5A5EC42B9EB4F9BD7AE0624A8D1CBAF577CC9656CE5BEC2C31ABC4271C1368447EBC79B62F84117CE87DD00767DF8A3F506C3693843003AC55DA4745C48C70F3045A00CDF6F44A187FFDA5527B4F65CE2519AE11E2AD2907E78AE2B5C8B4F5F0FE680D93D40148893829A9188E4B1F5A74B96DFAFD5F5";

    let pwdstr = "13157681076778308aben2612";
    let pwdData = CryptoJS.enc.Utf8.parse(pwdstr);
    let cipherMode = SM2CipherMode.C1C3C2;
    let cipher = new SM2Cipher(cipherMode);
    let userKey = cipher.CreatePoint(localEccX, localEccY);
    pwdData = cipher.GetWords(pwdData.toString());
    let encryptData = cipher.Encrypt(userKey, pwdData);
    let sm2pwd = getSM2Pwd(encryptData.toUpperCase());
    document.querySelector('textarea').value = sm2pwd;
}

function getSM2Pwd(sm2pwd) {
    return 'CN-S' + sm2pwd;
}

