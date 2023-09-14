const { remote, ipcRenderer } = require("electron");


document.getElementById('minimizar').addEventListener('click', () => {

 ipcRenderer.send('minimizar')

})

document.getElementById('cerrar').addEventListener('click', () => {

    ipcRenderer.send('cerrar')
    var tabMenu = document.querySelector("#tab-menu");
    // Restablecer la pestaña seleccionada a la pestaña 1
    tabMenu.children[0].click();
   
   })
   
//  document.getElementsByClassName("Salir").addEventListener('click', () => {

//    ipcRenderer.send('cerrar')
  
//   })



// const listItems = document.querySelectorAll(".Salir");

// listItems.forEach(listItem => {
    
//    addEventListener('click', () => {

//      ipcRenderer.send('cerrar')
        
//      })

// });

   // document.getElementById('Print').addEventListener('click', () => {

   //  ipcRenderer.send('print-to-pdf')
   
   // })


// document.getElementById('maxi').addEventListener('click', () => {

//  ipcRenderer.send('maxi')
   
// })























// function getCurrentWindow() {
//   return remote.getCurrentWindow();
// }

// function openMenu(x, y) {
//   ipcRenderer.send(`display-app-menu`, { x, y });
// }

// function minimizeWindow(browserWindow = getCurrentWindow()) {
//   if (browserWindow.minimizable) {
//     // browserWindow.isMinimizable() for old electron versions
//     browserWindow.minimize();
//   }
// }

// function maximizeWindow(browserWindow = getCurrentWindow()) {
//   if (browserWindow.maximizable) {
//     // browserWindow.isMaximizable() for old electron versions
//     browserWindow.maximize();
//   }
// }

// function unmaximizeWindow(browserWindow = getCurrentWindow()) {
//   browserWindow.unmaximize();
// }

// function maxUnmaxWindow(browserWindow = getCurrentWindow()) {
//   if (browserWindow.isMaximized()) {
//     browserWindow.unmaximize();
//   } else {
//     browserWindow.maximize();
//   }
// }

// function closeWindow(browserWindow = getCurrentWindow()) {
//   browserWindow.close();
// }

// function isWindowMaximized(browserWindow = getCurrentWindow()) {
//   return browserWindow.isMaximized();
// }

// module.exports = {
//   getCurrentWindow,
//   openMenu,
//   minimizeWindow,
//   maximizeWindow,
//   unmaximizeWindow,
//   maxUnmaxWindow,
//   isWindowMaximized,
//   closeWindow,
// };