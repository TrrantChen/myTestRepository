exports.preventXss = function(str) {
  let result = "";

  if (str !== void 0) {
    result = str.replace(/</g, '&lt').replace(/>/g, "&gt");
  }

  return result;
}