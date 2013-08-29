no.leitom.autocomplete
======================

Autocomplete widget for appcelerator alloy

A lot of work have to be done before this widget Is fully functional.

USAGE:

To get all up and running you have to add "no.leitom.autocomplete":"1.0" to your alloy config dependencies.

In a view create something like:

<Alloy>
	
	<Window class="container">
	
		<TextField id="textInput" left="5" top="10" height="50" width="150" borderStyle="Ti.UI.INPUT_BORDERSTYLE_ROUNDED" />
	
		<Widget id="test" src="no.leitom.autocomplete" />
	
	</Window>
	
</Alloy>

And in your controller:

// Set options
// Options can be altered at all times
$.test.setOptions({
    
    textfield: $.textInput,
    
    //collection: '', // Only the model name
    
    //collectionFilterAttribute: '', // Wich attribute in the model to look for
    
    data : [
    
        'PHP',
        'Ruby',
        '.NET',
        'Javascript',
        'ASP.NET',
        'ASP',
        'Phyton',
        'Node',
        'Alloy',
        'Appcelerator'
    
    ]
});

// Run init to start
$.test.init();

$.index.open();

$.index.addEventListener('close', function(_e) {
   
   // Clean up the autocomplete.
   $.test.dettach();
    
});

