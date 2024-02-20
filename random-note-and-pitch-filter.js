/*

This is a basic probability script.

It takes all MIDI "NoteOn" events on this track and decides whether or not to play them.

The "Randomness Threshold" parameter determines the likelihood the note will be played.
Specifically, if the random number picked is below the threshold it will play. If the random number equals or is above the threshold, the note will not play.

You do not need to copy these comments into the script editor. I suggest you copy starting from the VERSION line.

*/

// NAME: Random Note Filter with Random Pitch
// VERSION: 0.1
// URL: https://github.com/caltemose/logic-scripts/blob/main/random-note-and-pitch-filter.js
var PluginParameters = [
    {
        name: "Randomness Threshold",
        type: "lin",
        minValue: 0,
        maxValue: 1,
        numberOfSteps: 30,
        defaultValue: 0.5
    },
    {
        name: "Log",
        type: "lin",
        minValue: 0,
        maxValue: 1,
        numberOfSteps: 1,
        defaultValue: 0
    },
    {
        name: "Notes",
        type: "menu",
        valueStrings: [
           "Major Triad",
           "Major Seven",
           "Dominant Seven",
           "Minor Triad",
           "Minor Seven",
        ],
        defaultValue: 0,
    }
];

var notesValues = [
    [0,4,7],
    [0,4,7,11],
    [0,4,7,10],
    [0,3,7],
    [0,3,7,10]
]

function HandleMIDI(event) {
    if (event instanceof NoteOn) sendRandomNote(event);
    else event.send();
}

function sendRandomNote(event) {
    var log = GetParameter("Log");
    var threshold = GetParameter("Randomness Threshold");

    if (Math.random() < threshold) {
        var pitch = getRandomPitch(event.pitch);
        if (log) Trace('randomized pitch ' + pitch);
        event.pitch = pitch;

        if (log) Trace('sending event:' + event.pitch);
        event.send();
    } else {
        if (log) Trace('not sending event:' + event.pitch);
    }
}

function getRandomPitch(pitch) {
    var log = GetParameter('Log');
    if (log) Trace('getRandomPitch' + pitch);
    // get available pitches from Notes param
    var notesParam = GetParameter('Notes');
    var pitches = notesValues[notesParam];
    // and pick a random pitch from the array of pitches 
    var random = Math.floor(Math.random() * pitches.length);
    
    return pitches[random] + pitch;
}

