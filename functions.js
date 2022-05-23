// Немного раширим Дату
Date.prototype.getMonthName = function(lang) {
  var month_names = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
  return month_names[this.getMonth()];
};



// Немного раширим jquery

$.fn.lightStatus = function (statusName, when) {
  // подсветка классом
  if (when) $(this).addClass(statusName);
  else $(this).removeClass(statusName);
};

$.fn.sortSelectBox = function(){
  // Get options from select box
  var my_options = $(this).find('option');
  // sort alphabetically
  my_options.sort(function(a,b) {
    if (a.text > b.text) return 1;
    else if (a.text < b.text) return -1;
    else return 0
  });
  //replace with sorted my_options;
  $(this).empty().append( my_options );

  // clearing any selections
  $(this).find('option').attr('selected', false);
};
$.fn.int = function() {
  return parseInt(this.text());
};

$.fn.float = function() {
  return parseFloat(this.text());
};

$.fn.setHtmlIfChanged = function(val) {
  if (this.html()!=val) this.html(val);
};

$.fn.toggleAttr = function(n) {
  if ($(this).attr(n)!==undefined) $(this).removeAttr(n);
  else $(this).attr(n,'')
};


$.fn.changeTag = function(tag){
  // create the new, empty shim
  var replacement = $('<' + tag + '>');
  // empty container to hold attributes
  var attributes = {};
  // copy all the attributes to the shell
  $.each(this.get(0).attributes, function(index, attribute) {
    attributes[attribute.name] = attribute.value;
  });
  // assign attributes to replacement
  replacement.attr(attributes);
  // copy the data
  replacement.data(this.data());
  // get all the kids, with data and events
  var contents = this.children().clone(true);
  // inseminate
  replacement.append(contents);
  // swap it out
  this.replaceWith(replacement);
  // and we're done
  return replacement;
};

// Replace который ернет новый объект
$.fn.replaceWithPush = function(a) {
  var $a = $(a);
  this.replaceWith($a);
  return $a;
};

$.fn.changeTag = function(tag){
  // create the new, empty shim
  var replacement = $('<' + tag + '>');
  // empty container to hold attributes
  var attributes = {};
  // copy all the attributes to the shell
  $.each(this.get(0).attributes, function(index, attribute) {
    attributes[attribute.name] = attribute.value;
  });
  // assign attributes to replacement
  replacement.attr(attributes);
  // copy the data
  replacement.data(this.data());
  // get all the kids, with data and events
  var contents = this.children().clone(true);
  // inseminate
  replacement.append(contents);
  // swap it out
  this.replaceWith(replacement);
  // and we're done
  return replacement;
}

$.fn.generateUniqueId = function(prefix){
  while ($(this).attr("id")===undefined) {
    rndId=prefix+ Math.floor(Math.random() * 100000000);
    if ($("#"+rndId).length==0) $(this).attr("id",rndId);
  }
  return $(this).attr("id");
}

function loadScript (url, callback) {
  $.ajax({
    url: url,
    dataType: 'script',
    success: callback,
    async: true
  });
}

function echo (){
  $.each(arguments, function (k,v){
    console.error(v);
  })

}

var timers=[]
function timeProbe(name,reset){
  var o=timers[name];
  timers[name] = new Date().getTime();
  if (reset) return;
  if (o>0) console.log (name+": "+(timers[name]-o)+"мс");
}

function getURLParameter(name) {
  var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
  return (results !== null) ? decodeURIComponent(results[1]) : null;
}

function isTouchDevice() {
  return 'ontouchstart' in window        // works on most browsers
    || navigator.maxTouchPoints;       // works on IE10/11 and Surface
}


function reverseString(s) {return s.split("").reverse().join("");}

function optionsPopup(inCharacterSettings){
//    if (viewerMode) return;

  if (inCharacterSettings) {

    var thresholds="<h3>Настройки персонажа</h3>" +
      "<line>Ограничение недостатков <input type=number style='width:60px;' max='0' step='5' id='disadvantages_threshold' value='"+globalChar.find("disadvantages_threshold").int()+"'>"+
      " причуд <input type=number  style='width:60px;' id='quirks_threshold' max='0' value='"+globalChar.find("quirks_threshold").int()+"'></line>";

    var cur=globalChar.find("character,template-fix").attr('names-display');
    var lang="<line>Показывать названия <select id=langToDisplay>" +
      "<option value=''>Английский и перевод</option>" +
      "<option value='hide_loc' "+((cur=='hide_loc')?"selected":"")+">Только английский</option>" +
      "<option value='hide_eng' "+((cur=='hide_eng')?"selected":"")+">Только перевод</option>" +
      "</select></line>";

    var kgOrLbs="<line>Единицы измерения <select id=useKg>" +
      "<option value=''>Фунты (lbs)</option>" +
      "<option value='kg' "+((globalChar.find("character,template-fix").attr('measure')=='kg')?"selected":"")+">Килограммы</option>" +
      "</select></line>";

    var optionalRules="<h3>Опициональные правила расчета</h3>" +
      "<line><label><input type='checkbox' id='kyos' "+(globalChar.find("character,template-fix").attr('kyos')=='yes'?"checked":"")+" /> Know Your Own Strength <a href='https://drive.google.com/open?id=10Wxm4s_vqDa_can8w1w7-Wi_JjL6tGZQUsqtZh4NYX8'  target='_blank'><i class='fa fa-question-circle'></i></a></label></line>"+
      "<line><label><input type='checkbox' id='will-free' "+(globalChar.find("character,template-fix").attr('will-free')=='yes'?"checked":"")+" /> Will и Per отвязаны от IQ <a href='http://www.mygurps.com/index.php?p=in&a=1h&v=0#houserules' target='_blank'><i class='fa fa-question-circle'></i></a></label></line>";

    var editorOptions="<line><label><input type='checkbox' id='auto-сalc' "+($("body").hasClass('manual-calc-mode')?"":"checked")+" /> Автоматически пересчитывать лист после изменений</label></line>";


  }

  var books="<line>Открывать книги (.pdf) <select id=books>" +
    "<option value=''>Русский перевод</option>" +
    "<option value='eng' "+(($.cookie("books")=="eng")?"selected":"")+">Английский исходник</option>" +
    "</select></line>";

  var theme="<line>Тема интерфейса <select id=theme>" +
    "<option value='light'>Светлая</option>" +
    "<option value='dark' "+(($.cookie("theme")=="dark")?"selected":"")+">Темная</option>" +
    "</select></line>";

  var channel=$.cookie("discord-use-channel")||0;
  var discordInputs=""
  for (i=1;i<=discordChannelCount;i++){
    discordInputs+="<line class='ui-discord-settings-line discord-channels"+i+"'>" +
      "<input type='radio' name='discord-use-channel' value='"+i+"' "+(channel==i?"checked":"")+"> " +
      "<input type='text' id='discord-hook"+i+"' placeholder='URL вебкуха' onClick='$(this).prev().prop(\"checked\", true);' value='"+($.cookie("discord-hook"+i)||"")+"'/>" +
      "<div class='note' title='Броски будут отсылаться в канал но не показываться вам'><nobr><label><input type='checkbox' id='discord-hidden-roll"+i+"' style='width:10px; height:10px;' "+($.cookie("discord-hidden-roll"+i)=="true"?"checked":"")+">В темную</label></nobr></div>" +
      "</line>";
  }



  var rollsOptions="<h3>Броски в Discord</h3>" +
    "<line>Для отправки бросков в каналы на сервера <a href='//discord.com/' target='_blank'>discord.com</a></line>"+
    "<line>Имя, от кого отправлять <input type='text' id='discord-name' placeholder='Любое имя' value='"+($.cookie("discord-name")||"")+"' /></line>" +
    "<line class='ui-discord-settings-line'><label><input type='radio' name='discord-use-channel' value='0' "+(channel==0?"checked":"")+"> Не транслировать</label></line>"+
    discordInputs+
    "<line><a onClick='$(\"#discordDescription\").toggle();' style='margin-top:5px; display:inline-block;'><i class='fa fa-question-circle'></i> Как это сделать?</a></line>"+
    "<line id='discordDescription' style='display:none; padding:10px;' class='bordered'>" +
    "<p>1. На своем сервере в дискорд, зайдите в настройку канала (шестеренка рядом с именем).</p>" +
    "<p>2. Зайдите в: Интеграция -> Вебхуки -> Новый вебхук.</p>" +
    "<p>3. Можете задать имя и аватарку, но самое важное нажать \"Копировать URL вебхука\" </p>" +
    "<p>4. Вставьте полученный адрес сюда (в поле канала понравившегося вам цвета), и раздайте этот адрес другим игрокам, тогда вы будете отправлять свои броски в один канал</p>" +
    "Для Алисы есть более детальное <a href='https://discordgid.ru/webhook/' target='_blank'>описание с картинками</a> ;)</line>";


  modalPopup("<div style='text-align: left' class='gc-char-settings'>"+(thresholds||"")+(lang||"")+(kgOrLbs||"")+(editorOptions||"")+(optionalRules||"")+"<h3>Общие настройки</h3>"+books+theme+rollsOptions+"</div>","Сохранить","Отмена",function (){
    if (inCharacterSettings){
      globalChar.find("disadvantages_threshold").html($("#disadvantages_threshold").val());
      globalChar.find("quirks_threshold").html($("#quirks_threshold").val());

      if ($("#langToDisplay").val()=="") globalChar.find("character,template-fix").removeAttr('names-display');
      else globalChar.find("character,template-fix").attr('names-display',$("#langToDisplay").val());

      if ($("#useKg").val()=="") globalChar.find("character,template-fix").removeAttr('measure');
      else globalChar.find("character,template-fix").attr('measure',$("#useKg").val());

      if (!$("#kyos").is(':checked')) globalChar.find("character").removeAttr('kyos');
      else globalChar.find("character").attr('kyos','yes');

      if (!$("#will-free").is(':checked')) globalChar.find("character").removeAttr('will-free');
      else globalChar.find("character").attr('will-free','yes');

      $("body").lightStatus("manual-calc-mode",!$("#auto-сalc").is(':checked'));
    }

    $.cookie("books",$("#books").val(),{ expires: 10 * 365 });

    $.cookie("theme",$("#theme").val(),{ expires: 10 * 365 });

    for (i=1; i<=discordChannelCount; i++) {
      $.cookie("discord-hook"+i,$("#discord-hook"+i).val(),{ expires: 10 * 365 });
      $.cookie("discord-hidden-roll"+i,$("#discord-hidden-roll"+i).is(':checked'),{ expires: 10 * 365 });

    }

    $.cookie("discord-name",$("#discord-name").val(),{ expires: 10 * 365 });
    $.cookie("discord-use-channel",$("modalpopup input[name=discord-use-channel]:checked").val(),{ expires: 10 * 365 });
    updateDiscord();

    setMentorTheme();

    if (inCharacterSettings){
      calcAll();
      saveButtonEnable();
    }
  });
}

