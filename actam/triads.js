/*TODO:
.Make so that it is visible what string you have chosen
.implement metronome and autogenerated triads over time
*/
















//defining useful constants and variables
const twelveNotesString = [["C5","C#5","Db5","D5","D#5","Eb5","E4","F4","F#4","Gb4","G4","G#4","Ab4","A4","A#4","Bb4","B4"], //1st string
                           ["C4","C#4","Db4","D4","D#4","Eb4","E4","F4","F#4","Gb4","G4","G#4","Ab4","A4","A#4","Bb4","B3"], //2nd string
                           ["C4","C#4","Db4","D4","D#4","Eb4","E4","F4","F#4","Gb4","G3","G#3","Ab3","A3","A#3","Bb3","B3"], //3rd
                           ["C4","C#4","Db4","D3","D#3","Eb2","E3","F3","F#3","Gb3","G3","G#3","Ab3","A3","A#3","Bb3","B3"], //4th
                           ["C3","C#3","Db3","D3","D#3","Eb2","E3","F3","F#3","Gb3","G3","G#3","Ab3","A2","A#2","Bb2","B2"], //5th
                           ["C3","C#3","Db3","D3","D#3","Eb2","E2","F2","F#2","Gb2","G2","G#2","Ab2","A2","A#2","Bb2","B2"], //6th
                           ];
const everyNoteOnTheStrings =["E2","F2","F#2","G2","G#2","A2","A#2","B2","C3","C#3","D3","D#3","E3","F3","F#3","G3","G#3","A3","A#3","B3","C4","C#4","D4","D#4","E4","F4","F#4","G4","G#4","A4","A#4","B4","C5","C#5","D5","D#5"];
var rootNote="C3"; //initial root note
var inversion=0;
var currentTriad=0;
var currentStringNumber=3;
var metronomeDisabled=0;
var autoplayDisabled=0;






function displayNewTriad(){

    var selectedNotes = [];
    var selectedTriads = [];
    var selectedStrings = [];

    //creating the pool of notes as selected in the checkbox
    let checkboxes1 = document.querySelectorAll('input[name="17notes"]:checked');
    checkboxes1.forEach((checkbox) => {
        selectedNotes.push(checkbox.value);
    });

    let checkboxes2 = document.querySelectorAll('input[name="4triads"]:checked');
    checkboxes2.forEach((checkbox) => {
        selectedTriads.push(checkbox.value);
    });
    
    let checkboxes3 = document.querySelectorAll('input[name="4strings"]:checked');
    checkboxes3.forEach((checkbox) => {
        selectedStrings.push(checkbox.value);
    });

    var currentStringText=generateRandomString(selectedStrings);

    var noteWithNumber = ((getRandomNoteFromString(currentStringNumber,selectedNotes)).toString()); //casting as a string
    var noteWithoutNumber = noteWithNumber.substring(0,noteWithNumber.length-1); //removing the note number so that the user
                                                                                 //is not confused when playing the instrument
    var triadOfANote = noteWithoutNumber + generateRandomTriad(selectedTriads);
    document.getElementById("displaytriad").innerHTML = triadOfANote;
    document.getElementById("displaystring").innerHTML = currentStringText;
    
}

function generateRandomTriad(selectedTriads){
    const triadsArray = [" Maj"," Min"," Aug"," Dim"]; //all the 4 possible triads
    var i=0;

    var triadsSelection=[];
     while(i<selectedTriads.length){
        triadsSelection.push(triadsArray[selectedTriads[i]]);
        i++;
    }
    
    const randomIndex = Math.floor(Math.random()*triadsSelection.length); //choosing one random triad among the four
    currentTriad=parseInt(selectedTriads[randomIndex]);
    return triadsSelection[randomIndex];
}

function getRandomNoteFromString(stringNumber,selectedNotes){
    
    const NotesArray = getAvailableNotesFromString(stringNumber,selectedNotes);

    // get a random index value
    const randomIndex = Math.floor(Math.random()*NotesArray.length);

    // get the desired random note from the relative 17notes array
    rootNote = NotesArray[randomIndex];
    return rootNote;
}

