// import { webFrame } from 'electron';

const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  // const replaceText = (selector, text) => {
  //   let element = document.getElementById(selector);
  //   if (selector) {
  //     element.innerText = text;
  //   }
  // };
  // for (const type of ['chrome', 'node', 'electron']) {
  //   replaceText(`${type}-version`, process[type]);
  // }

  //////////////////////////////////*.ipc.*//////////////////////////////////////////
  // ipcRenderer.on('screenshot-channel', (e, result) => {
  //   document.getElementById('ScreenShotImage').setAttribute('src', result);
  // });

  // const sendDataBtn = document.getElementById('send-data');
  // sendDataBtn.addEventListener('click', () => {
  //   ipcRenderer.send('test-channel1', 'hello world');
  // });

  // ipcRenderer.on('test-channel-res', (e, args) => {
  //   console.log(args);
  // });

  // ipcRenderer.once('test-channel-res', (e, args) => {
  //   console.log(args);
  // });

  ///////////////////////////////////*.ipc.*//////////////////////////////////////////

  ///////////////////////////////////*.process.*//////////////////////////////////////////
  let uptimeBtn = document.getElementById('Button1');
  uptimeBtn.addEventListener('click', () => {
    console.log(process.uptime());
    console.log(process.cpuUsage());
    console.log(process.getCPUUsage().percentCPUUsage);
    // console.log(process.crash());
    console.log(process.versions.electron);
    console.log(process.versions.chrome);
    console.log(process.versions.v8);
    console.log(process.versions.modules);
  });
  ///////////////////////////////////*.process.*//////////////////////////////////////////
});

///////////////////////////////////*.screen.zoom.*//////////////////////////////////////////
// const zoomIn = document.getElementById('zoom-in');
// const zoomOut = document.getElementById('zoom-out');

// zoomIn.addEventListener('click', () => {
//   console.log('zoom it');
// });

// zoomOut.addEventListener('click', () => {
//   console.log('zoom out');
// });
///////////////////////////////////*.screen.zoom.*//////////////////////////////////////////
