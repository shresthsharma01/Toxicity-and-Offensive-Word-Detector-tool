const toxicWords = [
    'ass', 'asshole', 'bastard', 'bitch', 'bullshit', 'cock', 'crap', 'damn', 'dick', 'douche', 'fuck', 'fucker',
    'hell', 'piss', 'shit', 'slut', 'whore', 'hate', 'kill', 'die', 'stupid', 'idiot', 'moron', 'retard', 'fag',
    'nigger', 'cunt', 'twat', 'prick'
];

const toxicPhrases = [
    'kill yourself', 'go die', 'deserve to die', "don't deserve to live", 'deserve to live', 'should die',
    'wish you dead', 'hate you', 'go to hell', 'son of a bitch', 'motherfucker', 'eat shit', 'fuck off', 'piece of shit'
];

function detectWords() {
    const originalInput = document.getElementById('inputText').value;
    const inputLower = originalInput.toLowerCase();
    const output = document.getElementById('output');
    
    if (!originalInput.trim()) {
        output.innerHTML = '<p class="warning">Please enter some text to analyze.</p>';
        output.classList.remove('clean');
        return;
    }

    const wordRegex = new RegExp(`\\b(${toxicWords.join('|')})\\b`, 'gi');
    const phraseRegex = new RegExp(`\\b(${toxicPhrases.join('|')})\\b`, 'gi');

    const wordMatches = inputLower.match(wordRegex) || [];
    const phraseMatches = inputLower.match(phraseRegex) || [];

    const foundWords = [...new Set(wordMatches.map(m => m.toLowerCase()))];
    const foundPhrases = [...new Set(phraseMatches.map(m => m.toLowerCase()))];
    const totalUnique = foundWords.length + foundPhrases.length;

    let highlightedText = originalInput.replace(wordRegex, '<span class="highlight">$&</span>');
    highlightedText = highlightedText.replace(phraseRegex, '<span class="highlight">$&</span>');

    if (totalUnique === 0) {
        output.innerHTML = `
            <p style="color: #27ae60; font-weight: 500; margin-bottom: 15px;">✅ Your text is clean! No toxic words or phrases detected.</p>
            <div class="highlighted-text">${escapeHtml(originalInput)}</div>
        `;
        output.classList.add('clean');
    } else {
        let details = '';
        if (foundWords.length > 0) {
            details += `<strong>Offensive words:</strong> ${foundWords.join(', ')}<br>`;
        }
        if (foundPhrases.length > 0) {
            details += `<strong>Toxic phrases:</strong> ${foundPhrases.join(', ')}`;
        }

        output.innerHTML = `
            <p class="warning">⚠️ Detected ${totalUnique} toxic/offensive item(s) in your text.</p>
            <div class="highlighted-text">${highlightedText}</div>
            <div class="offensive-words">
                ${details}
            </div>
            <p style="color: #7f8c8d; font-style: italic;">Context matters—rephrase for kinder communication! 💬</p>
        `;
        output.classList.remove('clean');
    }
}

function clearText() {
    document.getElementById('inputText').value = '';
    document.getElementById('output').innerHTML = '';
    document.getElementById('inputText').focus();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.getElementById('inputText').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
        detectWords();
    }
});

document.getElementById('inputText').focus();