function updateDiscord(){
  var isAnyChannel=false;
  $("body").removeClass("discord-show");

  for (i=1; i<=discordChannelCount; i++) {
    $("body").removeClass("discord-use-channel"+i);
    if (($.cookie("discord-hook"+i)||"").length>0) $("body").addClass("discord-show");
  }
  if ($.cookie("discord-use-channel")>0) $("body").addClass("discord-use-channel"+$.cookie("discord-use-channel"));
}

function changeDiscordChannel(obj){
  var cur=$.cookie("discord-use-channel");
  do {cur++} while ( ($.cookie("discord-hook"+cur)||"").length==0&&cur<discordChannelCount)
  if (cur==discordChannelCount) {
    cur=0;
    flyAlert("Отправка в Dicord выключена",$(obj));
  }
  else {
    if ($.cookie("discord-hidden-roll"+cur)=="true") flyAlert(cur+" канал, броски \"в темную\"",$(obj));
    else  flyAlert(cur+" канал",$(obj));
  }
  $.cookie("discord-use-channel",cur);
  updateDiscord();
}

function setMentorTheme(name){
  name=name||$.cookie("theme");
  if (name == 'dark'){
    $("link.dark-theme").prop('disabled', false);
    $("link.light-theme").prop('disabled', true);
  }
  else {
    $("link.light-theme").prop('disabled', false);
    $("link.dark-theme").prop('disabled', true);
  }
}

function currentDateTime()
{
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var hh=today.getHours();
  var min=today.getMinutes();
  if(dd<10){dd='0'+dd;}
  if(mm<10){mm='0'+mm;}
  if(hh<10){hh='0'+hh;}
  if(min<10){min='0'+min;}

  return (dd+"."+mm +"."+today.getFullYear()+" "+hh+":"+min);
}

// Окончания численных названий
function textEndings(i,t1,t2,t3)
{
  // 1 день, 2 дня, 10 дней
  var z=i%100;
  var z10=Math.floor(z/10);
  var z1=z%10;

  var ret=t3;
  if (z10!=1)
  {
    if(z1==1) ret=t1;
    if(z1==2||z1==3||z1==4) ret=t2;
  }
  return(i+" "+ret);
}




function getAttr(attr) {
  attr=attr.toLocaleLowerCase();
  if (attr == "speed") attr = "speed_result";
  if (attr == "move") attr = "move_result";
  if (attr == "will") attr = "will_result";
  if (attr == "per") attr = "perception_result";
  if (attr == "st") attr = "ST_result";
  if (attr == "dx") attr = "DX_result";
  if (attr == "iq") attr = "IQ_result";
  if (attr == "ht") attr = "HT_result";
  return (globalChar.find(attr).text());
}

function getAttrCost(attr, level) {
  var k=1;
  if (level>10) k=globalChar.find(attr+"_cost_modifier").float();
  if (attr == 'ST' || attr == 'HT') {
    k*=10;
  }
  if (attr == 'IQ' || attr == 'DX') {
    k*=20;
  }
  return (Math.round((level - 10) * k));
}

function isCharOption(attr){
  return (globalChar.find("character").attr(attr)=='yes');
}

function modifyDamage(baseDamage,modifier,perDie,doNotCutModifiers)
{
  dmgObj=damageStrToObj(baseDamage);

  modifier=modifier.toString();
  var d=String(modifier).indexOf('d');
  var addDices=parseInt(modifier.substr(0,d))||0;
  var addModifier=parseFloat(modifier.substr(d+1)||0);

  if (addModifier=='') addModifier=0;

  dmgObj.modifier+=addModifier*((perDie)?dmgObj.dices:1);
  dmgObj.dices+=addDices;


  if (doNotCutModifiers!=true){
    // уменьшаем кубы согасно правилам
    var dicesMod=Math.floor(Math.abs(dmgObj.modifier/3.5));
    dmgObj.dices+=(dmgObj.modifier>0)?dicesMod:dicesMod*-1;
    dmgObj.modifier-=(dmgObj.modifier>0)?Math.ceil(dicesMod*3.5):Math.floor(dicesMod*-3.5);
  }

  // выправляем "нулевой дайс"
  if (dmgObj.dices<1) {dmgObj.modifier-=Math.round((1-dmgObj.dices)*3.5); dmgObj.dices=1;}


  // текстализируем
  return (damageObjToStr(dmgObj));
}

