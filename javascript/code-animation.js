const codeLines = [
        "def __init__(self):",
        "    self.name = 'Kazu Ho'",
        "    self.timestamp = 1183471811",
        "    return self.name, self.age, self.timestamp",
        "",
        "def music(kazu):",
        "    genres = ['rap', 'hip-hop', 'alt rock', 'indie rock']",
        "    favoriteArtists = ['Kanye West', 'The Killers', '21 Pilots']",
        "    return genres, favoriteArtists",
        "",
        "def skills(kazu):",
        "    webDev = ['HTML/CSS/JS', 'React/Tailwind', 'ThreeJS', 'Firebase']",
        "    otherLangs = ['Python', 'Swift']",
        "    design = ['UI/UX', 'InDesign', 'Illustrator', 'Photoshop']",
        "    videoEditing = ['Da Vinci Resolve']",
        "    ThreeD = ['Blender']",
        "    Soft Skills = ['Leadership', 'Communication', 'Public Speaking']",
        "",
        "# born and raised in the USA !!!",
        "",
    ];
        const codeContainer = document.getElementById("code-container");
        let currentLines = [];
        let charIndex = 0;
        let lineIndex = 0;
        let typingSpeed = 30;
        let linePause = 300;

    function type() {
        if (currentLines.length < 5) {
            const currentLine = codeLines[lineIndex];
            if (charIndex < currentLine.length) {
                currentLines[currentLines.length - 1] = (currentLines[currentLines.length - 1] || '') + currentLine.charAt(charIndex);
                charIndex++;
            } else {
                currentLines.push('');
                charIndex = 0;
                lineIndex = (lineIndex + 1) % codeLines.length;
            }
        } else {
            if (charIndex < codeLines[lineIndex].length) {
                currentLines[currentLines.length - 1] = (currentLines[currentLines.length - 1] || '') + codeLines[lineIndex].charAt(charIndex);
                charIndex++;
            } else {
                currentLines.push('');
                currentLines.shift();
                charIndex = 0;
                lineIndex = (lineIndex + 1) % codeLines.length;
            }
        }

        codeContainer.innerHTML = currentLines.join('\n');
        setTimeout(type, charIndex === 0 ? linePause : typingSpeed);
    }

    currentLines.push('');
    type();