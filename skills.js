function getBestDefault(obj,useResultValue)
{
  var defaultsListText=""
  var bestDefaultLevel=-100;
  var bestDefaultText="";
  var bestDefaultModifier;
  var bestDefaultSkillLevel=-100;
  var bestDefaultSkillText="";

  var isTechnique=($(obj)[0].tagName.toLowerCase()=='technique');

  $(obj).find("default").each(function () {

    function modTextual(i) {if (i<0) return (i); if (i>0) return("+"+i); return(""); }

    var currentDefaultLevel = -100;
    var currentDefaultSkillLevel = -100;
    var currentDefaultText;
    var currentDefaultModifier;
    var type = $(this).find("type").text();
    var name = $(this).find("name").text();
    var modifier = $(this).find("modifier").int();
    var specialization = $(this).find("specialization").text();
    var fullName = name;
    if (specialization.length) fullName = name + ' (' + specialization + ')';

    if (type == "Skill"||type=="Spell") {
      currentDefaultText = fullName + modTextual(modifier);
      currentDefaultModifier = modifier;
      var searchObj=(type == "Skill")?globalSkillsList:globalSpellsList;
      searchObj.each(function () {
        if ($(this)[0] != $(obj)[0] && $(this).find("points").text() > 0 && $(this).find(">name").text() == name) {
          if (specialization.length == 0 || $(this).find(">specialization").text() == specialization) {
            if (isTechnique||useResultValue) {
              currentDefaultLevel = $(this).find("gc-level").int() + modifier;
            } else {
              currentDefaultLevel = 1 * getBasicSkillLevel($(this)).level + modifier;
            }
            currentDefaultSkillLevel = currentDefaultLevel;
          }
        }
      });
    }
    else if (type == "Parry") {
      //todo
    }
    else if (type == "Block") {
      //todo
    }
    else {
      // от стата
      var attr=Math.min(getAttr(type),20); // Ограничение стата по правилам
      currentDefaultLevel = 1 * attr  + modifier;
      currentDefaultText=type+modTextual(modifier);
      currentDefaultModifier=modifier;
    }

    if (bestDefaultLevel < currentDefaultLevel) {
      bestDefaultLevel = currentDefaultLevel;
      bestDefaultText = currentDefaultText;
      bestDefaultModifier = currentDefaultModifier;
    }

    if (bestDefaultSkillLevel < currentDefaultSkillLevel) {
      bestDefaultSkillLevel = currentDefaultSkillLevel;
      bestDefaultSkillText = currentDefaultText;
    }

    defaultsListText+=currentDefaultText+"\n";
  });

  return{bestDefaultLevel:bestDefaultLevel,bestDefaultText:bestDefaultText,bestDefaultModifier:bestDefaultModifier,bestDefaultSkillLevel:bestDefaultSkillLevel,bestDefaultSkillText:bestDefaultSkillText,defaultsListText:defaultsListText}
}
function calcSkill(obj)
{
  var pointsFromDefault=0;

  var defaultObj=getBestDefault(obj);

  var bestDefaultLevel=defaultObj.bestDefaultLevel;
  var bestDefaultText=defaultObj.bestDefaultText;
  var bestDefaultModifier=defaultObj.bestDefaultModifier;
  var bestDefaultSkillLevel=defaultObj.bestDefaultSkillLevel;
  var bestDefaultSkillText=defaultObj.bestDefaultSkillText;
  var useDefault=false;


  var isTechnique=($(obj)[0].tagName.toLowerCase()=='technique');

  var encumbranceMod=0;
  if ($(obj).find(">encumbrance_penalty_multiplier").length){
    encumbranceMod=$(obj).find(">encumbrance_penalty_multiplier").int()*globalChar.find("encumbrance_bonus").int();
  }

  if (isTechnique)
  {
    var techModifier=$(obj).find("points").int();
    var limit=$(obj).attr("limit");
    if (limit=="") limit=1000;


    if ($(obj).find("difficulty").text().toLowerCase()=="h") techModifier--; // Сложнсоть
    if (techModifier<0) techModifier=0;

    // модификатор нагрузки
    $(obj).find('gc-default').html("");
    if (encumbranceMod!=0) {
      bestDefaultLevel+=encumbranceMod;
      $(obj).find('gc-default').html(" от нагрузки "+encumbranceMod);
    }

    $(obj).find("gc-level").html(1*bestDefaultLevel+1*techModifier);
    $(obj).find('gc-stat').html(((techModifier>0)?"+":"")+techModifier);
    $(obj).find("points").lightStatus("gc-warning",techModifier<=0||(1*bestDefaultModifier+1*techModifier)>limit);







    if (bestDefaultLevel<0) {$(obj).find("gc-level").html("---");}
    return;
  }

  if (bestDefaultSkillLevel>0) {
      pointsFromDefault = getPointsFromSkillLevel(obj, bestDefaultSkillLevel);
      if (pointsFromDefault > 0)
          bestDefaultSkillText = " от " + bestDefaultSkillText + " (" + pointsFromDefault + "pt)";
      else {
        bestDefaultSkillText = "";
      }
  }
  else {
    bestDefaultSkillText = "";
  }

  var ret=getBasicSkillLevel(obj,pointsFromDefault);
  var level=ret.level;
  var relativeLevel=ret.relativeLevel;
  var statText=ret.statText;

  $(obj).find('points').lightStatus("gc-free-points",ret.freePoints);

  if ($(obj).find('points').text()==0) {
    level=bestDefaultLevel;
    useDefault=true;
  }

  var bonus=0;
  var bonusText="";
  // Bonuses from adv/disadv
  {
    var nameOfSkill=$(obj).find(">name").text().toLowerCase();
    var specializationOfSkill=$(obj).find(">specialization").text().toLowerCase();
    globalModifiersOn.each(function () {

      var advName=$(this).find(">name,>description").text();

      $(this).find(">skill_bonus").each(function (){
        var name=$(this).find("name").text().toLowerCase()
        var nameCompare=$(this).find("name").attr("compare");
        var specialization=$(this).find("specialization").text().toLowerCase()
        var specializationCompare=$(this).find("specialization").attr("compare")||"is anything";

        if (compare(nameOfSkill,name,nameCompare)&&compare(specializationOfSkill,specialization,specializationCompare)){
          if ($(this).find("amount").attr("per_level")=="yes") {
            bonus=$(this).find("amount").int()*$(this).parent().find(">levels").float()||0;
          } else
          {
            bonus=$(this).find("amount").int();
          }

          if (bonus!=0) bonusText+="от "+advName+" ("+bonus+" ур)";
          level=1*level+1*bonus;
        }
      });
    });
  }

  // модификатор нагрузки
  if (encumbranceMod!=0) {
    level+=encumbranceMod;
    bonusText+=" от нагрузки "+encumbranceMod;
  }


  if (useDefault) {
    $(obj).find('gc-stat').html("Def");
    $(obj).find('gc-default').html("От "+bestDefaultText+bonusText);
  }
  else{
    var textual=statText+relativeLevel;
    if (relativeLevel==0) textual=statText;
    if (relativeLevel>0) textual=statText+"+"+relativeLevel;
    $(obj).find('gc-stat').html(textual);
    $(obj).find('gc-default').html(bestDefaultSkillText+bonusText);
  }

  $(obj).find("gc-level").html(level);
  $(obj).find("points").lightStatus("gc-warning",useDefault);

  // у скила нет дефолта
  if (level==-100){
    $(obj).find('gc-stat').html("No def");
    $(obj).find("gc-level").html("---");
    $(obj).find('gc-default').html("");

  }


}