function getBaseDice(damage){
  damage=String(damage)
  var d=damage.indexOf('d');
  return parseInt(damage.substr(0,d));
}

function bindSpinners(base){
  // фаерит событие change()
  base.andSelf().find(".spinner").unbind("keyup").bind("keyup", function () {
    if (event.key == "ArrowUp") spinn($(this), event.ctrlKey?10:1);
    if (event.key == "ArrowDown") spinn($(this), event.ctrlKey?-10:-1);
    $(this).change();
  }).unbind('mousewheel').bind('mousewheel', function (e) {
    if ($(this).is(":focus")) {
      spinn($(this), (event.ctrlKey||event.metaKey?10:1)*((e.originalEvent.wheelDelta / 300 > 0)?1:-1));
      event.preventDefault();
      $(this).change();
    }
  }).unbind("focus").bind("focus", function () {
    lastFiledVar=$(this).html();
    showSpinnPanel($(this));
  }).unbind("blur").bind("blur", function () {
    hideSpinnPanelShedule();
  });
}

function modalPopup(message, okText, cancelText, okCb,cancelCb,initializationCb) {
  modalPopupClose();
  document.activeElement.blur();
  var el = $("<modalpopup><modalpopup-box><message></message><buttons><button class='btn ok'></button> <button class='btn cancel'></button></buttons></modalpopup-box></modalpopup>");
  el.find("message").html(message);
  el.find(".ok").html(okText);
  if (!okText) el.find(".ok").remove();
  el.find(".cancel").html(cancelText);
  if (!cancelText) el.find(".cancel").remove();
  el.find(".cancel").click( function () {
    if (cancelCb) cancelCb();
    $("modalpopup").remove();
  });
  el.find(".ok").click(function () {
    var isAllOk=true;
    if (okCb) isAllOk=okCb();
    if (isAllOk!=false) $("modalpopup").remove();
  });
  el.appendTo("body");
  bindSpinners(el);
  if (initializationCb) initializationCb();
}

function modalPopupClose(){
  $("modalpopup .cancel").click();
  $("modalpopup").remove();
}

function imagePopup(src) {
  document.activeElement.blur();
  var el = $("<imagepopup><img/></imagepopup>");
  el.find("img").prop("src",src);
  el.click( function () {
    $("imagepopup").remove();
  });
  el.appendTo("body");
}


function flyAlert(message,obj) {
  if (!event) var event=''; // dirty hack! )))
  var x=(event.clientX||10);
  var y=(event.clientY||$(window).height());

  if (obj) {
    x=$(obj).offset().left;
    y=$(obj).offset().top;
  }
  if (y<80) y=80;



  var el = $("<fly-alert>"+message+"</fly-alert>");
  if (x < $(window).width() / 2) {
    el.css("left", x);
  }
  else {
    el.css("right", $(window).width() - x);
  }
  el.css("top",y-30);
  $("body>fly-alert").remove();
  el.appendTo("body");

  setTimeout(function (){el.remove()},2000);
}


function compare(src,needle,mode){
  if (!src) src="";
  src=src.toLowerCase();
  needle=needle.toLowerCase();
  mode=(mode||"").toLowerCase();
  //echo(src+" "+needle+" "+mode);
  if (mode=="is anything") return true;
  else if (mode=="is"&&src==needle) return true;
  else if (mode=="is not"&&src!=needle) return true;
  else if (mode=="contains"&&src.indexOf(needle)>=0) return true;
  else if (mode=="does not contain"&&src.indexOf(needle)==-1) return true;
  else if (mode=="starts with"&&src.indexOf(needle)==0) return true;
  else if (mode=="does not starts with"&&src.indexOf(needle)!=0) return true;

  else if (mode=="ends with"&&src.lastIndexOf(needle)==(src.length-needle.length)&&needle.length>0) return true;
  else if (mode=="does not ends with"&&src.lastIndexOf(needle)!=(src.length-needle.length)) return true;

  else if (mode=="exactly"&&parseInt(src)==parseInt(needle)) return true;
  else if (mode=="at least"&&parseInt(src)>=parseInt(needle)) return true;
  else if (mode=="at most"&&parseInt(src)<=parseInt(needle)) return true;

  return false;
}


function checkPrerequisits(obj){
  var ret=true;
  $(obj).find(">prereq_list").each(function () {
    ret=prereqRecurse($(this),$(this).attr("all")=="yes");
  });
  return ret;


  function prereqRecurse(obj,all){
    var ret=all;

    var when_tl=$(obj).find(">when_tl");
    if (when_tl.length){
      if (!compare(globalChar.find("profile tech_level").html(),when_tl.html(),when_tl.attr("compare"))){
        $(obj).lightStatus("prereq-ok",true);
        return true;
      }
    }

    $(obj).find(">*").each (function (){
      var check=false;
      var tag=$(this).prop("tagName").toLowerCase();
      var curPrereq=$(this);

      if (tag=="prereq_list") {
        check=prereqRecurse($(this),$(this).attr("all")=="yes");
      }
      else if (tag=="skill_prereq"){
        globalSkillsList.each(function () {
          if ($(this).find("points").int() > 0) {
            if ($(this)[0]!=$(obj).parent()[0]&&prereqCompare($(this),curPrereq)) check=true;
          }
        });
      }
      else if (tag=="spell_prereq"){
        var quantity=curPrereq.find(">quantity").int()||1;
        var college_count=curPrereq.find(">college_count").int()||1;
        if (college_count>quantity) quantity=college_count;

        globalSpellsList.each(function () {
          if ($(this).find("points").int() > 0) {
            if ($(this)[0]!=$(obj).parent()[0]&&prereqCompare($(this),curPrereq)) quantity--;
          }
          if (quantity<=0) check=true;
        });
        curPrereq.find(">quantity").attr("prereq-quantity-left",quantity);
      }
      else if (tag=="advantage_prereq"){
        globalAdvantagesAndModifiersList.each(function () {
          if ($(this)[0]!=$(obj).parent()[0]&&prereqCompare($(this),curPrereq)) check=true;
        });
      }
      else if (tag=="attribute_prereq"){
        var which=$(this).attr("which");
        var val=getAttr(which);
        var method=$(this).attr("compare");
        check=compare(val,$(this).html(),method);
      }
      else if (tag=="when_tl"){
        check=all;
      }
      else {
        echo("------> I don`t know this tag!!!");
        echo($(this));
      }

      if ($(this).attr("has")=="no") check=!check;

      $(this).lightStatus("prereq-ok",check);

      if (!check&&all) ret=false;
      if (check&&!all) ret=true;
    });
    return ret;
  }
}

