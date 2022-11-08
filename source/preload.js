const { contextBridge } = require('electron');
var SSH = require('simple-ssh');
const command = require("./commands");
contextBridge.exposeInMainWorld('properties', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  validateServer: (server, callback) =>  validateServerFunc(server, callback),
  easyInstall: (server, callback) => easyInstallFunc(server, callback),

})
function validateServerFunc(server, callback) {
  if (server.id && server.name, server.address, server.password, server.user) {
    runCmd(server, command.getOs, getOs, callback);
  }
}
function getOs(data, mainCallback) {
  try {
    if (data.split("\n")[1].toLowerCase().match("ubuntu")) {
      mainCallback({ success: "true", res: "ubuntu" })
    }
    else if (data.split("\n")[1].toLowerCase().match("debian"))
      mainCallback({ success: "true", res: "debian" })
    else if (data.split("\n")[1].toLowerCase().match("centoos"))
      mainCallback({ success: "true", res: "centoos" })
  }
  catch (e) {
    mainCallback({ success: "false", res: e })
  }
}
function runCmd(server, cmd, callback, mainCallback) {
  var ssh = new SSH({
    host: server.address,
    user: server.user,
    pass: server.password
  });
  return (ssh.exec(cmd, {
    out: function (stdout) {
      return callback(stdout, mainCallback);
    }
  }).start());
}
function easyInstallFunc(server, callback){

}