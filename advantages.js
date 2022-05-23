function calcAdvantage(obj)
{
   // Добавляем поле для цены

  var baseEnh = 0;
  var levelEnh = 0;
  var baseLim = 0;
  var levelLim = 0;

  var basePoints=0;
  if ($(obj).find(">base_points").length) basePoints=1.0*$(obj).find(">base_points").text();

  var pointsPerLevel=0;
  if ($(obj).find(">points_per_level").length) pointsPerLevel=1.0*$(obj).find(">points_per_level").text();

  var roundCostDown=false;
  if ($(obj).attr("round_down")=="yes") roundCostDown=true;

  var levels=0;
  if ($(obj).find(">levels").length) levels=1.0*$(obj).find(">levels").text();

  var multiplier = 1;
  var cr=$(obj).find("CR").text();
  if (cr==6)  multiplier=2;
  if (cr==9)  multiplier=1.5;
  if (cr==12) multiplier=1;
  if (cr==15) multiplier=0.5;

  // проверяем на модификаторы в вышестоящих контейнерах
  $(obj).parents("advantage_container").each(function () {
    $(this).find(">modifier>cost").each(function () {
      multiplier*=($(this).int()/100+1);
    });
  });



// Найти CR и Multiplyer помножить


  obj.find("modifier").each(function (){
    if ($(this).attr('enabled')!="no"){

      var levels=$(this).find("levels").int();
      if (isNaN(levels)) levels=1;
      var modifier=$(this).find("cost").float()*levels;
      var type=$(this).find("cost").attr("type");
      var affects=$(this).find("affects").text();

      if (type=="multiplier"){
        multiplier*=modifier;
      }
      if (type == "points") {
        if (affects == "total" || affects == "base only") {
          basePoints += 1.0*modifier;
        }
        if (affects == "levels only") {
          pointsPerLevel += 1.0*modifier;
        }
      }
      if (type == "percentage") {
        if (affects == "total") {
          if (modifier < 0) { // Limitation
            baseLim += 1.0*modifier;
            levelLim += 1.0*modifier;
          } else { // Enhancement
            baseEnh += 1.0*modifier;
            levelEnh += 1.0*modifier;
          }
        }
        if (affects == "base only") {
          if (modifier < 0) { // Limitation
            baseLim += 1.0*modifier;
          } else { // Enhancement
            baseEnh += 1.0*modifier;
          }
        }
        if (affects == "levels only") {
          if (modifier < 0) { // Limitation
            levelLim += 1.0*modifier;
          } else { // Enhancement
            levelEnh += 1.0*modifier;
          }
        }
      }
    }
  });



  var modifiedBasePoints = basePoints;
  var leveledPoints = pointsPerLevel * levels;

  if (baseEnh != 0 || baseLim != 0 || levelEnh != 0 || levelLim != 0) {
    var baseMod = 0;
    var levelMod = 0;

/*
// Optional rules сейчас не актуально
    if (SheetPreferences.areOptionalModifierRulesUsed()) {
      if (baseEnh == levelEnh && baseLim == levelLim) {
        modifiedBasePoints = modifyPoints(basePoints + leveledPoints, baseEnh);
        modifiedBasePoints = modifyPoints(modifiedBasePoints, Math.max(baseLim, -80));
      } else {
        modifiedBasePoints = modifyPoints(basePoints, baseEnh);
        modifiedBasePoints = modifyPoints(modifiedBasePoints, Math.max(baseLim, -80));
        leveledPoints = modifyPoints(leveledPoints, levelEnh);
        leveledPoints = modifyPoints(leveledPoints, Math.max(levelLim, -80));
        basePoints += leveledPoints;
      }
    } else {
*/
      baseMod = Math.max(1.0*baseEnh + 1.0*baseLim, -80);
      levelMod = Math.max(1.0*levelEnh + 1.0*levelLim, -80);
      if (baseMod == levelMod) {
        modifiedBasePoints = modifyPoints(1.0*basePoints + 1.0*leveledPoints, baseMod);
      } else {
        modifiedBasePoints = 1.0*modifyPoints(basePoints, baseMod) + 1.0*modifyPoints(leveledPoints, levelMod);
      }

  } else {
    modifiedBasePoints=1.0*modifiedBasePoints+1.0*leveledPoints;
  }

  $(obj).find(">levels").lightStatus("gc-warning",$(obj).find(">levels").int()==0);




  var res=modifiedBasePoints * multiplier;
  res=(roundCostDown)? Math.floor(res) : Math.ceil(res);

  $(obj).find("gc-cost").html(res);

}

function modifyPoints(points, modifier) {
  return 1.0*points + (points * modifier / 100.0);
}