function prereqCompare(obj,prereqsList){
  var ret=true;
  $(prereqsList).find(">*").each(function (){
        var needle=$(this).html();
    var method=$(this).attr("compare")||"";
    var searchTag=$(this).prop("tagName");
    if (searchTag=="LEVEL") {
      if ($(obj).prop("tagName")=="ADVANTAGE")
        searchTag="levels";
      else
        searchTag="gc-level";
    }
    if (searchTag=="LEVELS") {searchTag="level";}
    if (searchTag=="ANY") {searchTag="*"; method="is anything";}
    if (searchTag!="QUANTITY"&&searchTag!="COLLEGE_COUNT") {
      var tmp=compare("",needle,method); // это надо для методов is anithing и "не содержит";
      $(obj).find(">"+searchTag+",>modifier[enabled='yes']>"+searchTag).each(function (){
        if (compare($(this).html(),needle,method)) tmp=true;
      });
      if (!tmp) {ret=false; return}
    }
  });
  return ret;
}


function fly(from,to,end_callback){
  var floater=$("<div class='ui-draggable-helper'>"+$(from)[0].outerHTML+"</div>");
  $("body").append(floater);
  floater.css("position","absolute").css("top",$(from).offset().top||event.clientY).css("left",$(from).offset().left||event.clientX);
  floater.animate({top: $(to).offset().top+20,left:$(to).offset().left}, 700,function () {
    $(this).remove();
    if (end_callback) end_callback();
  });
}

function flashObj(obj){
  $(obj).addClass('ui-draggable-helper');
  setTimeout(function() { $(obj).removeClass('ui-draggable-helper'); },1);
}

function addObjToChar(sourceObj){

  if (boardMode) {
    addObjToBoard(sourceObj);
    return;
  }

  var obj = $(sourceObj).clone();
  $(obj).find("*").andSelf().removeClass("ui-selected hide");
  var place=placeToDrop($(obj));

  if ($(sourceObj).attr("modifier")=="yes") {
    var advList="";
    var checked="checked";
    globalAdvantagesList.each(function(k,v){
      if (!$(v).hasClass("empty-container")){
        advList+="<line><label><input type='radio' name='advantage-select' value='"+k+"' "+checked+"> "+$(v).find(">name").text()+" | "+$(v).find(">name-loc").text()+"</label></line>";
        checked="";
      }
    });
    modalPopup("<h3>Куда применить модификатор?</h3>"+advList,"Применить","Отказаться",function(){
      var targetObj=$(globalAdvantagesList[$('modalpopup input:checked').val()]);
      setTimeout(function (){
        // Да этот таймаут нужен для того чтобы вызов произошол после того как умрет текущий попап
        addModifierToAdvantage(obj,targetObj);
      },100)
    });
    return
  }

  logIt($(obj),"add");
  setModifyAttr($(obj),"changed");

  fly($(sourceObj), $(place), function () {
    $(obj).prependTo(place);
    if (templateMode) placeInFirstContainer(obj);
    renderObj($(obj));

    if (viewerMode) {
      $(obj).addClass('changed');
      flyAlert('В режиме просмотра изменения не сохраняются',$(obj));
    }

    editObj($(obj), true);
    setDrag();
    bindEvents();
    checkEmptyContainers();
    saveButtonEnable();
    calcAll();

    flashObj(obj);

  });
}

function keyboardSwitch(v)
{
  var ret="";
  for (i=0;i< v.length;i++)
  {
    var ch=v.charAt(i);
    if (keyboardAlphabet[ch]!= undefined) ch=keyboardAlphabet[ch];
    ret=ret.concat(ch);
  }
  return(ret);
}

function selectElement(obj,forceSet){
  viewDescription($(obj));

  if (!$(event.srcElement).hasClass("editable")) {
    document.activeElement.blur();
  }
  var isSelected=$(obj).hasClass("ui-selected");
  if (!event.ctrlKey&&!event.shiftKey) $(".ui-selected").removeClass("ui-selected");
  else {
    $(".ui-selected").each(function(){
      if (!$(this).parents("advantage_list,skill_list,spell_list,equipment_list").is($(obj).parents("advantage_list,skill_list,spell_list,equipment_list")))
        $(this).removeClass("ui-selected");
    })
  }
  if (event.shiftKey) {
    if ($(obj).nextAll("*:not(.hide)").filter(".ui-selected").length) $(obj).nextUntil(".ui-selected","*:not(.hide)").addClass("ui-selected");
    else if ($(obj).prevAll("*:not(.hide)").filter(".ui-selected").length) $(obj).prevUntil(".ui-selected","*:not(.hide)").addClass("ui-selected");
  }

  if (!isSelected||forceSet) {
    $(obj).addClass("ui-selected");
  }
  else {
    $(obj).removeClass("ui-selected");
    $("infopopup").addClass("empty");
  }
}

function unselectElements(){
  $(".ui-selected").removeClass("ui-selected");
}

function round(value, exp) {
  if (typeof exp === 'undefined' || +exp === 0)
    return Math.round(value);

  value = +value;
  exp = +exp;

  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
    return NaN;

  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}

function raplaceAllReferenceLink(text){
  return (text.replace(/\b(B|M|P|PSI)([\d]{1,3}\b)/g,makeReferenceLink));
}

function makeReferenceLink(text){
  var reg=/([\d]*)$/i;
  var result=reg.exec(text);
  var page=result[0];
  var book=text.substr(0,text.length-page.length);
  var fullName=booksAbbreviations[book]||"";
  var link='';
  // if (book=='B') link='href=books/basic_set_4ed_rus.pdf#zoom=80&page='+(1*page+(page>338?3:1)); старая книга с кривой нумерацией
  // if (book=='B') link='href=books/basic_set_4ed_rus.pdf?rnd=2#zoom=80&page='+(1*page);
  // if (book=='M') link='href=books/magic_rus.pdf#zoom=80&page='+(1*page+1);
  var isEng=($.cookie("books")=="eng");
  var eng='',rus='';



  if (book=='B') {
    eng='openBook("books/basic_set_4ed_eng.pdf",'+((page>338?4:2)+1*page)+',"B_rus");';
    rus='openBook("books/basic_set_4ed_rus.pdf",'+(1*page)+',"B_eng");';
  }
  if (book=='M') {
    eng='openBook("books/magic_eng.pdf",'+(1*page+2)+',"M_rus");';
    rus='openBook("books/magic_rus.pdf",'+(1*page+1)+',"M_eng");';
  }
  if (book=='P') {
    eng='openBook("books/powers_eng.pdf",'+(1*page+2)+',"P_rus");';
    rus='openBook("books/powers_rus.pdf",'+(1*page+1)+',"P_eng");';
  }

  return('<ref><a onClick=\''+(isEng?eng:rus)+'\' title="'+fullName+'" target=_blank>'+text+'</a><lang onClick=\''+(isEng?rus:eng)+'\'>›'+(isEng?"rus":"eng")+'</lang></ref>');
}

function openBook(link,page,name){

//  alert(typeof Android);
  if (typeof Android == "object") {
    Android.openBook(link,page);
  }
  else {
    window.open("about:blank", name);
    setTimeout(function (){
      window.open(link+"#zoom=80&page="+page, name);
    },1);
  }

}

function getDogsInText(text)
{
  var ret=[];
  var started=false;
  var dogsString="";
  for (var i = 0, len = text.length; i < len; i++) {
    if (started&&text[i] != "@") dogsString+=text[i];
    if (text[i] == "@")
      if (started) {
        started=false;
        ret.push(dogsString);
        dogsString="";
      } else {
        started = true;
      }
  }
  return ret;
}

function setDogsInText(text,needle,replace)
{
  var ret=text.replace("@"+needle+"@",replace);
  return(ret);
}


