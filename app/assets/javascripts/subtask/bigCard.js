var initTimebar;
var putTask;
var connect;
var prepareEnd;

$(function() {
  jsPlumb.setRenderMode(jsPlumb.SVG);
  jsPlumb.importDefaults({
    Connector: [ "Flowchart" ],
    PaintStyle: { strokeStyle:"rgb(203, 201, 150)", lineWidth:2},
    Anchors: [ "AutoDefault", "AutoDefault" ],
    ConnectionOverlays: [ ["Arrow", {location: 1, id:"arrow", length:14, foldback:0.8} ] ],
    Endpoint: [ "Blank" ],
    HoverPaintStyle: {strokeStyle:"#42a62c"}
  });

  var scrollThreshold = 30;
  var snapOffset;
  var snapUnit;

  var draggableOpt = { grid: [30,30], 
                       containment: "#taskCanvas",
                       drag: function(event, ui) {
                         var viewPort = $(this).parent().parent();
                         var obj = $(this);
                         var viewX = viewPort.outerWidth();
                         var objX = obj.position().left + obj.outerWidth();
                         var delta = objX - viewX;
                         if (delta >= scrollThreshold) {
                           viewPort.scrollLeft(viewPort.scrollLeft() + scrollThreshold);
                         } else if (obj.position().left <= -scrollThreshold) {
                           viewPort.scrollLeft(viewPort.scrollLeft() - scrollThreshold);
                         }
                       },
                       stop: function(event, ui) {
                         var objX = $(this).position().left + $(this).outerWidth();
                         var adj = 0;
                         var conns = jsPlumb.getConnections({
                           scope: "haha",
                           source: $(this).attr("id"),
                         });

                         for (var i = 0; i < conns.length; ++i) {
                           var d = objX - $(conns[i].target[0]).position().left;
                           if (d > 0 && d > adj) {
                             adj = d;
                           }
                         }
                         $(this).offset({left: $(this).offset().left - adj});

                         adj = 0;
                         conns = jsPlumb.getConnections({
                           scope: "haha",
                           target: $(this).attr("id"),
                         });
                         objX = $(this).position().left;
                         for (var i = 0; i < conns.length; ++i) {
                           var obj = $(conns[i].source[0]);
                           var tmp = obj.position().left + obj.outerWidth();
                           var d = tmp - objX;
                           if (d > 0 && d > adj) {
                             adj = d;
                           }
                         }
                         $(this).offset({left: $(this).offset().left + adj});
                         // ajax
                         jsPlumb.repaintEverything();
                       },
                       stack: ".window",
                       cursor: "move" }

  $(".viewPort, .dragHelper").dragscrollable({acceptPropagatedEvent: false});
  $(".viewPort, .dragHelper").scrollsync({targetSelector: "#timeViewPort", axis: "x"});
  $(".viewPort, .dragHelper").scrollsync({targetSelector: "#taskViewPort", axis: "x"});
  $(".viewPort, .dragHelper").scrollsync({targetSelector: "#timeBarDragHelper", axis: "x"});
  
  jsPlumb.bind("click", function(c) {
    jsPlumb.detach(c);
  });

  var firstday;
  var endday;
  var count = 2;

  initTimebar = function (sday, dday) {
    firstday = new Date(sday);
    endday = new Date(dday);
    var i = firstday;
    var end = endday;
    for (; i <= end; i = new Date(i.valueOf() + 86400000)) {
      $(".dummyEnd").before("<div>"+i.getDate()+"</div>");
      count++;
    }
    $("#timeBar, #timeBarDragHelper").css("width", count * 30 + 10);
    $("#taskCanvas").css("width", (count - 2) * 30 + 10);
    snapOffset = $($("#timeBar").children()[0]).offset().left;
    snapUnit = $($("#timeBar").children()[1]).offset().left - $($("#timeBar").children()[0]).offset().left;
  };

  putTask = function (id, sday, dday, name) {
    var s = new Date(sday);
    var d = new Date(dday);
    var ss = (s.valueOf() - firstday.valueOf()) / 86400000; 
    var dd = (d.valueOf() - firstday.valueOf()) / 86400000;
    var w = dd - ss + 1;
    var tmp = $("<div class='window' id=id"+id+">"
                +"<span>"+name+"</span>"
                +"<div class='ep'></div>"
                +"</div>");
    tmp.offset({left: (ss + 1) * 30});
    var count = 0;
    var list = $(".window");
    for (var i = 0; i < list.length; ++i) {
      if ((tmp.css("left") <= $(list[i]).css("left") &&
           tmp.css("left") + tmp.outerWidth() >= $(list[i]).css("left")) ||
          (tmp.css("left") >= $(list[i]).css("left") &&
           tmp.css("left") <= $(list[i]).css("left") + $(list[i]).outerWidth())) {
        ++count;
      }
      //console.log(tmp.css("left"), tmp.outerWidth(), $(list[i]).css("left"), $(list[i]).outerWidth());
    }
    tmp.offset({top: count * 60});
    tmp.width(w*30);
    jsPlumb.draggable(tmp, draggableOpt);
    jsPlumb.makeTarget(tmp, {
      dropOptions:{ hoverClass:"dragHover" },
      scope: 'haha',
    });
    jsPlumb.makeSource($(tmp.children("div")), {
      parent: tmp,
      scope: 'haha',
      maxConnections: -1,
    });
    $("#taskCanvas").append(tmp);
  }

  connect = function (from, to) {
    jsPlumb.connect({ source:"id"+from, target:"id"+to });
  }

  prepareEnd = function () {
    jsPlumb.bind("jsPlumbConnection", function(conn) {
      var s = $(conn.source[0]);
      var t = $(conn.target[0]);

      if (jsPlumb.getConnections({
        scope: "haha",
        source: conn.sourceId,
        target: conn.targetId,
      }).length != 1) {
        jsPlumb.detach(conn);
        console.log("exist!!");
        return;
      }
      if (s == t) {
        jsPlumb.detach(conn);
        console.log("connect to self");
        return;
      }
      if (s.offset().left + s.outerWidth() > t.offset().left) {
        jsPlumb.detach(conn);
        console.log("forbidden");
        return;
      }
      // ajax
    });
  }

  
  function test() {
    initTimebar("2012-04-01", "2012-05-01");
    putTask(10, "2012-04-02", "2012-04-10", "haha");
    putTask(20, "2012-04-13", "2012-04-14", "haha1");
    putTask(40, "2012-04-13", "2012-04-17", "haha3");
    connect(10, 20);
    prepareEnd();
  };

  //test();
});
