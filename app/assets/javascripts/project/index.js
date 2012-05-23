$(function() {
  function spanClick(event, ui) {
    //console.log($(this));
    requestTask(ui);
  };
  
  function trashClick(event, ui) {
    //console.log(ui);
    $.ajax({
      type: 'DELETE',
      url: '/project/delete',
      data: {"id": $(ui).parent().children("span").attr("pid")},
      error: function(response) {
        console.log(response);
        alert("err");
      },
      success: function(response) {
        //console.log(response);
        if (!response["state"] == "succ") {
          alert("err");
          return;
        }
        ui.parent().remove();
      }
    });
  };

  function editClick(event, ui) {
    var tmp = $(ui).parent().children("span");
    var p = $(ui).parent();
    console.log(tmp);

    p.empty();
    var obj = $("<input type='text' maxlength='22' ori='"+$(tmp).html()+"'" +
                " pid="+$(tmp).attr("pid")+" value='"+$(tmp).html()+"'></input>");
    p.append(obj);
    obj.trigger("focus");
    obj.keydown(function (event) {
      if (event.which == 13) {
        //event.preventDefault();
        $(this).trigger('blur');
      }
    }).blur(function (event, ui) {
      if ($(this).attr("value") == "") {
        var obj2 = $("<span pid='"+$(this).attr("pid")+"'>" +  
                   $(this).attr("ori") + "</span>");
        var edit = $("<div class='edit'></div>")
        var trash = $("<div class='trash'></div>");
        $(this).after(trash).after(edit).after(obj2);
        obj2.click(function(event, ui) {
          spanClick(event, $(this));
        });
        edit.click(function(event, ui) {
          editClick(event, $(this));
        });
        trash.click(function(event, ui) {
          trashClick(event, $(this));
        });
        $(this).remove();
        return;
      }
      // ajax callback
      $.ajax({
        type: 'PUT',
        url: '/project/edit',
        data: {"name": $(this).val(),
               "id": $(this).attr("pid")},
        error: function(response) {
          console.log(response);
          $("#projectData input").trigger('focus');
          alert("err");
        },
        success: function(response) {
          console.log(response);
          if (!response["state"] == "succ") {
            alert("err");
            $("#projectData input").trigger('focus');
            return;
          }
          var obj2 = $("<span pid='"+$("#projectData input").attr("pid")+"'>" +  
                     $("#projectData input").val() + "</span>");
          var edit = $("<div class='edit'></div>")
          var trash = $("<div class='trash'></div>");
          $("#projectData input").after(trash).after(edit).after(obj2);
          obj2.click(function(event, ui) {
            spanClick(event, $(this));
          });
          edit.click(function(event, ui) {
            editClick(event, $(this));
          });
          trash.click(function(event, ui) {
            trashClick(event, $(this));
          });
          $("#projectData input").remove();
        }
      });
    });

  }


  $("#projectData span").click(function (event, ui) {
    spanClick(event, $(this));
  });
  $("#projectData .trash").click(function (event, ui) {
    trashClick(event,  $(this));
  });
  $("#projectData .edit").click(function (event, ui) {
    editClick(event, $(this));
  });

  $("#addButton").click(function (event) {
    if ($("#projectData input").size()) {
      return;
    }
    var obj = $("<input type='text' maxlength='22'></input>");
    $(this).before($("<div></div>").append(obj));
    obj.parent().hide().slideDown('normal', function() {
      obj.trigger('focus');
    });

    obj.keydown(function (event) {
      if (event.which == 13) {
        //event.preventDefault();
        $(this).trigger('blur');
      }
    }).blur(function (event, ui) {
      if ($(this).attr("value") == "") {
        $(this).parent().slideUp('normal', function() {
          $(this).remove();
        });
        return;
      }
      // ajax callback
      $.ajax({
        type: 'POST',
        url: '/project/add',
        data: {"name": $(this).val()},
        error: function(response) {
          console.log(response);
          alert("err");
        },
        success: function(response) {
          console.log(response);
          if (!response["id"]) {
            alert("err");
            $("#projectData input").trigger('focus');
            return;
          }
          var obj2 = $("<span pid='"+response["id"]+"'>" +  
                       $("#projectData input").attr("value") + "</span>");
          var edit = $("<div class='edit'></div>")
          var trash = $("<div class='trash'></div>");
          $("#projectData input").before(obj2).remove();
          edit.click(function(event, ui) {
            editClick(event, $(this));
          });
          trash.click(function(event, ui) {
            trashClick(event, $(this));
          });
          obj2.click(function (event, ui) {
            spanClick(event, $(this));
          }).after(trash).after(edit);
        }
      });
    });
  });
});