function askForDogs(obj) {
  var jQuerySearchString="*:not('name-loc,modifier *'),>modifier[enabled='yes']>*";

  var allDogs={};

  var dogsLoc=getDogsInText($(obj).find(">name-loc").text());

  $(obj).find(jQuerySearchString).each(function (){
    if ($(this).children().length==0) {
      var dogs=getDogsInText($(this).text());
      var isName=($(this).prop("tagName")=="NAME"||$(this).prop("tagName")=="SPECIALIZATION");
      $(dogs).each(function (i,v) {
        allDogs[v]=(isName&&dogsLoc[i])?dogsLoc[i]:"";
        dogsLoc[i]
      });
    }
  });
  if (Object.keys(allDogs).length==0) {$(dogsLoc).each(function (i,v) {allDogs[v]=v; });} // Для чисто русских "собак"



  var question="";
  $.each(allDogs,function (i,v) {
    var qestionText=(v.length>0&&i!=v)?i+" ("+v+")":i;
    question += "<line><center>" + qestionText +": <input type='text' class='replace' autofocus data-src='"+i+"' loc-src='"+v+"'></center></line>";
  });

  if (question != "") setTimeout(function (){
    modalPopup("<h4>"+$(obj).find(">name").html()+" "+$(obj).find(">name-loc").html()+"</h4>"+question, 'Ок', 'Пропустить', function () {
      $("modalpopup .replace").each(function (){
        if ($(this).val()!="") {
          var needle=$(this).attr("data-src");
          var replace=$(this).val();

          if ($(this).attr("loc-src").length) {
            $(obj).find("name-loc").text(setDogsInText($(obj).find("name-loc").text(),$(this).attr("loc-src"),$(this).val()));
          }

          $(obj).find(jQuerySearchString).each(function () {
            if ($(this).children().length == 0) {
              $(this).text(setDogsInText($(this).text(),needle,replace));
            }
          });
        }
      });
      setModifyAttr($(obj),"changed");
      flashObj($(obj));
      calcAllSchedule();
    });
  },50);
  else {
    return false;
  }
}

function placeInFirstContainer(obj) {
   $(obj).parent().find(">advantage_container,>skill_container,>spell_container").not(obj).first().find(">gc-container-cost").after(obj);
   checkEmptyContainers();
}

function campaignExpandCollapse(obj){
  var realObj=$(obj).parent().parent();
  realObj.toggleClass('collapsed');
  var objId=realObj.find(">.my-campaign-caption>.my-campaign-id").text();
  $.post("resort.php",{campaign:objId, collapse:realObj.hasClass('collapsed')});
}
function campaignToolbarShowHide(obj){
  var realObj=$(obj).siblings(".my-campaign-toolbar").toggleClass("my-campaign-toolbar-show");
}

function campaignRename(obj){
  var realObj=$(obj).parent().parent().parent();
  realObj.find(">.my-campaign-name").addClass("campaign-name-edit").focus().unbind("blur").bind("blur",function (){
    $(this).removeClass("campaign-name-edit");
      $.post("rename-campaign.php",{campaign:realObj.find(">.my-campaign-id").text(),name:$(this).text()});
  });
}

function moveModifiedByEncumbrance() {
  var k = 1;
  var encumbranceBonus = globalChar.find("encumbrance_bonus").int();
  if (encumbranceBonus == -1) k=0.8;
  if (encumbranceBonus == -2) k=0.6;
  if (encumbranceBonus == -3) k=0.4;
  if (encumbranceBonus == -4) k=0.2;
  return (Math.floor(k*globalChar.find("move_result").int()));
}

function moveModifiedByAll() {
  // Модифицированное нагрузкой, ранами и усталостью
  var movieModified=moveModifiedByEncumbrance();
  if (globalChar.find(".fp-low.gc-warning").length) movieModified*=0.5;
  if (globalChar.find(".hp-low.gc-warning").length) movieModified*=0.5;
  movieModified=Math.floor(movieModified);
  if (movieModified<1) movieModified=1;
  return movieModified;
}

function tryCalculateString(str){
  var lostToCalc = str||"";
  lostToCalc = lostToCalc.replace(/[\n ]/g, '+') + "+0"
  lostToCalc = lostToCalc.replace(/[^-0-9\+]/gim, '')
  lostToCalc = lostToCalc.replace(/\++/g, '+');
  lostToCalc = lostToCalc.replace(/\-+/g, '-');

  try {
    eval('lostToCalc=' + lostToCalc);
  } catch (ex) {}

  if (lostToCalc == "") lostToCalc=0;

  return (lostToCalc);
}

function scrollObjOnCenter(obj){
  var scrollableBlock=$(obj).parents(".scrollable-block");
  scrollableBlock.scrollTo(obj,{offset:-scrollableBlock.height()/2,axis:'y'});
  if (scrollableBlock.length) event.preventDefault();
}


// Скролим историю до низа
function historyScrollDown(){
  if (globalHistory.length){
    globalHistory.scrollTop(globalHistory[0].scrollHeight);
  }
}

function logIt(objects, val) {

  // return;  //Веключена
  $(objects).each(function (){
    var obj = $(this);
    var tag = $(obj).prop("tagName").toLocaleLowerCase();
    var description="";

    if ((tag === 'event' || tag === 'note') && val === 'delete') return;
    if (tag == "tech_level") return;
    else if (tag == "points") {tag=$(obj).parent().prop("tagName");description=$(obj).parent().find(">name").html();}
    else if (tag == "levels") {tag=$(obj).parent().prop("tagName");description=$(obj).parent().find(">name").html()+" - level";}
    else if (tag == "cr") {tag=$(obj).parent().prop("tagName");description=$(obj).parent().find(">name").html()+" - cr";}
    else if (tag == "quantity") {tag=$(obj).parent().prop("tagName");description=$(obj).parent().find(">description").html();}
    else if (tag == "total_points") {tag="EXPIRIENCE";description="starting";}
    else if (tag == "earn_points") {tag="EXPIRIENCE";description="";}
    else if (tag == "hp_lost") {tag="STAT";description="hp";}
    else if (tag == "fp_lost") {tag="STAT";description="fp";}
    else if (tag == "description") {tag="EQUIPMENT";description="Rename";lastFiledVar="";}
    else if (tag == "equipment") {tag="EQUIPMENT";description=$(obj).find(">description").html();lastFiledVar=$(obj).find(">quantity").html();}
    else if (tag == "advantage" || tag == "spell" || tag == "skill" || tag == "technique") {tag=$(obj).prop("tagName");description=$(obj).find(">name").html();lastFiledVar=$(obj).find(">points").html() || "";}
    else {description=tag.substr(0,tag.length-7);tag="STAT"}


    if (val == "add" || val == "add random") lastFiledVar="";


    var last = globalHistory.find(">*:last-child");
    var lastValue = last.find("value").html();

    if (val == "delete" && last.attr("type") == tag && last.find("description").html() == description) {
      if (last.find("value").html() == "add" || last.find("value").html() == "add rand") {
        // Add и следом delete - просто удаляем
        last.remove();
        return;
      }
    }

    var id = obj.parent().data("id") || null;
    var lastId = $(last[0]).data("id") || null;
    var d = new Date;
    var dLast = new Date(last.attr("date") * 1);
    if (d.toDateString() != dLast.toDateString()) {
      globalHistory.append("<date date='" + d.getTime() + "'>" + d.getDate() + " " + d.getMonthName()+"</date>");
    }

    if (last.attr("type") == tag && last.find("description").html() == description &&
    ($.isNumeric(lastValue) || lastValue == "" || tag == "EQUIPMENT") &&
    ($.isNumeric(val) || val == "" || tag == "EQUIPMENT") && id == lastId) {
      if (val == last.find("old-value").html()) last.remove();
      else last.find("value").html(val);
    }
    else {
      if (lastFiledVar != val) {
        globalHistory.append("<event "+ "data-id=" + "'" + id + "' " +"type='" + tag + "' date='" + d.getTime() +
         "'><description>" + description + "</description><old-value>" + lastFiledVar + "</old-value><value>" + val +
          "</value></event>");
      }
    }
  });

  historyScrollDown();
}

