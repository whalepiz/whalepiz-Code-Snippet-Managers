/// Install required packages:
// npm install fs-extra inquirer --save

const fs = require('fs-extra');
const inquirer = require('inquirer');

const SNIPPETS_FILE_PATH = 'snippets.json';

async function createSnippet() {
  try {
    // Load existing snippets
    const snippets = await loadSnippets();

    // Prompt user for snippet details
    const snippetDetails = await inquirer.prompt([
      { type: 'input', name: 'name', message: 'Enter snippet name:' },
      { type: 'editor', name: 'code', message: 'Enter snippet code:' },
    ]);

    // Add the new snippet to the list
    snippets.push({
      name: snippetDetails.name,
      code: snippetDetails.code,
    });

    // Save updated snippets to file
    await saveSnippets(snippets);

    console.log(`Snippet '${snippetDetails.name}' added successfully.`);
  } catch (error) {
    console.error('Error creating snippet:', error);
  }
}

async function listSnippets() {
  try {
    // Load existing snippets
    const snippets = await loadSnippets();

    // Display a list of available snippets
    snippets.forEach((snippet, index) => {
      console.log(`${index + 1}. ${snippet.name}`);
    });
  } catch (error) {
    console.error('Error listing snippets:', error);
  }
}

async function loadSnippets() {
  try {
    // Read snippets from file or return an empty array if the file doesn't exist
    const snippets = await fs.readJson(SNIPPETS_FILE_PATH, { throws: false }) || [];
    return snippets;
  } catch (error) {
    console.error('Error loading snippets:', error);
    return [];
  }
}

async function saveSnippets(snippets) {
  try {
    // Save snippets to file
    await fs.writeJson(SNIPPETS_FILE_PATH, snippets);
  } catch (error) {
    console.error('Error saving snippets:', error);
  }
}

// Example Usage:

// Uncomment and run one of the functions below
// createSnippet();
// listSnippets();
