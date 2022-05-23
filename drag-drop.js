function setDrag() {
  var currentDragObj=$();
  var currentDragAccept="";
  var dragCounter=0;
  var dropList,lastDrop=$();
  var dragCopy;
  var dragOverTimestamp=0;

  if (viewerMode) return;

  function makeDraggable(from, accept, doCopy) {

    if (isTouchDevice()) return; // На мобилах драг дропа нет - пользуйте кнопочки

    function removeDropMarker() {
      lastDrop.removeClass("ui-drop-before").removeClass("ui-drop-after").removeClass("ui-drop-inside");
    }

    from.attr("draggable","true");

    // Drag Start
    from.unbind('dragstart').bind('dragstart', function () {

      dragCounter=0;
      dragCopy=doCopy;
      if (event.ctrlKey) dragCopy=true;
      if (dragCopy) event.dataTransfer.effectAllowed='copy';

      var el=$("<div class='ui-drag-counter'></div>")
      $(event.target).before(el);
      event.dataTransfer.setDragImage($(el)[0], -10, -10);

      if ($(event.target).hasClass("ui-selected")) {
        if (dragCopy) currentDragObj = $(".ui-selected").clone();
        else currentDragObj = $(".ui-selected");
      }
      else {
        if (dragCopy) currentDragObj = $(event.target).clone();
        else currentDragObj = $(event.target);
      }
      currentDragObj.addClass("ui-dragging");


      var strAdd=(dragCopy)?'+ ':'';
      if ($(currentDragObj).length==1) $(".ui-drag-counter").html(strAdd+$(currentDragObj).find(">name,>description").text());
      else {$(".ui-drag-counter").html(strAdd+$(currentDragObj).length);}


      $(currentDragObj).removeClass("ui-selected");
      // currentDragAccept=jQueryAcceptString;
      currentDragAccept="yes";
      dropList=placeToDrop(currentDragObj);
      dropList.addClass("gc-dropplace");


      event.stopPropagation(); // Защита от двойного драга внутри кнотейнера

      return true;
    });

    from.unbind('dragend').bind('dragend', function () {
      $(".ui-drag-counter").remove();
      $(".ui-dragging").removeClass("ui-dragging");
      $(".ui-selected").removeClass("ui-selected");
      $(".gc-dropplace").removeClass("gc-dropplace");
      removeDropMarker();
      currentDragAccept="";
    });

    // Drag Enter
    accept.unbind('dragenter').bind('dragenter',function (){
      if (currentDragAccept=="") return true;
      dragCounter++;
    });

    // Drag Leave
    accept.unbind('dragleave').bind('dragleave',function (){
      if (currentDragAccept=="") return true;
      dragCounter--;
      if (dragCounter === 0) removeDropMarker();
    });

    // Drag Over
    accept.unbind('dragover').bind('dragover',function (){

      event.preventDefault();

      if (currentDragAccept=="") return true;

      if (Date.now()<(dragOverTimestamp+50)) return false; // задержка убирающая лаг
      dragOverTimestamp=Date.now();

      var place=$(event.currentTarget);
      var isList;


      if (isDropable(currentDragObj,place)) {
        removeDropMarker();

        var tag = place[0].tagName.toLowerCase();
        if ($(currentDragObj).attr("modifier")=="yes") {
          if (tag=="advantage") place.addClass("ui-drop-inside");
        }
        else if (tag=="advantage_list"||tag=="skill_list"||tag=="spell_list"||tag=="equipment_list") {place.addClass("ui-drop-inside");}
        else if (tag=="equipment"&&event.layerY >5&&event.layerY < place.height()-5&&isEquipmentModifier(currentDragObj)&&isEquipmentAutoContainer(place)) {place.addClass("ui-drop-inside");}
        else if (event.layerY < place.height()/2) {place.addClass("ui-drop-before");}
        else {place.addClass("ui-drop-after");}
        lastDrop=place;

      }
      else {
        return true;
      }


    });

    // Drop
    accept.unbind('drop').bind('drop', function () {

      if (currentDragObj.length==0) return false;

      if ($(".ui-drop-inside").prop("tagName")=="EQUIPMENT") {
        var newObj=convertEquipmentToContainer($(".ui-drop-inside"));
        $(newObj).append(currentDragObj);
      }

      if ((currentDragObj).attr("modifier")) {
        // Модификаор накладывается на адвантагу
        addModifierToAdvantage($(currentDragObj), $(".ui-drop-inside"));
      }
      else {
        $(".ui-drop-before").before(currentDragObj);
        $(".ui-drop-after").after(currentDragObj);
        $(".ui-drop-inside").prepend(currentDragObj);

        clearObj($(currentDragObj));

        $(currentDragObj).each(function (){
          renderObj($(this));
        });


        if (dragCopy&&$(currentDragObj).length==1) editObj($(currentDragObj), true);
        checkEmptyContainers();
        setDrag();
        bindEvents();
        saveButtonEnable();
        if (dragCopy) {
          calcAll();
          logIt($(currentDragObj),"add");
          setModifyAttr($(currentDragObj),"changed");
        } else {
          calcAllSchedule();
          setModifyAttr($(currentDragObj),"moved");
        }


        flashObj($(currentDragObj));
      }

      removeDropMarker();
      dragCounter=1;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return true;
    });

  }

  // Из библиотеки
  var libXml=$("lib-xml");
  makeDraggable(libXml.find("advantage"),globalChar.find("advantage,advantage_container,advantage_list"),true);
  makeDraggable(libXml.find("skill,technique"),globalChar.find("skill,skill_container,technique,skill_list"),true);
  makeDraggable(libXml.find("spell"),globalChar.find("spell,spell_container,spell_list"),true);
  makeDraggable(libXml.find("equipment"),globalChar.find("equipment,equipment_container,equipment_list"),true);

  // на листе персонажа
  makeDraggable(globalChar.find("advantage,advantage_container"), globalChar.find("advantage,advantage_container,advantage_list"),false);
  makeDraggable(globalChar.find("skill,technique,skill_container"), globalChar.find("skill,technique,skill_container,skill_list"),false);
  makeDraggable(globalChar.find("spell,spell_container"), globalChar.find("spell,spell_container,spell_list"),false);
  makeDraggable(globalChar.find("equipment,equipment_container"), globalChar.find("equipment,equipment_container,equipment_list"),false);

}

