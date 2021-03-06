var FormValidate = Mn.Behavior.extend({

  onFormDataInvalid: function(errors) {
    console.log(errors)
    var $view = this.$el;

    var clearFormErrors = function() {
      var $form = $view.find('form');
      $form.find('.help-inline.error').each(function() {
        $(this).remove();
      });
      $form.find('.control-group.error').each(function() {
        $(this).removeClass('error');
      });
    }

    var markErrors = function(value, key){
      var $controlGroup = $view.find('#pub-' + key).parent();
      var $errorEl = $('<span>', { class: 'help-inline error', text: value });
      $controlGroup.append($errorEl).addClass('error');
    }

    clearFormErrors();
    _.each(errors, markErrors);
  },
});

export {FormValidate}