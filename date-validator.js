import '../polymer/polymer.js';
import '../iron-validator-behavior/iron-validator-behavior.js';

/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
Polymer({

  is: 'date-validator',

  behaviors: [
    Polymer.IronValidatorBehavior
  ],

  validate: function(date) {
    if (!date)
      return false;

    if (date.month > 12 || date.month < 1)
      return false;

    var then = new Date ('20' + date.year, date.month);
    var now = new Date();
    return (then > now);
  }

});
