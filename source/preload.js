const { contextBridge } = require('electron');
var SSH = require('simple-ssh');
const command = require("./commands");
contextBridge.exposeInMainWorld('properties', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  validateServer: (server, callback) => validateServerFunc(server, callback),
  easyInstall: (server, callback) => easyInstallFunc(server, callback),

})
function validateServerFunc(server, callback) {
  if (server.id && server.name, server.address, server.password, server.user) {
    console.log(server);

    runCmd(server, command.getOs, getOs, callback, true);
  }
}
function getOs(data,callback, mainCallback,isSuccess) {
  try {
    if(isSuccess){
    console.log(data);
    if (data.split("\n")[1].toLowerCase().match("ubuntu")) {
      mainCallback({ success: true, res: "ubuntu", mainCallback: mainCallback })
    }
    else if (data.split("\n")[1].toLowerCase().match("debian"))
    mainCallback({ success: true, res: "debian", mainCallback: mainCallback })
    else if (data.split("\n")[1].toLowerCase().match("centoos"))
    mainCallback({ success: true, res: "centoos", mainCallback: mainCallback })
  }
  else{
    mainCallback({ success: false, res: data, mainCallback: mainCallback })

  }
  }
  catch (e) {
    mainCallback({ success: false, res: e, mainCallback: mainCallback })

  }
}
function runCmd(server, cmd, callback, mainCallback, end) {

  try {
    var ssh = new SSH({
      host: server.address,
      user: server.user,
      pass: server.password
    });
    ssh.exec(cmd, {
      out: function (stdout) {
        callback(stdout, callback, mainCallback, true);
        if (end)
          ssh.end()
      }
    }).start();



    ;
  }
  catch (e) {
    callback(e, callback, mainCallback, false);
  }
}
function easyInstallFunc(server, callback) {
  validateServerFunc(server, runInstallationCmd);
  function runInstallationCmd(os) {
    if (os.success) {
      if (os.res == "ubuntu" || "debian")
        runCmd(server, command.installV2rayUbuntuStep1, runInstallationCmdStep2, callback);

    }
  }
  function runInstallationCmdStep2(stdout, callback, mainCallback, isSuccess) {
    console.log(stdout);

    if (os.res == "ubuntu" || "debian" && isSuccess)
      runCmd(server, command.installV2rayUbuntuStep2, runInstallationCmdStep3, mainCallback);

  }
  function runInstallationCmdStep3(stdout, callback, mainCallback, isSuccess) {
    console.log(stdout);
    if (isSuccess)
      runCmd(server, command.installV2rayStep3, runInstallationCmdStep4, mainCallback);

  }
  function runInstallationCmdStep4(stdout, callback, mainCallback, isSuccess) {
    console.log(stdout);
    if (isSuccess)
      runCmd(server, command.installV2rayStep4, runInstallationCmdStep5, mainCallback);

  }
  function runInstallationCmdStep4(stdout, callback, mainCallback, isSuccess) {
    console.log(stdout);

    let cmd
    try {
      cmd = stdout.split(": ")[1].replace("):");
    } catch {
      cmd = "64533";
    }
    if (isSuccess)
      runCmd(server, cmd, runInstallationCmdStep5, mainCallback);

  }
  function runInstallationCmdStep5(stdout, callback, mainCallback, isSuccess) {
    console.log(stdout);
    if (isSuccess)
      runCmd(server, command.installV2rayStep6, getQr, mainCallback);

  }
  function getQr(stdout, callback, mainCallback, isSuccess) {
    console.log(stdout);
    if (isSuccess)
      runCmd(server, command.installV2rayStep6, setQr, mainCallback, true);
  }
  function setQr(stdout, callback, mainCallback, isSuccess) {
    console.log(stdout);
    if (isSuccess)
      server.qr = 'vmess://' + stdout.split('\n')[2].split('://')[1];
    mainCallback(server, isSuccess);



  }

}
