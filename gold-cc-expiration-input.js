import '../polymer/polymer.js';
import '../paper-input/paper-input-behavior.js';
import '../paper-input/paper-input-container.js';
import '../paper-input/paper-input-error.js';
import '../iron-input/iron-input.js';
import '../iron-form-element-behavior/iron-form-element-behavior.js';
import './date-input.js';

Polymer({
  _template: Polymer.html`
    <style>
      :host {
        display: block;
      }
    </style>

    <paper-input-container id="container" no-label-float="[[noLabelFloat]]" always-float-label="[[alwaysFloatLabel]]" attr-for-value="date" disabled\$="[[disabled]]" invalid="[[invalid]]">

      <label slot="label" hidden\$="[[!label]]">[[label]]</label>

      <date-input class="paper-input-input" id="input" slot="input" aria-label-prefix="[[_ariaLabelledBy]]" required\$="[[required]]" autocomplete\$="[[autocomplete]]" disabled\$="[[disabled]]" invalid="{{invalid}}" autofocus\$="[[autofocus]]" inputmode\$="[[inputmode]]" placeholder\$="[[placeholder]]" readonly\$="[[readonly]]">
      </date-input>

      <template is="dom-if" if="[[errorMessage]]">
        <paper-input-error slot="add-on" id="error">
          [[errorMessage]]
        </paper-input-error>
      </template>

    </paper-input-container>
`,

  is: 'gold-cc-expiration-input',

  /* The underlying dateInput is tabbable */
  hostAttributes: {
    'tabindex': -1
  },

  behaviors: [
    Polymer.PaperInputBehavior,
    Polymer.IronFormElementBehavior
  ],

  properties: {
    /**
     * The label for this input.
     */
    label: {
      type: String,
      value: 'Expiration Date'
    },

    value: {
      type: String,
      value: '',
      observer: '_onValueChanged'
    }

  },

  listeners: {
    'dateChanged': '_dateChanged'
  },

  observers: [
    '_onFocusedChanged(focused)'
  ],

  ready: function() {
    // If there's an initial input, validate it.
    if (this.value) {
      this._handleAutoValidate();
    }
  },

  created() {
    // Polymer 2 propagates `autoValidate` earlier in the lifecycle than
    // in Polymer 1
    if (Polymer.Element) {
      this.__ignoreAutoValidation = true;
    }
  },

  /**
   * A handler that is called on input
   */
  _onValueChanged: function(value, oldValue) {
    // The initial property assignment is handled by `ready`.
    if (oldValue == undefined) {
      return;
    }

    this.$.input.month = this._computeMonth(value);
    this.$.input.year = this._computeYear(value);
    this._handleAutoValidate();
  },

  _dateChanged: function(event) {
    var month = event.detail.month || '';
    var year = event.detail.year || '';
    var value = year ? (month + '/' + year) : month;

    this.value = String(value);
  },

  _computeMonth: function(value) {
    // Date is in MM/YY format.
    return value.split('/')[0];
  },

  _computeYear: function(value) {
    // Date is in MM/YY format.
    return value.split('/')[1] || '';
  },

  /**
   * Overidden from Polymer.PaperInputBehavior.
   */
  validate: function() {
    return this.$.input.validate();
  },

  /**
   * Overidden from Polymer.IronControlState.
   */
  _onFocusedChanged: function(focused) {
    if (this.__ignoreAutoValidation) {
      this.__ignoreAutoValidation = false;
      return;
    }

    if (!focused) {
      this._handleAutoValidate();
    }
  }
});
