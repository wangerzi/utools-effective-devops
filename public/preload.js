const {readFileSync, writeFileSync, mkdirSync} = require('fs');
const path = require('path');

console.log("preload js")

window.readMobileConfig = function (filePath) {
  if (!filePath || !filePath.match(/\.mobileconfig$/i)) {
    throw new Error('You can only read .mobileconfig file')
  }
  return readFileSync(filePath).toString();
}

window.saveTmpFile = function (fileName, content) {
  const tmpDir = utools.getPath('temp');
  const saveDir = path.join(tmpDir, "mobile-tmp-" + new Date().getTime())
  mkdirSync(saveDir)
  const savePath = path.join(saveDir, fileName)

  writeFileSync(savePath, content)

  return savePath
}
