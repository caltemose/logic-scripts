/*

This is a basic probability script.

It takes all MIDI "NoteOn" events on this track and decides whether or not to play them.

The "Randomness Threshold" parameter determines the likelihood the note will be played.
Specifically, if the random number picked is below the threshold it will play. If the random number equals or is above the threshold, the note will not play.

You do not need to copy these comments into the script editor. I suggest you copy starting from the NAME line.

*/

// NAME: Random Note Filter
// VERSION: 1.0
// URL: {github url}
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
    }
];

function HandleMIDI(event) {
    if (event instanceof NoteOn) sendRandomNote(event);
    else event.send();
}

function sendRandomNote(event) {
    var log = GetParameter("Log");
    var threshold = GetParameter("Randomness Threshold");

    if (Math.random() < threshold) {
        if (log) Trace('sending event:' + event.pitch);
        event.send();
    } else {
        if (log) Trace('not sending event:' + event.pitch);
    }
}
