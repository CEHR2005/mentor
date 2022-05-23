function calcEquipment(obj) {
  normalizeEquipmentMeasures(obj);
  var quantity=$(obj).find("quantity");
  quantity.lightStatus("gc-warning",  quantity.int() == 0 );
  quantity.lightStatus("gc-equipment-singe",  quantity.int() == 1 );

}

function normalizeEquipmentMeasures(obj){
  var weight=$(obj).find(">weight");

  // var k=(weight.text().indexOf("kg")>0)?0.5:1;
  // if (weight.float()/k) {
  //   weight.html(weight.float()/k);
  // }else {
  //   weight.html("");
  // }

  $(obj).find(">weight-kg").html(round(weight.float()*0.5,2)||"");
}


function getEquipmentWeight(obj){
  var quantity=$(obj).find(">quantity").int();
  if (!(quantity>=0)) quantity=1;
  var ret=($(obj).find(">weight").float()||0)*quantity;
  $(obj).find(">equipment[state!='not carried']>equipment_modifier>weight").each(function () {
    ret=modifyFieldByTag (ret,$(this));
  });
  return ret;
}
function getEquipmentValue(obj){
  var quantity=$(obj).find(">quantity").int();
  if (!(quantity>=0)) quantity=1;
  var ret=($(obj).find(">value").float()||0)*quantity;
  $(obj).find(">equipment[state!='not carried']>equipment_modifier>value").each(function () {
    ret=modifyFieldByTag (ret,$(this));
  });
  return ret;
}



function editEquipment(obj,cancelDelete) {
  if ($(obj).find("armor-components").length) {
    var locations="";
    locations+="<armor-locations>";
    locations+="<maintype><label><input type='checkbox' name='head'>Голова <modifier>30</modifier><location>3-5</location></label></maintype>";
    locations+="<subtype>";
    locations+="<label><input type='checkbox' name='skull'>Череп <modifier>20</modifier><location>3-4</location></label>";
    locations+="<label><input type='checkbox' name='face'>Лицо <modifier>10</modifier><location>5</location></label>";
    locations+="</subtype>";
    locations+="<label><input type='checkbox' name='neck'>Шея <modifier>5</modifier><location>17-18</location></label>";
    locations+="<maintype><label><input type='checkbox' name='torso'>Торс <modifier>100</modifier><location>9-11</location></label></maintype>";
    locations+="<subtype>";
    locations+="<label><input type='checkbox' name='chest'>Грудь <modifier>75</modifier><location>9-10</location></label>";
    locations+="<label><input type='checkbox' name='abdomen'>Живот <modifier>25</modifier><location>11</location></label>";
    locations+="</subtype>";
    locations+="<maintype><label><input type='checkbox' name='groin'>Пах <modifier>5</modifier></label></maintype>";
    locations+="<maintype><label><input type='checkbox' name='arms'>Руки <modifier>50</modifier><location>8,12</location></label></maintype>";
    locations+="<subtype>";
    locations+="<label><input type='checkbox' name='shoulders'>Плечи <modifier>10</modifier></label>";
    locations+="<label><input type='checkbox' name='upper arms'>Верхняя часть рук <modifier>10</modifier></label>";
    locations+="<label><input type='checkbox' name='elbows'>Локти <modifier>5</modifier></label>";
    locations+="<label><input type='checkbox' name='forearms'>Предплечья <modifier>25</modifier></label>";
    locations+="</subtype>";
    locations+="<label><input type='checkbox' name='hands'>Кисти рук <modifier>10</modifier><location>15</location></label>";
    locations+="<maintype><label><input type='checkbox' name='legs'>Ноги <modifier>100</modifier><location>6-7, 13-14</location></label></maintype>";
    locations+="<subtype>";
    locations+="<label><input type='checkbox' name='thighs'>Бедра <modifier>45</modifier></label>";
    locations+="<label><input type='checkbox' name='knees'>Колени <modifier>5</modifier></label>";
    locations+="<label><input type='checkbox' name='shins'>Голени <modifier>50</modifier></label>";
    locations+="</subtype>";
    locations+="<label><input type='checkbox' name='feet'>Ступни <modifier>10</modifier><location>16</location></label>";
    locations+="</armor-locations>";
    locations+="Цена: <armor-value></armor-value><br> Вес: <armor-weight></armor-weight>";

    modalPopup("<h4>Настройка брони</h5>"+locations, 'Ok', 'Cancel',function () {
      $(obj).find("dr_bonus").remove();
      var k=0;
      $("modalpopup input:checked").each(function () {
        $(obj).find("armor-components").after("<dr_bonus>\n<location>"+ $(this).prop("name")+"</location>\n<amount>"+$(obj).find("armor-components base-dr").html()+"</amount></dr_bonus>");
        k+=$(this).next("modifier").int();
      });

      $(obj).find("weight").html(round($(obj).find("armor-components base-weight").float()*k/100,2));
      $(obj).find("value").html(round($(obj).find("armor-components base-value").float()*k/100,2));

      askForDogs($(obj));
      calcAllSchedule();
      saveButtonEnable();
      flashObj($(obj));
    }, function () {
      if (cancelDelete) {
        logIt($(obj), "delete");
        $(obj).remove();
      }
    },function (){
      // init
      $(obj).find("dr_bonus location").each(function (){
        $("modalpopup input[name='"+$(this).html()+"']").prop("checked",true);
      });
      $("modalpopup subtype input").change(function() {
        $(this).parent().parent().prev("maintype").find("input").prop("checked",false);
      });
      $("modalpopup maintype input").change(function() {
        $(this).parent().parent().next("subtype").find("input").prop("checked",false);
      });
      $("modalpopup input").change(function (){
          groupCheckboxes('head',['skull','face']);
          groupCheckboxes('torso',['chest','abdomen']);
          groupCheckboxes('arms',['shoulders','upper arms','elbows','forearms']);
          groupCheckboxes('legs',['thighs','knees','shins']);
          calcArmorCosts();
        });
      calcArmorCosts();

      function groupCheckboxes(pa,cha) {
        var allChecked=true;
        $.each(cha,function(k,v){if (!$("modalpopup input[name='"+v+"']").prop("checked")) allChecked=false;});

        if (allChecked){
          !$("modalpopup input[name='"+pa+"']").prop("checked",true);
          $.each(cha,function(k,v){!$("modalpopup input[name='"+v+"']").prop("checked",false)});
        }
      }

      function calcArmorCosts(){
        var k=0;
        $("modalpopup input:checked").each(function () {
          k+=$(this).next("modifier").int();
        });

        $("modalpopup armor-weight").html(round($(obj).find("armor-components base-weight").float()*k/100,2)+" lb");
        $("modalpopup armor-value").html("$"+round($(obj).find("armor-components base-value").float()*k/100,2));
      }



    });

  }
}