function getAvailableNotesFromString(stringNumber,selectedNotes){
    var i=0;
    var NoteSelection = [];
    
    while(i<selectedNotes.length){
        NoteSelection.push(twelveNotesString[stringNumber-1][selectedNotes[i]]);
        i++;
    }
    return NoteSelection;
}




function generateRandominversion(){
    inversion=getRandomInt(3);
    //Math.floor(Math.random() *3);
}

function generateRandomString(selectedStrings){
    const stringsArray = [" 3rd String "," 4rd String "," 5rd String "," 6rd String "]; //all the 4 possible strings
    var i=0;

    var stringSelection=[];
     while(i<selectedStrings.length){
        stringSelection.push(stringsArray[selectedStrings[i]]);
        i++;
    }
    
    const randomIndex = Math.floor(Math.random()*stringSelection.length); //choosing one random String among the four
    currentStringNumber=3+parseInt(selectedStrings[randomIndex]);
    return stringSelection[randomIndex];
}











//////////AUDIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO




var beat=[];
beat[0] = new Audio('beat.mp3');
beat[1] = new Audio('beat.mp3');
beat[2] = new Audio('beat.mp3');
beat[3] = new Audio('beat.mp3');
beat[4] = new Audio('beat.mp3');
beat[5] = new Audio('beat.mp3');
beat[6] = new Audio('beat.mp3');
beat[7] = new Audio('beat.mp3');
beatCount=0;
var milliseconds=1000*60/document.getElementById("myRange").value;


async function generateSound(){


    var midiNoteToBePlayed=[[]];
    switch(currentTriad){
        case 0: 
                midiNoteToBePlayed[0]=generateMajTriad(0);
                midiNoteToBePlayed[1]=generateMajTriad(1);
                midiNoteToBePlayed[2]=generateMajTriad(2);
        break;
        case 1:
                midiNoteToBePlayed[0]=generateMinTriad(0);
                midiNoteToBePlayed[1]=generateMinTriad(1);
                midiNoteToBePlayed[2]=generateMinTriad(2);
        break;
        case 2:
                midiNoteToBePlayed[0]=generateAugTriad(0);
                midiNoteToBePlayed[1]=generateAugTriad(1);
                midiNoteToBePlayed[2]=generateAugTriad(2);
        break;
        case 3: 
                midiNoteToBePlayed[0]=generateDimTriad(0);
                midiNoteToBePlayed[1]=generateDimTriad(1);
                midiNoteToBePlayed[2]=generateDimTriad(2);
        break;
        default:
        alert("Couldn't find the triad :c");
    }


    //REPRODUCING THE SOUND!
    //sorting in the right order
    var SortedfirstNotes=[midiNoteToBePlayed[0][0],midiNoteToBePlayed[1][0],midiNoteToBePlayed[2][0]].sort(function(a, b){return a - b});



  
    var i=0;
    //IDENTIFYING THE LOWEST CHORD TONE INSIDE THE STRING
    if( SortedfirstNotes[0]==midiNoteToBePlayed[0][0]){i=0;}
    if( SortedfirstNotes[0]==midiNoteToBePlayed[1][0]){i=1;}
    if( SortedfirstNotes[0]==midiNoteToBePlayed[2][0]){i=2;}
    
    
    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    playMyNote(midiNoteToBePlayed[i][0]);
    await sleep(milliseconds);

    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    playMyNote(midiNoteToBePlayed[i][1]);
    await sleep(milliseconds);

    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    playMyNote(midiNoteToBePlayed[i][2]);
    await sleep(milliseconds);
    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    await sleep(milliseconds);


    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    playMyTriad(midiNoteToBePlayed[i][0],midiNoteToBePlayed[i][1],midiNoteToBePlayed[i][2]);
    await sleep(milliseconds);
    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    await sleep(milliseconds);
    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    await sleep(milliseconds);
    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    await sleep(milliseconds);

    //IDENTIFYING THE SECOND LOWEST CHORD TONE INSIDE THE STRING
    if( SortedfirstNotes[1]==midiNoteToBePlayed[0][0]){i=0;}
    if( SortedfirstNotes[1]==midiNoteToBePlayed[1][0]){i=1;}
    if( SortedfirstNotes[1]==midiNoteToBePlayed[2][0]){i=2;}
    
    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    playMyNote(midiNoteToBePlayed[i][0]);
    await sleep(milliseconds);

    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    playMyNote(midiNoteToBePlayed[i][1]);
    await sleep(milliseconds);

    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    playMyNote(midiNoteToBePlayed[i][2]);
    await sleep(milliseconds);
    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    await sleep(milliseconds);


    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    playMyTriad(midiNoteToBePlayed[i][0],midiNoteToBePlayed[i][1],midiNoteToBePlayed[i][2]);
    await sleep(milliseconds);
    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    await sleep(milliseconds);
    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    await sleep(milliseconds);
    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    await sleep(milliseconds);


    //IDENTIFYING THE HIGHEST CHORD TONE INSIDE THE STRING
    if( SortedfirstNotes[2]==midiNoteToBePlayed[0][0]){i=0;}
    if( SortedfirstNotes[2]==midiNoteToBePlayed[1][0]){i=1;}
    if( SortedfirstNotes[2]==midiNoteToBePlayed[2][0]){i=2;}
    
    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    playMyNote(midiNoteToBePlayed[i][0]);
    await sleep(milliseconds);

    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    playMyNote(midiNoteToBePlayed[i][1]);
    await sleep(milliseconds);

    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    playMyNote(midiNoteToBePlayed[i][2]);
    await sleep(milliseconds);
    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    await sleep(milliseconds);


    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    playMyTriad(midiNoteToBePlayed[i][0],midiNoteToBePlayed[i][1],midiNoteToBePlayed[i][2]);
    await sleep(milliseconds);
    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    await sleep(milliseconds);
    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    await sleep(milliseconds);
    milliseconds=1000*60/document.getElementById("myRange").value;
    playMetronome();
    await sleep(milliseconds);

}


