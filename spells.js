function calcSpell(obj)
{


  var ret=getBasicSpellLevel(obj,0);
  var level=ret.level;
  var relativeLevel=ret.relativeLevel;

  $(obj).find('points').lightStatus("gc-free-points",ret.freePoints);


  // Bonuses from adv/disadv
  {
    globalModifiersOn.each(function () {
      $(this).find(">spell_bonus").each(function (){
        var isCollege=($(this).attr("all_colleges")=="yes"); // all collages
        if (!isCollege&& $(this).find(">college_name").length) {
            isCollege = compare($(obj).find(">college").html(), $(this).find(">college_name").html(), $(this).find(">college_name").attr("compare"));
        }
        if (isCollege)
        {
          if ($(this).find("amount").attr("per_level")=="yes") {
            bonus=$(this).find("amount").int()*$(this).parent().find(">levels").int()||0;
          } else
          {
            bonus=$(this).find("amount").int();
          }
          //if (bonus>0) bonusText+="от "+advName+" ("+bonus+" ур)";
          level+=bonus;
        }
      });
    });
  }


  var textual='IQ'+relativeLevel;
  if (relativeLevel==0) textual='IQ';
  if (relativeLevel>0) textual='IQ'+"+"+relativeLevel;

  if ($(obj).find("points").int()<=0) textual="";

  $(obj).find('gc-stat').html(textual);
  $(obj).find("gc-level").html(level);

  $(obj).find("points").lightStatus("gc-warning",$(obj).find("points").int()<=0);


}

function getBasicSpellLevel(obj) {
  var points=$(obj).find("points").int();

  var level=parseInt(getAttr("IQ"));

  var relativeLevel=-2;
  if (obj.attr("very_hard")=="yes") relativeLevel=-3;

  var baseZeroLevel=level + relativeLevel-1; // уровень за 1

  var freePoints=false;
  if (points > 0) {
    if (points == 1) {
      //do nothing
    } else if (points == 2) {
      relativeLevel++;
    }else if (points == 3) {
      relativeLevel++;
      freePoints=true;
    } else {
      relativeLevel+=1 + Math.floor(points / 4);
      if (points%4!=0) freePoints=true;
    }

  } else {
    level = 0;
    relativeLevel = 0;
  }

  level+=relativeLevel;

  return {level:level,relativeLevel:relativeLevel,baseZeroLevel:baseZeroLevel,freePoints:freePoints}
}

function editSpell(obj,cancelDelete) {
  if (viewerMode) return;
  var ret=askForDogs($(obj));
  calcAllSchedule();
  saveButtonEnable();
  flashObj($(obj));
  return ret;
}

function renderSpell(obj) {
  if ($(obj).hasClass("empty-container")) return;

  $(obj).find(".nocopy").remove();
  if ($(obj).find(">gc-level").length == 0) $(obj).append("<gc-stat class='nosave'></gc-stat><gc-level class='nosave'></gc-level><gc-default class='nosave'></gc-default>");
  if ($(obj).find(">points").length == 0) $(obj).append("<points>1</points>");
  $(obj).find("points").addClass("spinner spinner-not-negative editable");
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

// Spell charts

$(function() {
  $.each(spellChartsPages,function(k,v){
    $("spell-charts buttons").append("<button class='secondary button-thin' onclick='spellChartsShowPage(\""+k+"\")'>"+k+"</button> ");
  })
});



function spellChartsShowPage(name,hilight){
  $("spell-charts buttons").removeClass('visible'); // Схлапываем мобильное меню
  $("spell-charts selected-collage").html(name+" collage"); // тоже для мобильного


  $("spell-charts buttons button").each(function(){
    $(this).lightStatus("selected",$(this).html()==name.replace("&","&amp;"));
  });

  var page=spellChartsPages[name];
  $("spell-charts objects").load("spell-charts/page"+page+".html?rnd="+mentorVersion,function(){
    $("spell-charts block").each(function(){
      if ($(this).find(">name").html()==hilight) $(this).addClass("highlighted");
    });

    $("spell-charts block").on("click",function (){
      viewDescription($(this).find("spell"),true);
    });

    $("spell-charts block").on("dblclick",function (){
      if (!$(this).hasClass("not-taken")) return;
      addObjToChar($(this).find("spell"));
  });



    spellChartsMark();
  });
  $("spell-charts #spell-charts-bg-img").attr("src","spell-charts/page"+page+".png?rnd="+mentorVersion);
}

function spellChartsMark(){
  if ($("body").hasClass("show-spell-charts")){
    $("spell-charts block").removeClass("check-ok prereq-fail");
    $("spell-charts block>prereq_list").remove();

    $("spell-charts block").each(function () {
      var obj = $(this);
      obj.addClass("not-taken");
      var objName = $(this).find(">name").html();
      globalSpellsList.each(function () {
        if ($(this).find(">name").html() == objName) {
          obj.removeClass("not-taken");
          if ($(this).hasClass("prereq-fail")) {
            obj.addClass("prereq-fail");
            obj.append($(this).find(">prereq_list").clone(true))
          }
          else {
            if (obj.hasClass("check-ok")) obj.addClass("check-warning");
            obj.addClass("check-ok");
            obj.find(">prereq_list").remove();
          }
        }
      });
    });
  }
}

function showSpellCharts(){
  $("body").addClass("show-spell-charts");
  $("infopopup").addClass("empty"); // скрываем попап
  $("lib").removeClass("visible"); // Убираем в мобильном режиме библиотеку
  spellChartsMark();
}