function isDropable(source,dest){
  if ($(dest).parents().is($(source))) return false; // Зпрещаем кидать группу в саму себя
  var tag = $(source)[0].tagName.toLowerCase();
  var tag2 = $(dest)[0].tagName.toLowerCase();
  if ((tag == "advantage" || tag =="advantage_container") && (tag2=="advantage"||tag2=="advantage_container"||tag2=="advantage_list")) return true;
  if ((tag == "skill" || tag =="technique" || tag =="skill_container") && (tag2=="skill"||tag2=="skill_container"||tag2=="technique"||tag2=="skill_list")) return true;
  if ((tag == "spell" || tag =="spell_container") && (tag2=="spell"||tag2=="spell_container"||tag2=="spell_list")) return true;
  if ((tag == "equipment" || tag =="equipment_container") && (tag2=="equipment"||tag2=="equipment_container"||tag2=="equipment_list")) return true;
  if (tag=="text-block"&&tag2=="text-block") return true;
  return false;
}

function placeToDrop(obj){
  var tag = $(obj)[0].tagName.toLowerCase();
  if (tag == "advantage" || tag =="advantage_container") return globalChar.find("advantage_list");
  if (tag == "skill" ||tag == "technique" || tag =="skill_container") return globalChar.find("skill_list");
  if (tag == "spell" || tag =="spell_container")  return globalChar.find("spell_list");
  if (tag == "equipment" || tag =="equipment_container")  return globalChar.find("equipment_list");
}