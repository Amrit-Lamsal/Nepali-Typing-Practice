document.addEventListener('DOMContentLoaded', function () {
    const sampleTextElement = document.getElementById('sample-text');
    const userInputElement = document.getElementById('user-input');
    const correctCountElement = document.getElementById('correct-count');
    const mistakeCountElement = document.getElementById('mistake-count');

    const sampleText = sampleTextElement.innerText.trim().split(' ');
    let currentWordIndex = 0;
    let correctCount = 0;
    let mistakeCount = 0;
    let lockedWords = [];

    userInputElement.addEventListener('input', function () {
        const userInput = userInputElement.value.trim();
        checkTyping(userInput, false);
    });

    userInputElement.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const userInput = userInputElement.value.trim();
            if (userInput) {
                const isCorrect = checkTyping(userInput, true);
                lockedWords[currentWordIndex] = isCorrect;
                if (isCorrect) {
                    correctCount++;
                } else {
                    mistakeCount++;
                }
                currentWordIndex++;
                userInputElement.value = '';
                updateCounts();
            }
            e.preventDefault();
        }
    });

    function checkTyping(userInput, confirm = false) {
        const userWords = userInput.split(' ');
        let displayText = '';
        let wordIsCorrect = true;

        for (let i = 0; i < sampleText.length; i++) {
            const sampleWord = sampleText[i];
            const userWord = userWords[0];

            if (i < currentWordIndex) {
                if (lockedWords[i]) {
                    displayText += `<span class="correct">${sampleWord}</span> `;
                } else {
                    displayText += `<span class="error">${sampleWord}</span> `;
                }
            } else if (i === currentWordIndex) {
                let checkedWord = '';
                
                // Convert strings to arrays of Unicode characters
                const sampleChars = Array.from(sampleWord);
                const userChars = Array.from(userWord);
                
                // Mark entire word as wrong if lengths don't match
                if (userChars.length > sampleChars.length) {
                    wordIsCorrect = false;
                    checkedWord = `<span class="error">${sampleWord}</span>`;
                } else {
                    // Check each character
                    for (let j = 0; j < sampleChars.length; j++) {
                        const currentChar = userChars[j] || '';
                        if (j < userChars.length) {
                            if (currentChar === sampleChars[j]) {
                                checkedWord += `<span class="correct">${sampleChars[j]}</span>`;
                            } else {
                                wordIsCorrect = false;
                                // Mark all remaining characters as error once we find a mismatch
                                checkedWord += `<span class="error">${sampleChars.slice(j).join('')}</span>`;
                                break;
                            }
                        } else {
                            checkedWord += `<span class="untouched">${sampleChars[j]}</span>`;
                        }
                    }
                }

                if (confirm) {
                    checkedWord = wordIsCorrect ? 
                        `<span class="correct">${sampleWord}</span>` : 
                        `<span class="error">${sampleWord}</span>`;
                }

                displayText += checkedWord + ' ';
            } else {
                displayText += `<span class="untouched">${sampleWord}</span> `;
            }
        }

        sampleTextElement.innerHTML = displayText.trim();
        return wordIsCorrect;
    }

    function updateCounts() {
        correctCountElement.innerText = correctCount;
        mistakeCountElement.innerText = mistakeCount;
    }
});