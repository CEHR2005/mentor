var boardPanelObj;

$("body").append(`
<board-panel>
 <button onClick='hideBoardPanel();' class='round secondary' style='position:absolute; right:-16px; top:-16px; box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2)'><i class='fa fa-close'></i></button>
 <div class="hide-when-locked">
   <div class="multiply-only">Дейстиве с выдленным</div>
   <colors class="hide-when-markers"><color><i class="fa fa-crosshairs"></i><input type=color onChange="setCustomColor(boardPanelObj,this)"></color></colors>
   
   <div class="arrows-only">
      <button onClick='$(boardPanelObj).find(">label").dblclick(); hideBoardPanel();'><i class="fa fa-fw fa-pencil" ></i> Надпись</button>
      <div class="label">Стрелки</div>
      <span class="btn arr-start" onclick="toggleArrow(boardPanelObj,'arrow-start'); $(this).toggleClass('secondary');">Начало <i class="fa fa-arrow-left"></i></span>
      <span class="btn arr-end" onclick="toggleArrow(boardPanelObj,'arrow-end'); $(this).toggleClass('secondary');" >Конец <i class="fa fa-arrow-right"></i></span>
      <div class="label">Толщина</div>
      <span class="btn secondary lines" onclick="lineSize(boardPanelObj,2)"><svg style="stroke-width:2px;"><path d="M0,10 L100,10" ></path></svg></span>
      <span class="btn secondary lines" onclick="lineSize(boardPanelObj,3)"><svg style="stroke-width:3px;"><path d="M0,10 L100,10" ></path></svg></span>
      <span class="btn secondary lines" onclick="lineSize(boardPanelObj,4)"><svg style="stroke-width:4px;"><path d="M0,10 L100,10" ></path></svg></span>
      <span class="btn secondary lines" onclick="lineSize(boardPanelObj,5)"><svg style="stroke-width:5px;"><path d="M0,10 L100,10" ></path></svg></span>
      <span class="btn secondary lines" onclick="lineSize(boardPanelObj,7)"><svg style="stroke-width:7px;"><path d="M0,10 L100,10" ></path></svg></span>
      <span class="btn secondary lines" onclick="lineSize(boardPanelObj,10)"><svg style="stroke-width:10px;"><path d="M0,10 L100,10" ></path></svg></span>
      <div class="label">Пунктир</div>
      <span class="btn secondary lines" onclick="lineDash(boardPanelObj,'none')"><svg style="stroke-dasharray:none"><path d="M0,10 L100,10" ></path></svg></span>
      <span class="btn secondary lines" onclick="lineDash(boardPanelObj,2)"><svg style="stroke-dasharray:2"><path d="M0,10 L100,10" ></path></svg></span>
      <span class="btn secondary lines" onclick="lineDash(boardPanelObj,5)"><svg style="stroke-dasharray:5"><path d="M0,10 L100,10" ></path></svg></span>
      <span class="btn secondary lines" onclick="lineDash(boardPanelObj,10)"><svg style="stroke-dasharray:10"><path d="M0,10 L100,10" ></path></svg></span>
      <span class="btn secondary lines" onclick="lineDash(boardPanelObj,'3,10')"><svg style="stroke-dasharray:3,10"><path d="M0,10 L100,10" ></path></svg></span>
      <span class="btn secondary lines" onclick="lineDash(boardPanelObj,'10,2,2,2')"><svg style="stroke-dasharray:3,10"><path d="M0,10 L100,10" ></path></svg></span>
   </div>
   <markers class="markers-only">
     <merker class="m1"></merker>
   </markers>
  
  
   <div class="hide-when-arrows">
     <div class='text-only char-only button-only'><span href class='btn' onClick="boardFont(boardPanelObj,-1); saveButtonEnable();">Шрифт -</span> <span href class='btn' onClick="boardFont(boardPanelObj,1); saveButtonEnable();">Шрифт +</span></div>
     <div class='markers-only'><span class='btn' onClick="markerSize(boardPanelObj,0.833); saveButtonEnable();">Размер -</span> <span class='btn' onClick="markerSize(boardPanelObj,1.2); saveButtonEnable();">Размер +</span></div>
     <button onClick='$(boardPanelObj).find("text").dblclick(); hideBoardPanel();' class="text-only hide-when-multiply"><i class="fa fa-fw fa-pencil" ></i> Редактировать</button>
     <button onClick='boardButtonSettings ($(boardPanelObj)); hideBoardPanel();' class="button-only hide-when-multiply"><i class="fa fa-fw fa-pencil" ></i> Настроить</button>
     <button onClick='toggleProportions(boardPanelObj); hideBoardPanel();' class="image-only"><i class="fa fa-fw fa-exchange"></i> пропорции фикс/нет </button>     
     <button onClick='addArrow(boardPanelObj); hideBoardPanel();' class="hide-when-markers hide-when-multiply"><i class="fa fa-fw fa-long-arrow-right"></i> Добавить стрелку</button>   
     <button onClick='duplicateBoardObj(boardPanelObj); hideBoardPanel();'><i class="fa fa-fw fa-files-o" ></i> Дублировать</button>
     <button onClick='$(boardPanelObj).addClass("locked").removeClass("selected"); renderBoard(); saveButtonEnable(); hideBoardPanel();'><i class="fa fa-fw fa-lock" ></i> Заблокировать</button> 
     <button onClick='$(boardPanelObj).toggleClass("no-resize"); renderBoard(); saveButtonEnable(); hideBoardPanel();' class="hide-when-markers"><i class="fa fa-fw fa-expand" ></i> <span class='hide-when-no-resize'>Не менять размеры</span><span class='no-resize-only'>Разрешить изм. размеры</span></button>
     <span onClick='moveBoardObj(boardPanelObj,true); hideBoardPanel();' class="btn hide-when-markers"><i class="fa fa-fw fa-level-up" ></i> Наверх</span> 
     <span onClick='moveBoardObj(boardPanelObj,false); hideBoardPanel();' class="btn hide-when-markers"><i class="fa fa-fw fa-level-down" ></i> Вниз</span>
     
     <button onClick='copyToStorage(boardPanelObj); hideBoardPanel();' class="hide-when-markers"><i class="fa fa-clipboard fw"></i> В буфер</button>
     <button onClick='pastFromStorage(boardPanelObj); hideBoardPanel();' class="hide-when-markers hide-when-multiply past"><i class="fa fa-clipboard fw"></i> Из буфера</button>
     
   </div>
   <button onClick='deleteBoardObj(boardPanelObj); hideBoardPanel();' class=warning><i class="fa fa-fw fa-trash" ></i> Удалить</button>
 </div>
 
 <button onClick='$(boardPanelObj).removeClass("locked"); renderBoard(); saveButtonEnable(); hideBoardPanel();' class="locked-only"><i class="fa fa-fw fa-unlock" ></i> Разблокировать</button>
 
</board-panel>
`);
for (var i=0;i<16;i++) {
  $("<color></color>").addClass("c"+i).bind("click",function (){
    var obj=boardPanelObj.not("marker-block");
    for (var i=0;i<16;i++) {obj.removeClass('c'+i);}
    obj.css("background-color","");
    obj.css("color","");
    obj.addClass($(this).attr("class"));
    saveButtonEnable();
  }).appendTo("board-panel colors");
}

