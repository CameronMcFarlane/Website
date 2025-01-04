// Updates the data-theme attribute based on the browser's preference
function updateTheme() {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const htmlElement = document.documentElement;
  htmlElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);
updateTheme();

console.log('Hello, friend! Having a poke around, are we?');
console.log('If you\'re interested in the source code, you\'re welcome to check it out here: https://github.com/CameronMcFarlane/Website');
