App.Views.GrumblrView = Backbone.View.extend({
  className: 'grumble',

  events: {
    'click span.destroy': 'onDestroy',
    'click span.show': 'show',
    'click span.edit': 'edit',
    'click span.update': 'update'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render)

    var itemSource = $("#grumble-template").html();
    this.template = Handlebars.compile(itemSource);

    var formSource = $("#grumble-form-template").html();
    this.formTemplate = Handlebars.compile(formSource);

    this.render();
  },

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
  },

  onDestroy: function() {
    this.model.destroy();
    this.remove();
  },

  show: function() {
    App.Routers.main.navigate("grumbles/" + this.model.cid);
    App.Views.grumbleListView.filterByCID(this.model.cid);
  },

  edit: function() {
    App.Routers.main.navigate("grumbles/" + this.model.cid + "/edit");
    this.$('.grumble-form').remove();
    this.$el.append(this.formTemplate(this.model.toJSON()));
  },

  update: function() {
    var data = this.getFormData();
    this.model.save(data);
    this.$('.grumble-form').remove();
    App.Routers.main.navigate("");
  },

  getFormData: function() {
    var data = {
      author: this.$("[name='author']").val(),
      avatar: this.$("[name='avatar']").val(),
      title: this.$("[name='title']").val(),
      content: this.$("[name='content']").val()
    };

    return data;
  }

});