function setCustomColor(inobj,inputObj) {
  var obj=inobj.not("marker-block");
  var val=$(inputObj).val();
  for (var i=0;i<16;i++) {obj.removeClass('c'+i);}
  $(obj).css("background-color",val);
  $(obj).css("color",textColorFromBg(val));
  saveButtonEnable();
}


var boardSelection = {started: false, x1: 0, y1: 0, x2: 0, y2: 0};

$.pasteimage(function (src) {
  if (boardMode||false){
    $.post( "clipboard-upload.php",{data:src}, function( data ) {
      if (data=="!size") {
        flyAlert("Файл слишком большого размера, используйте сторонний хостинг",$("char-xml"));
      }
      else {
        addBoardImage(data,true);
      }
    });
  }
});


$("body").keydown(function (e) {

  var c = e.keyCode;

  if ($("gm-board").is(":visible")&&($(document.activeElement).is("body")))
  {
    if (e.key == 'Delete') {
      $("gm-board .selected").each(function (){
        deleteBoardObj(this)
      });
      renderBoard();
      saveButtonEnable();
    }
    if (c==39||c==37||c==38||c==40) {
      var step=(e.shiftKey)?100:10;
      if (c==37||c==38) step=-1*step;
      prop=(c==39||c==37)?'left':'top';
      var selected=$("gm-board .selected");
      if (selected.length) {
        selected.each(function() {
          $(this).css(prop,parseInt($(this).css(prop))+step);
         });
        renderBoard();
        event.preventDefault();
      }else {
        $("gm-board").css("margin-"+prop, "-="+step);
        event.preventDefault();
      }
    }
    // snaps hotkeys
    if (c==71&&e.ctrlKey&&e.altKey) boardToggleGrid();
    if (c==72&&e.ctrlKey&&e.altKey) boardToggleSnap();

  }
}).bind('mousewheel',function (e){
  if (boardMode&&$(e.target).is("char,char-xml,svg")) {
    zoomPage(e.originalEvent.wheelDelta /120)
  }
}).bind('mousedown touchstart',function (e){
 // if((e.originalEvent.touches||[]).length > 1) return;
 //  echo (e.target);

  if (boardMode&&$(e.target).is("char,char-xml,svg.nosave")) {
    hideBoardPanel();

    boardInsertOffset=0 // Срос смещения для новых объектов

    var x=e.clientX||event.touches[0].clientX;
    var y=e.clientY||event.touches[0].clientY;

    if ($("gm-board").hasClass("arrow-draw")) $("gm-board").removeClass("arrow-draw");

    if (e.ctrlKey||e.shiftKey){
      // выделение квадратом
      $("gm-board").append("<selection></selection>");

      boardSelection.started=true;
      boardSelection.x1 = x+$(document).scrollLeft();
      boardSelection.x2 = boardSelection.x1;
      boardSelection.y1 = y+$(document).scrollTop();
      boardSelection.y2 = boardSelection.y1;

      setBoardSelection();
      event.preventDefault();
    }
    else {
      // перетаскивание скрина
      globalChar.find(".selected").removeClass("selected");
      globalChar.find("text-block .editable").blur();
      $(this).prop("drag-x",x/globalChar.css("zoom")-parseInt($("gm-board").css("margin-left")));
      $(this).prop("drag-y",y/globalChar.css("zoom")-parseInt($("gm-board").css("margin-top")));
      $(this).prop("dragging",1);

      event.preventDefault();
    }
  }
}).bind('mouseup touchend',function (e){
  if (boardMode||false) {
    if (boardSelection.started){
      // выделение квадратом
      var sel=$("gm-board selection");
      boardSelection.started=false;
      $("gm-board").find("text-block,marker-block").not(".locked").each(function (){
        if ( parseInt(sel.css('top'))<parseInt($(this).css('top')) &&
          parseInt(sel.css('left'))<parseInt($(this).css('left')) &&
          parseInt(sel.css('top'))+parseInt(sel.css('height'))>parseInt($(this).css('top'))+parseInt($(this).css('height')) &&
          parseInt(sel.css('left'))+parseInt(sel.css('width'))>parseInt($(this).css('left'))+parseInt($(this).css('width'))
          )
          $(this).addClass('selected');
        else
          if (!e.shiftKey) $(this).removeClass('selected');
      });
      sel.remove();
    }
    else {
      // перетаскивание скрина
      $(this).removeProp("drag-x");
      $(this).removeProp("drag-y");
      $(this).removeProp("dragging");
    }
  }
}).bind('mousemove touchmove',function (e){
  // if((e.originalEvent.touches||[]).length > 1) return;
  if (boardMode||false) {
    var x=e.clientX||event.touches[0].clientX;
    var y=e.clientY||event.touches[0].clientY;

    if (boardSelection.started){
      // выделение квадратом
      boardSelection.x2 = x+$(document).scrollLeft();
      boardSelection.y2 = y+$(document).scrollTop();
      setBoardSelection();
      return false;
      event.preventDefault();
    }
    if ($(this).prop("dragging")) {
      // перетаскивание скрина

      var zoom=globalChar.css("zoom");
      // zoom=1;
      $("gm-board").css("margin-left", x/zoom - $(this).prop("drag-x"));
      $("gm-board").css("margin-top", y/zoom - $(this).prop("drag-y"));
    }
  }
});




