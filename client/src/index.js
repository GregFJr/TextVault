// Assuming you have installed idb with npm install idb
import { openDB } from 'idb';

// Initialize the IndexedDB database
async function initDB() {
  const db = await openDB('text-editor-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('docs')) {
        db.createObjectStore('docs', { keyPath: 'id' });
      }
    },
  });
  return db;
}

// Save content to IndexedDB
async function saveContent(content) {
  const db = await initDB();
  await db.put('docs', { id: 'singleton', content: content });
}

// Load content from IndexedDB
async function loadContent() {
  const db = await initDB();
  const file = await db.get('docs', 'singleton');
  return file ? file.content : '';
}

// Get the textarea element
const editor = document.getElementById('editor');

// Event listener for textarea input
editor.addEventListener('input', () => {
  // Debounce the input event to avoid saving too frequently
  clearTimeout(window.debounceSave);
  window.debounceSave = setTimeout(() => {
    saveContent(editor.value);
  }, 1000);
});

// Load content when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
  editor.value = await loadContent();
});

// Register the service worker if available
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, err => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
