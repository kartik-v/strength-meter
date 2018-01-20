/*!
 * strength-meter v1.1.4
 * http://plugins.krajee.com/strength-meter
 *
 * A dynamic strength meter for password input validation with various configurable options.
 *
 * The strength scoring calculation is inspired from [password meter](http://passwordmeter.com)
 * created by Jeff Todnem.
 *
 * Author: Kartik Visweswaran
 * Copyright: 2015 - 2017, Kartik Visweswaran, Krajee.com
 *
 * Licensed under the BSD 3-Clause
 * https://github.com/kartik-v/strength-meter/blob/master/LICENSE.md
 */
(function ($) {
    "use strict";

    var $h, Strength;

    $.fn.strengthLocales = {};

    String.prototype.strReverse = function () {
        var newstring = "";
        for (var s = 0; s < this.length; s++) {
            newstring = this.charAt(s) + newstring;
        }
        return newstring;
    };

    $h = {
        uniqId: function () {
            return Math.round(new Date().getTime() + (Math.random() * 100));
        },
        isEmpty: function (value, trim) {
            return value === null || value === undefined || value.length === 0 || trim && $.trim(value) === '';
        },
        replaceField: function (obj, typ) {
            var $fld = obj.$element, $el = $fld.clone(true).attr('type', typ).insertAfter($fld);
            $fld.remove();
            obj.$element = $el;
        },
        // determine verdict index based on overall score
        getVerdict: function (nScore) {
            if (nScore <= 80) {
                return nScore <= 0 ? 0 : Math.ceil(nScore / 20);
            }
            return 5;
        },
        // the main scoring algorithm - calculates score based on entered password text
        getScore: function (text, rules) {
            if ($h.isEmpty(text) || text.length < rules.minLength) {
                return 0;
            }
            var nAlphaUC = 0, nAlphaLC = 0, nNumber = 0, nSymbol = 0, nMidChar = 0, nUnqChar = 0, nRepChar = 0,
                nRepInc = 0, nConsecAlphaUC = 0, nConsecAlphaLC = 0, nConsecNumber = 0, nConsecSymbol = 0,
                nConsecCharType = 0, nSeqAlpha = 0, nSeqNumber = 0, nSeqSymbol = 0, nSeqChar = 0,
                nMultMidChar = rules.midChar, nMultConsecAlphaUC = rules.consecAlphaUC,
                nMultConsecAlphaLC = rules.consecAlphaLC, nMultConsecNumber = rules.consecNumber,
                nMultSeqAlpha = rules.seqAlpha, nMultSeqNumber = rules.seqNumber, nMultSeqSymbol = rules.seqSymbol,
                nMultLength = rules.length, nMultNumber = rules.number, nMultSymbol = rules.symbol,
                nTmpAlphaUC = -1, nTmpAlphaLC = -1, nTmpNumber = "", nTmpSymbol = "",
                sAlphas = "abcdefghijklmnopqrstuvwxyz", sNumerics = "01234567890", sSymbols = ")!@#$%^&*()",
                nScore = text.length * nMultLength, nLength = text.length, s, sFwd, sRev, str = '', a, b, bCharExists,
                arrPwd = text.replace(/\s+/g, "").split(/\s*/), arrPwdLen = arrPwd.length;

            // loop through password to check for Symbol, Numeric, Lowercase and Uppercase pattern matches
            for (a = 0; a < arrPwdLen; a++) {
                str = arrPwd[a];
                if (str.toUpperCase() !== str) {
                    if (nTmpAlphaUC !== -1 && (nTmpAlphaUC + 1) === a) {
                        nConsecAlphaUC++;
                        nConsecCharType++;
                    }
                    nTmpAlphaUC = a;
                    nAlphaUC++;
                    break;
                }
                else {
                    if (str.toLowerCase() !== str) {
                        if (nTmpAlphaLC !== -1 && (nTmpAlphaLC + 1) === a) {
                            nConsecAlphaLC++;
                            nConsecCharType++;
                        }
                        nTmpAlphaLC = a;
                        nAlphaLC++;
                    } else {
                        if (str.match(/[0-9]/g)) {
                            if (a > 0 && a < (arrPwdLen - 1)) {
                                nMidChar++;
                            }
                            if (nTmpNumber !== "" && (nTmpNumber + 1) === a) {
                                nConsecNumber++;
                                nConsecCharType++;
                            }
                            nTmpNumber = a;
                            nNumber++;
                        } else {
                            if (str.match(/[^\w]/g)) {
                                if (a > 0 && a < (arrPwdLen - 1)) {
                                    nMidChar++;
                                }
                                if (nTmpSymbol !== "" && (nTmpSymbol + 1) === a) {
                                    nConsecSymbol++;
                                    nConsecCharType++;
                                }
                                nTmpSymbol = a;
                                nSymbol++;
                            }
                        }
                    }
                }
                // internal loop through password to check for repeat characters
                bCharExists = false;
                for (b = 0; b < arrPwdLen; b++) {
                    if (arrPwd[a] === arrPwd[b] && a !== b) { // repeat character exists
                        bCharExists = true;
                        /*
                         Calculate increment deduction based on proximity to identical characters
                         Deduction is incremented each time a new match is discovered
                         Deduction amount is based on total password length divided by the
                         difference of distance between currently selected match
                         */
                        nRepInc += Math.abs(arrPwdLen / (b - a));
                    }
                }
                if (bCharExists) {
                    nRepChar++;
                    nUnqChar = arrPwdLen - nRepChar;
                    nRepInc = (nUnqChar) ? Math.ceil(nRepInc / nUnqChar) : Math.ceil(nRepInc);
                }
            }

            // check for sequential alpha string patterns (forward and reverse)
            for (s = 0; s < 23; s++) {
                sFwd = sAlphas.substring(s, s + 3);
                sRev = sFwd.strReverse();
                if (text.toLowerCase().indexOf(sFwd) !== -1 || text.toLowerCase().indexOf(sRev) !== -1) {
                    nSeqAlpha++;
                    nSeqChar++;
                }
            }

            // check for sequential numeric string patterns (forward and reverse)
            for (s = 0; s < 8; s++) {
                sFwd = sNumerics.substring(s, s + 3);
                sRev = sFwd.strReverse();
                if (text.toLowerCase().indexOf(sFwd) !== -1 || text.toLowerCase().indexOf(sRev) !== -1) {
                    nSeqNumber++;
                    nSeqChar++;
                }
            }

            // check for sequential symbol string patterns (forward and reverse)
            for (s = 0; s < 8; s++) {
                sFwd = sSymbols.substring(s, s + 3);
                sRev = sFwd.strReverse();
                if (text.toLowerCase().indexOf(sFwd) !== -1 || text.toLowerCase().indexOf(sRev) !== -1) {
                    nSeqSymbol++;
                    nSeqChar++;
                }
            }

            /**
             * modify overall score value based on usage vs requirements
             */
            // general point assignment
            if (nAlphaUC > 0 && nAlphaUC < nLength) {
                nScore = nScore + (nLength - nAlphaUC) * 2;
            }
            if (nAlphaLC > 0 && nAlphaLC < nLength) {
                nScore = nScore + (nLength - nAlphaLC) * 2;
            }
            if (nNumber > 0 && nNumber < nLength) {
                nScore = nScore + nNumber * nMultNumber;
            }
            if (nSymbol > 0) {
                nScore = nScore + nSymbol * nMultSymbol;
            }
            if (nMidChar > 0) {
                nScore = nScore + nMidChar * nMultMidChar;
            }

            // point deductions for poor practices
            if ((nAlphaLC > 0 || nAlphaUC > 0) && nSymbol === 0 && nNumber === 0) {  // Only Letters
                nScore = nScore - nLength;
            }
            if (nAlphaLC === 0 && nAlphaUC === 0 && nSymbol === 0 && nNumber > 0) {  // Only Numbers
                nScore = nScore - nLength;
            }
            if (nRepChar > 0) {  // Same character exists more than once
                nScore = nScore - nRepInc;
            }
            if (nConsecAlphaUC > 0) {  // Consecutive Uppercase Letters exist
                nScore = nScore - nConsecAlphaUC * nMultConsecAlphaUC;
            }
            if (nConsecAlphaLC > 0) {  // Consecutive Lowercase Letters exist
                nScore = nScore - nConsecAlphaLC * nMultConsecAlphaLC;
            }
            if (nConsecNumber > 0) {  // Consecutive Numbers exist
                nScore = nScore - nConsecNumber * nMultConsecNumber;
            }
            if (nSeqAlpha > 0) {  // Sequential alpha strings exist (3 characters or more)
                nScore = nScore - nSeqAlpha * nMultSeqAlpha;
            }
            if (nSeqNumber > 0) {  // Sequential numeric strings exist (3 characters or more)
                nScore = nScore - nSeqNumber * nMultSeqNumber;
            }
            if (nSeqSymbol > 0) {  // Sequential symbol strings exist (3 characters or more)
                nScore = nScore - nSeqSymbol * nMultSeqSymbol;
            }
            nScore = nScore <= 0 ? (nLength >= nMultLength ? 1 : 0) : Math.min(nScore, 100);
            return nScore;
        }
    };
    Strength = function (element, options) {
        var self = this, n;
        $.each(options, function (key, value) {
            self[key] = value;
        });
        self.$element = $(element);
        self.verdicts = self.generateVerdicts();
        self.setDefault('toggleClass', 'kv-toggle');
        self.setDefault('meterClass', 'kv-meter');
        self.setDefault('scoreBarClass', 'kv-scorebar');
        self.setDefault('scoreClass', 'kv-score');
        self.setDefault('verdictClass', 'kv-verdict');
        self.setDefault('containerClass', 'kv-password');
        if ($h.isEmpty(self.$element.attr('id'))) {
            self.$element.attr('id', $h.uniqId());
        }
        self.initialValue = $h.isEmpty(self.$element.val()) ? "" : self.$element.val();
        n = $h.getScore(self.initialValue, self.rules);
        self.$container = self.createContainer();
        self.$elToggle = self.$container.find('.kv-toggle');
        self.$elScorebar = self.$container.find('.kv-scorebar');
        self.$elScore = self.$container.find('.kv-score');
        self.$elVerdict = self.$container.find('.kv-verdict');
        self.$elScoreInput = $(document.createElement("input")).attr('type', 'hidden').val(n);
        self.$container.append(self.$elScoreInput);
        self.paint(n);
        self.listen();
    };
    Strength.prototype = {
        constructor: Strength,
        setDefault: function (key, val) {
            var self = this;
            if ($h.isEmpty(self[key])) {
                self[key] = val;
            }
        },
        // generates the HTML markup for all verdicts
        generateVerdicts: function () {
            var self = this, v = [], i;
            for (i = 0; i < 6; i++) {
                v[i] = '<div class="' + self.verdictClasses[i] + '">' + self.verdictTitles[i] + '</div>';
            }
            return v;
        },
        // listens the password change and reset events
        listen: function () {
            var self = this;
            self.$element.on('keyup', function (e) {
                self.change(e, this.value);
            });
            self.$element.closest('form').on('reset', function () {
                self.reset();
            });
            self.$elToggle.on('change', function () {
                self.toggle();
            });
        },
        // paints the strength score
        paint: function (nScore) {
            var self = this, n = $h.getVerdict(nScore), sVerdict = self.verdicts[n];
            self.$elScore.attr('class', self.scoreClass + ' ' + self.scoreClass + '-' + n);
            self.$elScorebar.css("background-position", (0 - nScore * 4) + "px");
            self.$elScore.html(nScore + "%");
            self.$elVerdict.html(sVerdict);
        },
        // the change event triggered when password input is changed
        change: function (e, text) {
            var self = this, nScore = $h.getScore(text, self.rules);
            self.$elScoreInput.val(nScore);
            self.paint(nScore);
            self.$element.trigger('strength:change');
        },
        // refresh method to update the strength score
        refresh: function () {
            var self = this, nScore = $h.getScore(self.$element.val(), self.rules);
            self.$elScoreInput.val(nScore);
            self.paint(nScore);
        },
        // reset strength meter
        reset: function () {
            var self = this, nScore = $h.getScore(self.initialValue, self.rules);
            self.$elScoreInput.val(nScore);
            self.paint(nScore);
            $h.replaceField(self, 'password');
            self.$element.trigger('strength:reset');
        },
        // update password toggle mask
        toggle: function () {
            var self = this, inputType = self.$elToggle.is(":checked") ? 'text' : 'password';
            $h.replaceField(self, inputType);
            self.$element.trigger('strength:toggle');
        },
        // current strength score
        score: function () {
            return this.$elScoreInput.val();
        },
        // verdict index
        verdict: function () {
            var nScore = this.$elScoreInput.val();
            return $h.getVerdict(nScore);
        },
        // creates the widget container
        createContainer: function () {
            var self = this, output = self.mainTemplate, $container, $el;
            output = output.replace('{input}', self.renderInput()).replace('{meter}', self.renderMeter());
            $container = $(document.createElement("div")).addClass(self.containerClass).html(output);
            self.$element.before($container);
            $el = self.$element.detach();
            $container.find('.kv-temporary-input').before($el).remove();
            return $container;
        },
        // render toggle mask
        renderToggle: function () {
            var self = this,
                disabled = self.$element.attr('disabled') ? ' disabled="true"' : '',
                readonly = self.$element.attr('readonly') ? ' readonly="true"' : '';
            return '<input type="checkbox" tabindex=10000 class="' + self.toggleClass +
                '" title="' + self.toggleTitle + '"' + disabled + readonly + '>';
        },
        // render password input
        renderInput: function () {
            var self = this, output = self.toggleMask ? self.inputTemplate : self.inputNoToggleTemplate;
            self.$element.removeClass(self.inputClass).addClass(self.inputClass);
            output = output.replace('{input}', '<div class="kv-temporary-input"></div>');
            if (self.toggleMask) {
                output = output.replace('{toggle}', self.renderToggle());
            }
            return output;
        },
        // render strength meter
        renderMeter: function () {
            var self = this, output = self.meterTemplate, css;
            if (self.showMeter) {
                output = output.replace('{scorebar}', '<div class="' + self.scoreBarClass + '"></div>')
                    .replace('{score}', '<div class="' + self.scoreClass + '"></div>')
                    .replace('{verdict}', '<div class="' + self.verdictClass + '"></div>');
                css = self.$element.attr('disabled') ? self.meterClass + ' kv-disabled' : self.meterClass;
                return '<div class="' + css + '">' + output + '</div>';
            }
            return '';
        }
    };

    $.fn.strength = function (option) {
        var args = Array.apply(null, arguments), retvals = [];
        args.shift();
        this.each(function () {
            var self = $(this), data = self.data('strength'), options = typeof option === 'object' && option, l = {},
                lang = options.language || self.data('language') || $.fn.strength.defaults.language || 'en', opt;
            if (!data) {
                if (lang !== 'en' && !$h.isEmpty($.fn.strengthLocales[lang])) {
                    l = $.fn.strengthLocales[lang] || {};
                }
                opt = $.extend(true, {}, $.fn.strength.defaults, $.fn.strengthLocales.en, l, options, self.data());
                data = new Strength(this, opt);
                self.data('strength', data);
            }

            if (typeof option === 'string') {
                retvals.push(data[option].apply(data, args));
            }
        });
        switch (retvals.length) {
            case 0:
                return this;
            case 1:
                return retvals[0];
            default:
                return retvals;
        }
    };

    $.fn.strength.defaults = {
        language: 'en',
        showMeter: true,
        toggleMask: true,
        inputTemplate: '<div class="input-group">\n{input}\n<span class="input-group-addon input-group-append"><span class="input-group-text">{toggle}</span></span>\n</div>',
        inputNoToggleTemplate: '{input}',
        meterTemplate: '<div class="kv-scorebar-border">{scorebar}\n{score}</div>\n{verdict}',
        mainTemplate: '<table class="kv-strength-container"><tr>\n<td>{input}</td>\n<td class="kv-meter-container">{meter}</td>\n</tr></table>',
        meterClass: 'kv-meter',
        scoreBarClass: 'kv-scorebar',
        scoreClass: 'kv-score',
        verdictClass: 'kv-verdict',
        containerClass: 'kv-password',
        inputClass: 'form-control',
        toggleClass: 'kv-toggle',
        verdictClasses: {
            0: 'label label-default badge-secondary',
            1: 'label label-danger badge-danger',
            2: 'label label-warning badge-warning',
            3: 'label label-info badge-info',
            4: 'label label-primary badge-primary',
            5: 'label label-success badge-success'
        },
        rules: {
            minLength: 2,
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
    };

    $.fn.strengthLocales.en = {
        toggleTitle: 'Show/Hide Password',
        verdictTitles: {
            0: 'Too Short',
            1: 'Very Weak',
            2: 'Weak',
            3: 'Good',
            4: 'Strong',
            5: 'Very Strong'
        }
    };

    $.fn.strength.Constructor = Strength;

    /**
     * Convert automatically password inputs with class 'strength'
     * into the advance strength meter validated widget with ability
     * to toggle the password mask.
     */
    $(function () {
        var $input = $('input.strength[type=password]');
        if ($input.length > 0) {
            $input.strength();
        }
    });
}(window.jQuery));