function equipmentAmmunition(obj){
  var ret="";
  var clipPrice=(obj.find(">value").text()||"").split("/")[1];
  if (clipPrice) {
    ret+="<equipment_container open='yes'><button title='Добавить магазин на лист персонажа' class='round small nosave nocopy' onclick='addObjToChar($(this).parent());'><i class=\"fa fa-arrow-circle-o-left\"></i></button> ";
    ret+="<description>Магазин для "+obj.find(">description").text()+"</description><value>"+clipPrice+"</value><weight>"+0.25+"</weight></equipment_container>";
  }

  var ammoWt=(obj.find(">weight").text()||"").split("/")[1];
  if (ammoWt) {
    var shots=parseInt(obj.find(">ranged_weapon>shots").text());
    var singleWt=ammoWt/shots;
    //цена равна 20 $ за фунт их веса.
    ret+="<equipment><button title='Добавить патроны на лист персонажа' class='round small nosave nocopy' onclick='addObjToChar($(this).parent())'><i class=\"fa fa-arrow-circle-o-left\"></i></button> ";
    ret+="<quantity>"+shots+"</quantity><equipment_modifier ammunition='yes'></equipment_modifier><description>Патроны "+obj.find(">ranged_weapon>ammo").text()+"</description><description-loc>Патроны для "+obj.find(">description").text()+"</description-loc><value>"+round(20*singleWt,3)+"</value><weight>"+round(singleWt,3)+"</weight></equipment>";
    ret+="<note style='float:right;'>Расчитано по правилам "+makeReferenceLink("B279")+"</note>";
    ret+="<a onclick='$(this).next().toggle()'>Показать спец. боеприпасы.</a>"
    ret+="<div style='display: none'>";

    ret+="<p>Только для пистолетов, пистолет-пулеметов, винтовок и пулеметов:";
    ret+="<p><note>Начиная с TL 6:</note>";
    ret+="<equipment><button title='Добавить патроны на лист персонажа' class='round small nosave nocopy' onclick='addObjToChar($(this).parent())'><i class=\"fa fa-arrow-circle-o-left\"></i></button> ";
    ret+="<quantity>"+shots+"</quantity><equipment_modifier ammunition='yes'><damage type='damage dr'>0.5</damage><damage type='damage type'>++</damage></equipment_modifier><tech_level>6</tech_level><reference>B279</reference><description>Патроны "+obj.find(">ranged_weapon>ammo").text()+" с полой оболочкой (Hollow-Point)</description><description-loc>Патроны для "+obj.find(">description").text()+"</description-loc><value>"+round(20*singleWt,3)+"</value><weight>"+round(singleWt,3)+"</weight></equipment>";

    ret+="<p><note>Начиная с TL 7, LC=2:</note>";
    ret+="<equipment><button title='Добавить патроны на лист персонажа' class='round small nosave nocopy' onclick='addObjToChar($(this).parent())'><i class=\"fa fa-arrow-circle-o-left\"></i></button> ";
    ret+="<quantity>"+shots+"</quantity><equipment_modifier ammunition='yes'><damage type='damage dr'>2</damage><damage type='damage type'>--</damage></equipment_modifier><legality_class>2</legality_class><tech_level>7</tech_level><reference>B279</reference><description>Патроны "+obj.find(">ranged_weapon>ammo").text()+" с твердым сердечником (APHC)</description><description-loc>Патроны для "+obj.find(">description").text()+"</description-loc><value>"+round(2*20*singleWt,3)+"</value><weight>"+round(singleWt,3)+"</weight></equipment>";

    ret+="<p><note>Начиная с TL 9, LC=1 (Пулеметы с TL8):</note>";
    ret+="<equipment><button title='Добавить патроны на лист персонажа' class='round small nosave nocopy' onclick='addObjToChar($(this).parent())'><i class=\"fa fa-arrow-circle-o-left\"></i></button> ";
    ret+="<quantity>"+shots+"</quantity><equipment_modifier ammunition='yes'><damage type='damage dr'>2</damage><damage type='damage type'>--</damage><damage type='damage value' per_dice='yes'>1</damage><range type='multiply'>1.5</range></equipment_modifier><legality_class>1</legality_class><tech_level>9</tech_level><reference>B279</reference><description>Патроны "+obj.find(">ranged_weapon>ammo").text()+" бронебойные с отбрасываемым поддоном (APDS)</description><description-loc>Патроны для "+obj.find(">description").text()+"</description-loc><value>"+round(5*20*singleWt,3)+"</value><weight>"+round(singleWt,3)+"</weight></equipment>";

    ret+="</div>";


  }
  return ret;

}

