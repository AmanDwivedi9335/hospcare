#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const tscBin = require.resolve('typescript/bin/tsc');
const workspaceRoot = path.resolve(fileURLToPath(new URL('../..', import.meta.url)));
const tsconfigPath = path.join(workspaceRoot, 'apps/api/tsconfig.app.json');
const distDir = path.join(workspaceRoot, 'apps/api/dist');
const entryPoint = path.join(distDir, 'main.js');
const assetsSource = path.join(workspaceRoot, 'apps/api/src/assets');
const assetsTarget = path.join(distDir, 'assets');

let serverProcess;
let distWatcher;
let assetWatchers = [];
let restartTimer;

function log(message) {
  console.log(`[api-dev] ${message}`);
}

function copyAssets() {
  if (!fs.existsSync(assetsSource)) {
    return;
  }
  fs.rmSync(assetsTarget, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(assetsTarget), { recursive: true });
  fs.cpSync(assetsSource, assetsTarget, { recursive: true });
  log('Copied static assets.');
}

function watchAssets(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  const watcher = fs.watch(dir, { recursive: false }, (eventType, fileName) => {
    if (!fileName) {
      return;
    }
    const changed = path.join(dir, fileName.toString());
    try {
      if (fs.existsSync(changed) && fs.statSync(changed).isDirectory()) {
        assetWatchers.push(...watchAssets(changed));
      }
    } catch {
      // Ignore race conditions when files are removed mid-event.
    }
    copyAssets();
  });
  assetWatchers.push(watcher);
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      watchAssets(path.join(dir, entry.name));
    }
  }
}

function clearAssetWatchers() {
  for (const watcher of assetWatchers) {
    watcher.close();
  }
  assetWatchers = [];
}

function scheduleRestart() {
  if (restartTimer) {
    clearTimeout(restartTimer);
  }
  restartTimer = setTimeout(() => {
    restartTimer = undefined;
    launchServer();
  }, 150);
}

function ensureDistWatcher() {
  if (distWatcher) {
    return;
  }
  fs.mkdirSync(distDir, { recursive: true });
  distWatcher = fs.watch(distDir, { recursive: false }, (eventType, fileName) => {
    if (!fileName) {
      return;
    }
    const changedPath = path.resolve(distDir, fileName.toString());
    if (changedPath === entryPoint) {
      scheduleRestart();
    }
  });
}

function launchServer() {
  if (!fs.existsSync(entryPoint)) {
    return;
  }
  copyAssets();
  clearAssetWatchers();
  if (fs.existsSync(assetsSource)) {
    watchAssets(assetsSource);
  }
  if (serverProcess && serverProcess.exitCode === null) {
    serverProcess.kill();
  }
  serverProcess = spawn(process.execPath, [entryPoint], {
    cwd: workspaceRoot,
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: process.env.NODE_ENV ?? 'development',
    },
  });
  serverProcess.on('exit', (code) => {
    if (code !== null && code !== 0) {
      log(`API process exited with code ${code}. Waiting for changes to restart...`);
    }
  });
  log('API server is ready.');
}

async function waitForEntry() {
  while (!fs.existsSync(entryPoint)) {
    await delay(200);
  }
}

function shutdown(code = 0) {
  distWatcher?.close();
  clearAssetWatchers();
  if (serverProcess && serverProcess.exitCode === null) {
    serverProcess.kill();
  }
  if (tscProcess.exitCode === null) {
    tscProcess.kill();
  }
  process.exit(code);
}

log(`Using TypeScript binary at ${tscBin}`);
log('Starting the TypeScript watcher...');
const tscProcess = spawn(process.execPath, [tscBin, '--project', tsconfigPath, '--watch', '--outDir', distDir], {
  cwd: workspaceRoot,
  stdio: 'inherit',
});

tscProcess.on('exit', (code) => {
  log(`TypeScript compiler exited with code ${code ?? 0}.`);
  shutdown(code ?? 1);
});
tscProcess.on('error', (error) => {
  console.error('[api-dev] Failed to launch the TypeScript watcher:', error);
  shutdown(1);
});

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

try {
  log('Waiting for the initial API build to finish...');
  await waitForEntry();
  ensureDistWatcher();
  log('Booting the API process...');
  launchServer();
} catch (err) {
  console.error(err);
  shutdown(1);
}