async function playMetronome(){
    if(!metronomeDisabled){beat[beatCount].play();}
    beatCount=beatCount+1;
    if (beatCount==8){beatCount=beatCount-8};
}


function sleep(ms) {
    return new Promise(val => setTimeout(val, ms));
}


//The arguments are the type of inversion and the string number of the lowest string in the triad
function generateMinTriad(inversion){
    //Defining the midi values of the triad for every inversion
    var firstmidi =  Tone.Frequency(rootNote).toMidi();
    var secondmidi = firstmidi+3;
    var thirdmidi =  secondmidi+4;
    //Adjusting desired pitch
    if (inversion==0){
        //neck transposition Mod12 when the triad is not playable on the first frets
        if (!(twelveNotesString[-1+currentStringNumber-2].includes(Tone.Frequency(thirdmidi, "midi").toNote()))){
            firstmidi = firstmidi+12;
            secondmidi = secondmidi+12;
            thirdmidi = thirdmidi+12;
        }
    
    }
    if(inversion==1){
        //Inverting the triad;
        firstmidi=firstmidi+12;
        //neck transposition Mod12 when the triad is not playable on the first frets
        if (!(twelveNotesString[-1+currentStringNumber-2].includes(Tone.Frequency(firstmidi, "midi").toNote()))){
            firstmidi = firstmidi-12;
            secondmidi = secondmidi-12;
            thirdmidi = thirdmidi-12;
        }

    }
    if(inversion==2){
        //Inverting the triad
        firstmidi=firstmidi+12;
        secondmidi=secondmidi+12;

        //neck transposition Mod12 when the triad is not playable on the first frets
        if (!(twelveNotesString[-1+currentStringNumber-2].includes(Tone.Frequency(secondmidi, "midi").toNote()))){
            firstmidi = firstmidi-12;
            secondmidi = secondmidi-12;
            thirdmidi = thirdmidi-12;
        }
    }

    //returning the desired triad
    if(inversion==0) return([firstmidi,secondmidi,thirdmidi]);
    if(inversion==1) return([secondmidi,thirdmidi,firstmidi]);
    if(inversion==2) return([thirdmidi,firstmidi,secondmidi]);
}