function setBoardSelection() {
  var zoom=($("char-xml").css("zoom"));
  var off=$("gm-board").offset();
  var x3 = Math.min(boardSelection.x1,boardSelection.x2)/zoom;
  var x4 = Math.max(boardSelection.x1,boardSelection.x2)/zoom;
  var y3 = Math.min(boardSelection.y1,boardSelection.y2)/zoom;
  var y4 = Math.max(boardSelection.y1,boardSelection.y2)/zoom;
  $("selection").css("left",x3-off.left);
  $("selection").css("top",y3-off.top);
  $("selection").css("width",x4-x3);
  $("selection").css("height",y4-y3);
}




function duplicateBoardObj(obj)
{
  $(obj).each(function () {
    var copy=$(this).clone();
    copy.css('left',parseInt(copy.css('left'))+20);
    copy.css('top',parseInt(copy.css('top'))+20);
    copy.removeAttr("id");
    copy.removeClass("selected");
    $(this).after(copy);
  });

  renderBoard();
  saveButtonEnable();
}

function moveBoardObj(obj,goUp){
  var detached=$(boardPanelObj).detach();
  console.log(1);
  if (goUp) {
    $("gm-board text-block").last().after(detached);
  } else {
    $("gm-board text-block").first().before(detached);
  }

  undoSave();
  saveButtonEnable();
}

function boardFont(obj,size){
  $(obj).css('font-size','+='+size);
}

function markerSize(obj,mult){

  var size=$(obj).css('width');
  size=Math.round(parseInt(size)*mult);

  size=Math.max(size,40);
  size=Math.min(size,500);

  $(obj).css('width',size);
  $(obj).css('height',size);
  $(obj).css('line-height',size+"px");
  $(obj).css('font-size',Math.round(size*0.5));
}

function markerCounter(obj,inc) {
  var counter=$(obj).find('counter').int()||0;
  counter+=inc*(event.ctrlKey?10:1);
  if (counter<0) counter="";
  $(obj).find('counter').html(counter);
  undoSave();
  saveButtonEnable();
}


