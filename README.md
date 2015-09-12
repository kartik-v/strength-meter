strength-meter
==============

A dynamic strength meter for password input validation with various configurable options. The strength scoring calculation is inspired from [password meter](http://passwordmeter.com) created by Jeff Todnem.

## Features  

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

## Demo

View the [plugin documentation](http://plugins.krajee.com/strength-meter) and [plugin demos](http://plugins.krajee.com/strength-meter/demo) at Krajee JQuery plugins. 

## Latest Release

> NOTE: The latest version of the plugin is v1.1.3. Refer the [CHANGE LOG](https://github.com/kartik-v/strength-meter/blob/master/CHANGE.md) for details.

## Pre-requisites  

1. Latest [JQuery](http://jquery.com/)
2. Most modern browsers supporting CSS3 & JQuery. For Internet Explorer, one must use IE versions 9 and above.
3. [Bootstrap 3.x](http://getbootstrap.com/) is optional. The plugin templates use the Bootstrap 3.x markup by default. So for the default markup to render correct, you would need Bootstrap 3.x CSS to view the styles properly. If you do not wish to use Bootstrap, you can easily override the templates with your markup and styles.

## Installation

### Using Bower
You can use the `bower` package manager to install. Run:

    bower install strength-meter

### Using Composer
You can use the `composer` package manager to install. Either run:

    $ php composer.phar require kartik-v/strength-meter "dev-master"

or add:

    "kartik-v/strength-meter": "dev-master"

to the `require` section of your composer.json file

### Manual Install

You can also manually install the plugin easily to your project. Just download the source [ZIP](https://github.com/kartik-v/strength-meter/zipball/master) or [TAR ball](https://github.com/kartik-v/strength-meter/tarball/master) and extract the plugin assets (css and js folders) into your project.

## Usage

Step 1: Load the following assets in your header. 

```html
<link href="http://netdna.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
<link href="path/to/css/star-strength.min.css" media="all" rel="stylesheet" type="text/css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="path/to/js/star-strength.min.js" type="text/javascript"></script>
```

If you noticed, you need to load the `jquery.min.js` and `bootstrap.min.css` in addition to the `star-strength.min.css` and `star-strength.min.js`. 

*Note:* You can skip the `bootstrap.min.css` if you do not need Bootstrap 3.x styling.  To use your own style, you need to setup the `inputTemplate`, `meterTemplate`, and `mainTemplate` options to match your CSS Styling needs.

In addition, you can load a locale specific script for your language specific translation. For example to load German translations:

```html
<script src="path/to/js/locales/star-strength-de.js" type="text/javascript"></script>
```

Step 2: Initialize the plugin on your page. For example,

```js
// initialize with defaults
$("#password-id").strength();

// with plugin options
$("#password-id").strength({showMeter: true, toggleMask: false});
```

The `#password-id` is the identifier for the password input (`type=password`) on your page. 

Alternatively, you can directly call the plugin options by setting data attributes to your input field.

```html
<input id="password-id" type="password" class="strength" data-toggle-title="Display Password" >
```

## Documentation

### Plugin Options
The plugin supports these following options:

### language
_string_ language configuration for the plugin to enable the plugin to display messages for your locale (you must set the ISO code for the language). This setting also allows you to have multiple language widgets on the same page. The locale JS file for the language code must be defined as mentioned in the translations section. The file must be loaded after `strength-meter.js`.

#### showMeter
_boolean_ whether the strength meter is to be displayed. Defaults to `true`.

#### showToggle
_boolean_ whether to display the checkbox for toggling display of password text. Defaults to `true`.

#### inputTemplate
_string_ the template for displaying the password input field (when `toggleMask` is `true`). This defaults to:

```
<div class="input-group">
    {input}
    <span class="input-group-addon">{toggle}</span>
</div>
```

The following special variables will be replaced in the template:

- `{input}` will be replaced with the password input 
- `{toggle}` will be replaced with the toggle mask checkbox.

#### inputNoToggleTemplate
_string_ the template for displaying the password input field (when `toggleMask` is `false`). This defaults to:

```
{input}
```
 
The following special variables will be replaced in the template:

- `{input}` will be replaced with the password input.

#### meterTemplate
_string_ the template for displaying the password strength meter. This defaults to:

    <div class="kv-scorebar-border">
        {scorebar}
        {score}
    </div>
    {verdict}

The following special variables will be replaced in the template:

- `{scorebar}` will be replaced with the strength score color bar.
- `{score}` will be replaced with the strength score in %.
- `{verdict}` will be replaced with the calculated strength verdict.

#### mainTemplate
_string_ the template for displaying the overall widget/plugin. This defaults to:

    <table class="kv-container">
        <tr>
            <td>{input}</td>
            <td class="kv-meter-container">{meter}</td>
        </tr>
    </table>

The following special variables will be replaced in the template:

- `{input}` will be replaced with the parsed output from the `inputTemplate`.
- `{meter}` will be replaced with the parsed output from the `meterTemplate`.

#### meterClass
_string_ the CSS class for displaying the meter. Defaults to `kv-meter`.

#### scoreBarClass
_string_ the CSS class for displaying the strength score color bar. Defaults to `kv-scorebar`.

#### scoreClass
_string_ the CSS class for displaying the strength score. Defaults to `kv-score`.

#### verdictClass
_string_ the CSS class for displaying the strength verdict. Defaults to `kv-verdict`.

#### containerClass
_string_ the CSS class for wrapping the whole widget. Defaults to `kv-password`.

#### inputClass
_string_ the CSS class for displaying the password input. Defaults to `form-control`.

#### toggleClass
_string_ the CSS class for displaying the toggle mask checkbox. Defaults to `kv-toggle`.

#### toggleTitle
_string_ the title to be displayed on hovering the toggle mask checkbox. Defaults to `Show/Hide Password`. If you load in a locale specific JS, this will be overridden with the language specific `toggleTitle`. 

#### verdictTitles
_array_ the verdict titles corresponding to each strength verdict (0 to 6). If you load in a locale specific JS, this will be overridden with the language specific verdict. Defaults to

    {
        0: 'Too Short',
        1: 'Very Weak',
        2: 'Weak',
        3: 'Good',
        4: 'Strong',
        5: 'Very Strong',
    }

#### verdictClasses
_array_ the verdict CSS classes corresponding to each strength verdict (0 to 6). Defaults to

    {
        0: 'label label-default',
        1: 'label label-danger',
        2: 'label label-warning',
        3: 'label label-info',
        4: 'label label-primary',
        5: 'label label-success',
    }

#### rules
_array_ the strength validation rules. You normally do not need to change this, as this will impact the strength score algorithm. Defaults to:

    {
        midChar: 2,
        consecAlphaUC: 2,
        consecAlphaLC: 2,
        consecNumber: 2,
        seqAlpha: 3,
        seqNumber: 3,
        seqSymbol: 3,
        length: 4,
        number: 4,
        symbol: 6
    }

Each rule element corresponds to the following:

- `midChar`: The multiplication factor (addition) for middle numbers or symbols.
- `consecAlphaUC`: The multiplication factor (reduction) for consecutive upper case alphabets.
- `consecAlphaLC`: The multiplication factor (reduction) for consecutive lower case alphabets.
- `consecNumber`: The multiplication factor (reduction) for consecutive numbers.
- `seqAlpha`: The multiplication factor (reduction) for sequential alphabets (3+).
- `seqNumber`: The multiplication factor (reduction) for sequential numbers (3+).
- `seqSymbol`: The multiplication factor (reduction) for sequential symbols (3+).
- `length`: The multiplication factor (addition) for the count of characters.
- `number`: The multiplication factor (addition) for count of numbers in the input.
- `symbol`: The multiplication factor (addition) for count of symbols in the input.

### Plugin Events
The plugin supports these events:

#### strength.change
This event is triggered when the password input/strength is changed.

**Example:**
```js
$('#input-id').on('strength.change', function(event) {
    console.log("strength.change");
});
```

#### strength.reset
This event is triggered when the password input/strength is reset to initial value.

**Example:**
```js
$('#password-id').on('strength.reset', function(event) {
    console.log("strength.reset");
});
```

#### strength.toggle
This event is triggered on toggling the password toggle mask (i.e. when password is shown/hidden).

**Example:**
```js
$('#password-id').on('strength.toggle', function(event) {
    console.log("strength.toggle");
});
```

### Plugin Methods
The plugin supports these methods:

#### refresh
Refreshes the strength after changing the password input value via javascript.
```js
$('#password-id').val(3);
$('#password-id').strength('refresh');
```

#### reset
Reset the strength to the score based on the initial value of the password. For example after a form reset.
```js
$('#password-id').strength('reset');
```

#### score
Return the current strength score:
```js
alert($('#password-id').strength('score'));
```

#### verdict
Return the current strength verdict index:
```js
alert($('#password-id').strength('verdict'));
```

## License

**strength-meter** is released under the BSD 3-Clause License. See the bundled `LICENSE.md` for details.