function generateMajTriad(inversion){
    //Defining the notes of the triad for every inversion, Notes are for example "E4","C5","G#2"
    var firstmidi =  Tone.Frequency(rootNote).toMidi();
    var secondmidi = firstmidi+4;
    var thirdmidi =  secondmidi+3;

    //Adjusting desired pitch
    if (inversion==0){
        //neck transposition Mod12 when the triad is not playable on the first frets
        if (!(twelveNotesString[-1+currentStringNumber-2].includes(Tone.Frequency(thirdmidi, "midi").toNote()))){
            firstmidi = firstmidi+12;
            secondmidi = secondmidi+12;
            thirdmidi = thirdmidi+12;
        }
    
    }
    if(inversion==1){
        //Inverting the triad;
        firstmidi=firstmidi+12;
        //neck transposition Mod12 when the triad is not playable on the first frets
        if (!(twelveNotesString[-1+currentStringNumber-2].includes(Tone.Frequency(firstmidi, "midi").toNote()))){
            firstmidi = firstmidi-12;
            secondmidi = secondmidi-12;
            thirdmidi = thirdmidi-12;
        }

    }
    if(inversion==2){
        //Inverting the triad
        firstmidi=firstmidi+12;
        secondmidi=secondmidi+12;

        //neck transposition Mod12 when the triad is not playable on the first frets
        if (!(twelveNotesString[-1+currentStringNumber-2].includes(Tone.Frequency(secondmidi, "midi").toNote()))){
            firstmidi = firstmidi-12;
            secondmidi = secondmidi-12;
            thirdmidi = thirdmidi-12;
        }
    }

    //returning the desired triad
    if(inversion==0) return([firstmidi,secondmidi,thirdmidi]);
    if(inversion==1) return([secondmidi,thirdmidi,firstmidi]);
    if(inversion==2) return([thirdmidi,firstmidi,secondmidi]);
}

function generateAugTriad(inversion){
    //Defining the notes of the triad for every inversion, Notes are for example "E4","C5","G#2"
    var firstmidi =  Tone.Frequency(rootNote).toMidi();
    var secondmidi = firstmidi+4;
    var thirdmidi =  secondmidi+4;

    //Adjusting desired pitch
    if (inversion==0){
        //neck transposition Mod12 when the triad is not playable on the first frets
        if (!(twelveNotesString[-1+currentStringNumber-2].includes(Tone.Frequency(thirdmidi, "midi").toNote()))){
            firstmidi = firstmidi+12;
            secondmidi = secondmidi+12;
            thirdmidi = thirdmidi+12;
        }
    
    }
    if(inversion==1){
        //Inverting the triad;
        firstmidi=firstmidi+12;
        //neck transposition Mod12 when the triad is not playable on the first frets
        if (!(twelveNotesString[-1+currentStringNumber-2].includes(Tone.Frequency(firstmidi, "midi").toNote()))){
            firstmidi = firstmidi-12;
            secondmidi = secondmidi-12;
            thirdmidi = thirdmidi-12;
        }

    }
    if(inversion==2){
        //Inverting the triad
        firstmidi=firstmidi+12;
        secondmidi=secondmidi+12;

        //neck transposition Mod12 when the triad is not playable on the first frets
        if (!(twelveNotesString[-1+currentStringNumber-2].includes(Tone.Frequency(secondmidi, "midi").toNote()))){
            firstmidi = firstmidi-12;
            secondmidi = secondmidi-12;
            thirdmidi = thirdmidi-12;
        }
    }

    //returning the desired triad
    if(inversion==0) return([firstmidi,secondmidi,thirdmidi]);
    if(inversion==1) return([secondmidi,thirdmidi,firstmidi]);
    if(inversion==2) return([thirdmidi,firstmidi,secondmidi]);
}
function generateDimTriad(inversion){
    //Defining the notes of the triad for every inversion, Notes are for example "E4","C5","G#2"
    var firstmidi =  Tone.Frequency(rootNote).toMidi();
    var secondmidi = firstmidi+3;
    var thirdmidi =  secondmidi+3;

    //Adjusting desired pitch
    if (inversion==0){
        //neck transposition Mod12 when the triad is not playable on the first frets
        if (!(twelveNotesString[-1+currentStringNumber-2].includes(Tone.Frequency(thirdmidi, "midi").toNote()))){
            firstmidi = firstmidi+12;
            secondmidi = secondmidi+12;
            thirdmidi = thirdmidi+12;
        }
    
    }
    if(inversion==1){
        //Inverting the triad;
        firstmidi=firstmidi+12;
        //neck transposition Mod12 when the triad is not playable on the first frets
        if (!(twelveNotesString[-1+currentStringNumber-2].includes(Tone.Frequency(firstmidi, "midi").toNote()))){
            firstmidi = firstmidi-12;
            secondmidi = secondmidi-12;
            thirdmidi = thirdmidi-12;
        }

    }
    if(inversion==2){
        //Inverting the triad
        firstmidi=firstmidi+12;
        secondmidi=secondmidi+12;

        //neck transposition Mod12 when the triad is not playable on the first frets
        if (!(twelveNotesString[-1+currentStringNumber-2].includes(Tone.Frequency(secondmidi, "midi").toNote()))){
            firstmidi = firstmidi-12;
            secondmidi = secondmidi-12;
            thirdmidi = thirdmidi-12;
        }
    }

    //returning the desired triad
    if(inversion==0) return([firstmidi,secondmidi,thirdmidi]);
    if(inversion==1) return([secondmidi,thirdmidi,firstmidi]);
    if(inversion==2) return([thirdmidi,firstmidi,secondmidi]);
}