var boardInsertOffset=-10;
function getBoardOffset(way){
  var offset=-1*parseInt($("gm-board").css("margin-"+way));
  if (boardInsertOffset>300) boardInsertOffset=-10;
  boardInsertOffset+=10;
  var screen=(way=="top")?($("char").height()/(2*$("char-xml").css("zoom"))):($("char-xml").width()/2);

  return offset+screen+boardInsertOffset;
}

 function addBoardText(text=""){
  var newBlock=$('<text-block style="top: '+getBoardOffset('top')+'px; left: '+getBoardOffset('left')+'px; width: 300px; height: 200px; position: absolute;"><text>'+text+'</text></text-block>').appendTo("gm-board");
  renderBoard();
  newBlock.find("text").dblclick();
  saveButtonEnable();
}

function addBoardMarker(){
   var markers="";
  $.each(['health.svg','mana.svg','blood.svg','death.svg','skull.png','radiation.svg','fire.svg','marker.svg','shield.svg','ammo.svg','quiver.svg','sandclock.svg','money.svg','check.svg','star.svg','circle1.svg','circle2.svg','circle3.svg','circle4.svg','circle5.svg','circle-o1.svg'], function( i, v) {
    markers+="<label><input type='radio' name='marker' value='"+v+"' "+(i==0?"checked":"")+"><span style='width: 70px; height:70px; background-image: url(img/markers/"+v+");'></span> </label> ";
  });

  modalPopup("<div class='markers-radio'>"+markers+"<p><label style='white-space: nowrap;'><input type='radio' name='marker' value='url' id='url-radio'> <span>Моя картинка:<br><input onclick='$(\"#url-radio\").prop(\"checked\", true);' id=my-url type='text' placeholder='http://' style='width:300px;'></span></label></div><p><label><input type='checkbox' id='add-counter'> Счетчик</label>","Добавить маркер","Отменить",function () {
    var url='img/markers/'+$("modalpopup input[name=marker]:checked").val();
    if ($("#url-radio:checked").length) url=($("#my-url").val());
    var newBlock=$('<marker-block style="top: '+getBoardOffset('top')+'px; left: '+getBoardOffset('left')+'px; width: 64px; height: 64px; position: absolute; background-image:url('+url+')" class="selected"><counter>'+($("#add-counter:checked").length?"1":"")+'</counter></marker-block>').appendTo("gm-board");
    markerSize(newBlock,1);
    renderBoard();
    saveButtonEnable();
  });
}

function addBoardImageDialog(){
  modalPopup('<form ID="upload_image"><h3>Загрузить фото</h3>' +
    '<div style="text-align: left">' +
    '<label><input type="radio" name="upload" value="1" id="radio_url"/> URL из сети <input type="text" name="upoad_url" id="upoad_url" size="38" onClick="$(\'#radio_url\').prop(\'checked\', true);"></label><br><br>' +
    '<label><input type="radio" name="upload" value="2" id="radio_file"/> Загрузить файл <input type="file" name="userfile" onClick="$(\'#radio_file\').prop(\'checked\', true);"></label>' +
    '<div style="font-size:80%;">макс. размер 2MB, для файлов большего размера используйте сторонний хостинг</div><br><br>' +
    '<label><input type="radio" disabled/> Из буфера обмена - просто нажимте Ctrl-V находять на доске</label>' +
    '</div></form>',
    'Ok', 'Cancel', function () {

      if ($("#radio_url:checked").length){
        addBoardImage($("#upoad_url").val());
      }

      if ($("#radio_file:checked").length) {

        var formData = new FormData($("#upload_image")[0]);
        //
        $.ajax({
          url: 'clipboard-upload.php',
          type: 'POST',
          data: formData,
          processData: false,  // tell jQuery not to process the data
          contentType: false,  // tell jQuery not to set contentType
          success: function (data) {
            if (data == "!size") {
              flyAlert("Файл слишклм большого размера, используйте сторонний хостинг", $("char-xml"));
            }
            else {
              addBoardImage(data, true);
            }
          }
        });
      }
    });
}

function addBoardImage(url,local){
  // if (url===undefined) url = prompt("Введите URL картинки", 'http://');
  if (url!=null&&url!='http://'){
    var newBlock=$('<text-block style="top: '+getBoardOffset('top')+'px; left: '+getBoardOffset('left')+'px; width: 300px; height: 300px; position: absolute; background-image:url('+url+')" class="c0 image selected"></text-block>').appendTo("gm-board");
    if (local) newBlock.attr("local-name",url.substr(7));
    setProportions(newBlock);
    renderBoard();
    saveButtonEnable();
  }
}

function addBoardCharacter(url) {
  if (url===undefined) url = prompt("Ссылка на персонажа", 'http://');
  var viewId=getCharIdFromUrl(url,true)
  if (viewId!=false){
    $('<text-block char="'+viewId+'"style="top: '+getBoardOffset('top')+'px; left: '+getBoardOffset('left')+'px; width: 300px; height: 200px; position: absolute;" class="char"></text-block>').appendTo("gm-board");
    renderBoard();
    saveButtonEnable();
  }
}

