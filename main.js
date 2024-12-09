const {
  app,
  BrowserWindow,
  Menu,
  utilityProcess
} = require("electron");
const path = require("node:path");
const started = require("electron-squirrel-startup");

let mainWindow;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

app.on("ready", () => {
  // Create the main menu
  const template = [
    // { role: 'appMenu' }
    {
      label: app.name,
      submenu: [
        { role: "about" },
        { type: "separator" }, // Separator added here
        {
          label: "Settings",
          click: () => {
            // Send IPC message to renderer to open Settings modal
            if (mainWindow) {
              mainWindow.webContents.send("open-settings");
            }
          },
        },
        { type: "separator" },
        { role: "quit" },
      ],
    },
    // { role: 'fileMenu' }
    {
      label: "File",
      submenu: [
        { role: "close" }, // or { role: 'quit' } based on needs
      ],
    },
    // You can add other menu items here if necessary
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  /**
   * Create another process that will run backend code
   */
  utilityProcess.fork(path.join(__dirname, "./backend.js"), []);

  // Create BrowserWindow
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: "hidden",
    ...(process.platform !== "darwin" ? { titleBarOverlay: true } : {}),
    webPreferences: {
      nodeIntegration: true, // Enable Node.js integration
      contextIsolation: false, // Disable context isolation
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Optional: Open DevTools for debugging
  // mainWindow.webContents.openDevTools();
});

// Graceful exit
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    processes.forEach(function (proc) {
      proc.kill();
    });
    app.quit();
  }
});