function playMyNote(firstmidi){
    if(!autoplayDisabled){
        const firstNote=Tone.Frequency(firstmidi, "midi");//get frequency from midi

        const playSound = new Tone.PolySynth(Tone.AMSynth).toDestination();
        const now = Tone.now();

        //Play the note
        playSound.triggerAttackRelease(firstNote, "8n", now);
    }
    
}



function playMyTriad(firstmidi,secondmidi,thirdmidi){

    if(!autoplayDisabled){
    const firstNote=Tone.Frequency(firstmidi, "midi");//get the frequencies from midi
    const SecondNote=Tone.Frequency(secondmidi, "midi");
    const ThirdNote=Tone.Frequency(thirdmidi, "midi");


    const playSound = new Tone.PolySynth(Tone.AMSynth).toDestination();
    const now = Tone.now();
    
    //Play the three notes together
    playSound.triggerAttack(firstNote, now );
    playSound.triggerAttack(SecondNote, now);
    playSound.triggerAttack(ThirdNote, now);
    playSound.triggerRelease([firstNote, SecondNote, ThirdNote], now + milliseconds*1.5/1000);
    }
}







function refreshSliderBox() {
    var currentBpm=document.getElementById("myRange").value;
    document.getElementById("bpmNumber").innerHTML ="BPM: "+ currentBpm;
}

function muteMetronome() {
    if(metronomeDisabled==0){
        metronomeDisabled=1;
        document.getElementById("metronome1").style.visibility="hidden";
        document.getElementById("metronome2").style.visibility="visible";
    }
    else {metronomeDisabled=0;
        document.getElementById("metronome1").style.visibility="visible";
        document.getElementById("metronome2").style.visibility="hidden";
    };
}

function muteAutoPlay() {
    if(autoplayDisabled==0){
        autoplayDisabled=1;
        document.getElementById("audioIcon1").style.visibility="hidden";
        document.getElementById("audioIcon2").style.visibility="visible";
    }
    else {autoplayDisabled=0;
        document.getElementById("audioIcon1").style.visibility="visible";
        document.getElementById("audioIcon2").style.visibility="hidden";
    };
}




/*
//VARIOUS TEST
//test to make the oscillator sound like a guitar
function myguitar(){

    var piano = SampleLibrary.load({
        instruments: "piano"
        });
        
    piano.toDestination();

    const now = Tone.now()
    piano.triggerAttack("A3");
    piano.triggerRelease("A3", now+2);
    }*/