function renderEquipment(obj) {
  if ($(obj).hasClass("empty-container")) return;

  $(obj).find(".nocopy").remove();
  if ($(obj).find("quantity").length == 0) $(obj).append("<quantity>1</quantity>");
  if ($(obj).find("weight").length == 0) $(obj).append("<weight></weight>");
  if ($(obj).find("weight-kg").length == 0) $(obj).append("<weight-kg class='nosave'></weight-kg>");
  if ($(obj).find("equipped").length == 0) $(obj).append("<equipped class='nosave'></equipped>");

  var id = $(obj).data("id") || Date.now().toString();
  $(obj).attr("data-id", id)
  $(obj).find(">description").addClass("editable").attr("tabindex","2");
  $(obj).find(">value").addClass("editable").attr("tabindex","3");;
  $(obj).find(">weight").addClass("editable").attr("tabindex","4");
  $(obj).find(">weight-kg").addClass("editable result-reverse").attr("tabindex","4");;
  $(obj).find(">quantity").addClass("spinner spinner-not-negative editable").attr("tabindex","5");

  // оружие
  renderWeapons(obj);

  $(obj).find("equipped").unbind("click").bind("click",function () {
    if (viewerMode) return;

    var oldState=$(this).parent().attr("state");
    var newState="carried";
    if (oldState=="carried") newState="not carried";
    if (oldState=="not carried") newState="equipped";

    $(this).parent().attr("state",newState);
    calcAllSchedule();
    saveButtonEnable();

    event.stopPropagation();
  });


  $(obj).unbind("dblclick").bind("dblclick",function () {
     changeItem(this,false);
    event.stopPropagation();
  });

  $(obj).unbind("click").bind("click",function (){selectElement(this); return(false);});

  $(obj).find("list-menu").remove();
  var list=$("<list-menu class='nosave'></list-menu>");
  $(list).click(function (){ showFloatPanel($(this).parent()) });
  $(obj).append(list);
}

function renderWeapons(obj){
  $(obj).find("ranged_weapon,melee_weapon,transport").each(function (){
    if ($(this).find("gc-level").length == 0)  $(this).prepend("<gc-level class='nosave'></gc-level><gc-default class='nosave'></gc-default>");
  });

}
