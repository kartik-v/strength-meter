version 1.1.2
=============
**Date:** 18-Jun-2015

1. (bug #6): Correct input type change on toggle.
2. (enh #7): Ability to configure multi-lang plugins on same page (new `language` property).

version 1.1.1
=============
**Date:** 15-Feb-2015

1. Set copyright year to current.
2. Code cleanup and JS lint changes.

version 1.1.0
=============
**Date:** 08-Nov-2014

1. Set release to stable in composer.json.
2. Updated CHANGE log to reflect user friendly date time formats.

version 1.0.0
=============
**Date:** 05-Mar-2014

Strength meter plugin initial release with following features:

1. Convert any password input to an advanced password strength validation plugin. Will fallback to a normal password input for browsers not supporting JQuery or Javascript.
2. The plugin will offer ability to toggle password mask (show/hide password text) and display a dynamic strength meter as you type. Uses advanced strength calculation algorithm which can be customized by setting/overriding the default validation `rules`.
3. The plugin automatically converts an input with `type = password` to the strength validation plugin if you set its `class = strength`. All options to the password input can be passed as HTML5 `data` attributes.
4. Configurable templates to control the style and display of the entire plugin. The password input and the various components of the strength meter can be customized. The default template uses Bootstrap 3.x markup to display the password input, toggle, and strength meter.
5. Internationalization enabled to show messages in languages other than Englsh. At this stage translations are available for 4 languages (German, French, Italian, and Russian). The titles for verdicts and toggle mask can be configured.
6. Show and hide meter and/or toggle password mask
7. Reset plugin to the initial value when the form is reset.
8. Plugin events that traps the change, reset, and toggle of the input.
9. Plugin methods to refresh the input and strength with a custom value. 
10. Plugin methods to return score and verdict.
11. Configurable strength verdicts classes and titles.