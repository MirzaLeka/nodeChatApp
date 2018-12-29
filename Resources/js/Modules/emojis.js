
const emojis = [
  { key: ':)', icon: '🙂' },
  { key: ':D', icon: '😀' },
  { key: ":'(", icon: '😢' },
  { key: ':(', icon: '😟' },
  { key: '>_<', icon: '😠' },
  { key: '^_^', icon: '😊' },
  { key: '._.', icon: '😐' },
  { key: ';)', icon: '😉' },
  { key: '8)', icon: '😎' },
  { key: '-_-', icon: '😑' },
  { key: ':o', icon: '😮' },
  { key: ':O', icon: '😯' },
  { key: '<3', icon: '💔' },
  { key: ':*', icon: '😗' },
  { key: ':/', icon: '😕' }
];

module.exports.getEmoji = (str) => {


  String.prototype.replaceAll = function (str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
  }

  emojis.map((emoji) => {
    if (str.includes(emoji.key)) {
      str = str.replaceAll(emoji.key, emoji.icon);
    }
    
  });

  return str;

};