function getPointsFromSkillLevel(obj, level){
  var ret=getBasicSkillLevel(obj)
  var points=0;
  var delta=(level-ret.baseZeroLevel)
  if (delta==1)points=1;
  if (delta==2)points=2;
  if (delta>2)points=((delta-2)*4);
  return points;
}

function getBasicSkillLevel(obj, bonusPointsFormDefault) {
  bonusPointsFormDefault=bonusPointsFormDefault||0;
  var diffToParse=$(obj).find("difficulty").text();
  var stat=diffToParse.charAt(0).toLocaleLowerCase();
  var difficulty=diffToParse.charAt(diffToParse.length-1).toLocaleLowerCase();
  var points=1.0*$(obj).find("points").text();
  if (diffToParse.charAt(diffToParse.length-2).toLocaleLowerCase()=='v') difficulty='v';

  if ($(obj)[0].tagName=="SPELL") {
    stat="i";
    difficulty=$(obj).attr("very_hard")=="yes"?"v":"h";
  }

  var statText="";
  if (stat=='s'){statText="ST";}
  if (stat=='d'){statText="DX";}
  if (stat=='h'){statText="HT";}
  if (stat=='i'){statText="IQ";}
  if (stat=='w'){statText="Will";}
  if (stat=='p'){statText="Per";}
  var level=getAttr(statText);

  var relativeLevel;
  if (difficulty=='e') relativeLevel=0;
  if (difficulty=='a') relativeLevel=-1;
  if (difficulty=='h') relativeLevel=-2;
  if (difficulty=='v') relativeLevel=-3;
  if (difficulty=='w') relativeLevel=-3; // универасальное умение - wildcard

  if (difficulty == 'w') {
    points = points / 3;
  }

  var baseZeroLevel=1*level + 1*relativeLevel-1; // уровень за 1

  var freePoints=false;
  if (points > 0) {
    points=1*points+1*bonusPointsFormDefault;

    if (points == 1) {
      //do nothing
    } else if (points == 2) {
      relativeLevel = 1 * relativeLevel + 1;
    }else if (points == 3) {
      relativeLevel = 1 * relativeLevel + 1;
      freePoints=true;
    } else {
      relativeLevel = 1*relativeLevel + 1 + Math.floor(points / 4);
      if (points%4!=0) freePoints=true;
    }



  } else {
    level = 0;
    relativeLevel = 0;
  }

  level =1*level + 1*relativeLevel;

 return {level:level,relativeLevel:relativeLevel,statText:statText,baseZeroLevel:baseZeroLevel,freePoints:freePoints}
}

function editSkill(obj,cancelDelete) {
  if (viewerMode) return;
  var ret=askForDogs($(obj));
  calcAllSchedule();
  saveButtonEnable();
  flashObj($(obj));
  return ret;
}


function renderSkill(obj) {
  if ($(obj).hasClass("empty-container")) return;

  $(obj).find(".nocopy").remove();
  if ($(obj).find(">gc-stat").length == 0) $(obj).append("<gc-stat class='nosave'></gc-stat><gc-level class='nosave'></gc-level><gc-default class='nosave'></gc-default>");
  $(obj).find(">points").addClass("spinner spinner-not-negative editable");
  $(obj).find(">name-loc, >specialization").addClass("editable");
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
