import './style.css'; // Import the main CSS file

/**
 * Gets the value from the character name input and sends it to the backend.
 */
async function createCharacter() {
    // 1. Get DOM elements
    const nameInput = document.getElementById('char-name-input') as HTMLInputElement;
    const gameOutput = document.getElementById('game-output') as HTMLDivElement;
    
    // 2. Get the character name
    const characterName = nameInput.value.trim();

    if (characterName === '') {
        alert('Please enter a name to begin your adventure!');
        return;
    }

    // 3. Simple Client-Side Character Confirmation
    const welcomeMessage = document.createElement('p');
    welcomeMessage.innerHTML = `**Welcome, ${characterName}!** Your journey is about to begin. (Next step: Connect to backend...)`;
    
    // Clear the current form and display the message
    const appContainer = document.getElementById('app');
    if (appContainer) {
        appContainer.innerHTML = ''; // Clear the entire content
        
        // Re-add title and game output area
        appContainer.innerHTML = `
            <h1>The Adventure of ${characterName}</h1>
            <div id="game-output"></div>
            <div class="game-input-area">
                <input type="text" id="command-input" placeholder="Enter command (e.g., 'look', 'go north')">
                <button id="send-command-button">Send</button>
            </div>
        `;
        
        const newGameOutput = document.getElementById('game-output') as HTMLDivElement;
        
        const initialParagraph = document.createElement('p');
        initialParagraph.innerHTML = `**The adventure begins!** You find yourself at the mouth of a dark, moss-covered cave. The air is damp and silent. What will you do?`;
        
        newGameOutput.appendChild(initialParagraph);
        
        // In a real application, you would replace this client-side message 
        // with a fetch call to your FastAPI backend here.
        
        /* // Example of the fetch call structure (not functional yet):
        try {
            const response = await fetch('http://127.0.0.1:8000/start_game', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: characterName })
            });
            
            const gameData = await response.json();
            // Handle game data response here
            newGameOutput.innerHTML = `<p>${gameData.message}</p>`;

        } catch (error) {
            console.error('Error starting game:', error);
            newGameOutput.innerHTML = `<p style="color:red;">Error connecting to the game server.</p>`;
        } 
        */

    }
}

/**
 * Attaches the event listener once the document is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    const startGameButton = document.getElementById('start-game-button');
    if (startGameButton) {
        startGameButton.addEventListener('click', createCharacter);
    }
});