// Добавление и редактирнвание адвантаги
function editAdvantage(obj,cancelDelete,customCb) {
  if (viewerMode) return;
  var question = "";
  var radio=undefined;
  var mainRef=$(obj).find(">reference").text()||"";

  $(obj).find(">modifier").each(function () {

    var ref="";
    if ($(this).find(">reference").text()!=mainRef) ref=makeReferenceLink($(this).find(">reference").text());
    question += "<line>";
    var checked=($(this).attr('enabled')=="no")?"":"checked";

    var curGroup=$(this).attr('radiogroup')||$(this).attr('checkgroup');
    if (curGroup!=radio) question+="<br/>";
    radio=curGroup;

    if ($(this).attr('radiogroup'))
      question += "<label style='width:100%'>"+ref+"<input type='radio' name='"+$(this).attr('radiogroup')+"' "+checked+" class='modifier''/> ";
    else
      question += "<label style='width:100%'>"+ref+"<input type='checkbox' name='"+($(this).attr('checkgroup')||"")+"'"+checked+" class='modifier''/> ";


    question += $(this).find(">name").text();
    if ($(this).find(">notes").text()) question += " (" + $(this).find(">notes").text() + ")";

    question += " <cost>";
    if ($(this).find(">cost").attr("type") == "multiplier") question += "×";
    if ($(this).find(">cost").text()>0&&$(this).find(">cost").attr("type") == "percentage") question+="+";
    question += $(this).find(">cost").text();
    if ($(this).find(">cost").attr("type") == "points") question += "pt";
    if ($(this).find(">cost").attr("type") == "percentage") question += "%";
    question += "</cost>";



    question += "</label></line>";
  });

  if ($(obj).find("cr").length) {
    var cr = $(obj).find("cr").text();
    if (cr=="") cr=12; // Default value
    question += "<line><center>Самоконтроль <select class='cr'>";
    question += "<option " + ((cr == 6) ? "selected" : "") + " value='6'>6 (почти бескотрольно) x2</option>";
    question += "<option " + ((cr == 9) ? "selected" : "") + " value='9'>9 (контролировать сложно) x1.5</option>";
    question += "<option " + ((cr == 12) ? "selected" : "") + " value='12'>12 (контролировать реально) x1</option>";
    question += "<option " + ((cr == 15) ? "selected" : "") + " value='15'>15 (контролировать легко) x0.5</option>";
    question += "</select><br/><span class='note'>(способность пересилить недостаток)</span></center></line>";
  }

  if (question != "") {
    // lastFiledVar=$(obj).find("gc-cost").int();
    var price="";
    if ($(obj).find("base_points").length) price+=$(obj).find("base_points").text()+" pt ";
    if ($(obj).find("points_per_level").length) price+=$(obj).find("points_per_level").text()+"pt/ур. ";
    if (price=="") price="0";

    modalPopup("<style>modalpopup ref {float:right; opacity:0.5; margin-left:5px;} modalpopup cost{color:#999;}</style><h4>"+$(obj).find(">name").html()+" "+$(obj).find(">name-loc").html()+makeReferenceLink(mainRef)+"</h4><h5> Базовая стоимость: "+price+"</h5>"+question, 'Ok', 'Cancel', function () {
      $(obj).find(">modifier").each(function (i) {
        var enabled = ($("modalpopup .modifier")[i].checked) ? "yes" : "no";
        $(this).attr("enabled", enabled);
      });

      if ($("modalpopup .cr").val() != "") {
        $(obj).find("cr").html($("modalpopup .cr").val());
      }
      if (customCb) {
        customCb();
      }
      else {
        askForDogs($(obj));
        calcAllSchedule();
        saveButtonEnable();
        flashObj($(obj));
      }

      setModifyAttr($(obj),"changed");

        // logIt($(obj), "modify");

      }, function () {
        if (cancelDelete) {
          logIt($(obj), "delete");
          $(obj).remove();
          calcAllSchedule();
        }
      }, function (){
      $("modalpopup [type='radio']").on('click', function (e) {
        if ($(this).attr("clicked")) {
          this.checked = false;
          $(this).removeAttr("clicked");
          return;
        }
        $("modalpopup *").removeAttr("clicked");
        $(this).attr("clicked","true");
      });

      $("modalpopup [type='checkbox']").on('click', function (e) {
        var group=$(this).attr("name");
        if (group!=""){
          $("modalpopup [type='checkbox'][name='"+group+"']").not(this).removeAttr('checked');
        }
      });
      }
    );
  } else {
    var ret=askForDogs($(obj));
    saveButtonEnable();
    return ret; // False если ничегоо не спрашивали
  }
}


function renderAdvantage(obj) {
  if ($(obj).hasClass("empty-container")) return;

  $(obj).find(".nocopy").remove();
  if ($(obj).find("gc-cost").length == 0) $(obj).append("<gc-cost class='nosave'></gc-cost>");
  $(obj).find("levels").addClass("spinner").addClass("spinner-not-negative").addClass("editable");
  $(obj).find("cr").addClass("spinner").addClass("spinner-control-roll").addClass("editable");
  $(obj).find("name-loc").addClass("editable");

  // оружие
  renderWeapons(obj);

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

// наклкдываем модифкатор на адвантагу
function addModifierToAdvantage(modifier,dropTo) {
  function afterModifierDragged() {
    var clearedObj=$(modifier).filter("[modifier='yes']").find("modifier[enabled='yes']").clone();
    clearedObj.removeAttr("radiogroup checkgroup");

    // Ищем куда положить
    if ($(dropTo).find(">modifier").last().length==1) {
      $(dropTo).find(">modifier").last().after(clearedObj)
    } else if ($(dropTo).find(">reference").length == 1) {
      $(dropTo).find(">reference").before(clearedObj)
    } else {
      $(dropTo).append(clearedObj);
    }
    askForDogs($(dropTo));
    renderObj($(dropTo));
    bindEvents();
    saveButtonEnable();
    calcAll();
  }

  if ($(modifier).filter("[modifier='yes']").find("modifier[enabled='no']").length > 0) {
    editAdvantage($(modifier), false, afterModifierDragged);
  } else {
    afterModifierDragged();
  }
}