function addBoardIframe(url) {
  if (url===undefined) url = prompt("Адрес сайта", 'http://');
  if (url!=null&&url!='http://') {
    $('<text-block style="top: ' + getBoardOffset('top') + 'px; left: ' + getBoardOffset('left') + 'px; width: 800px; height: 600px; position: absolute;" class="iframe"><iframe src="' + url + '"></iframe></text-block>').appendTo("gm-board");
    renderBoard();
    saveButtonEnable();
  }
}

function addBoardButton(btnType,btnName,action){
    obj=$('<text-block style="top: ' + getBoardOffset('top') + 'px; left: ' + getBoardOffset('left') + 'px; width: 300px; height: 70px; position: absolute;" class="button no-resize" action="'+btnType+'"><button>'+btnName+'</button><action>'+action+'</action></text-block>')
    $(obj).appendTo("gm-board");
    boardButtonSettings(obj,true);
}

function boardButtonSettings(obj,deleteOnCancel){
  var add="";
  if ($(obj).attr("action")=="url") add="Адрес <input type='url' name='action' placeholder='http://' style='width:100%;' value='"+$(obj).find("action").html()+"'>";

  modalPopup("Название <input type='text' autofocus name='name' style='width: 100%;' value='"+$(obj).find(">button").html()+"'> "+add,"Сохранить","Отмена",function () {
    $(obj).find(">button").html($("modalpopup input[name='name']").val());
    if ($(obj).attr("action")=="url") $(obj).find(">action").html($("modalpopup input[name='action']").val());
    renderBoard();
    saveButtonEnable();
  },function(){
    if (deleteOnCancel) {
      $(obj).remove();
      renderBoard();
      saveButtonEnable();
    }
  });
}

function toggleProportions(obj){
  if ($(obj).attr("ratio")===undefined) {
    setProportions(obj,true);
  }
  else {
    $(obj).removeAttr("ratio");
    renderBoard();
    saveButtonEnable();
  }
}

