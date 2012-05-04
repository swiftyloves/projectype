$(function() {
  var selectedTask = null;
  function initTree(event, ui) {
    console.log('open');
    //console.log(event);
    //console.log(ui);
    //console.log(selectedTask);
  }
  
  function endTree(event, ui) {
    console.log('close');
    //console.log(event);
    //console.log(ui);
    //console.log(selectedTask);
  }
  $('#selfSwitch').button().click(function() {
    $('#selfInfo, #teamInfo').effect('slide',null,500,null);
  });
  $('#self').hover(null, function() {
    $('#selfInfo, #teamInfo').removeAttr('style').hide().fadeOut();
  });
  $('#taskInfo ul').button().click(function() {
    selectedTask = $(this);
    $('#taskTree').dialog('open');
  });
  $('#taskTree').dialog({
    autoOpen: false,
    height: 500,
    width: 500,
    modal: true,
    open: function(event, ui) { initTree(event, ui); },
    close: function(event, ui) { endTree(event, ui); },
  });
});
