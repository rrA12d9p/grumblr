App.Routers.Main = Backbone.Router.extend({

  routes: {
    '': 'index',
    'new': 'showNewForm',
    'grumbles/:cid': 'showGrumble',
    'grumbles/:cid/edit': 'editGrumble'
  },

  index: function() {
    App.Views.grumbleListView.unfilter();
  },

  showNewForm: function() {
    App.Views.grumbleFormView.show();
  },

  showGrumble: function(cid) {
    App.Views.grumbleListView.filterByCID(cid);
  },

  editGrumble: function(cid) {
    App.Views.grumbleListView.filterByCID(cid);
    App.Views.grumbleListView.getViewWithCID("c4").edit();
  },

  initialize: function() {
    // Instantiate grumbles collection.
    App.Collections.grumbles = new App.Collections.Grumblrs();

    // Instantiate grumble form view, pass collection to it
    App.Views.grumbleFormView = new App.Views.GrumblrFormView({collection: App.Collections.grumbles});

    // Instantiate grumble collection view, pass collection to it
    App.Views.grumbleListView = new App.Views.GrumblrsView(
      { collection: App.Collections.grumbles,
        formView: App.Views.grumbleFormView
      }
    );
    // pretend we fetched from the server
    App.Collections.grumbles.fetch();
  }

});
