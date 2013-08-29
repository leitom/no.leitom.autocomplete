var args = arguments[0] || {};

// Set of predefined options
var options = {
    
    // Minimum number of chars before the autocomplete kicks in
    minChars: 2,
    
    // When no results matches the query do we show a message or hide the autocomplete?
    showEmptyMessage: true,
    
    // If the query needs an match to confirm the input when true textfields value will be reset
    needMatch: true,
    
    // Message to show when showEmptyMessage are set to true
    msgEmpty: L('autoCompleteEmptyMsg', 'No results matched your query')
    
};

// Append user settings
function setOptions(_properties) {
    
    _.extend(options, _properties);
    
    return;
    
}

// Init the widget
function init() {
    
    // Setup position of the autocomplete
    options.textfield.addEventListener('postlayout', positionAutoCompleteContainer);
    
    // Listen for change on the textfield input
    options.textfield.addEventListener('change', changeListener);
    
    return;
    
}

// Position the autocomplete container under the textfield
function positionAutoCompleteContainer(_e) {
    
    // Set top of the autocomplete so it lines up with the textfield
    $.autoCompleteContainer.top = parseInt( options.textfield.rect.y + options.textfield.rect.height );
    
    // Set the width to match the textfield if any width are provided else use TSS
    if( typeof(options.textfield.rect.width) !== 'undefined' ) {
        $.autoCompleteContainer.width = parseInt( options.textfield.rect.width );
    }
    
    // Set left position if provided
    if( typeof(options.textfield.rect.x) !== 'undefined' ) {
        $.autoCompleteContainer.left = parseInt( options.textfield.rect.x );
    }
    
}

// Listener for the textfield
function changeListener(_e) {
    
    if( _e.value.length >= options.minChars ) {
        show();   
    }
    else {
        hide();
    }
    
}

// Handle selected item
function setTextfieldValue(_e) {
    
    // Hide the autocomplete
    hide();
    
    // Set the value from the autocomplete
    options.textfield.setValue( _e.rowData.title );
    
    // Hide focus from the textfield after selection for cleanup
    options.textfield.blur();
    
}

// Show the autocomplete
function show() {
    
    if( typeof(options.data) !== 'undefined' ) {
    
        var filteredData = [];
    
        for( var i in options.data ) {
            
            var filter = new RegExp(options.textfield.value,'i');
            
            if( options.data[i].match(filter) ) {
                filteredData.push( {title:options.data[i]} );
            }
            
        }
        
        if( filteredData.length > 0 ) {
            $.autoCompleteTableView.setData( filteredData );
            $.autoCompleteContainer.opacity = 1.0;    
        }
        else {
            $.autoCompleteTableView.setData( [] );
            $.autoCompleteContainer.opacity = 0.0;
        }
        
    }
    
    return true;
    
}

// Hide the autocomplete
function hide() {
    
    $.autoCompleteContainer.opacity = 0.0;
    
    return true;
    
}

// Cleanup function
function dettach() {
    
    // Remove postlayout listener
    options.textfield.removeEventListener('postlayout', positionAutoCompleteContainer);
    
    // Remove listener for change on the textfield input
    options.textfield.removeEventListener('change', changeListener);
    
}

// Exports
exports.setOptions = setOptions;
exports.init = init;
exports.show = show;
exports.hide = hide;
exports.dettach = dettach;