function viewDescription(obj,force) {
  var ref = makeReferenceLink($(obj).find(">reference").text());
  var rus = $(obj).find(">name-loc").text();
  if (rus != "") rus = " (" + rus.replace(/(\r\n|\n|\r)/gm, "") + ")";

  var description=obj.find('>description-loc').html()||"";
  description=description.replace(/data-src/g, "src");

  // Строим таблицы
  var lines=description.split(/[\n\r]/);
  description="";
  var isInsideTable=false;
  $.each(lines,function(i,v){
    if (v[0]=="|"||v[0]=="!"){
      if (!isInsideTable) description+="<table class='table'>";
      else description+="<tr>";
      var tag=(v[0]=="!")?"th":"td"

      v.substr(1).split("|").forEach(function(t){
        var match=t.match(/(^\[(.+?)\])?(.*)/);
        description+="<"+tag+" "+match[2]+">"+match[3]+"</"+tag+">";
      });
      isInsideTable=true;
    }
    else{
      if (isInsideTable) description+="</table>";
      isInsideTable=false;

      var match=v.match(/^(=+)(.*?)(=+)$/);
      if (match) description+="<h"+match[1].length+">"+match[2]+"</h"+match[1].length+">";
      else description+="<p>"+v+"</p>";
    }
  });
  description=raplaceAllReferenceLink(description);


  var objToView = $(obj).clone();
  objToView.find(">advantage,>skill,>technique,>spell,>equipment,>advantage_container,>skill_container,>spell_container,>equipment_container").remove(); // Это для контейнеров
  clearObj(objToView);
  $(objToView).find("*").each(function (){$(this).attr("tag-name",$(this)[0].tagName.toLocaleLowerCase());})

  var onCharSheet=0;
  globalChar.find(objToView.prop("tagName")).each(function() {
    if ($(this).find(">name").text()==$(objToView).find(">name").text()&&$(this).find(">description").text()==$(objToView).find(">description").text()) onCharSheet++;
  });
  var onCharSheetText=(onCharSheet==0)?"":"\nУже взято ("+onCharSheet+")";
  var onCharSheetCss="";
  if (onCharSheet==1) onCharSheetCss="class='ui-on-char-sheet-once'";
  if (onCharSheet>1) onCharSheetCss="class='ui-on-char-sheet-more-then-once'";

  var spellAddon="";
  $.each(objToView.find(">college").text().split("/"),function(i,v){
    if (v=="Weapon Enchantment"||v=="Limiting Enchantment"||v=="Armor Enchantment") v="Enchantment";
    if (v=="Light") v="Light & Darkness";
    if (spellChartsPages[v]>0) spellAddon+=" <button onClick='spellChartsShowPage(\""+v+"\",\""+obj.find(">name").text()+"\"); showSpellCharts()'>"+v+" collage</button>";
  });


  // objToView.find(">ranged_weapon").each(function(){
  //   $(this).find(">w")
  // });

  var resultText='<popup-description>' +
    '<span style="float:right">' + ref + '</span>' +
    '<h4 '+onCharSheetCss+'>' + obj.find(">name,>description").text() + rus +
    ' <button class="secondary round add-to-char" title="Добавить на лист перснажа '+onCharSheetText+'"><i class="fa fa-arrow-circle-o-left"></i></button>'+
    '</h4>' +
    '<collages>'+ spellAddon +'</collages>'+
    '<ammo>'+equipmentAmmunition(objToView)+'</ammo>'+
    description +
    '</popup-description><a onclick="$(\'infopopup\').toggleClass(\'show-object-view\');" class="note">Показать/скрыть детализацию объекта</a><object-view class="obj-names-rus obj-names-short">' + $(objToView).html() + '</object-view>';

  $("infopopup").scrollTop(0).lightStatus("overLib",$(obj).parents("lib-xml").length==0);
  $("infopopup content").html(resultText);
  $("infopopup content img").on("click",function () {imagePopup($(this).prop("src"))});
  $("infopopup .add-to-char").on("click",function () {addObjToChar(obj)});
  $("infopopup").removeClass("empty");
  if (force) $("infopopup").removeClass("hide");

//      modalPopup(resultText, 'Ok');
}


function clearObj(obj) {
  $(obj).find(".nosave").remove();
  $(obj).find("*").andSelf()
    .removeAttr('draggable role aria-grabbed aria-dropeffect data-sortable-id data-item-sortable-id tabindex total-weight prereq-quantity-left data-id tag-name wfd-invisible')
    .removeClass("ui-resizable ui-draggable ui-draggable-handle selected").not("text-block,marker-block,arrow").removeAttr('class style');
}
function modifyFieldByTag(src,modObj){
  return modifyField(src,modObj.text(),modObj.attr("type"),modObj.attr("per_dice")=="yes");
}
function modifyField(src,mod,type,perDice){
  var ret=src;
  if (type=="override") {ret=mod}
  if (type=="concat") {ret=src+""+mod}
  if (type=="add") {
    if (src==parseFloat(src)&&mod==parseFloat(mod)) {ret=1*src+1*mod}
    else {ret=src+((mod[0]>0)?"+":"")+mod;}
  }
  if (type=="multiply") {
    ret=src*mod||src+"*"+mod;
  }
  if (type=="damage type") {
    if (mod=="++"){
      ret=src.replace(/\b(pi\+)($|\s)/gi, "pi++$2").replace(/\b(pi)($|\s)/gi, "pi+$2").replace(/\b(pi\-)($|\s)/gi, "pi$2").replace(/\b(pi\-\-)($|\s)/gi, "pi-$2");
    } else
    if (mod=="--"){
      ret=src.replace(/\b(pi\-)($|\s)/gi, "pi--$2").replace(/\b(pi)($|\s)/gi, "pi-$2").replace(/\b(pi\+)($|\s)/gi, "pi$2").replace(/\b(pi\+\+)($|\s)/gi, "pi+$2");
    } else {
      ret=src.replace(/\b(cr|cut|imp|burn)\b|\b(pi(\+|\-){0,2})/gi, mod);
    }
    if (ret==src) ret=src+" "+mod;
  }
  if (type=="damage value") {
    var found;
    if (found=src.match(/\b([0-9]{1,2}d(\+|\-){0,1}([0-9]){0,2})[^x]/)){
      ret=src.replace(found[1],modifyDamage(found[1],mod,perDice));
    } else if (found=src.match(/\b(sw|thr)((\+|\-){0,1}([0-9]){0,2})\b/)){
      if (mod*1==mod) {
        var newVal=(parseInt(found[2])||0)+parseInt(mod);
        ret=src.replace(found[0],found[1]+(newVal==0?"":((newVal>0?"+":"")+newVal)));
      }
      else {
        ret=src.replace(found[0],found[0]+" + "+mod);
      }
    }
    else {ret=src+((mod[0]>0)?"+":"")+mod;}
  }  if (type=="damage dice multiply") {
    // Это используется только искуственно в адвантагах как множетель дайса дэмеджа
    if (found=src.match(/\b(([0-9]{1,2})d((\+|\-){0,1}([0-9]){0,2}))[^x]/)){
      var newVal=found[1]
      for (var i=0;i<mod-1;i++) {
        newVal=modifyDamage(newVal,found[1]);
      }
      ret=src.replace(found[1],newVal);
    }
    else {ret=src+"*"+mod}
  } if (type=="damage multiplier") {
      var dmgObj=damageStrToObj(src);
      dmgObj.multiplier*=mod;
      ret=damageObjToStr(dmgObj);
  } if (type=="damage dr") {
    var found;
    if (found=src.match(/\b(([0-9]{1,2}d|sw|thr)(\+|\-){0,1}([0-9]){0,2})(\([0-9.]{1,5}\)){0,1}/)){
      ret=src.replace(found[0],found[1]+"("+mod+")");
    }
    else {ret=src+"("+mod+")"}
  }

  return ret;
}

function isEquipmentModifier(obj){
  return ($(obj).find(">equipment_modifier").length>0);
}
function isEquipmentAutoContainer(obj){
  return ($(obj).find(">ranged_weapon,>melee_weapon,>transport").length>0);
}

function textColorFromBg(bgColor) {
  var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ? "#000" : "#fff";
}

function formatHtml(html) {
  // html code formatter
  function parse(html, tab = 0) {
    var tab;
    var html = $.parseHTML(html);
    var formatHtml = new String();

    function setTabs () {
      var tabs = new String();

      for (i=0; i < tab; i++){
        tabs += '\t';
      }
      return tabs;
    };


    $.each( html, function( i, el ) {
      if (el.nodeName == '#text') {
        if (($(el).text().trim()).length) {
          formatHtml += setTabs() + $(el).text().trim() + '\n';
        }
      } else {
        var innerHTML = $(el).html().trim();
//        $(el).html(innerHTML.replace('\n', '').replace(/ +(?= )/g, ''));
        if ($(el).children().length) {
          $(el).html('\n' + parse(innerHTML, (tab + 1)) + setTabs());
          var outerHTML = $(el).prop('outerHTML').trim();
          formatHtml += setTabs() + outerHTML + '\n';

        } else {
          var outerHTML = $(el).prop('outerHTML').trim();
          formatHtml += setTabs() + outerHTML + '\n';
        }
      }
    });

    return formatHtml;
  };

  return parse(html);
};

