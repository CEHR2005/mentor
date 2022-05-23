function renderContainer(obj) {
  $(obj).find(".nocopy").remove();
  if ($(obj).find(">gc-container-cost").length == 0) $(obj).find(">name,>description").after("<gc-container-cost class='nosave'></gc-container-cost>");
  if ($(obj).find(">gc-container-weight").length == 0) $(obj).find(">name,>description").after("<gc-container-weight class='nosave'></gc-container-weight>");
  $(obj).find(">name,>description,>value").addClass("editable");

  // equipment containers
  if ($(obj).find("equipped").length == 0) $(obj).find(">gc-container-weight").after("<equipped class='nosave'></equipped>");
  $(obj).find("equipped").unbind("click").bind("click",function () {
    var oldState=$(this).parent().attr("state");
    var newState="carried";
    if (oldState=="carried") newState="not carried";
    if (oldState=="not carried") newState="equipped";

    $(this).parent().attr("state",newState);
    $(this).parent().find("equipment,equipment_container").attr("state",newState);
    calcAllSchedule();
    saveButtonEnable();

    event.stopPropagation();
  });

  $(obj).unbind("click").bind("click",function (){selectElement(this); return(false)});

  if ($(obj).find(">expander").length == 0) $(obj).prepend("<expander class='nosave'/>");
  $(obj).find("expander").unbind('click').bind('click',function () {containerToggleExpand($(this).parent());});

  $(obj).unbind("dblclick").bind("dblclick", function () { editContainer($(this)); event.stopPropagation(); });


  $(obj).find(">list-menu").remove();
  var list = $("<list-menu class='nosave'></list-menu>");
  $(list).click(function () {
    showFloatPanel($(this).parent(), "container")
  });
  $(obj).find(">name,>description").after(list);

  renderWeapons(obj);
}

function editContainer(obj,cancelDelete) {
  if (viewerMode) return;
  if ($(obj)[0].tagName.toLowerCase()!="advantage_container") return;

  var objType=($(obj).attr('type'));

  var containerName="Заголовок <input type='text' id='container_name' style='width: 380px; max-width: 100%;' value='"+$(obj).find(">name").text()+"'>";


  var select="Тип контейнера <select id='contaiter_type'>";
  select+="<option value=''>Группа</option>";
  select+="<option value='meta trait' "+((objType=='meta trait')?'selected':'')+">Мета-черта</option>";
  select+="<option value='race' "+((objType=='race')?'selected':'')+">Раса</option>";
  select+="<option value='alternative abilities' "+((objType=='alternative abilities')?'selected':'')+">Альтернативная способность</option>";
  select+="</select>";

  var mod=$(obj).find(">modifier>cost").int()||0;
  var modifier="Модификатор цены <input type='number' id='container_pecent' style='width:60px' min='-100' value='"+mod+"'>%<div class='note'>возможны отрицательные значения. Ноль означает - не модифицировать</div>";

  modalPopup("<h4>Группа</h4><line>"+containerName+"</line><line>"+select+"</line><line>"+modifier+"</line>","Ok","Cancel",function (){

    $(obj).find(">name").html($("#container_name").val());

    var val=$("#contaiter_type").val()
    $(obj).attr('type',val);
    if (val=="") $(obj).removeAttr('type');

    var val=$('#container_pecent').val();
    $(obj).find(">modifier").remove();
    if (val>0||val<0) {

      $(obj).find(">name").after("<modifier>\n<name>Модификатор</name>\n<cost type=\"percentage\">"+val+"</cost>\n<affects>total</affects>\n</modifier>");
    }

    setModifyAttr($(obj),"changed");

    calcAll();
    saveButtonEnable();
    flashObj($(obj));
  },null,function(){$("#container_name").focus();});
}

function checkEmptyContainers() {
  globalChar.find(".empty-container").remove();
  globalChar.find("advantage_container").each(function () {
    if ($(this).find("advantage").length == 0) $(this).append("<advantage class='nosave empty-container'></advantage>");
  });
  globalChar.find("skill_container").each(function () {
    if ($(this).find("skill,technique").length == 0) $(this).append("<skill class='nosave empty-container'></skill>");
  });
  globalChar.find("spell_container").each(function () {
    if ($(this).find("spell").length == 0) $(this).append("<spell class='nosave empty-container'></spell>");
  });
  globalChar.find("equipment_container").each(function () {
    if ($(this).find("equipment").length == 0) {
      //if (isEquipmentAutoContainer($(this))) convertContainerToEquipment($(this));
      $(this).append("<equipment class='nosave empty-container'></equipment>");
    }
  })
}

function containerToggleExpand (obj){
  if ($(obj)[0].getAttribute('open') == 'no')
    $(obj)[0].setAttribute("open", "yes");
  else
    $(obj)[0].setAttribute("open", "no");
  event.stopPropagation();
}