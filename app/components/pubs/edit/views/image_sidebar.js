import template from './../../../../entities/behaviors/templates/details.jst'
import 'jquery-ui'

var ImageSidebar = Marionette.View.extend({
  template: template,

  events: {
    'click button.js-submit': 'submitClicked',
    'click button.js-publish': 'publishClicked'
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

  submitClicked: function(e) {
    e.preventDefault()
    var data = Backbone.Syphon.serialize(this);
    var drafts = this.model.get('drafts')
    var draft = drafts.findWhere({type: 'image'})
    var content = draft.get('content')
    this.trigger('form:submit', content, data, this.model)
  },

  publishClicked: function(e) {
    e.preventDefault()
    this.model.set({published: true})
    this.submitClicked(e)
  },
})
export {ImageSidebar}
