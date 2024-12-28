// Updates the data-theme attribute based on the browser's preference
function updateTheme() {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const htmlElement = document.documentElement; // Get the <html> element
  htmlElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);
updateTheme();
