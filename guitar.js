(function() {
    const root = document.documentElement;
    const fretboard = document.querySelector('.fretboard');
    const singleFretMarkPositions = [3, 5, 7, 9, 15, 17];
    const doubleFretMarkPositions = [12, 24];
    
    let numberOfFrets = 15;
    let numberOfStrings = 6;
    
    const app = {
        init() {
         this.setupFretboard();
        },
        setupFretboard() {
            fretboard.innerHTML = '';
            // Add strings to fretboard
            for (let i = 0; i < numberOfStrings; i++) {
                let string = tools.createElement('div');
                string.classList.add('string');
                fretboard.appendChild(string);
             
                // Create frets
                for (let fret = 0; fret <= numberOfFrets; fret++) {
                    let noteFret = tools.createElement('div');
                    noteFret.classList.add('note-fret');
                    string.appendChild(noteFret);
                    
                    // Add single fret marks
                    if (i === 0 && singleFretMarkPositions.indexOf(fret) !== -1) {
                        noteFret.classList.add('single-fretmark');
                    }
    
                    if (i === 0 && doubleFretMarkPositions.indexOf(fret) !== -1) {
                        let doubleFretMark = tools.createElement('div');
                        doubleFretMark.classList.add('double-fretmark');
                        noteFret.appendChild(doubleFretMark);
                    }
    
                }
            }
        },
    }
    
    const tools = {
        createElement(element, content) {
            element = document.createElement(element);
            if (arguments.length > 1) {
                element.innerHTML = content;
            }
            return element;
        }
    }
    
    
    app.init();
    })();
    
    