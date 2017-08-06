import template from './../../../../entities/behaviors/templates/details.jst'

var ScriptSidebar = Marionette.View.extend({
  
  template: template,

  events: {
    'click button.js-submit': 'submitClicked',
    'click button.js-publish': 'publishClicked',
    'click button.js-update': 'updateUrl'
  },

  behaviors: {
    validate: Platform.Behaviors.FormValidate,
    tagsautocomplete: Platform.Behaviors.TagsAutocomplete,
    atautocomplete: Platform.Behaviors.AtAutocomplete,
  },

  onDomRefresh: function() {
    this.triggerMethod('tagsautocomplete', this.model.get('tags'))
    this.triggerMethod('atautocomplete', this.model.get('directedAt'))
  },


  initialize: function() {
  	var url = this.model.get('activeContent')
  },

  submitClicked: function(e) {
    e.preventDefault()
    var data = Backbone.Syphon.serialize(this);
    var content = data.url
    this.trigger('form:submit', content, data, this.model)

    //nvar data = Backbone.Syphon.serialize(this);
    //  this.trigger('form:submit', data);
  },

  publishClicked: function(e) {
    this.model.set({published: true})
    this.submitClicked(e)
  },

  updateUrl: function(e) {
  	e.preventDefault()
  	var data = Backbone.Syphon.serialize(this);
  	var url = data.url
  	this.model.set({activeContent: url})
	},
})

export {ScriptSidebar}