function damageStrToObj (str){
  var d_parsed=str.match(/([0-9]{1,4})d((\+|\-)[0-9]{1,3}){0,1}(x([0-9.]{1,5})){0,1}(\(([0-9.]{1,5})\)){0,1}(\s){0,3}(burn|fat|tox|cor|cr|imp|cut|ex|pi(\+|\-){0,2}){0,1}(.*)/);
  var isParsed=true;
  if (d_parsed==null) {
    isParsed=false;
    d_parsed=[];
    d_parsed[11]=str;
  }
  return {
    'isParsed':isParsed,
    'dices':parseInt(d_parsed[1]||0),
    'modifier':parseInt(d_parsed[2])|0,
    'multiplier':parseFloat(d_parsed[5]||1),
    'drDivisor':parseFloat(d_parsed[7]||1),
    'dType':d_parsed[9]||"",
    'textTail':d_parsed[11]||"",
  }
}
function damageObjToStr (obj){
  var ret="";
  if (obj.dices>0) ret+=obj.dices+"d";
  if (obj.modifier>0) ret+="+"+obj.modifier;
  if (obj.modifier<0) ret+=""+obj.modifier;

  if (obj.multiplier!=1) {ret+="x"+round(obj.multiplier,2);}

  if (obj.drDivisor!=1) {ret+="("+round(obj.drDivisor,2)+")";}

  if (obj.dType!="") {ret+=" "+obj.dType;}

  ret+=obj.textTail;
  return ret;
}

function getRandomLocation(){
  var roll=0;
  for (var i=0; i<3; i++) {
    roll+=1 + Math.floor(Math.random() * 6);
  }
  var rl=Math.random()>0.5?'/l':'/r';
  if (roll==3) return "skull";
  if (roll==4) return "skull";
  if (roll==5) return "face";
  if (roll==6) return "legs/r";
  if (roll==7) return "legs/r";
  if (roll==8) return "arms/r";
  if (roll==9) return "torso";
  if (roll==10) return "torso";
  if (roll==11) return "groin";
  if (roll==12) return "arms/l";
  if (roll==13) return "legs/l";
  if (roll==14) return "legs/l";
  if (roll==15) return "hands"+rl;
  if (roll==16) return "feet"+rl;
  if (roll==17) return "neck";
  if (roll==18) return "neck";
}

function addRussianFields(){
  globalChar.find("advantage,skill,technique,spell,equipment").each(function () {
    if ($(this).find(">description-loc").length==0) $(this).append("<description-loc></description-loc>");
  });

  globalChar.find("advantage,skill,technique,spell").each(function () {
    if ($(this).find(">name-loc").length==0) $(this).find(">name").after("<name-loc></name-loc>");
  });
  saveButtonEnable();
}


function getCharClearedHtml(){
  var ret=$("char-xml character").clone();
  ret.find("profile portrait").remove();
  ret.find("profile").attr("minimized","yes");
  ret.find("minimizer").remove();
  ret.find("description-loc").remove();
  ret.find(">history").remove();
  ret.find(".editable,.spinner").removeClass("editable spinner");
  return(ret.html());
}

function getCharIdFromUrl(url,makeViewLink){
  var m=(url||"").match(/[?&]([vc])=([a-fA-F0-9]{32})/i);
  if (m===null) return false;
  if (m[1]=="v") m[2]=reverseString(m[2]);
  if (makeViewLink) m[2]=reverseString(m[2]);
  return m[2];
}

function sendToDiscord(message,color,footer){
  var channel=$.cookie("discord-use-channel");
  if ($.cookie("discord-hook"+channel).length){
    $.ajax({
      type: "POST",
      url:$.cookie("discord-hook"+channel),
      // data:JSON.stringify({username: $.cookie("discord-name"),embeds:[{description:message,color:color||10066329,footer:{text:footer}}]}),
      // data:JSON.stringify({username: $.cookie("discord-name"),embeds:[{title:footer,description:message,color:color||10066329}]}),
      data:JSON.stringify({username: $.cookie("discord-name"),embeds:[{description:message,color:color||10066329,footer:{text:footer}}]}),
      contentType: "application/json; charset=utf-8",
      dataType: "json"
    });
  }


}

function syncFromLib(){
  var libEquip=$("lib-xml equipment");
  var popupHtml="";
  globalEquipmentList.each(function(k,v){
    var srcObj=$(this).clone();
    clearObj(srcObj);
    var name=$(this).find(">description").html();
    var newObj="";
    var addToPopup="";
    libEquip.each(function(){
      if ($(this).find(">description").html() == name) {
        if (newObj == "") {
          el=$(this).clone();
          clearObj(el);
          el.find(">quantity").html(srcObj.find(">quantity").html());
          if (el.html() != srcObj.html()) {
            addToPopup = "<line><label><input type='checkbox' name='" + k + "' checked> " + name + "<new-obj style='display: none;'>"+el.html()+"</new-obj></label></line>";
            newObj=el.html();
          }
        } else {
          addToPopup = "<line><input type='checkbox' disabled> "+name+" - не может быть синхронизированно - в библиотеке более одного экземпляра</line>";
        }
      }
    });
   popupHtml+=addToPopup;
  });

  if (popupHtml=="") {modalPopup("<h2>Изменений не обноружено</h2>","Ок"); return;}

  modalPopup("<h2>Обновить из библиотеки</h2>"+popupHtml,"Обновить","Отмена",function () {
    $("modalpopup message input:checked").each(function () {
      var id=$(this).attr("name");
      $(globalEquipmentList[id]).html($(this).parent().find(">new-obj").html())
      renderObj($(globalEquipmentList[id]));
    })
    setDrag();
    bindEvents();
    saveButtonEnable();
    calcAll();
  });
}


var globalAdvantagesList,globalAdvantagesAndModifiersList,globalSkillsList,globalTechniqueList,globalSkillsAndTechniqueList,globalSpellsList,globalEquipmentList,globalAllList,globalHistory,globalModifiersOn;
function updateGlobalLists(){
  globalAdvantagesList=globalChar.find("advantage_list advantage");
  globalAdvantagesAndModifiersList=globalChar.find("advantage_list advantage,advantage_list advantage>modifier"); // используется в перерквизитах
  globalSkillsList=globalChar.find("skill_list skill");
  globalTechniqueList=globalChar.find("skill_list technique");
  globalSkillsAndTechniqueList=globalChar.find("skill_list skill,skill_list technique");
  globalSpellsList=globalChar.find("spell_list spell");
  globalEquipmentList=globalChar.find("equipment_list equipment");
  globalAllList=globalChar.find("advantage,skill,technique,spell,equipment");
  globalHistory=globalChar.find("history");

  globalModifiersOn=globalChar.find("advantage[stopped!='yes'], advantage[stopped!='yes']>modifier[enabled='yes'], equipment:not([state='not carried'], [state='carried']), equipment_container:not([state='not carried'], [state='carried'])"); // тут сстоит скать только по > инаыче найдешь лишнее
};




var observer = new IntersectionObserver(function (objects,imgObserver){
  objects.forEach((entry) => {
    if (entry.isIntersecting) {
      var obj=entry.target;
      $(obj).css('background-image', 'url(' + $(obj).attr('data-src') + ')');
      imgObserver.unobserve(obj)
      $(obj).removeClass('lazy-bg');
    }
  });
}, {
  // If the image gets within 50px in the Y axis, start the download.
  rootMargin: '50px 0px',
  threshold: 0.01
});

function setLazyLoad(){
  $(".lazy-bg").each(function () {
    observer.observe(this);
  });
}
