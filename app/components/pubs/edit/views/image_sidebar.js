import template from '../templates/image_sidebar.jst'
import qq from 'fine-uploader'
import {gc} from '../../../radio'
import 'jquery-ui'
import 'fine-uploader/fine-uploader/fine-uploader-new.css'

var ImageSidebar = Marionette.View.extend({
  template: template,

  events: {
    'click button.js-submit': 'submitClicked',
    'click button.js-publish': 'publishClicked'
  },

  behaviors: {
    validate: Platform.Behaviours.FormValidate,
  },

  onAttach: function () {

    var self = this
    var token = gc.request('user:getKey')

    var manualUploader = new qq.FineUploader({
      element: document.getElementById('fine-uploader-manual-trigger'),
      template: 'qq-template-manual-trigger',
      request: {
        endpoint: '/uploads',
        customHeaders: {
          'x-access-token': token
        }
      },
      thumbnails: {
        placeholders: {
          waitingPath: '/source/placeholders/waiting-generic.png',
          notAvailablePath: '/source/placeholders/not_available-generic.png'
        }
      },
      autoUpload: false,
      callbacks: {

        onComplete: function(id, name, response) {

          if (response.success !== false) {
            var resizable = document.createElement('img')
            resizable.style.width = '100%'
            resizable.style.height = '100%'
            resizable.src = response.url
            var draggable = document.createElement('div')
            draggable.style.width = '200px'
            draggable.style.height = '200px'
            draggable.style.display = 'inline-block'
            draggable.appendChild(resizable)
            var destinationParent = document.getElementById('draggable-container')
            destinationParent.appendChild(draggable)
            $(draggable).draggable()
            $(resizable).resizable()
          } else {console.log('error uploading file')}
        },
      }
    });
    qq(document.getElementById('trigger-upload')).attach('click', function() {
      manualUploader.uploadStoredFiles();
    });
  },

  submitClicked: function(e) {
    e.preventDefault()
    var data = Backbone.Syphon.serialize(this);
    var container = $('#draggable-container')
    var content = $(container).html()
    this.trigger('form:submit', content, data, this.model)
  },

  publishClicked: function (e) {
    this.model.set({published: true})
    this.submitClicked(e)
  },
})
export {ImageSidebar}