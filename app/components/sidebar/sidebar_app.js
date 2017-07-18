import * as Show from './show/show_controller'
import {gc} from '../radio'

var SidebarApp = {}
SidebarApp.Show = Show

var SidebarRadio = Marionette.Object.extend({
  channelName: 'gc',
  radioEvents: {
    'sidebar:open': 'sidebarOpen',
    'sidebar:close': 'sidebarClose',
    'user:loginShow': 'showLogin',
    'user:loggedOut': 'loggedOut'
  },

  sidebarOpen: function () {
    $('#js-sidebar-region').addClass('sidebaractive')
    document.getElementById('js-sidebarclose').style.display = 'block'
  },

  sidebarClose: function () {
    $('#js-sidebar-region').removeClass('sidebaractive')
    document.getElementById('js-sidebarclose').style.display = 'none'
  },

/*  checkUserStatus: function () {
    gc.request('initialize:entities').done(function () {
      gc.request('initializeUser:entities').done(function () {
        var user = gc.request('getUser:entities')
        if (user.get('userName') === undefined) {
          SidebarRadio.showLogin()
        } else {
          gc.trigger('user:listpubs')
        }
      })
    })
  }, */

  showLogin: function() {
        console.log('loginview triggered')
    Show.Controller.showLogin()
    this.sidebarOpen()
  },

  loggedOut: function() {
    Show.Controller.showLogin()
    this.sidebarClose()
  }
})

SidebarApp.Radio = new SidebarRadio()

export {SidebarApp}