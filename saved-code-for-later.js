
function logNoteOnOff(event)
{
    // interesting but in the end, probably not
    // needed in this case as sending a NoteOff when that
    // note is not on doesn't seem to matter
    // could be useful in other contexts/event types though
    if (event instanceof NoteOn)
    {
        Trace('NoteOn:' + event.pitch);
        notesOn[event.pitch] = true;
        
    } else if (event instanceof NoteOff) {
        Trace('NoteOff: ' + event.pitch);
        notesOn[event.pitch] = false;
        
    } else Trace('non-Note event');

    var log = '';
    for (var i in notesOn) {
        log += i + ':' + notesOn[i] + ' || ';
    }

    Trace(log);
}