function setProportions(obj,setRatio){var actualImage = new Image();
  var im = new Image();
  im.src = $(obj).css('background-image').replace(/"/g,"").replace(/url\(|\)$/ig, "");
  im.onload = function() {
    var maxSize=800;
    var k=Math.max(1,this.width/maxSize,this.height/maxSize);
    $(obj).css("width",this.width/k);
    $(obj).css("height",this.height/k);
    if (setRatio) {
      $(obj).attr("ratio",this.width+"/"+this.height);
      renderBoard();
      saveButtonEnable();
    }
  }
}

function deleteBoardObj(obj){
  if ($(obj).attr("local-name")!==undefined){
    $.get("upload-delete.php?name="+$(obj).attr("local-name"));
  }
  $(obj).remove();
  renderBoard();
  saveButtonEnable();
}

function toggleArrow(obj,prop){
  if ($(obj)[0].hasAttribute(prop)) $(obj).removeAttr(prop);
  else $(obj).attr(prop,true);
  renderArrows();
  undoSave();
  saveButtonEnable();
}

function lineSize(obj,size){
  $(obj).css('stroke-width',size);
  undoSave();
  saveButtonEnable();
}

function lineDash(obj,size){
  $(obj).css('stroke-dasharray',size);
  undoSave();
  saveButtonEnable();
}

var globalArrowLink;
function addArrow(obj){
  globalArrowLink=$(obj);
  $("gm-board").addClass("arrow-draw");
}


function renderBoard(skipUndoSave){
  var board=$("gm-board");

  board.find(">name").addClass("nozoom").unbind().bind("keyup",function (){
    updateBrowserTitle();
    saveButtonEnable();
  });


  var last_drag_top,last_drag_left;
  board.find("text-block, marker-block").draggable({
    // grid: [($.cookie("board-grid")||1),($.cookie("board-grid")||1)],
    snap: ($.cookie("board-snap")=="true"),
    stop: function() {undoSave(); saveButtonEnable(); },
    start: function(e,ui) {last_drag_top=ui.offset.top;last_drag_left=ui.offset.left; $(this).addClass('noclick');},
    drag: function(e,ui) {

      // Самодельный грид снапинг
      var gridSize=$.cookie("board-grid")||1;
      if (gridSize>1){
        ui.position.top = ui.position.top - ui.position.top % gridSize;
        ui.position.left = ui.position.left - ui.position.left % gridSize;
      }


      renderArrows();
      hideBoardPanel();
      if ($(this).hasClass("selected"))
      {
        board.find(".selected").each(function() {
          $(this).css('top',parseInt($(this).css('top'))+ui.offset.top-last_drag_top);
          $(this).css('left',parseInt($(this).css('left'))+ui.offset.left-last_drag_left);
        });
        last_drag_top=ui.offset.top;
        last_drag_left=ui.offset.left;
      }
    }
  });

  board.find(".locked").draggable("destroy");


  // board.find(".ui-resizable").resizable( "destroy");

  board.find("text-block").each(function(){
    try {$(this).resizable("destroy");}catch(err){};
    $(this).find(".ui-resizable-handle").remove();
    var ratio=$(this).attr("ratio")||false;
    if (!$(this).hasClass('no-resize')){
      $(this).resizable({
        stop: function() {undoSave(); saveButtonEnable(); },
        resize:function (e,ui){
          // Самодельный грид снапинг

          var gridSize=$.cookie("board-grid")||1;
          if (gridSize>1)
          {
            var axes = $(this).data('ui-resizable').axis;
            if (axes.indexOf('e')>=0) ui.size.width= ui.size.width - ui.size.width % gridSize;
            if (axes.indexOf('s')>=0) ui.size.height= ui.size.height - ui.size.height % gridSize;
          }

          renderArrows();
        },
        aspectRatio:ratio,
        snap: ($.cookie("board-snap")=="true"),
        snapMode: "both",
        // grid: 1*($.cookie("board-grid")||1)
      });
    }
  });


  board.find("text-block text, marker-block counter").unbind().on('dblclick',function() {
    if ($(this).parent().hasClass('ui-draggable')) {$(this).parent().draggable("destroy").resizable("destroy");}
    $(this).addClass('editable').focus();
    $(this).parent().addClass('selected');
    $(this).parent().find("board-editor").show();
  }).blur(function() {
    $(this).removeClass('editable');
    window.getSelection().empty();
    $(this).parent().find("board-editor").hide();
    saveButtonEnable();
    renderBoard();
  });

  board.find("text-block.button button").unbind().on("click",function () {
    event.stopPropagation();
    if ($(this).parent().attr("action")=="url") window.open($(this).parent().find("action").html(), '_blank');
    if ($(this).parent().attr("action")=="generator") {
      var params = JSON.parse($(this).parent().find("action").html());
      showGenerator(true,true);
      generateWithParams(params,true);
    }
  });

  board.find("text-block, marker-block").unbind('click').bind('click',function(e) {
    if ($("gm-board").hasClass("arrow-draw")){
      $("gm-board").removeClass("arrow-draw")
      var from=$(globalArrowLink).generateUniqueId('arr');
      var to=$(this).generateUniqueId('arr');

      $("gm-board arrow[to="+to+"][from="+from+"],gm-board arrow[to="+from+"][from="+to+"]").remove();

      if (from!=to) $("gm-board>name").after("<arrow to='"+from+"' from='"+to+"' class='c8' arrow-end style='stroke-width: 3px;'><label></label></arrow>");
      renderArrows();
      saveButtonEnable();
    }


    if ($(this).hasClass('noclick')) {
      $(this).removeClass('noclick');
    }
    else {
      hideBoardPanel();
      if (!e.shiftKey) globalChar.find(".selected").not($(this)).removeClass("selected");
      $(this).toggleClass("selected");
    }
  });

  board.find("text-block.char").each(function (i,obj){
    if ($(obj).find("character").length) return; // если уже генерили не делаем этого снова

    var loading=$("<loading class='nosave'></loading>");
    loading.appendTo($(this));

    var iframe=$("<iframe class='nosave' style='display: none;'></iframe>");
    iframe.attr("src","editor.phtml?v="+$(obj).attr("char")+"&npc=1");
    iframe.appendTo($(this));

    var interval=setInterval(function(){
      if (iframe[0].contentWindow.globalCalced===true){
        $(obj).prepend("<character class='npc-view viewer-mode nosave'>"+iframe[0].contentWindow.getCharClearedHtml()+"</character>");
        $(obj).find("gc-level,.gc-tool-click").bind("click",function () {makeToolRoll(this)});
        iframe.remove();
        loading.remove();
        clearInterval(interval);
      }
    },300)
  });

  board.find("text-block menu,marker-block menu").remove();
  board.find("text-block,marker-block").prepend("<menu class='nosave' onClick='showBoardPanel($(this).parent()); event.stopPropagation();'></menu>");

  board.find("text-block board-editor").remove();
  board.find("text-block").prepend(`<board-editor class='nosave'>
    <button onmousedown="boardFormat('bold'); event.preventDefault();" title="Жирный"><b>B</b></button>
    <button onmousedown="boardFormat('italic'); event.preventDefault();" title="Курсив"><i>I</i></button>
    <button onmousedown="boardFormat('underline'); event.preventDefault();"  title="Подчеркнутый"><u>U</u></button>
    <button onmousedown="boardFormat('strikeThrough');  event.preventDefault();" title="Перечеркнутый"><s>S</s></button>
    <button onmousedown="boardFormat('insertUnorderedList');  event.preventDefault();" title="Список">Li</button>
    <button onmousedown="boardFormat('formatBlock','<h1>');  event.preventDefault();" title="Заголовок 1">H1</button>
    <button onmousedown="boardFormat('formatBlock','<h2>');  event.preventDefault();" title="Заголовок 2">H2</button>
    <button onmousedown="boardFormat('formatBlock','<h3>');  event.preventDefault();" title="Заголовок 3">H3</button>
    <button onmousedown="boardFormat('formatBlock','<div>');  event.preventDefault();" title="Обычный текст">P</button>
    <button onmousedown="boardInsertLink();  event.preventDefault();"  title="Ссылка"><i class="fa fa-link"></i></button>
  </board-editor>`);

  board.find("marker-block plus,marker-block minus").remove();
  board.find("marker-block").prepend("<plus class='nosave' onClick='markerCounter($(this).parent(),1); event.stopPropagation();'></plus>");
  board.find("marker-block").prepend("<minus class='nosave' onClick='markerCounter($(this).parent(),-1); event.stopPropagation();'></minus>");

  board.find("text-block object-view").addClass('obj-names-rus obj-names-short');

  board.find(".ui-resizable-handle").addClass("nosave");

  renderArrows();

  if (!skipUndoSave)undoSave();
}

function showBoardPanel(obj,multiply){
  if (multiply&&globalChar.find(".selected").length==0) {flyAlert('Сначало выделите объекты',$(obj)); return;}
  $("board-panel").find(".hide-when-arrows,.hide-when-markers,.hide-when-locked,.hide-when-multiply,.hide-when-no-resize").show();
  $("board-panel").find(".image-only,.arrows-only,.text-only,.char-only,.ifrmae-only,.markers-only,.locked-only,.multiply-only,.button-only,.no-resize-only").hide();
  if ($(obj).hasClass('image')) {
    $("board-panel .image-only").show();
  } else if ($(obj).hasClass('button')) {
    $("board-panel .button-only").show();
  }
  else if ($(obj)[0].tagName.toLowerCase()=="marker-block") {
    $("board-panel .markers-only").show();
    $("board-panel .hide-when-markers").hide();
  }
  else if ($(obj)[0].tagName.toLowerCase()=="arrow"){
    $("board-panel .arrows-only").show();
    $("board-panel .hide-when-arrows").hide();
    $("board-panel .arr-start").lightStatus("secondary",!$(obj)[0].hasAttribute("arrow-start"));
    $("board-panel .arr-end").lightStatus("secondary",!$(obj)[0].hasAttribute("arrow-end"));

  }
  else if ($(obj).hasClass('char')) {
    $("board-panel .char-only").show();
  }
  else if ($(obj).hasClass('iframe')) {
    $("board-panel .iframe-only").show();
  }
  else {
    $("board-panel .text-only").show();
  }

  if (isDropable($(window.localStorage.getItem('clipboard')||"<empty></empty>"),obj)) {
    $("board-panel .past").removeClass('hide');
  } else {
    $("board-panel .past").addClass('hide');
  }

  if ($(obj).hasClass('locked')) {
    $("board-panel .locked-only").show();
    $("board-panel .hide-when-locked").hide();
  }

  if ($(obj).hasClass('no-resize')) {
    $("board-panel .no-resize-only").show();
    $("board-panel .hide-when-no-resize").hide();
  }

  if (multiply) {
    $("board-panel .multiply-only").show();
    $("board-panel .hide-when-multiply").hide();
  }


  $("board-panel").css("top", event.y+3).css("left", event.x).show();
  if (event.x + $("board-panel").width() > $("char").width()) {
    $("board-panel").css("left", event.x - 250);
  }

  boardPanelObj=obj;
  if (multiply) boardPanelObj=globalChar.find(".selected");

}

function hideBoardPanel(){
  $("board-panel").hide();
}

function addObjToBoard(obj){
  if ($(obj)[0].tagName.toLowerCase()=="text"){
    var text=$(obj).clone();
    clearObj(text);
    addBoardText(text.html());
  } else {
    viewDescription(obj,true);
    var text=$($("infopopup popup-description").clone());
    text.find("button").remove();
    clearObj(text);
    var objView=$("infopopup object-view").clone();
    objView.find("description-loc").remove();
    clearObj(objView)
    addBoardText(text.html()+objView[0].outerHTML);
    $("infopopup").addClass("empty");
  }
}

var globalArrowDrawer=null;

function renderArrows(){

  function getBlockParams(obj){
    var offset=5;
    var border=3;
    var ret={}
    ret.top=parseFloat($(obj).css("top"))-border-offset;
    ret.left=parseFloat($(obj).css("left"))-border-offset;
    ret.width=parseFloat($(obj).css("width"))-border+2*offset;
    ret.height=parseFloat($(obj).css("height"))-border+2*offset;
    // ret.right=parseFloat($(obj).css("left"))+parseFloat($(obj).css("width"))
    // ret.bottom=parseFloat($(obj).css("top"))+parseFloat($(obj).css("height"))
    ret.centerTop=ret.top+ret.height/2
    ret.centerLeft=ret.left+ret.width/2;

    return ret;

  }

  function getAngleCoord(r, c, angle) {
    // функция сперта у arrows.js
    var x, y,
      rAngle = Math.acos(
        Math.sqrt(Math.pow(r.left + r.width - c.x, 2)) /
        Math.sqrt(Math.pow(r.left + r.width - c.x, 2) + Math.pow(r.top - c.y, 2))
      );

    if (angle >= 2 * Math.PI - rAngle || angle < rAngle) {
      x = r.left + r.width;
      y = c.y + Math.tan(angle) * (r.left + r.width - c.x);
    } else
    if (angle >= rAngle && angle < Math.PI- rAngle) {
      x = c.x - ((r.top - c.y) / Math.tan(angle));
      y = r.top + r.height;
    } else
    if (angle >= Math.PI - rAngle && angle < Math.PI + rAngle) {
      x = r.left;
      y = c.y - Math.tan(angle) * (r.left + r.width - c.x);
    }
    else
    if (angle >= Math.PI + rAngle) {
      x = c.x + ((r.top - c.y) / Math.tan(angle));
      y = r.top;
    }
    return {
      x: x,
      y: y
    };
  }


  $("gm-board arrow").each(function (i) {
    var threshold=2;

    var from=$('#' + $(this).attr("from"));
    var to=$('#' + $(this).attr("to"));

    if (from.length==0||to.length==0) {
      // удаляем стрелки ведущие в никуда
      $(this).remove();
      return;
    }


    var b1=getBlockParams(from);
    var b2=getBlockParams(to);


    var c1={x:b1.centerLeft,y:b1.centerTop};
    var c2={x:b2.centerLeft,y:b2.centerTop};

    var dot1 = getAngleCoord(b1, c1, Math.atan2(c1.y - c2.y, c1.x - c2.x) + Math.PI);
    var dot2 = getAngleCoord(b2, c2, Math.atan2(c2.y - c1.y, c2.x - c1.x) + Math.PI);

    $(this).css("top",Math.min(dot1.y,dot2.y)-threshold);
    $(this).css("left",Math.min(dot1.x,dot2.x)-threshold);

    var h=Math.abs(dot1.y-dot2.y);
    var w=Math.abs(dot1.x-dot2.x);
    $(this).css("height",h+2*threshold);
    $(this).css("width",w+2*threshold);
    var svg=$("<svg class='nosave'><defs><marker id=arrow-end"+i+" markerWidth=13 markerHeight=13 refx=5 refy=4 orient=auto><path d='M2,2 L2,6 L6,4 L2,2'  style='stroke-width: 0px;'/></marker><marker id=arrow-start"+i+" markerWidth=13 markerHeight=13 refx=3 refy=4 orient=auto><path d='M6,2 L6,6 L2,4 L6,2'  style='stroke-width: 0px;'/></marker></defs><path d=''/></svg>");

    var svgPath=svg.find(">path");
    svgPath.attr("d","M"+(dot1.x>dot2.x?threshold:w)+","+(dot1.y>dot2.y?threshold:h)+" L"+(dot1.x>dot2.x?w:threshold)+","+(dot1.y>dot2.y?h:threshold));
    if ($(this)[0].hasAttribute("arrow-end")) svgPath.css("marker-end","url(#arrow-end"+i+")");
    if ($(this)[0].hasAttribute("arrow-start")) svgPath.css("marker-start","url(#arrow-start"+i+")");
    svgPath.on("click", function () {
      showBoardPanel($(this).parent().parent())
    }).on("dblclick",function () {
      $(this).parent().parent().find(">label").dblclick();
    });

    $(this).find(">svg").remove();
    $(this).prepend(svg);

    $(this).find(">label").unbind().bind("click",function () {
      showBoardPanel($(this).parent());
    }).bind("dblclick",function(){
      $(this).addClass('editable').focus();
      hideBoardPanel();
      event.stopPropagation()
      event.stopImmediatePropagation();
    }).blur(function() {
      $(this).removeClass('editable');
      saveButtonEnable();
    })



  });


}



function boardToggleSnap(){
  if ($.cookie("board-snap")=="true"){
    flyAlert("Прилипание выключено",$(event.target));
    $.cookie("board-snap",false,{ expires: 10 * 365 });
  } else {
    flyAlert("Прилипание включено",$(event.target));
    $.cookie("board-snap",true,{ expires: 10 * 365 });
  }
  renderBoard();
}

function boardToggleGrid(){
  var grid=$.cookie("board-grid")||1;

  if (grid==1) grid=25;
  else if (grid==25) grid=50;
  else if (grid==50) grid=100;
  else grid=1;


  if (grid=="1") flyAlert("Прилипание к сетке выключено",$(event.target));
   else flyAlert("Прилипание к сетке размером "+grid,$(event.target));

  $.cookie("board-grid",grid,{ expires: 10 * 365 });
  renderBoard();
}

function boardFormat(command, value,value2) {
  document.execCommand('styleWithCSS', false, value,value2);
  document.execCommand(command, false, value);
  saveButtonEnable();
}

function boardInsertLink(){
  var url=prompt("Адресс ссылки");
  if (url==null||url=="") return;
  var sText = document.getSelection();
  if (sText=="") sText=url;
  document.execCommand('insertHTML', false, '<a href="' + url + '" target="_blank">' + sText + '</a>');
}