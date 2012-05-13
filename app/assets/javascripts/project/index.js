$(function() {
  $("#addButton").click(function (event) {
    if ($("#projectData input").size()) {
      return;
    }
    var obj = $("<input type='text' maxlength='22'></input>");
    $(this).before(obj);
    obj.hide().slideDown('normal', function() {
      $(this).trigger('focus');
    }).keydown(function (event) {
      if (event.which == 13) {
        event.preventDefault();
        $(this).trigger('blur');
      }
    }).blur(function (event, ui) {
      if ($(this).attr("value") == "") {
        $(this).slideUp('normal', function() {
          $(this).remove();
        });
        return;
      }
      // ajax callback
      var obj2 = $("<span>" + $(this).attr("value") + "</span>");
      $(this).before(obj2).remove();
      obj2.click(function (event, ui) {
        console.log($(this));
        requestTask($(this).contents()[0]);
      });
    });
  });
});
