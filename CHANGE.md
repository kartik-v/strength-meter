version 1.0.0
=============
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