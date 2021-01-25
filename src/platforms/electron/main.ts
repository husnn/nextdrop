import * as path from 'path';
import { app, BrowserWindow, screen, Menu } from 'electron';

const DEFAULT_WINDOW_SIZE = { width: 900, height: 600 };

// Menu.setApplicationMenu(null);

const createWindow = (width?: number, height?: number) => {
  return new BrowserWindow({
    width: width || DEFAULT_WINDOW_SIZE.width,
    height: height || DEFAULT_WINDOW_SIZE.height,
    webPreferences: {
      nodeIntegration: true
    }
  });
}

app.on('ready', () => {
  let { width, height } = screen.getPrimaryDisplay().workAreaSize;

  width = Math.max(width * 0.5, DEFAULT_WINDOW_SIZE.width);
  height = Math.max(height * 0.5, DEFAULT_WINDOW_SIZE.height);

  const window = createWindow(width, height);

  window.loadURL(
    process.env.NODE_ENV === 'production'
      ? `file://${path.join(__dirname, 'index.html')}`
      : 'http://localhost:3000'
  );
});