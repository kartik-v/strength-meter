Change Log: `strength-meter`
============================

## Version 1.1.4

**Date:** 20-Jan-2018

- Add github contribution and issue/PR logging templates.
- (enh #21): Enhancements to plugin initialization & events (BC breaking).
- (enh #20): Enhancements to support Bootstrap v4.x framework.
- (enh #17): Add Serbian translations.
- (enh #16): Add Spanish translations.
- (enh #15): Add Hungarian translations.
- (enh #14): Add Polish translations.
- (enh #13): Better extending of default options.
- (enh #12): Add `rules.minLength` setting to enforce minimum password length (defaults to 2 characters).

## Version 1.1.3

**Date:** 13-Sep-2015

- (enh #11): More correct field type replacing on toggle.
- (enh #10): Add Chinese translations.

## Version 1.1.2

**Date:** 14-Jul-2015

- (enh #8): New `inputNoToggleTemplate` for non toggle mask inputs.
- (enh #7): Add ability to configure multi-language widgets on same page.

## Version 1.1.1

**Date:** 15-Feb-2015

- Code cleanup and JS lint changes.
- Set copyright year to current.

## Version 1.1.0

**Date:** 08-Nov-2014

- Updated CHANGE log to reflect user friendly date time formats.
- Set release to stable in composer.json.

## Version 1.0.0

**Date:** 05-Mar-2014

Strength meter plugin initial release with following features:

- Convert any password input to an advanced password strength validation plugin. Will fallback to a normal password input for browsers not supporting JQuery or Javascript.
- The plugin will offer ability to toggle password mask (show/hide password text) and display a dynamic strength meter as you type. Uses advanced strength calculation algorithm which can be customized by setting/overriding the default validation `rules`.
- The plugin automatically converts an input with `type = password` to the strength validation plugin if you set its `class = strength`. All options to the password input can be passed as HTML5 `data` attributes.
- Configurable templates to control the style and display of the entire plugin. The password input and the various components of the strength meter can be customized. The default template uses Bootstrap 3.x markup to display the password input, toggle, and strength meter.
- Internationalization enabled to show messages in languages other than Englsh. At this stage translations are available for 4 languages (German, French, Italian, and Russian). The titles for verdicts and toggle mask can be configured.
- Show and hide meter and/or toggle password mask
- Reset plugin to the initial value when the form is reset.
- Plugin events that traps the change, reset, and toggle of the input.
- Plugin methods to refresh the input and strength with a custom value. 
- Plugin methods to return score and verdict.
- Configurable strength verdicts classes and titles.