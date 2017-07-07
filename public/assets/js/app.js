
// this is our main app initializer //

// instantiate the main Platform application module//

var Platform = new Marionette.Application()

// declare helper functions for navigation //

Platform.navigate = function (route, options) {
  options || (options = {})
  Backbone.history.navigate(route, options)
}

Platform.getCurrentRoute = function () {
  return Backbone.history.fragment
}

// define regions on before:start//

Platform.on('before:start', function(){
  var RegionContainer = Marionette.LayoutView.extend({
    el: '#app-container',
    regions: {
      header: '#header-region',
      main: '#main-region',
      footer: '#footer-region',
      sidenav: '#sidenav-region'
    }
  });

  //instantiate the new region//

  Platform.regions = new RegionContainer()
})

// server error handlers //

$.ajaxSetup({
  statusCode: {
    401: function () {
      console.log('AJAX Handler - 401 Error Received')
      Platform.trigger('user:login')
    },

    403: function () {
      console.log('AJAX Handler - 403 Error Received')
    }
  },

  beforeSend: function (xhr) {
    var globals = Platform.Entities.Globals
    var token = window.localStorage.getItem(globals.auth.TOKEN_KEY)
    xhr.setRequestHeader('x-access-token', token)
  }
})

// start history on Platform app start //

Platform.on('start', function () {
  if (Backbone.history) {
    Backbone.history.start()

    // if user arrives at index.html then navigate to '/publications' and call 'listPubs'//
    // uses helper functions declared above//

    if (this.getCurrentRoute() === '') {
      Platform.trigger('pubs:list')
    }
  }
})
