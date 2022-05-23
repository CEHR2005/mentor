// -----------------  Tools ------------------

var toolsLocationsSelect=`
<select class='gc-var' id='c_location' onchange="toolLocationHint(this)">
    <option value="0" location="random" style="color:#dd9900">Случайное место (0)</option>
    <option value="0" location="torso" selected>Торс (0)</option>

    <option value="-2" location="arms">Рука (-2)</option>
    <option value="-4" location="arms">Рука щитовая(-4)</option>
    <option value="-2" location="legs">Нога (-2)</option>
    <option value="-4" location="feet">Стопа (-4)</option>
    <option value="-4" location="hands">Кисть (-4)</option>
    <option value="-8" location="hands">Кисть щитовая(-8)</option>
    <option value="-7" location="skull">Череп (-7)</option>
    <option value="-5" location="face">Лицо (-5)</option>
    <option value="-5" location="neck">Шея (-5)</option>
    <option value="-3" location="groin">Пах (-3)</option>
    <option value="-9" location="eyes">Глаз (-9)</option>
    <option value="-3" location="vitals">Жизненные органы (-3)</option>
    
    <option value="-7" location="ear">Ухо (-7)</option>
    <option value="-6" location="jaw">Челюсть (-6)</option>
    <option value="-5" location="bigjoint">Локоть / Колено (-5)</option>
    <option value="-7" location="smalljoint">Кистевой / стопный сустав (-7)</option>
    <option value="-7" location="nose">Нос (-7)</option>
    <option value="-8" location="spine">Позвоночник (-8)</option>
    <option value="-5" location="limbvenus">Вены/Артерии на руках или ногах (-5)</option>
    <option value="-8" location="neckvenus">Вены/Артерии на шее (-8)</option>

    <option value="-2" location="wings">Крыло (-2)</option>
    <option value="-3" location="tail">Хвост (-3)</option>
    
    <option value="-5" location="weapon">Оружие (reach С -5)</option>
    <option value="-4" location="weapon">Оружие (reach 1 -4)</option>
    <option value="-3" location="weapon">Оружие (reach 2 -3)</option>
</select>
<div class="note location-hints" style="margin-left: 70px;">
 <span class="location-note-eyes" style="display: none;">При dmg HP/10 (pi,imp,burn) глаз ослеп. Остальные dmg уходят в череп (без DR):  прошедшие dmg <b>x4</b>, если dmg>1/2HP - бросок сбивания с ног с <b>-10</b> (stun `+makeReferenceLink("B420")+`)<br>Промах на 1 попадает в торс</span>
 <span class="location-note-skull" style="display: none;">DR2 (кость), прошедшие dmg <b>x4</b>, если dmg>1/2HP - бросок сбивания с ног с <b>-10</b> (stun `+makeReferenceLink("B420")+`) .<br>Промах на 1 попадает в торс</span>
 <span class="location-note-face location-note-ear location-note-jaw location-note-nose" style="display: none;">Елси dmg>1/2HT - бросок сбивания с ног с <b>-5</b> (stun `+makeReferenceLink("B420")+`).<br>Промах на 1 попадает в торс</span>
 <span class="location-note-groin" style="display: none;">При dmg crush - мужчины кидают бросок сбивания с ног (stun `+makeReferenceLink("B420")+`) с <b>-5</b>. "Шок" от раны удваивается, вплоть до макс. -8<br>Промах на 1 попадает в торс</span>
 <span class="location-note-neck" style="display: none;">Crush dmg <b>x1.5</b>, Cut dmg <b>x2</b><br>Промах на 1 попадает в торс</span>
 <span class="location-note-vitals" style="display: none;">Imp, Pi dmg <b>x3</b>, лучевой ожог (burn) <b>x2</b> Если dmg > 1/2HP бросок сбивания с ног с <b>-5</b> (stun `+makeReferenceLink("B420")+`) <br>Промах на 1 попадает в торс</span>
 <span class="location-note-arms location-note-legs location-note-wings location-note-tail" style="display: none;">Модификатор <b>любых</b> повр x1, при dmg HP/2 - конечность покалечена, больше dmg не проходят</span>
 <span class="location-note-hands location-note-feet location-note-bigjoint" style="display: none;">Модификатор <b>любых</b> повр x1, при dmg HP/3 - конечность покалечена, больше dmg не проходят</span>
 <span class="location-note-smalljoint" style="display: none;">Модификатор <b>любых</b> повр x1, при dmg HP/4 - конечность покалечена, больше dmg не проходят</span>
 
 <span class="location-note-ear" style="display: none;"><br>При cut не проходит больше HP/4 dmg., при dmg> HP/2 - ухо отрезано.</span>
 <span class="location-note-jaw" style="display: none;"><br>При crush еще <b>-1</b> на сбивание с ног за челюсть</span>
 <span class="location-note-bigjoint location-note-smalljoint" style="display: none;"><br>Восстановалении от перелома HP-2<br>Промах на 1 попадает в конечность</span>
 <span class="location-note-nose" style="display: none;"><br>При dmg>HP/4 - нос сломан, серьезная рана `+makeReferenceLink("B420")+`. <br>При cut не проходит больше HP/4 dmg., при dmg> HP/2 - нос отрезан.</span>
 <span class="location-note-spine" style="display: none;">Только cr cut imp pi и beam со спины. Позвонок дает еще <b>3 DR</b> но любой прошедший dmg - бросок сбвания с ног с -5 и счиатемя серьезным ранением `+makeReferenceLink("B420")+`.<br>Dmg > HP - позвоночник сломан, автоматическое сбивание с ног и stun `+makeReferenceLink("B420")+`<br>Промах на 1 попадает в торс</span>
 <span class="location-note-limbvenus" style="display: none;">Только cr cut imp pi и beam.<br>Cut dmg <b>x2</b> Imp dmg <b>x2.5</b> Pi,beam dmg <b>x1.5</b> нет ограничения макс. dmg<br>Промах на 1 попадает в конечность</span>
 <span class="location-note-neckvenus" style="display: none;">Только cr cut imp pi и beam.<br>Cut,Imp dmg <b>x2.5</b>  Pi,beam dmg <b>x1.5</b> нет ограничения макс. dmg<br>Промах на 1 попадает в шею</span>
 
 <span class="location-note-weapon" style="display: none;">Цель ножу, пистолету и т.п. -5, палаш, палица, карабин, обрез и т.п. -4, копье, двур. меч, алебарда, винтовка и т.п. -3.<br>
Обезоруживание (`+makeReferenceLink("B401")+`) с еще -2, если это не фехтовальное оружие.<br>
Поломка оружия (`+makeReferenceLink("B483")+`) примеры: Нож DR4, HT12, 6-8hp, Пистолет DR4, HT10, 6hp, Винтовка DR4 HT10, 8hp, Меч DR6 HT12, 10-12hp, Меч двуручный DR6, HT12, 14-16hp
 </span>
</div>    
  `;

var toolsDiscordButtonHtml=`<button class="secondary round small tool-discord-btn discord-color" title="Discord смена каналов / выключение" onclick="changeDiscordChannel(this)"><i class="icon-discord"></i></button>`;

function toolLocationHint(obj){
  $("modalpopup .location-hints>span").hide();
  $("modalpopup .location-hints .location-note-"+$(obj).find("option:selected").attr('location')).show();
}

function textualizeAndSendToDiscord(obj,name){


  var html= $(obj).clone();
  html.find("val").each(function(){$(this).html('`'+$(this).html()+'`')});

  html.find("type").each(function(){$(this).html(' '+$(this).html())});
  html.find("dev").each(function(){$(this).html('\n DR делится на '+$(this).html())});
  html.find("res,crit,location,gc-location-note,div").each(function(){$(this).html('\n'+$(this).html())});

  html.find("br").each(function(){$(this).html('\n'+$(this).html())});

  html.find("ammo-warning").each(function(){$(this).html('\n=='+$(this).html()+'==\n\n')});

  html.find("gc-location").each(function(){$(this).html($(this).attr('name'))});
  html.find("gc-rolled").each(function(){$(this).html('\n бросок повр: '+$(this).html())});


  var color=10066329;
  if (obj.hasClass('fail')) color="9439488";
  if (obj.hasClass('success')) color="36873";
  if (obj.hasClass('crit-fail')) color="16711680";
  if (obj.hasClass('crit-success')) color="65280";


  var isHiddenRoll=($.cookie("discord-hidden-roll"+$.cookie("discord-use-channel"))=="true")

  var footer="";

  if ($("#c_location option:selected").text().length&&$("#c_location option:selected").text()!="Торс (0)")  footer+=$("#c_location option:selected").text()+"\n";
  if ($("#c_dist").text()>0) footer+="Расстояние: "+$("#c_dist").text()+" м. \n";
  if ($("#c_speed").text()>0) footer+="Скорость: "+$("#c_speed").text()+" м/c \n";
  if ($("#c_shots").text()>1) footer+="Выстрелов: "+$("#c_shots").text()+"\n";

  if ($("#c_acc option:selected").val()>0) footer+="Выцеливание: "+$("#c_acc option:selected").val()+"\n";

  if ($("#c_visibility option:selected").val()<0) footer+="Видимость: "+$("#c_visibility option:selected").val()+"\n";
  if ($("#c_eva option:selected").val()>0) footer+="Оценка: "+$("#c_eva option:selected").text()+"\n";
  if ($("#c_pose option:selected").val()<0) footer+="Поза атакующего: "+$("#c_pose option:selected").text()+"\n";

  if ($("#c_updown_mult option:selected").val()<0||$("#c_updown_mult option:selected").val()>0) footer+=""+$("#c_updown_mult option:selected").text()+"\n";
  if ($("#c_size_select option:selected").val()>0) footer+="☑ Цель не человекоразмерна"+"\n";

  $("tool input[type=checkbox]:checked").each(function(){
    if ($(this).parent().text()=="Штраф за недостаточное ST (0)") return;
    footer+=("☑ "+$(this).parent().text()+"\n");
  });
  if ($("#c_cr_fail").text()>0) footer+="Бросок управления был провален на: "+$("#c_cr_fail").text()+"\n";

  if ($("#c_time option:selected").val()<0||$("#c_time option:selected").val()>0) footer+="Потрачено времени "+$("#c_time option:selected").text()+"\n";

  if ($("#c_updown option:selected").val()<0||$("#c_updown option:selected").val()>0) footer+=""+$("#c_updown option:selected").text()+"\n";

  if ($("#c_shield_db option:selected").val()>0) footer+=""+$("#c_shield_db option:selected").text()+"\n";

  if ($("#c_manna option:selected").val()<0||$("#c_manna option:selected").val()>0) footer+="Уровень манны: "+$("#c_manna option:selected").text()+"\n";

  if ($("#c_hp").text()>0) footer+="Наношу вред себе на "+$("#c_hp").text()+"hp вместо усталости\n";

  if ($("#c_active").text()>0) footer+="Действующие заклинания, активные: "+$("#c_active").text()+"\n";
  if ($("#c_active_conc").text()>0) footer+="Действующие заклинания, требующие концентрации: "+$("#c_active_conc").text()+"\n";

  if ($("#c_regular_range").text()>0) footer+="Расстояние до цели: "+$("#c_regular_range").text()+"м.\n";
  if ($("#c_regular_sm").text()>0) footer+="Размер цели: "+$("#c_regular_sm").text()+" SM\n";

  if ($("#c_area_range").text()>0) footer+="Расстояние до границы области: "+$("#c_area_range").text()+"м.\n";
  if ($("#c_area_rad").text()>1) footer+="Радиус области: "+$("#c_area_rad").text()+"м.\n";

  if ($("#c_inf_range option:selected").val()<0) footer+="Макс расстояние: "+$("#c_inf_range option:selected").text()+"\n";

  if ($("#c_inf_igonre").text()>0) footer+="Игнорировано объектов: "+$("#c_inf_igonre").text()+"\n";





  if ($("#c_mod").text()>0||$("#c_mod").text()<0) footer+="Прочие модификаторы "+$("#c_mod").text()+"\n";

  if (isHiddenRoll) footer+="Отправлено \"в темную\"";

  sendToDiscord('['+name+'](http://mentor.gurps.ru)\n'+$(html).text(),color,footer);


  if (isHiddenRoll){
    flyAlert("Отправлено в канал \"в темную\"",$(obj));
    $(obj).remove();
  }
}



function makeToolRoll(obj){
  // Клик на случайной кнопке

  var tag=$(obj).parent().prop("tagName").toLowerCase();
  if (tag=="damages"||$(obj).prop("tagName").toLowerCase()=="damage"||$(obj).prop("tagName").toLowerCase()=="damage-result") {
    if ($(obj).next("damage-result").length) obj=$(obj).next("damage-result");
    toolDiceRoll($(obj));
    return;}
  if (tag=="ranged_weapon") { toolRangedAttack($(obj).parent()); return;}
  if (tag=="melee_weapon") {toolMeleeAttack($(obj).parent()); return;}
  if (tag=="spell") {toolSpellCast($(obj).parent()); return;}
  if (tag=="parry"||tag=="dodge"||tag=="block"){ toolActiveDefence($(obj).parent()); return;}
  if ($(obj).parent().find(">parry").length)
  {
    var skillName=$(obj).parent().find(">name").text();
    var punch=globalChar.find("damages damage-punch").clone();
    var bonus=0;
    punch.find("weapon-bonus").each(function(){
      var amm=$(obj).find(">ammount").text();
      $(obj).find(">ammount").remove();
      if (compare($(obj).text(),skillName,'contains')) {
        bonus+=parseInt(amm);
      }
    });
    punch.find("weapon-bonus").remove();
    var damage=modifyDamage(punch.text(),bonus)

    toolMeleeAttack("<melee_weapon><damage>"+damage+" cr</damage><reach>C</reach><usage>Punch</usage><gc-level>"+$(obj).int()+"</gc-level></melee_weapon>")
  }
  else toolSkillRoll($(obj));
}

function damageRoll(damage,outputPlace,cb) {

  var d=damageStrToObj (damage);

  var res=d.modifier;
  var text="";
  for (var i=0; i<d.dices; i++) {
    var rnd=1 + Math.floor(Math.random() * 6);
    res+=rnd;
    text+="<gc-dice>&#"+(9855+rnd)+";</gc-dice> ";
  }




  if (d.modifier>0) text+="<mod>+"+d.modifier+"</mod>";
  if (d.modifier<0) text+="<mod>"+d.modifier+"</mod>";

  if (d.multiplier != 1) {
    res = round(res * d.multiplier);
    text += "<mod>x" + d.multiplier + "</mod>"
  }

  if (res<0) res=0;
  var rolled=$("<gc-rolled>"+text+" = <val>"+res+"</val></gc-rolled>");
  if (d.dType!="") rolled.append("<type>"+d.dType+"</type>");
  if (d.drDivisor!=1) rolled.append("<dev>"+d.drDivisor+"</dev>");

  $(outputPlace).append(rolled);
  if (cb) cb(rolled);
}

function skillRoll(skill,outputPlace,cb) {
  var res=0;
  var text="";
  for (var i=0; i<3; i++) {
    var rnd=1 + Math.floor(Math.random() * 6);
    res+=rnd;
    text+="<gc-dice>&#"+(9855+rnd)+";</gc-dice> ";
  }

  var success=res-skill;
  var res_class="success";
  var res_text="Успех ("+success+")";
  if (success>0) {res_class="fail"; res_text="Провал ("+success+")";}
  if (res==3||res==4||(res==5&&skill>=15)||(res==6&&skill>=16)) {res_class="success crit-success"; res_text="Критический Успех";}
  if (res==18||(res==17&&skill<=15)||(success>=10)) {res_class="fail crit-fail"; res_text="Критический Провал";}



  var rolled=$("<gc-rolled success='"+success+"' class='"+res_class+"'>"+text+" = <val>"+res+"</val> <res>"+res_text+"</res></gc-rolled>");
  $(outputPlace).append(rolled);

  if (cb) cb(rolled);
}

function toolRollCrit(condition) {

  var res=0;
  var text="Бросок на крит: ";
  for (var i=0; i<3; i++) {
    var rnd=1 + Math.floor(Math.random() * 6);
    res+=rnd;
    text+="<gc-dice>&#"+(9855+rnd)+";</gc-dice> ";
  }
  text+="="+res+"<br>";

  if (condition=='fail')
  {
    if (res==3||res==4||res==17||res==18) text+='Ваше оружие ломается и становится бесполезным B485. <note>Исключение: Некоторые виды оружия устойчивы к поломке. Это твердые, прочные виды тупого оружия (палицы, цепы, булавы, металлические прутья и т.д.), магическое оружие, огнестрельное оружие (кроме оружия с колесцовым замком, управляемых ракет и лучевого оружия)  и оружие отличного качества. Если у вас подобное оружие, бросьте еще раз; Только если второй раз выпал результат "поломка оружия", то оно действительно ломается. Если вы выбросили другое число, то роняете оружие.</note>';
    if (res==5)  text+='Вы ухитрились попасть по своей руке или ноге (50% шанс для каждого случая). <note>Исключение: Если это была проникающая атака или атака с расстояния, бросьте еще раз. Пырнуть себя трудно, но возможно. Если второй раз выпал результат "попадание по себе", считайте что он и случился - наносится половина или полные повреждения, в зависимости от обстоятельств. Если же выпал другой результат – используйте его.</note>';
    if (res==6)  text+='Вы ухитрились попасть по своей руке или ноге (50% шанс для каждого случая). Получаете половину повреждений. <note>Исключение: Если это была проникающая атака или атака с расстояния, бросьте еще раз. Пырнуть себя трудно, но возможно. Если второй раз выпал результат "попадание по себе", считайте что он и случился - наносится половина или полные повреждения, в зависимости от обстоятельств. Если же выпал другой результат – используйте его.</note>';
    if (res==7||res==13)  text+='Вы теряете равновесие. Вы не можете сделать ничего (даже свободных действий) до следующего хода. Все виды активной защиты получают -2 до следующего хода.';
    if (res==8||res==12)  text+='Рука соскальзывает с оружия. Потратьте дополнительный ход на Подготовку, чтобы приготовить его перед следующим использованием.';
    if (res==9||res==10||res==11)  text+='Вы роняете оружие. <note>Исключение: Дешевое оружие ломается, B485.</note>';
    if (res==14)  text+='При проведении амплитудной контактной атаки ваше оружие вылетает из руки на 1d метров - с 50% вероятностью прямо вперед или прямо назад. <note>Те, кто находится в месте падения, должен сделать успешную проверку DX или получить половину повреждений от падающего оружия! Если вы делали прямую атаку в контактном бою, парировали или атаковали дистанционным оружием, вы просто роняете оружие, как описано под #9 выше.</note>';
    if (res==15)  text+='Вы растянули плечо! Рука, которой вы держали оружие, "сломана" до конца встречи. Вы не обязательно роняете оружие, но не можете использовать его ни для защиты, ни для нападения в течение 30 минут.';
    if (res==16)  text+='Вы падаете! (При использовании оружия дальнего боя см. #7.)';
  }

  if (condition=='fail-bare') {
    if (res == 3 || res == 18) text += 'Вы вырубили себя! Подробности – на усмотрение Мастера – возможно, вы поскользнулись и ударились головой, или наткнулись лицом на щит или кулак противника. Бросайте HT каждые 30 минут для восстановления сознания.';
    if (res == 4) text += 'Если вы парировали или атаковали конечностью, вы растянули ее: получите 1hp повреждений, конечность считается «покалеченной». Вы не можете использовать ее для атаки и защиты в течение 30 минут. Если вы били головой, кусали и т.д., вы потянули мышцы и ощущаете умеренную боль (см. Раздражающие состояния, B428) в течение (20-HT) минут, минимум 1 минуту.';
    if (res == 5 || res == 16) text += 'Вы ударили в твердый объект (стену, пол и т.д.) вместо врага или парирования его атаки. Используемая конечность получает thr cr; DR защищает нормально. <note>Исключение: если вы атакуете противника, вооруженного готовым проникающим оружием, то попадаете по оружию! Вы получаете вред от оружия, но основанный на своей ST, а не на ST противника.</note>';
    if (res == 6) text += 'Вы ударили в твердый объект (стену, пол и т.д.) вместо врага или парирования его атаки. Используемая конечность получает тупой вред, равный половине thr cr; DR защищает нормально. <note>Исключение: Если вы атаковали природным оружием – когтями, зубами и т.д.- оно ломается: -1 вреда от будущих атак, пока вы не вылечитесь (восстановление см. в разделе Длительность калечащих повреждений, B422).</note>';
    if (res == 7 || res == 14) text += 'Вы спотыкаетесь. Если вы атаковали, то проходите на один метр за противника и заканчиваете свой ход, отвернувшись от него; сейчас он за вами! Парируя, вы падаете.';
    if (res == 8) text += 'Вы падаете!';
    if (res == 9 || res == 10 || res == 11) text += 'Вы теряете равновесие. Вы не можете делать ничего больше (даже свободных действий) до следующего своего хода, а все ваши активные защиты получают в это время -2.';
    if (res == 12) text += 'Вы поскользнулись. Бросьте DX, чтобы не упасть. Если вы били ногами, то бросайте DX-4, или с удвоенным обычным штрафом, если использовали технику, требующую броска DX даже при обычном провале (например, DX-8 для Удара в прыжке).';
    if (res == 13) text += 'Вы ослабили защиту. Все виды активной защиты на следующий ход получают -2, любые премии Оценки или штрафа Финта против вас до следующего вашего хода имеют удвоенный эффект. Это очевидно находящимся поблизости врагам.';
    if (res == 15) text += 'Вы растянули мышцы. Получите 1d-3 вреда используемой конечности (одной из них, если использовали несколько) или шее если кусали, бодали и т.д. Вы также теряете равновесие и получаете -1 на все атаки и защиту на следующий ход. Вы получаете -3 на любое действие, где нужно использовать поврежденную конечность (на любое действие, если повредили шею!) до исцеления повреждений. Если вы обладаете Высоким болевым порогом, этот штраф уменьшается до -1.';
    if (res == 17) text += 'Если вы парировали или атаковали конечностью, вы растянули ее: получите 1hp повреждений, конечность считается «покалеченной». Вы не можете использовать ее для атаки и защиты в течение 30 минут. Если вы били головой, кусали и т.д., вы потянули мышцы и ощущаете умеренную боль (см. Раздражающие состояния, B428) в течение (20-HT) минут, минимум 1 минуту.<note>Исключение: животные с IQ 3-5 промахиваются так серьезно, что теряют самообладание. Если будет возможно, они сбегут на следующий же свой ход. Если же они загнаны в угол, то постараются сдаться (подставят горло или живот и т.д.).</note>';
  }

  if (condition=='fail-magic'){
    if (res==3)  text+='Заклинание вообще не срабатывает. Заклинатель получает 1d повреждений';
    if (res==4)  text+='Заклинание действует на своего творца (если плохое),или на любого ближайшего врага(если хорошее).';
    if (res==5||res==6)  text+='Заклинание действует на одного из союзников (если плохое), или на любого ближайшего врага(если хорошее).';
    if (res==7)  text+='Заклинание воздействует на что-то или кого-то другого, а не на цель – друга, врага или случайный объект. Выберите случайным образом или сами, но интересную цель.';
    if (res==8)  text+='Заклинание вообще не срабатывает. Заклинатель получает 1 единицу вреда';
    if (res==9)  text+='Заклинание вообще не срабатывает. Заклинатель оглушен (бросок IQ чтобы прийти в себя).';
    if (res==10||res==11)  text+='Полезного эффекта заклинание не производит, но появляется громкий шум, яркая вспышка света, ужасный запах и др';
    if (res==12)  text+='Заклинание производит слабое и бесполезное подобие желаемого эффекта.';
    if (res==13)  text+='Заклинание производит обратный эффект.';
    if (res==14)  text+='Заклинание создает видимость эффекта, но это только бесполезная иллюзия. Мастер должен постараться убедить волшебника и его спутников, что заклинание сработало';
    if (res==15||res==16)  text+='Заклинание производит обратный эффект на случайную цель.';
    if (res==17)  text+='Заклинание вообще не срабатывает. Заклинатель на время забывает его. Через неделю сделайте бросок IQ, и повторяйте каждую неделю, пока не вспомните.';
    if (res==18)  text+='Заклинание вообще не срабатывает. Демон или другая злая сущность, возможная в сеттинге, появляется и атакует заклинателя. (Мастер может отказаться от этого результата, если, по его мнению, творец и заклинание оба были безупречно благими в своих намерениях.)';
  }

  if (condition=='success'){
    if (res==3||res==18)  text+='Удар наносит тройной вред.';
    if (res==4||res==17)  text+='DR цели защищает с половинной эффективностью (округляется вниз) после применения всех делителей брони.';
    if (res==5||res==16)  text+='Удар наносит двойной вред.';
    if (res==6||res==15)  text+='Удар наносит максимальный обычный вред.';
    if (res==7||res==13||res==14)  text+='Если любое количество вреда прошло через DR, считайте этот удар как нанесший серьезную рану, независимо от реально нанесенного вреда.';
    if (res==8)  text+='Если любое количество вреда пробивает DR, удар наносит удвоенный болевой шок (до максимального штрафа -8). Если удар пришелся в конечность или придаток, он также калечит их. Это только временный эффект: увечье пройдет через (16-HT) секунд, минимум через две, если нанесенного вреда было недостаточно для реального увечья.';
    if (res==9||res==10||res==11)  text+='Только обычный вред. Никакого эффекта от крита';
    if (res==12)  text+='Обычный вред, и жертва роняет все, что держит, независимо от того, пробил ли удар DR.';
  }

  if (condition=='success-head'){
    if (res==3)  text+='Удар наносит максимальный обычный вред и игнорирует DR';
    if (res==4||res==5)  text+='DR цели защищает с половинной эффективностью (округляется вниз) после применения всех делителей брони. Если любое количество вреда прошло через DR, считайте этот удар как нанесший серьезную рану, независимо от реально нанесенного вреда.';
    if (res==6||res==7)  text+='Если атака была нацелена в лицо или череп, удар попадает в глаз, даже если эта атака не может естественным образом наноситься в глаз. Если удар в глаза невозможен (например, удар сзади), считайте DR цели защищает с половинной эффективностью (округляется вниз) после применения всех делителей брони. Если любое количество вреда прошло через DR, считайте этот удар как нанесший серьезную рану, независимо от реально нанесенного вреда.';
    if (res==8)  text+='Обычное повреждение от удара по голове, цель теряет равновесие: в следующий ход она обязан использовать Бездействие (но может защищаться нормально).';
    if (res==9||res==10||res==11)  text+='Только обычный вред от удара по голове. Никакого эффекта от крита';
    if (res==12||res==13)  text+='Обычный вред от удара по голове. Если любое количество вреда прошло через DR, тупая атака вызывает глухоту (восстановление – см. Длительность увечий, B422), любая другая наносит жуткий шрам (жертва теряет один уровень внешности, а в случае разъедающего или обжигающего вреда – два).';
    if (res==14)  text+='Обычный вред от удара в голову, жертва роняет оружие (если имела два оружия, бросьте еще кубик, чтобы определить, какое из них уронит).';
    if (res==15)  text+='Удар наносит максимальный обычный вред.';
    if (res==16)  text+='Удар наносит двойной вред.';
    if (res==17)  text+='DR цели защищает с половинной эффективностью (округляется вниз) после применения всех делителей брони.';
    if (res==18)  text+='Удар наносит тройной вред.';
  }

    // Бойцы, которые не могут упасть (например, змеи и те, кто уже лежит на земле): любой результат «падение» приводит к получению 1к-3 общего вреда. Подробности – на усмотрение Мастера – может быть, противник наступил на вас!';
    //   Летающие и плавающие: любой результат «падение» - это попадание в неловкое положение тела с теми же результатами (-4 на атаку, -3 на защиту).';



  return raplaceAllReferenceLink(text);
}


function toolLocationsTexts (damage,location){
  var d=damageStrToObj(damage);
  var dmg=d.dType;
  // var location=$(obj).attr("location");
  var mlt=1;
  var note="";
  if (dmg=="pi++") mlt=2;
  if (dmg=="pi+") mlt=1.5;
  if (dmg=="pi-") mlt=0.5;
  if (dmg=="cut") mlt=1.5;
  if (dmg=="imp") mlt=2;

  if (location=="vitals"&&(dmg.substr(0,2)=="pi"||dmg=="imp")) mlt=3;
  if (location=="vitals"&&dmg=="burn") {mlt=2; note+=" только от лучевого ожога";}

  if ((location=="skull"||location=="eyes")&&dmg!="tox") {mlt=4; note+=" бросок сбивания с ног (stun B420) с -10"}

  if (location=="eyes"&&(dmg.substr(0,2)=="pi"||dmg=="imp"||dmg=="burn")) {note+=", при повр. более HP/10 глаз ослеп"}

  if (location=="face"||location=="ear"||location=="nose") {note+=" бросок сбивания с ног (stun B420) с -5"}
  if (location=="face"&&dmg=="cor") {mlt=1.5; note+=" если нанесена серьёзная рана (major wound), один глаз ослеплен (если повр. больше HP, то ослепли оба глаза)";}

  if (location=="neck"&&(dmg=="cr"||dmg=="cor")) mlt=1.5;
  if (location=="neck"&&dmg=="cut") mlt=2;

  if (location=="groin"&&dmg=="cr") {note+=" только для мужчин: бросок сбивания с ног (stun B420) с -5. \"шок\" от раны удваивается, вплоть до макс. -8"}

  if ((location=="arms"||location=="legs"||location=="feet"||location=="hands"||location=="bigjoint"||location=="smalljoint")&&(dmg=="pi+"||dmg=="pi++"||dmg=="imp")) {mlt=1;}
  if (location=="arms"||location=="legs") {note+=" потеря свыше 1/2 HP за удар (major wound) калечит конечность, но повреждения свыше теряются.";}
  if (location=="feet"||location=="hands"||location=="bigjoint") {note+=" потеря свыше 1/3 HP за удар (major wound) калечит конечность, но повреждения свыше теряются.";}
  if (location=="smalljoint") {note+=" потеря свыше 1/4 HP за удар (major wound) калечит конечность, но повреждения свыше теряются.";}

  if (location=="smalljoint"||location=="bigjoint") {note+=" Восстановалении от перелома HT-2";}



  if (location=="ear" && dmg=="cut") {note+=" Повр. более HP/4 не проходят, при повр. больше HP/2 ухо отрезано."}
  if (location=="nose" ) {note+=" Повр. более HP/4 нос сломан (major wound)."}
  if (location=="nose" && dmg=="cut") {note+=" Повр. более HP/4 не проходят, при повр. больше HP/2 нос отрезан."}

  if (location=="jaw"){
    if (dmg=="cr")  {note+=" бросок сбивания с ног (stun B420) с -6"}
    else {note+=" бросок сбивания с ног (stun B420) с -5"}
  }

  if (location=="spine" ) {note+=" Позвонок дает еще <b>3 DR</b> но любые прошедшие повр. требуют бросок сбвания с ног с -5 и счиатемя major wound. Повр. больше HP - позвоночник сломан автоматическое сбивание с ног и stun "}

  if (location=="limbvenus"||location=="neckvenus") {mlt+=0.5; note+=" нет ограниченя на макс. повр. "}
  if (location=="neckvenus"&&dmg=="cut") {mlt+=0.5;}


  if (location=="weapon") {mlt=1; note+=" см. B401, при выбивании идет сравнение оружейных умений (можно заменить на DX лил ST)"}


  var res ="";
  if (mlt>1) res+="<mlt>умножить на "+mlt+" <i class='fa fa-arrow-circle-o-down' title='округлить вниз'></i></mlt>";
  if (mlt<1) res+="<mlt>делить на "+round(1/mlt,3)+" <i class='fa fa-arrow-circle-o-down' title='округлить вниз, не менее 1'></i></mlt>";
  res+="<note>"+note+"</note>";
  return res;
}

function toolCollisionDamage(){

  function getDicesFromSpeed(speed) {
    var foo=($("modalpopup input[name='hard']:checked").length?2:1)*$("#c_hp").float()*speed/100;
    var dice=round(foo)+"d";
    if (foo<1) dice="1d-1";
    if (foo<=0.5) dice="1d-2";
    if (foo<=0.25) dice="1d-3";
    return (dice)
  }

  function calcDamage(){
    if ($("modalpopup input[name='type']:checked").val()==1) {
      $("#c_speed").hide(); $("#c_height").show();
    } else {
      $("#c_speed").show(); $("#c_height").hide();
    }

    // clacling
    var addText="";


    var speed=$("#c_ms").float();
    if ($("modalpopup input[name='type']:checked").val()==1) {
      speed=Math.sqrt(21.4*($("#c_h").float()-($("modalpopup input[name='acrobatics']:checked").length?5:0) )*$("#c_g").float());

      var tmp=60*Math.sqrt($("#c_g").float());
      if (speed>tmp) addText+="<div class='note'>Человек, падающий раскинув руки, не разгонится более "+getDicesFromSpeed(tmp)+"</div>";

      var tmp=100*Math.sqrt($("#c_g").float());
      if (speed>tmp) addText+="<div class='note'>Человек, падающий \"Нырком\", не разгонится более "+getDicesFromSpeed(tmp)+"</div>";

      var tmp=200*Math.sqrt($("#c_g").float());
      if (speed>tmp) addText+="<div class='note'>Твердый объект, не разгонится более "+getDicesFromSpeed(tmp)+"</div>";


    }

    var dice=getDicesFromSpeed(speed);



    var d_type=" cr";
    if ($("modalpopup input[name='sharp']:checked").length) {d_type=" imp"; dice+="x0.5"}

    if ($("modalpopup input[name='passanger']:checked").length) addText+="<div class='note'>Ремни безопасности дают DR 5, подушки безопасности DR 10. Не пристегнутые в открытом транспорте рассчитывают \"отбрасывание\"</div>";

    if (!$("modalpopup input[name='hard']:checked").length) addText+="<div class='note'>Эластичные предметы (матрасы,подушки безопасности, сети и т.д.) дают дополнительные DP от 2 для кожаной подушки до 10 – для трамплина, спасательных сетей или подушек безопасности</div>";




    $("modalpopup result").html("Повреждения <gc-roll>"+dice+d_type+"</gc-roll>"+addText);
    $("modalpopup gc-roll").click(function () {
      damageRoll($(this).text(),$("modalpopup result"));
    });

  }

  modalPopup(`
    <tool>
      <span style='position:absolute; right: 20px;'>`+makeReferenceLink("B430")+`</span>
      <h2>Расчет повреждений</h2>
      <div style='font-size:120%;'>
      <label><input type='radio' name='type' value=0 checked> Столкновение</label> &nbsp;&nbsp;&nbsp;
      <label><input type='radio'  name='type' value=1> Падение</label>
      </div>
      <line>HP <var id='c_hp' class='editable spinner spinner-positive'>`+(getAttr('hp_result')||10)+`</var> - здоровье летящего предмета / персонажа / транспорта</line>
      <line id='c_speed'>Скорость <var class='editable spinner  spinner-positive' id='c_ms'>20</var> м/c | <span class='editable spinner  spinner-positive' id='c_kmh'>72</span> км/ч | <span class='editable spinner  spinner-positive' id='c_mph'>45</span> мили/ч</line>
      <div id='c_height' style='display: none;'>
      <line>Высота <var id='c_h' class='editable spinner spinner-positive'>5</var> м, гравитация <span id='c_g' class='editable spinner spinner-positive spinner-decile'>1</span> от земной</line>
      <line><label><input type='checkbox' name='acrobatics'> Удачный бросок акробатики выполнен</label></line>
      </div>
      <line><label><input type='checkbox' name='hard' checked> Удар о неподвижный твердый объект</label></line>
      <line><label><input type='checkbox' name='sharp'> Острый / режущий объект</label></line>
      <line><label><input type='checkbox' name='passanger'> Я пассажир внутри (указывайте HP транспорта)</label></line>
    <line><result></result></line>
    </tool>`
    ,"Закрыть",null,null,null,
    function(){

      $("#c_ms").on("change",function(){
        $("#c_kmh").text(round($(this).float()*3.6));
        $("#c_mph").text(round($(this).float()*2.237));
      });
      $("#c_kmh").on("change",function(){
        $("#c_ms").text(round($(this).float()*0.278));
        $("#c_mph").text(round($(this).float()*0.621));
      });
      $("#c_mph").on("change",function(){
        $("#c_ms").text(round($(this).float()*0.447));
        $("#c_kmh").text(round($(this).float()*1.609));
      });

      $("modalpopup .editable,modalpopup input").on("change",calcDamage);
      calcDamage();
    });

}

function toolThrowing(){
  function calcThrowing(){
    var c_st=$("#c_st").float()+1.0*$("input[name='c_skill']:checked").val();
    var bl=c_st*c_st/5;
    var kv=$("#c_weight").float()/bl;
    var mod=3.5;
    if (kv>=0.05) mod=2.5;
    if (kv>=0.1)  mod=2.0;
    if (kv>=0.15) mod=1.5;
    if (kv>=0.20) mod=1.2;
    if (kv>=0.25) mod=1.1;
    if (kv>=0.30) mod=1.0;
    if (kv>=0.40) mod=0.8;
    if (kv>=0.50) mod=0.7;
    if (kv>=0.75) mod=0.6;
    if (kv>=1)    mod=0.4;
    if (kv>=1.5)  mod=0.3;
    if (kv>=2)    mod=0.25;
    if (kv>=2.5)  mod=0.2;
    if (kv>=3)    mod=0.15;
    if (kv>=4)    mod=0.12;
    if (kv>=5)    mod=0.1;
    if (kv>=6)    mod=0.09;
    if (kv>=7)    mod=0.08;
    if (kv>=8)    mod=0.07;
    if (kv>=9)    mod=0.06;
    if (kv>=10)   mod=0.05;
    var dist=c_st*mod;

    var thr=getThr($("#c_st_str").int());

    var d="thr -2 за куб";
    var d_res=modifyDamage(thr,-2,true);
    if ($("#c_weight").float()>bl/8) {
      var d="thr -1 за куб";
      var d_res=modifyDamage(thr,-1,true);
    }
    if ($("#c_weight").float()>bl/4) {
      var d="thr";
      var d_res=thr;
    }
    if ($("#c_weight").float()>bl/2) {
      var d="thr +1 за куб";
      var d_res=modifyDamage(thr,1,true);
    }
    if ($("#c_weight").float()>bl) {
      var d="thr";
      var d_res=thr;
    }
    if ($("#c_weight").float()>bl*2) {
      var d="thr -1/2 за куб (окр.вниз)";
      var d_res=modifyDamage(thr,-0.5,true);
    }
    if ($("#c_weight").float()>bl*4) {
      var d="thr -1 за куб";
      var d_res=modifyDamage(thr,-1,true);
    }


    $("modalpopup result").html("Максимальная дистанция броска "+round(dist,2)+" м<br>Наносит "+d+" ➞ <gc-roll>"+d_res+"</gc-roll>");
    $("modalpopup gc-roll").click(function () {
      damageRoll($(this).text(),$("modalpopup result"));
    });
  }

  modalPopup(
    "<tool>"+
    "<span style='position:absolute; right: 20px;'>"+makeReferenceLink("B355")+"</span>" +
    "<h2>Расчет бросания предметов</h2>" +
    "<line>Вес предмета <var id='c_weight_kg' style='min-width:50px; display: inline-block;' class='editable spinner spinner-positive spinner-half'>0.5</var> кг | <span id='c_weight' class='editable spinner spinner-positive'>1</span> фунт.</line>" +
    "<line>ST подъемная <span id='c_st' class='editable spinner spinner-positive'>"+(1*getAttr('ST')+globalChar.find("ST_lift_bonus").int()||10)+"</span>, ST ударная <span id='c_st_str' class='editable spinner spinner-positive'>"+(1*getAttr('ST')+globalChar.find("ST_strike_bonus").int()||10)+"</span></line>" +
    "<line><label><input type='radio' name='c_skill' value=0 checked> Throwing ниже DX+1</label><line>" +
    "<line><label><input type='radio' name='c_skill' value=1> Throwing DX+1</label><line>" +
    "<line><label><input type='radio' name='c_skill' value=2> Throwing DX+2 или выше</label><line>" +
    "<line><result></result></line>"+
    "</tool>"
    ,"Закрыть",null,null,null,
    function(){

      $("#c_weight_kg").on("change",function(){
        $("#c_weight").text(round($(this).float()*2,1));
      });
      $("#c_weight").on("change",function(){
        $("#c_weight_kg").text(round($(this).float()/2,1));
      });


      $("modalpopup .editable,modalpopup input").on("change",calcThrowing);
      calcThrowing();
    });

}

function toolSkillRoll(obj){

  var skillName="умения ";
  if (obj) {
    skillName+=$(obj).parent().find(">name").text();

    if ($(obj).parent().find(">name-loc").text().length)    skillName+=' ('+$(obj).parent().find(">name-loc").text()+')';

    var tagName=obj[0].tagName;
    if(tagName.indexOf("_RESULT")>0) skillName=tagName.substr(0,tagName.length-7);
  }


  function calcIt(){
    var res=$("#c_skill_level").int()+$("#c_mod").int()+$("#c_time").val()*1;

    $("modalpopup skill-results").html("<gc-skill-roll class='discord-color'>"+res+"</gc-skill-roll>");
    $("modalpopup gc-skill-roll").click(function () {
      var skillLevel=$(this).text();
      skillRoll(skillLevel,$("modalpopup skill-results"),function(obj_rolled){
        textualizeAndSendToDiscord(obj_rolled,'Бросок '+skillName+' против '+skillLevel);
      });
    });
  }

  modalPopup(
    "<tool>"+
    toolsDiscordButtonHtml+
    "<span style='position:absolute; right: 20px;'>"+makeReferenceLink("B343")+"</span>" +
    "<h2>Бросок "+skillName+"</h2>" +
    "<line> Уровень умения <var id='c_skill_level' class='editable spinner spinner-positive'>"+($(obj).int()||10)+"</var>" +
    ", модификатор <var id='c_mod' class='editable spinner'>0</var></line>" +
    "<line>Потрачено времени <select id='c_time'>" +
    "<option value='-10'>Мгновенно, киношное (-10)</option>" +
    "<option value='-9'>-90% (-9)</option>" +
    "<option value='-8'>-80% (-8)</option>" +
    "<option value='-7'>-70% (-7)</option>" +
    "<option value='-6'>-60% (-6)</option>" +
    "<option value='-5'>-50% (-5)</option>" +
    "<option value='-4'>-40% (-4)</option>" +
    "<option value='-3'>-30% (-3)</option>" +
    "<option value='-2'>-20% (-2)</option>" +
    "<option value='-1'>-10% (-1)</option>" +
    "<option value='0' selected>обычно</option>" +
    "<option value='1'>×2 (+1)</option>" +
    "<option value='2'>×4 (+2)</option>" +
    "<option value='3'>×8 (+3)</option>" +
    "<option value='4'>×15 (+4)</option>" +
    "<option value='5'>×30 (+5)</option>" +
    "</select></line>" +
    "<line><skill-results></skill-results></line>"+
    "</tool>"
    ,"Закрыть",null,null,null,
    function(){


      $("modalpopup .editable,modalpopup input,modalpopup select").on("change",calcIt);
      calcIt();
    });

}

function toolDiceRoll(obj){

  modalPopup(
    "<tool>"+
    toolsDiscordButtonHtml+
    // "<span style='position:absolute; right: 20px;'>"+makeReferenceLink("B343")+"</span>" +
    "<h2>Бросок кубиков</h2>"+
    "<sticky>" +
    "<line><center><var id='c_roll' class='editable spinner spinner-damage' style='font-size:400%;'>"+($(obj).text()||"3d")+"</var></center></line>" +
    "<button class='secondary round' id='tool-btn1' style='font-size:100%; text-transform: none;'>-1d</button> "+
    "<button class='secondary round' id='tool-btn2' style='font-size:100%; text-transform: none;'>+1d</button> &nbsp;&nbsp;"+
    "<button class='secondary round' id='tool-btn3' style='font-size:100%; text-transform: none;'>-1</button> "+
    "<button class='secondary round' id='tool-btn4' style='font-size:100%; text-transform: none;'>+1</button>"+
    "<line><center><gc-skill-roll class='discord-color'>Бросить</gc-skill-roll></center></line>" +
    "<line><center><button class='secondary' id='c_clean'>Очистить</button></center></line>"+
    "</sticky>"+
    "<line><results></results></line>"+

    "</tool>"
    ,"Закрыть",null,null,null,
    function(){
      $("modalpopup #c_roll").on("keydown",function(e){
        if (e.key == 'Enter'){
          $("modalpopup gc-skill-roll").click();
          event.preventDefault();
        }
      });

      $("modalpopup gc-skill-roll").click(function () {
        damageRoll($("#c_roll").text(),$("modalpopup results"),function(obj){
          textualizeAndSendToDiscord(obj,'Бросок '+$("#c_roll").text());
        })

      });

      $("#tool-btn1").click(function () {
        $("#c_roll").html(modifyDamage($("#c_roll").text(),"-1d"));
      });
      $("#tool-btn2").click(function () {
        $("#c_roll").html(modifyDamage($("#c_roll").text(),"1d"));
      });
      $("#tool-btn3").click(function () {
        $("#c_roll").html(modifyDamage($("#c_roll").text(),"-1",false,true));
      });
      $("#tool-btn4").click(function () {
        $("#c_roll").html(modifyDamage($("#c_roll").text(),"1",false,true));
      });




      $("#c_clean").click(function (){$("modalpopup results").html("");})


    });

}

function toolRangedAttack(obj){
  function calcIt(){
    var notesText="";

    $("#c_brace_note").hide();
    if ($("#c_brace:checked").length) $("#c_brace_note").show();

    $("#c_updown_text").hide();
    if ($("#c_updown_mult").val()!=0) $("#c_updown_text").show();

    $("#c_optics_text").hide();
    if ($("#с_optics:checked").length) $("#c_optics_text").show();

    $("#c_size1_text,#c_size2_text").hide();
    if ($("#c_size_select").val()==1) $("#c_size1_text").show();
    if ($("#c_size_select").val()==2) $("#c_size2_text").show();

    var bulk=$("modalpopup bulk").int()||-1;
    $("#c_cc").attr('value',bulk);
    $("#c_ma").attr('value',(bulk<-2)?bulk:-2);

    var range=$("modalpopup range").text().split("/");
    $("#c_dist").lightStatus("gc-info",$("#c_dist").int()>range[0]);
    $("#c_dist").lightStatus("gc-warning",!($("#c_dist").int()<range[1]));


    var dmgObj=damageStrToObj($("modalpopup damage").text());
    if ($("#c_dist").int()>range[0]){
      notesText+="<div>Дистанция больше 1/2D</div>"
      dmgObj.multiplier*=0.5;
    }





      var tmp=$("modalpopup rate_of_fire").text().split("x");
    var rof=parseInt(tmp[0])||1;
    var bursMult=parseInt(tmp[1])||1;

    // Сверх близкая дистанция дробовика
    if (bursMult>1&&$("#c_dist").int()<range[0]*0.1) {
      notesText+="<div class='note'>Сверх близкая дистанция для дроби (10% от 1/2D): повреждения и DR цели умножаются на половину всех \"дробин\", RoF не перемножается. "+makeReferenceLink("B409")+"</div>";
      var m=Math.floor(bursMult/2);
      dmgObj.dices*=m;
      dmgObj.modifier*=m;
      dmgObj.drDivisor/=m;
      bursMult=1;
     }


    var minShots=($("modalpopup rate_of_fire").text().indexOf("!")>0)?Math.ceil(rof/4):1;

    $("#c_shots").lightStatus("gc-warning",$("#c_shots").int()>rof||$("#c_shots").int()<minShots||$("#c_shots").int()>($("modalpopup shots").int()));
    $("modalpopup shots").lightStatus("gc-warning",!$("modalpopup shots").int()>0);

    var shotsText="";
    if (minShots>1) {
      shotsText+=` | <a href="javascript:void(0);" onClick="$('#c_shots').html(`+minShots+`).change();">мин. (`+minShots+`)</a>`;
    }
    else{
      if (rof>1) shotsText+=` | <a href="javascript:void(0);" onClick="$('#c_shots').html(1).change();">один</a>`;
      if (rof>2) shotsText+=` | <a href="javascript:void(0);" onClick="$('#c_shots').html(3).change();">три</a> `;
    }
    if (rof>3) shotsText+=` | <a href="javascript:void(0);" onClick="$('#c_shots').html(`+rof+`).change();">всю обойму (`+rof+`)</a>`;
    $("#c_shots_text").html(shotsText);


    $("#c_speed_note").hide();
    if ($("#c_speed").int()>0) $("#c_speed_note").show();

    var chars_mod=-4*$("#c_chars_cnt").int();
    $("#c_chars").attr('value',chars_mod);
    $("#c_chars_mod").html(chars_mod);

    $("#c_opportunity_val,#c_opportunity_check").show()
    if ($("#c_opportunity:checked").length==0) {
      $("#c_opportunity_val").val(0);
      $("#c_opportunity_check input").prop( "checked", false );
      $("#c_opportunity_val,#c_opportunity_check").hide()
    }

    var res=$("#c_skill_level").int()+$("#c_mod").int();

    if ($("#c_location_holes:checked").length){
      res+=($("#c_location option:selected").attr('location')=="torso")?-8:-10;
      dmgObj.drDivisor*=2;
    } else {
      res += $("#c_location").val() * 1;
    }


    var optBonus=$("#c_opt_bonus").int();
    $("#c_opt_warn").hide();


    $("#c_acc option").each(function () {
      var val=$("modalpopup accuracy").int()||1;
      var t=textEndings($(this).attr('round'),"раунд","раунда","раундов");

      if ($(this).attr('round')==1) {t+=' (+Acc'; val+=0;}
      if ($(this).attr('round')==2) {t+=' (+Acc+1';  val+=1;}
      if ($(this).attr('round')>2) {t+=' (+Acc+2';  val+=2;}
      if ($("#с_optics:checked").length) {

        if (optBonus>($("modalpopup accuracy").int()||1)) {
          optBonus=$("modalpopup accuracy").int()||1;
          $("#c_opt_warn").show();
        }


        if ($(this).attr('round') >= optBonus) {
          t += '+' + optBonus + ' оптика';
          val+=optBonus;
        } else{
          if ($("#c_magn").val()==1) {
            t += '+' + ($(this).attr('round')) + ' оптика';
            val+=$(this).attr('round')*1;
          }
        }
      }
      t+=')';
      if ($(this).attr('round')==0) {t='Нет (0)'; val=0;}

      $(this).attr('value',val);
      $(this).html(t);
    });

    res+=$("#c_acc").val()*1;



    var updown=Math.ceil(($("#c_updown_dist").int()||0)*$("#c_updown_mult").val());
    if (updown<-1*($("#c_dist").int()||0)/2) updown=-1*Math.floor(($("#c_dist").int()||0)/2);

    var dist=($("#c_dist").int()||0)+($("#c_speed").int()||0)+updown;
    res+=getRangeSpeedModifier(dist);

    res+=getRofBonus(bursMult*($("#c_shots").int()||1));

    if ($("#c_brace:checked").length && $("#c_acc").val()>0) res++;

    var lowSt=getAttr('ST')-($("modalpopup strength").int()||0);
    if (lowSt > 0) {
      lowSt = 0;
      $("#c_low_st").hide();
    }
    else {
      $("#c_low_st").show();
    }
    $("#c_low_st input").attr('value',lowSt);
    $("#c_low_st span").html(lowSt);




    // доп параметры

    $("modalpopup input:checked").each(function () {
      // все чекбоксы у которых стоит value
      res+=(parseInt($(this).val())||0);
    });

    if ($("#c_pose:checked").length){
      var t=$("#c_location option:selected").text();
      if (t=='Торс (0)'||t=='Нога (-2)'||t=='Пах (-3)') res-=2;
    }

    res+=$("#c_visibility").val()*1+$("#c_opportunity_val").val()*1;

    if ($("#c_size_select").val()==1) res+=getSizeModifier($("#c_size1").float()||2);
    if ($("#c_size_select").val()==2) res+=$("#c_size2").int()||0;

    res-=$("#c_cr_fail").int();


    // Ограничение
    if ($("#c_unseen1:checked,#c_unseen2:checked").length||$("#c_visibility").val()==-10){
      if (res>9) res=9;
    }

    $("modalpopup skill-results").html("<gc-skill-roll  class='discord-color'>"+res+"</gc-skill-roll>");
    $("modalpopup skill-results gc-skill-roll").click(function (){

      var skillName="";
      if (obj) skillName=$(obj).parent().find(">name,>description").text()+' ('+$(obj).parent().find(">name-loc").text()+')';


      skillRoll(res,$("modalpopup skill-results"),function (obj){
        var suc=($(obj).attr('success'));
        var rcl=$("modalpopup recoil").int()||1;
        var gotIn=1+Math.floor(-1*suc/rcl);

        if (gotIn>bursMult*$("#c_shots").int()) gotIn=bursMult*($("#c_shots").int()||1);

        var loc=$("#c_location option:selected").attr("location");


        if (suc==1&&!$(obj).hasClass('crit-fail')&&(loc=="eyes"||loc=="skull"||loc=="face"||loc=="groin"||loc=="neck"||loc=="vitals"||loc=="ear"||loc=="nose"||loc=="jaw"||loc=="spine"||loc=="limbvenus"||loc=="neckvenus"||loc=="bigjoint"||loc=="smalljoint")){
          // Miss by one
          var newLoc="torso";
          var place="Торс";

          if (loc=="limbvenus"){newLoc="arms"; place="Руки/Ноги";}
          if (loc=="neckvenus"){newLoc="neck"; place="Шея";}
          if (loc=="bigjoint"){newLoc="arms"; place="Руки/Ноги";}
          if (loc=="smalljoint"){newLoc="hands"; place="Кисти/Стопы";}

          loc=newLoc;
          gotIn=1;
          $(obj).removeClass("fail").addClass("success");
          $(obj).find("res").html(" Промах на 1 ➞ в "+place);
        }


        if (loc=='random') loc=getRandomLocation();
        loc=loc.split("/");
        var location=loc[0];

        if ($(obj).hasClass("crit-fail")) {$(obj).append("<crit>"+toolRollCrit('fail')+"</crit>");}
        if ($(obj).hasClass("crit-success")) {$(obj).append("<crit>"+toolRollCrit((location=='face'||location=='skull')?'success-head':'success')+"</crit>");}

        if (!$(obj).hasClass("fail")) {

          var successText='<br> '+textEndings(gotIn,"снаряд попал","снаряда попали","снарядов попали")+' на '+damageObjToStr(dmgObj)+' в <gc-location name="'+location+'" side="'+loc[1]+'"></gc-location>'+notesText;


          obj.append(successText);

          while (gotIn>0) {
            damageRoll(damageObjToStr(dmgObj),obj);
            gotIn--;
          }



          $(obj).append("<location>"+toolLocationsTexts(damageObjToStr(dmgObj),location)+"</location>");
        }

        // Уменьшаем патроны
        var inBurst=$("#c_shots").int()||1;

        if ($("modalpopup shots").int()===0) $(obj).prepend("<ammo-warning>Патроны зскончились!</ammo-warning>");
        else if ($("modalpopup shots").int()<inBurst) $(obj).prepend("<ammo-warning>В очереди меньше патронов чем в магазине ("+$("modalpopup shots").int()+")</ammo-warning>");



        $("modalpopup shots").html(Math.max($("modalpopup shots").int()-inBurst,0));
        $("#c_shots").lightStatus("gc-warning",$("#c_shots").int()>rof||$("#c_shots").int()<minShots||$("#c_shots").int()>($("modalpopup shots").int()));
        $("modalpopup shots").lightStatus("gc-warning",!$("modalpopup shots").int()>0);


        echo (shotsObj.find(">quantity").int());
        shotsObj.find(">quantity").html(Math.max(shotsObj.find(">quantity").int()-inBurst,0))




        textualizeAndSendToDiscord($(obj),'Бросок атаки '+skillName+' против '+res);

      });
    });




  }

  function getFromObj(name,def){
    return $(obj).find(">"+name+":not(.gc-source-value)").text()||def
  }


  var opt=getFromObj('accuracy','1').split("+");
  opt=parseInt(opt[1])||0;

  var shotsCount=parseInt(getFromObj('shots','1'));
  var shotsObj=$(obj).parent().find("equipment:not([state=carried]):not([state='not carried'])").find(">equipment_modifier[ammunition=yes]").first().parent();
  if (shotsObj.find(">quantity").int()>=0) shotsCount=shotsObj.find(">quantity").int();


  modalPopup(
    `<tool>`+toolsDiscordButtonHtml+
    `<span style='position:absolute; right: 20px;'>`+makeReferenceLink("B372")+`</span>
    <h2>Атака дистанционная</h2>

    <line class='obj-names-short weapon' style='font-size:90%'>
      Оружие:
      <damage class=editable>`+(getFromObj('damage-result',null)||getFromObj('damage','2d'))+`</damage>
      <strength class=editable>`+getFromObj('strength',0)+`</strength>
      <accuracy class=editable>`+getFromObj('accuracy',1)+`</accuracy>
      <range class=editable>`+(getFromObj('range-result',null)||getFromObj('range','100/500'))+`</range>
      <rate_of_fire class='editable'>`+getFromObj('rate_of_fire',1)+`</rate_of_fire>
      <bulk class='editable'>`+getFromObj('bulk',-1)+`</bulk>
      <recoil class='editable'>`+getFromObj('recoil',1)+`</recoil>
      <shots class='editable'>`+shotsCount+`</shots>
    </line>
    <line>Умение: <var id='c_skill_level' class='editable spinner spinner-positive'>`+getFromObj('gc-level',10)+`</var></line>

    <line>
      Расстояние <var id='c_dist' class='editable spinner spinner-positive'>1</var>м.,
      <span style="display: inline-block; vertical-align: text-top">
      скорость цели <span id='c_speed' class='editable spinner spinner-not-negative'>0</span> м/c (<span id='c_speed_km' class='editable spinner spinner-not-negative'>0</span> км/ч)
      <div class='note' id='c_speed_note'>Не учитывайте move персонажа меньше 10</div>
      </span>
    </line>
    <line> Выстрелов <var id='c_shots' class='editable spinner spinner-positive'>1</var> <span id='c_shots_text'></span></line>
    <line> Локация `+toolsLocationsSelect+`</line>
    <line> Выцеливание
      <select class='gc-var' id='c_acc'>
        <option round=0>Нет (0)</option>
        <option round=1>1 раунд (Acc)</option>
        <option round=2>2 раунда (Acc+1)</option>
        <option round=3>3 раунда (Acc+2)</option>
        <option round=4>4 раунда (Acc+2)</option>
        <option round=5>5 раунда (Acc+2)</option>
        <option round=6>6 раунда (Acc+2)</option>
        <option round=7>7 раунда (Acc+2)</option>
        <option round=8>8 раунда (Acc+2)</option>
        <option round=9>9 раунда (Acc+2)</option>
      </select>
    </line>
    <line style="margin-left: 20px;"><label><input type="checkbox" id='с_optics' `+(opt?'checked':'')+`>Оптика</label><span id='c_optics_text'> +<span class="editable spinner spinner-positive" id=c_opt_bonus>`+(opt?opt:1)+`</span> с <select id='c_magn'><option value=1>переменным увеличением</option><option value=0>фиксированым увеличением</option></select></span></line>
    <line id='c_opt_warn' style="margin-left: 40px; color:#900" class='note'>Бонус оптики больше значения Acc, вы не получите бонуса выше Acc</line>
    <line style="margin-left: 20px;"><label><input type="checkbox" id='c_brace'>Упор оружия (+1 при выцеливании) <span class=note>Brace</span></label>
     <div class="note" id='c_brace_note'>Когда оперто на мешок с песком, ограду, машину и т.п.<br>Одноручное оружие (прим. пистолет) получает опору, если его держать двумя руками.<br>Оружие, требующее двух рук (прим. винтовка) получает опору, если вы лежите и используете сошки.</div>
    </line>
    <line> Прочие модификаторы <var class='editable spinner' id=c_mod>0</var></line>
    <line id=c_low_st><label><input type="checkbox" checked>Штраф за недостаточное ST (<span></span>)</label></line>
    <span style='position:absolute; right: 20px; margin-top:15px;'>`+makeReferenceLink("B548")+`</span>
    <line style="font-size: 150%; margin-top: 20px;"><a href="javascript:void(0);" onClick="$('#c_mods').slideToggle(300); $(this).find('i').toggleClass('fa-caret-right').toggleClass('fa-caret-down');"><i class='fa fa-caret-right'></i> Дополнительные модификаторы</a></line>
    <div style='display:none; margin-left: 20px;' id='c_mods'>
      <line>
        <select id='c_updown_mult'>
          <option value=0>Стрелок и цель на одной высоте</option>
          <option value=1>Стрелок находится ниже цели</option>
          <option value=-0.5>Стрелок находится выше цели</option>
        </select>
        <span id='c_updown_text'>на <span class='editable spinner spinner-positive' id='c_updown_dist'>1</span> м.</span>
      </line>
      <line>
         <select id='c_size_select'>
          <option value=0>Цель человеко-размерна</option>
          <option value=1>Задать размер цели</option>
          <option value=2>Использовать SM цели</option>
        </select>
        <span id='c_size1_text'>, <span class='editable spinner spinner-decile spinner-not-negative' id='c_size1'>1.8</span> м. по большей стороне</span>
        <span id='c_size2_text'>SM цели: <span class='editable spinner' id='c_size2'>0</span></span>
      </line>
      <line><label><input type="checkbox" id=c_pose>Поза цели: наклонена, на коленях, сидит или лежит (-2 в торс, пах, ноги)</label></line>
      <line><label><input type="checkbox" value='1'>Тотальная атака, точная (+1) <span class="note">All-Out Attack</span></label></line>
      <line><label><input type="checkbox" id='c_ma' onClick="$('#c_acc').val(0).change();">Движение и атака (-2/-Bulk нет прицеливания) <span class="note">Move and Attack</span></label></line>
      <line><label><input type="checkbox" id='c_location_holes'>Атака сквозь щели в доспехах (-8 торс /-10 остальное)</label></line>
      <line><label><input type="checkbox" id='c_cc'>Бой вплотную (-Bulk) <span class="note">Close combat</span></label></line>
      <line><label><input type="checkbox" value='-2'>Плохая поверхность (-2) <span class="note">Bad Footing</span></label></line>
      <line><label><input type="checkbox" value='-4'>Атака не основной рукой (-4) <span class="note">Off-hand</span></label></line>
      <line><label><input type="checkbox" value='-4'>Атака двумя оружиями (-4) <span class="note">Dual-Weapon Attack</span></label></line>
      <line><label><input type="checkbox" value='-2' onClick="$('#c_acc').val(0).change();">Высунуться и атаковать (-2 нет прицеливания) <span class="note">Pop-up attack</span></label></line>

      <line><label><input type="checkbox" value='-4' id=c_chars>Цель перекрывает </label> <span class='editable spinner spinner-positive' id='c_chars_cnt'>1</span> чел. (<span id='c_chars_mod'>-4</span>)</line>
      <line><label><input type="checkbox" value='-2'>Стрельба через легкое укрытие (-2)</line>
      <line><label><input type="checkbox" value='-2'>Цель видна только частично (-2)</line>

      <line><label><input type="checkbox" value='-2'>Незнакомое оружие или система  (-2)</line>

      <line style='margin-top:30px;'>
        Видимость
        <select id=c_visibility>
          <option value='0'>Нормальная (0)</option>
          <option value='-1'>-1</option>
          <option value='-2'>-2</option>
          <option value='-3'>-3</option>
          <option value='-4'>-4</option>
          <option value='-5'>-5</option>
          <option value='-6'>-6</option>
          <option value='-7'>-7</option>
          <option value='-8'>-8</option>
          <option value='-9'>-9</option>
          <option value='-10'>Полная темнота (-10)*</option>
        </select>
       </line>
       <line><label><input type="checkbox" value='-6' id=c_unseen1>Врага не видно (-6)*</label></line>
       <line><label><input type="checkbox" value='-4' id=c_unseen2>Врага не видно, но вы знаете его положение до 1м.(-4)*</label></line>


      <line>
        <label><input type="checkbox" id='c_opportunity'>Стрельба по возможности</label>
        <select id='c_opportunity_val'>
          <option value='0'>просмотр 1 клетки (0)</option>
          <option value='-1'>просмотр 2х клеток (-1)</option>
          <option value='-2'>просмотр 3-4 клеток (-2)</option>
          <option value='-3'>просмотр в 5-6 клеток (-3)</option>
          <option value='-4'>просмотр в 7-10 клеток (-4)</option>
          <option value='-5'>просмотр в 10+ клеток (-5)</option>
          <option value='-6'>просмотр линии (-2)</option>
        </select>
       </line>
       <line style="margin-left:40px; margin-top:0px" id='c_opportunity_check'><label><input type="checkbox" value='-2'>Проверка цели перед выстрелом (-2)</line>

      <line style="margin-top:20px;"><a href="javascript:void(0);" onClick="$('#c_transp').slideToggle(300); $(this).find('i').toggleClass('fa-caret-right').toggleClass('fa-caret-down');"><i class='fa fa-caret-right'></i> Атака с транспорта</a></line>
      <div style='display:none;' id='c_transp'>
        <line>Бросок управления был провален на <span class='editable spinner spinner-not-negative' id=c_cr_fail>0</span></line>
        <line><label><input type="checkbox" value='-6'>Висит снаружи, стреляет под/над транспортом (-6)</label></line>
        <line><label><input type="checkbox" value='-4'>Повернуться в седле/кресле, стрeлять назад (-4)</label></line>
        <line><label><input type="checkbox" value='-2'>Транспорт уклонялся в прошлый ход, не пилот (-2)</label></line>
        <line><label><input type="checkbox" value='-4'>Летающий транспорт уклонялся в прошлый ход, не пилот (-4)</label></line>

        <line style='margin-top:30px;'><label><input type="checkbox" value='-1'>Езда по хороше дороге, оружие не на турели (-1)</label></line>
        <line><label><input type="checkbox" value='-3'>Езда по плохой дороге, оружие не на турели (-3)</label></line>
        <line><label><input type="checkbox" value='-2'>Езда по плохой дороге, внешнее крепление (-2)</label></line>
        <line><label><input type="checkbox" value='-1'>Езда по плохой дороге, турель без стабилизатора (-1)</label></line>
        <line><label><input type="checkbox" value='-4'>Езда по бездорожью, оружие не на турели (-4)</label></line>
        <line><label><input type="checkbox" value='-3'>Езда по бездорожью, внешнее крепление (-3)</label></line>
        <line><label><input type="checkbox" value='-2'>Езда по бездорожью, турель без стабилизатора (-2)</label></line>
        <line><label><input type="checkbox" value='-1'>Езда по бездорожью, турель со стабилизатором (-1)</label></line>
        <line><label><input type="checkbox" value='-3'>Вода спокойная, оружие не на турели (-3)</label></line>
        <line><label><input type="checkbox" value='-2'>Вода спокойная, внешнее крепление (-2)</label></line>
        <line><label><input type="checkbox" value='-1'>Вода спокойная, турель без стабилизатора (-1)</label></line>
        <line><label><input type="checkbox" value='-4'>Вода, волны, оружие не на турели (-4)</label></line>
        <line><label><input type="checkbox" value='-3'>Вода, волны, внешнее крепление (-3)</label></line>
        <line><label><input type="checkbox" value='-2'>Вода, волны, турель без стабилизатора (-2)</label></line>
        <line><label><input type="checkbox" value='-1'>Вода, волны, турель со стабилизатором (-1)</label></line>
        <line><label><input type="checkbox" value='-1'>Летающая техника, оружие не на турели (-1)</label></line>
      </div>
    </div>
    <line><skill-results></skill-results></line>
    </tool>
    `
    ,"Закрыть",null,function () {
      calcAllSchedule();
      saveButtonEnable();
    },null,
    function(){
      $("#c_speed").on("change",function(){
        $("#c_speed_km").text(round($(this).float()*3.6));
      });
      $("#c_speed_km").on("change",function(){
        $("#c_speed").text(round($(this).float()*0.278));
      });

      $("modalpopup .editable,modalpopup input,modalpopup select").on("change keyup",calcIt);
      calcIt();
    });
}






function toolMeleeAttack(obj){
  function calcIt(){
    var notesText="";
    var attacks=1;
    var dmgObj=damageStrToObj($("modalpopup damage").text());

    var res=$("#c_skill_level").int()+$("#c_mod").int();

    if ($("#c_location_holes:checked").length){
      res+=($("#c_location option:selected").attr('location')=="torso")?-8:-10;
      dmgObj.drDivisor*=2;
    } else {
      res += $("#c_location").val() * 1;
    }

    var lowSt=getAttr('ST')-($("modalpopup strength").int()||0);
    if (lowSt > 0) {
      lowSt = 0;
      $("#c_low_st").hide();
    }
    else {
      $("#c_low_st").show();
    }
    $("#c_low_st input").attr('value',lowSt);
    $("#c_low_st span").html(lowSt);


    // доп параметры

    $("#c_tbm_text").hide();
    if ($("#c_rapid:checked").length){
      $("#c_tbm_text").show();
      attacks++;
    }
    var zoo=($("#c_tbm:checked").length)?-3:-6;
    $("#c_rapid_val").html(zoo);
    $("#c_rapid").attr('value',zoo);

    $("#cc_shield_text").hide();
    if ($("#cc_shield:checked").length){
      $("#cc_shield_text").show();
      res-=$("#cc_shield_db").int()||0;
    }

    $("#c_des_text").hide();
    if ($("#c_des:checked").length){
      $("#c_des_text").show();
      var zoo=-2*($("#c_des_val").int()||0)
      res+=zoo;
      $("#c_des_res").html(zoo);
    }

    if ($("#c_all_out_double:checked").length){
      attacks++;
    }

    if ($("#c_all_out_strong:checked").length){
      dmgObj.modifier+=dmgObj.dices>2?dmgObj.dices:2;
    }

    $("modalpopup input:checked").each(function () {
      // все чекбоксы у которых стоит value
      res+=(parseInt($(this).val())||0);
    });


    res+=$("#c_visibility").val()*1;

    res+=$("#c_pose").val()*1;

    res+=$("#c_eva").val()*1;



    // Ограничение
    if ($("#c_unseen1:checked,#c_unseen2:checked,#c_ma:checked,#c_wildswing:checked").length||$("#c_visibility").val()==-10){
      if (res>9) res=9;
    }

    $("modalpopup skill-results").html("<gc-skill-roll class='discord-color'>" + res + "</gc-skill-roll>");
    $("modalpopup skill-results gc-skill-roll").click(function () {
      var skillName="";
      if (obj) skillName=$(obj).parent().find(">name,>description").text()+' ('+$(obj).parent().find(">name-loc").text()+')';

      var i=0;
      while (i<attacks){
        i++;
        skillRoll(res, $("modalpopup skill-results"), function (obj) {

          var suc = ($(obj).attr('success'));

          var loc = $("#c_location option:selected").attr("location");

          if (suc==1&&!$(obj).hasClass('crit-fail')&&(loc=="eyes"||loc=="skull"||loc=="face"||loc=="groin"||loc=="neck"||loc=="vitals"||loc=="ear"||loc=="nose"||loc=="jaw"||loc=="spine"||loc=="limbvenus"||loc=="neckvenus"||loc=="bigjoint"||loc=="smalljoint")){
            // Miss by one
            var newLoc="torso";
            var place="Торс";

            if (loc=="limbvenus"){newLoc="arms"; place="Руки/Ноги";}
            if (loc=="neckvenus"){newLoc="neck"; place="Шея";}
            if (loc=="bigjoint"){newLoc="arms"; place="Руки/Ноги";}
            if (loc=="smalljoint"){newLoc="hands"; place="Кисти/Стопы";}

            loc=newLoc;
            gotIn=1;
            $(obj).removeClass("fail").addClass("success");
            $(obj).find("res").html(" Промах на 1 ➞ в "+place);
          }

          if (loc == 'random') loc = getRandomLocation();
          loc = loc.split("/");
          var location = loc[0];

          if ($(obj).hasClass("crit-fail")) {$(obj).append("<crit>"+toolRollCrit(($("#c_bare_hands:checked").length)?'fail-bare':'fail')+"</crit>");}
          if ($(obj).hasClass("crit-success")) {$(obj).append("<crit>"+toolRollCrit((location=='face'||location=='skull')?'success-head':'success')+"</crit>");}

          if (!$(obj).hasClass("fail")) {
            var successText = '<br> на <gc-roll location="' + location + '">' + damageObjToStr(dmgObj) + '</gc-roll> в <gc-location name="' + location + '" side="' + loc[1] + '"></gc-location>' + notesText;
            obj.append(successText);


            damageRoll(damageObjToStr(dmgObj),obj);
            $(obj).append("<gc-location-note>"+toolLocationsTexts(damageObjToStr(dmgObj),location)+"</gc-location-note>");
          }

          textualizeAndSendToDiscord($(obj),'Бросок атаки '+skillName+' против '+res);
        });
      }
    });
  }

  function getFromObj(name,def){
    return $(obj).find(">"+name+":not(.gc-source-value)").text()||def
  }

  modalPopup(
    `<tool>`+toolsDiscordButtonHtml+
    `<span style='position:absolute; right: 20px;'>`+makeReferenceLink("B369")+`</span>
    <h2>Атака контактная</h2>

    <line class='obj-names-short weapon' style='font-size:90%'>
      Оружие:
      <damage class=editable>`+(getFromObj('damage-result',null)||getFromObj('damage','1d'))+`</damage>
      <strength class=editable>`+getFromObj('strength',0)+`</strength>
      <reach class=editable>`+getFromObj('reach',1)+`</reach>
    </line>
    <line>Умение: <var id='c_skill_level' class='editable spinner spinner-positive'>`+getFromObj('gc-level',10)+`</var></line>
    <line><label><input type="checkbox" id=c_bare_hands `+((getFromObj('usage','')=='Punch')?'checked':'')+`>Атака голыми руками</label></line>
    <line> Локация `+toolsLocationsSelect+`</line>

    <line> Прочие модификаторы <var class='editable spinner' id=c_mod>0</var></line>
    <line id=c_low_st><label><input type="checkbox" checked>Штраф за недостаточное ST (<span></span>)</label></line>
    <span style='position:absolute; right: 20px; margin-top:15px;'>`+makeReferenceLink("B547")+`</span>
    <line style="font-size: 150%; margin-top: 20px;"><a href="javascript:void(0);" onClick="$('#c_mods').slideToggle(300); $(this).find('i').toggleClass('fa-caret-right').toggleClass('fa-caret-down');"><i class='fa fa-caret-right'></i> Дополнительные модификаторы</a></line>
    <div style='display:none; margin-left: 20px;' id='c_mods'>
      <line> Оценка
         <select id='c_eva'>
          <option value=0>Нет (0)</option>

          <option value=1>1 раунд (+1)</option>
          <option value=2>2 раунда (+2)</option>
          <option value=3>3 раунда (+3)</option>
        </select>
        <span class="note">Evaluate</span>
      </line>

      <line> Поза атакующего <select id='c_pose'>
          <option value=0>Стоит (0)</option>
          <option value=-2>На коленях / сидя / присев (-2)</option>
          <option value=-4>Лежа (-4) только reach C</option>
        </select>
      </line>

      <line><label><input type="checkbox" id=c_all_out_det value='4'>Тотальная атака, точная (+4) <span class="note">All-Out Attack, Determined</span></label></line>
      <line><label><input type="checkbox" id=c_all_out_double>Тотальная атака, двойная (+attack) <span class="note">All-Out Attack, Double</span></label></line>
      <line><label><input type="checkbox" id=c_all_out_strong>Тотальная атака, сильная (dmg: +2/+1 за куб) <span class="note">All-Out Attack, Strong</span></label></line>
      <line><label><input type="checkbox" value='-4' id='c_ma'>Движение и атака (-4)* <span class="note">Move and Attack</span></label></line>

      <line><label><input type="checkbox" id='c_location_holes'>Атака сквозь щели в доспехах (-8 торс /-10 остальное)</label></line>



      <line><label><input type="checkbox" value='-2'>Плохая поверхность (-2) <span class="note">Bad Footing</span></label></line>
      <line><label><input type="checkbox" value='-4'>Атакующий схвачен (-4) <span class="note">Grappled</span></label></line>

      <line><label><input type="checkbox" value='-4'>Атака не основной рукой (-4) <span class="note">Off-hand</span></label></line>
      <line><label><input type="checkbox" value='-4'>Атака двумя оружиями (-4) <span class="note">Dual-Weapon Attack</span></label></line>

      <line><label><input type="checkbox" id=c_des>Обманная атака <span class="note">Deceptive Attack</span></label><div id=c_des_text style=margin-left:20px;>противник получает -<span class='editable spinner spinner-not-negative' id=c_des_val>1</span> к активной защите (<span id=c_des_res></span>)</div></line>


      <line><label><input type="checkbox" value='-6' id=c_rapid>Скоростной удар (<span id=c_rapid_val>-6</span> +attack) <span class="note">Rapid Strike</span></label></line>
      <line><label style="margin-left:20px;" id=c_tbm_text><input type="checkbox" id=c_tbm>Учеников мастера / Мастера оружия <span class="note">TBM / Weapon Master</span></label></line>

      <line><label><input type="checkbox" value='-2'>Атака в идущий бой вплотную (-2) <span class="note">Striking into close combat</span></label></line>

      <line><label><input type="checkbox" value='-5' id=c_wildswing>Удар наугад (-5)* <span class="note">Wild Swing</span></label></line>

      <line><label><input type="checkbox" value='-2'>Атака прыжком сверху (-2) <span class="note">Attack from Above</span></label></line>

      <line><label><input type="checkbox" value='-2'>Атакующий держит большой щит (-2)</label></line>

      <line><label><input type="checkbox" id=cc_shield>Бой вплотную со щитом</label><span id=cc_shield_text> DB <span class='editable spinner spinner-not-negative' id=cc_shield_db>1</span></span></line>



      <line style='margin-top:30px;'>
        Видимость
        <select id=c_visibility>
          <option value='0'>Нормальная (0)</option>
          <option value='-1'>-1</option>
          <option value='-2'>-2</option>
          <option value='-3'>-3</option>
          <option value='-4'>-4</option>
          <option value='-5'>-5</option>
          <option value='-6'>-6</option>
          <option value='-7'>-7</option>
          <option value='-8'>-8</option>
          <option value='-9'>-9</option>
          <option value='-10'>Полная темнота (-10)*</option>
        </select>
       </line>
       <line><label><input type="checkbox" value='-6' id=c_unseen1>Врага не видно (-6)*</label></line>
       <line><label><input type="checkbox" value='-4' id=c_unseen2>Врага не видно, но вы знаете его положение до 1м.(-4)*</label></line>

      <line style='margin-top:30px;'><label><input type="checkbox" value='-2'>Бой верхом, животное атаковано последний ход (-2)</label></line>
      <line><label><input type="checkbox" value='-1'>Бой верхом, разница скоростей 7+ (-1)</label></line>


    </div>
    <line><skill-results></skill-results></line>
    </tool>`
    ,"Закрыть",null,null,null,
    function(){

      $("#c_all_out_det").click(function (){
        $("#c_all_out_double").prop('checked', false);
        $("#c_all_out_strong").prop('checked', false);
      });
      $("#c_all_out_double").click(function (){
        $("#c_all_out_det").prop('checked', false);
        $("#c_all_out_strong").prop('checked', false);
      })
      $("#c_all_out_strong").click(function (){
        $("#c_all_out_det").prop('checked', false);
        $("#c_all_out_double").prop('checked', false);
      })

      $("modalpopup .editable,modalpopup input,modalpopup select").on("change keyup",calcIt);
      calcIt();
    });
}


function toolActiveDefence(obj){
  function calcIt(){
    var notesText="";
    var def=$("input[name='c_type']:checked"). val();
    var res=$("#c_level").int()||0;
    res+=$("#c_mod").int()||0;

    $("#c_shield_db_text").hide();
    if (!$("#c_bullets:checked").length)
    {
      res+=$("#c_shield_db").val()*1;
      $("#c_shield_db_text").show();
    }

    if (def == "dodge") {
      $("#c_ret").attr('value', 3);
      $("#c_ret_text").html("+3");
      $("#c_drop_text").show();

    }
    else {
      $("#c_ret").attr('value', 1);
      $("#c_ret_text").html("+1");
      $("#c_drop_text").hide();
      $("#c_drop").prop('checked', false);
    }

    if (def=="parry"){
      $("#c_att_block").show();
      $("#c_att_add").hide();
      if ($("#c_att").int()>1) {
        $("#c_att_add").show();
        var zzz=-4*($("#c_att").int()-1);
        if ($("#c_fenc:checked").length) zzz/=2;
        if ($("#c_tbm:checked").length) zzz/=2;
        res+=zzz;
      }

      if ($("#c_flail:checked").length) res+=-4;
      if ($("#c_chack:checked").length) res+=-2;

      $("#c_bare_on_weapon_text").show();
      if ($("#c_bare_on_weapon:checked").length) res+=-3;
      $("#c_weapon_on_bare_text").show();
      $("#c_off_hand_text").show();
      $("#c_throwing_big_parray_text").show();
      $("#c_throwing_small_parray_text").show();
    }
    else {
      $("#c_att_block").hide();
      $("#c_bare_on_weapon_text").hide();
      $("#c_weapon_on_bare_text").hide();
      $("#c_off_hand_parray_text").hide();
      $("#c_throwing_big_parray_text").hide();
      $("#c_throwing_small_parray_text").hide();
    }

    if (def=="block"){
      if ($("#c_flail:checked").length) res+=-2;
      if ($("#c_chack:checked").length) res+=-1;
    }


    $("modalpopup input:checked").each(function () {
      // все чекбоксы у которых стоит value
      res+=(parseInt($(this).val())||0);
    });

    res+=$("#c_pose").val()*1;

    res+=$("#c_updown").val()*1;



    $("#c_block_label").lightStatus("gc-warning",def=="block"&&$("#c_bullets:checked").length);
    $("#c_parry_label").lightStatus("gc-warning",def=="parry"&&$("#c_bullets:checked").length);




    $("modalpopup skill-results").html("<gc-skill-roll class='discord-color'>" + res + "</gc-skill-roll>");
    $("modalpopup skill-results gc-skill-roll").click(function () {

        skillRoll(res, $("modalpopup skill-results"), function (obj) {

          var successText="";

          var suc = parseInt($(obj).attr('success'));
          if ($("#c_bullets:checked").length) {
            if (suc<1) successText="<div>Увернулся от "+textEndings((1-suc),"снаряда","снарядов","снарядов")+"</div>";
            if ($(obj).hasClass("crit-success")) successText="<div>Увернулся от всех снарядов</div>";
          }

          if ($("#c_bare_on_weapon:checked").length&&suc>0) successText="<div>Атакующи может выбрать руку в качестве цели</div>";

          obj.append(successText);

          textualizeAndSendToDiscord($(obj),'Бросок защиты - '+$("input[name='c_type']:checked").parent().text()+' против '+res);

        });
    });
  }

  modalPopup(
    `<tool>`+toolsDiscordButtonHtml+
    `<span style='position:absolute; right: 20px;'>`+makeReferenceLink("B374")+`</span>
    <h2>Активная защита</h2>

    <div style="font-size: 120%" onclick="flyAlert('Не забудьте поменять Уровень броска',$(this))">
      <label><input type="radio" name="c_type" id="c_dodge" value="dodge"> Уклонение</label> &nbsp;&nbsp;
      <label id="c_parry_label"><input type="radio" name="c_type" id="c_parry" value="parry"> Парирование</label> &nbsp;&nbsp;
      <label id="c_block_label"><input type="radio" name="c_type" id="c_block" value="block"> Блок</label>
    </div>

    <line>Уровень: <var id='c_level' class='editable spinner spinner-positive'>`+($(obj).find(">val").int()||8)+`</var></line>

    <line><label><input type="checkbox" id="c_bullets"> Стреляли из огнестрельного оружия</label></line>
    <line><label><input type="checkbox" id="c_flail"> Атаковали цепом</label></line>
    <line><label><input type="checkbox" id="c_chack"> Атаковали нунчаками</label></line>

    <line id='c_bare_on_weapon_text'><label><input type="checkbox" id="c_bare_on_weapon"> Парирую голыми руками атаку оружием(-3)</label></line>
    <line id='c_weapon_on_bare_text'><label><input type="checkbox" id="c_weapon_on_bare"> Парирую оружием атаку голыми руками</label></line>

    <line id="c_shield_db_text"><select id="c_shield_db">
      <option value="0">Щита нет</option>
      <option value="1">Малый / Импровизированый щит / Плащ (DB 1)</option>
      <option value="2">Средний щит / Тяжелый плащ (DB 2)</option>
      <option value="3">Большой / Силовой щит(DB 3)</option>
      <option value="4">Защита получена магией (DB 4)</option>
     </select><div class="note">должен быть "готов" (ready)</div></line>

    <div id="c_att_block">
      <line>Парирую <var class="editable spinner spinner-positive" id="c_att">1</var>-ую атаку в этот раунд</line>
      <div id="c_att_add" style="padding-left:20px;">
      <line><label><input type="checkbox" id="c_fenc"> Защищаюсь фехтовальным оружием</label></line>
      <line><label><input type="checkbox" id="c_tbm"> Есть преимущество "Ученик Мастера" или "Мастер оружия"</label></line>
      </div>
    </div>

    <line><label><input type="checkbox" value="3" id="c_ret">Отступление (<span id="c_ret_text">+3</span>) <span class="note">Retreat</span></label></line>
    <line id="c_drop_text"><label><input type="checkbox" value="3" id="c_drop">Падение (+3) <span class="note">Drop, Только против дистанционной атаки </span></label></line>
    <line> Прочие модификаторы <var class='editable spinner' id=c_mod>0</var></line>
    <line>
      <note-block>
        Модификаторы надо не забывать вносить самому:
        <li>Обманная атака или успешный финт противника</li>
        <li>Акробатическое уклонение `+makeReferenceLink("B375")+` (при успехе +2, при провале -2)</li>
        <li>Тотальная защита (увеличенная) даст +2 только к одному из видов защиты</li>
        <li>При "Движении и атаке" парирование невозможно</li>
      </note-block>
    </line>
    <span style='position:absolute; right: 20px; margin-top:15px;'>`+makeReferenceLink("B549")+`</span>


    <line style="font-size: 150%; margin-top: 20px;"><a href="javascript:void(0);" onClick="$('#c_mods').slideToggle(300); $(this).find('i').toggleClass('fa-caret-right').toggleClass('fa-caret-down');"><i class='fa fa-caret-right'></i> Дополнительные модификаторы</a></line>
    <div style='display:none; margin-left: 20px;' id='c_mods'>

      <line>
        <select id='c_updown'>
          <option value=-3>Защищающийся ниже атакующего на 1.5м (-3)</option>
          <option value=-2>Защищающийся ниже атакующего на 1.2м (-2)</option>
          <option value=-1>Защищающийся ниже атакующего на 0.9м (-1)</option>
          <option value=0 selected>Защищающийся и атакующий на одной высоте</option>
          <option value=1>Защищающийся выше атакующего на 0.9м (+1)</option>
          <option value=2>Защищающийся выше атакующего на 1.2м (+2)</option>
          <option value=3>Защищающийся выше атакующего на 1.5м (+3)</option>
        </select>
      </line>

      <line> Поза защищающегося <select id='c_pose'>
          <option value=0>Стоит (0)</option>
          <option value=-2>На коленях / сидя (-2)</option>
          <option value=-3>Лежа / позком (-3)</option>
        </select>
      </line>

      <line><label><input type="checkbox" value="-4">Защищающийся оглушен (-4) <span class="note">Stun</span></label></line>

      <line><label><input type="checkbox" value="-2">Атака сбоку или «огибающая» (-2) </label></line>

      <line><label><input type="checkbox" value="-1">Атака "двойной атакой" обе попали в одну цель (-1) </label></line>

      <line><label><input type="checkbox" value="-4">Защищающийся не видит атакующего (-4) <span class="note">Только при броске Слух-2</span></label></line>

      <line id="c_off_hand_parray_text"><label><input type="checkbox" value="-2">Парирование не основной рукой (-2) <span class="note">Off-hand</span></label></line>
      <line id="c_throwing_big_parray_text"><label><input type="checkbox" value="-1">Парирование метательного (-1) <span class="note">Топоры копья и т.п.</span></label></line>
      <line id="c_throwing_small_parray_text"><label><input type="checkbox" value="-2">Парирование метательного мелкого(-2) <span class="note">Ножи сюрикены и т.п.</span></label></line>


      <line><label><input type="checkbox" value="1">Атакующий использует лазерный прицел (+1) <span class="note">если точку видно</span></label></line>


    </div>
    <line><skill-results></skill-results></line>
    </tool>`
    ,"Закрыть",null,null,null,
    function(){
      var tagName=($(obj).prop("tagName")||"").toLowerCase();
      $("#c_"+tagName).prop('checked',true);
      if (tagName=="block") $("#c_shield_db").val(1);

      // Фиксим проблему со щитами
      var shieldBonus=globalChar.find(tagName+"_bonus").int()||0;
      $("#c_shield_db").val(shieldBonus);
      $("#c_level").html($("#c_level").int()-shieldBonus);


      $("#c_drop").click(function (){
        $("#c_ret").prop('checked', false);
      });
      $("#c_ret").click(function (){
        $("#c_drop").prop('checked', false);
      });

      $("#c_bullets").click(function (){
        $("#c_flail").prop('checked', false);
        $("#c_chack").prop('checked', false);
      });
      $("#c_flail").click(function (){
        $("#c_bullets").prop('checked', false);
        $("#c_chack").prop('checked', false);
      });
      $("#c_chack").click(function (){
        $("#c_bullets").prop('checked', false);
        $("#c_flail").prop('checked', false);
      });

      $("modalpopup .editable,modalpopup input,modalpopup select").on("change keyup",calcIt);
      calcIt();
    });
}

function toolSpellCast(obj){
  function calcIt(){

    var res=$("#c_skill_level").int()+$("#c_mod").int();

    if ($("#c_manna").val()==-1) res+=-5;
    $.cookie("c_manna",$("#c_manna").val(),{ expires: 10 * 365 });

    res+=-1*$("#c_hp").int();

    res+=-1*$("#c_active").int()-3*$("#c_active_conc").int();

    $("modalpopup .c_types").hide();
    if ($("#c_type").val()=="regular"){
      $("#c_regular").show();
      res+=-1*$("#c_regular_range").int();
      if ($("#c_regular_visibility:checked").length) res+=-5;
    }
    if ($("#c_type").val()=="area"){
      $("#c_area").show();
      res+=-1*$("#c_area_range").int();
      if ($("#c_area_visibility:checked").length) res+=-5;
    }
    if ($("#c_type").val()=="info"){
      $("#c_inf").show();
      res+=1*$("#c_inf_range").val();
      res+=-1*$("#c_inf_igonre").int();

    }

    var baseSkill=$("#c_skill_level").int();
    if ($("#c_manna").val()==-1) baseSkill+=-5;


    var ritual="необходимо, чтобы две свободные руки и две ноги, а также надо произносить слова силы громким голосом";
    var cost="не меняется";
    var time="удваивается";


    if (baseSkill>=10) {
      ritual="нужно сказать несколько тихих слов и сделать жест";
      cost="не меняется";
      time="не меняется";
    }
    if (baseSkill>=15) {
      ritual="нужно сказать одно-два слова <u>или</u> сделать небольшой жест (парой пальцев)<br>Можно передвигаться 1 м в сек";
      cost="уменьшается на 1";
      time="не меняется";
    }
    if (baseSkill>=20) {
      ritual="отсутствует! Нужно просто смотреть в одну точку<br>Можно передвигаться 1 м в сек";
      cost="уменьшается на 2";
      time="уменьшается в 2 раза (окр. вверх, минимум 1 секунда)";
    }
    if (baseSkill>=25) {
      var zzz=Math.floor(baseSkill/5)-3;
      ritual="отсутствует!<br>Можно передвигаться 1 м в сек";
      cost="уменьшается на "+(zzz+1);
      time=" в "+Math.pow(2,zzz)+" раза меньше (окр. вверх, минимум 1 секунда)";
    }

    if ($("#c_type").val()=="blocking"){cost="не меняется"; time="блокирование"}

    if ($("#c_type").val()=="regular"){
      if ($("#c_regular_sm").int()>0) cost="умножается на "+($("#c_regular_sm").int()+1)+" за размер цели и "+cost
    }
    if ($("#c_type").val()=="area"){
      if ($("#c_area_rad").int()>1) cost="умножается на "+($("#c_area_rad").int())+" за размер области и "+cost
    }

    $("#c_message").html("<p><b>Ритуал:</b> "+ritual+"<p><p><b>Стоимость:</b> "+cost+"</p><b>Время:</b> "+time+"</p>");




    $("modalpopup skill-results").html("<gc-skill-roll class='discord-color'>" + res + "</gc-skill-roll>");
    $("modalpopup skill-results gc-skill-roll").click(function () {
      var skillName="";
      echo (obj);
      if (obj) skillName=obj.find(">name").text()+' ('+obj.find(">name-loc").text()+')';
      skillRoll(res, $("modalpopup skill-results"), function (obj) {
        if ($("#c_manna").val()==2 && $(obj).hasClass("fail")) $(obj).addClass("crit-fail");
        if ($(obj).hasClass("crit-fail")) {$(obj).append("<crit>"+toolRollCrit('fail-magic')+"</crit>");}
        if ($(obj).hasClass("crit-success")) {$(obj).append("<crit>Заклинание срабатывает особенно хорошо. Детали – на усмотрение мастера. Энергия на сотворение не тратится.</crit>");}

        textualizeAndSendToDiscord(obj,'Бросок заклинания '+skillName+' против '+res);

      });

    });
  }

  function getFromObj(name,def){
    return $(obj).find(">"+name+":not(.gc-source-value)").text()||def
  }


  modalPopup(
    `<tool>`+toolsDiscordButtonHtml+
    `<span style='position:absolute; right: 20px;'>`+makeReferenceLink("M7")+`</span>
    <h2>Сотворение заклиания</h2>
    

    <line>Уровень: <var id='c_skill_level' class='editable spinner spinner-positive'>`+($(obj).find(">gc-level").int()||8)+`</var></line>
    
    <line>
      Уровень манны 
      <select id="c_manna">
        <option value="2">очень высокий</option>
        <option value="1">высокий</option>
        <option value="0" selected>обычный</option>
        <option value="-1">низкий</option>
      </select>
    </line>
    <line>Наношу вред себе на <span class='editable spinner spinner-not-negative' id=c_hp>0</span> hp вместо усталости</line>
    
    <line>Действующие заклинания: <span class='editable spinner spinner-not-negative' id=c_active>0</span> включенных, <span class='editable spinner spinner-not-negative' id=c_active_conc>0</span> требующих концентрации</line>
    
    <line style="font-size: 140%">
    Тип
      <select id="c_type">
        <option value="regular"> Обычное</option>
        <option value="area"> Площадное</option>
        <option value="melee"> Касательное</option>
        <option value="missile"> Метательное</option>
        <option value="blocking"> Блокирующее</option>
        <option value="info"> Информационное</option>
        <option value="enchantment"> Чары</option>
      </select>
    </line>
    
    <div id="c_regular" class="c_types">
      <line>Расстояние до цели <var class='editable spinner spinner-not-negative' id="c_regular_range">0</var> м.</line>        
      <line><label><input type="checkbox" value="-5" id="c_regular_visibility">Не вижу цели (-5) </label></line>
      <line>Размер цели <span class='editable spinner' id="c_regular_sm">0</span> SM</line>
    </div>
    
    <div id="c_area" class="c_types">
      <line>Расстояние до границы области <var class='editable spinner spinner-not-negative' id="c_area_range">0</var> м.</line>        
      <line><label><input type="checkbox" value="-5" id="c_area_visibility">Не вижу области (-5) </label></line>
      <line>Радиус области <var class='editable spinner spinner-positive' id="c_area_rad">1</var> м.</line>        
    </div>
    

    <div id="c_inf" class="c_types">
      <line>Макс расстояние
       <select id="c_inf_range">
        <option value="0">до 200 метров</option>
        <option value="-1">1/2 мили</option>
        <option value="-2">1 миля</option>
        <option value="-3">3 мили</option>
        <option value="-4">10 миль</option>
        <option value="-5">30 миль</option>
        <option value="-6">100 миль</option>
        <option value="-7">300 миль</option>
        <option value="-8">1000 миль</option>
        <option value="-10">10,000 миль</option>
        <option value="-12">100,000 миль</option>
        <option value="-14">1,000,000 миль</option>
      </select>   
      </line>        
      <line>Игнорировано объектов <span class='editable spinner spinner-not-negative' id="c_inf_igonre">0</span>
      <div class="note">Ннапример, игнорировать воду в моей фляге при поиске воды</div>
      </line>        
    </div>


            
    
    <line>Прочие модификаторы <var class='editable spinner' id=c_mod>0</var></line>
    
    <note-block id="c_message"></note-block>

   
   
    
    <line><skill-results></skill-results></line>
    </tool>`
    ,"Закрыть",null,null,null,
    function(){
      // подготовка
      $("#c_manna").val($.cookie("c_manna")||0);

      var spellClass=$(obj).find(">spell_class").text().toLowerCase();
      $("#c_type option[value='"+spellClass+"']").attr('selected', 'selected');

      $("modalpopup .editable,modalpopup input,modalpopup select").on("change keyup",calcIt);
      calcIt();
    });
}


function toolHiking(){

  function calcIt(){

    var vehicle=($("modalpopup input[name='c_type']:checked").val()==2);

    var terrainMod=$("modalpopup input[name='c_land']:checked").val()*1.0;
    if (vehicle) terrainMod=$("modalpopup input[name='c_land']:checked").attr('vehicle')*1.0;



    var skillName="ходьбы (Hiking)";
    if ($("#c_weather").val()==1) { // Хорошая погода
      if($("#c_roads").val()==2&&terrainMod<1) terrainMod=1;
      if($("#c_roads").val()==3) terrainMod=1.25;
    }
    if ($("#c_weather").val()==2) { // Дождь
      if($("#c_roads").val()==1) terrainMod*=0.5;
      if($("#c_roads").val()==2) terrainMod=0.2;
      if($("#c_roads").val()==3) terrainMod=1;
    }
    if ($("#c_weather").val()==3) { // Снег по щиколотку
      if($("#c_roads").val()==1) terrainMod*=0.5;
      if($("#c_roads").val()==2) terrainMod=0.5;
      if($("#c_roads").val()==3) terrainMod=0.5;
    }
    if ($("#c_weather").val()==4) { // Снег глубокий
      if($("#c_roads").val()==1) terrainMod*=0.25;
      if($("#c_roads").val()==2) terrainMod=0.25;
      if($("#c_roads").val()==3) terrainMod=0.25;
    }
    if ($("#c_weather").val()==5) { // Снег лыжи
      terrainMod=1;
      skillName="лыжи (Skiing)";
    }
    if ($("#c_weather").val()==6) { // Гололед
      if($("#c_roads").val()==1) terrainMod*=0.5;
      if($("#c_roads").val()==2) terrainMod=0.5;
      if($("#c_roads").val()==3) terrainMod=0.5;
    }
    if ($("#c_weather").val()==7) { // Каток
      terrainMod=0.5;
    }
    if ($("#c_weather").val()==8) { // Каток коньки
      terrainMod=1;
      skillName="коньки (Skating)";
    }



    if (vehicle){
      // езда
      var speed=$("#c_mph").float()*0.7;
      if($("#c_roads").val()==1) {
        speed=Math.min(speed,$("#c_veh_accel").float()*4);
      }
      var perHour=speed * terrainMod;
      var note="<p class='note'>Крейсерская скорость рассчитывается из учета 70% от максимальной, при повышение скорости потребуются броски контроля. Рассчитано время чистого движения, необходимо самому учитывать время на отдыха экипажа.<p>";

      if ($("modalpopup input[name='c_togo']:checked").val()==1) {
        $("modalpopup result").html("Это расстояние будет пройдено за "+ round($("#c_range_mi").int()/perHour,1)+" час.<br>" + note);
      } else {
        $("modalpopup result").html("Будет пройдено "+round(perHour*$("#c_time").int()*1.6)+" км ("+round(perHour*$("#c_time").int())+" миль)<br>" + note);
      }

    }
    else {
      var perDay=$("#c_move").float() * 10 * terrainMod;
      var note="<p class='note'>Это подразумевает, что вы потратили целый день на подготовку к походу, сам поход и отдых после него, не занимаясь учебой и чем-либо другим.<p>";

      if ($("modalpopup input[name='c_togo']:checked").val()==1) {
        $("modalpopup result").html("Это расстояние будет пройдено за "+ round($("#c_range_mi").int()/perDay,1)+" д.<br>" +
          "При броске умения "+skillName+" за "+round($("#c_range_mi").int()/(perDay*1.2),1)+" д."+note);
      } else {
        $("modalpopup result").html("Будет пройдено "+round(perDay*$("#c_time").int()*1.6)+" км ("+round(perDay*$("#c_time").int())+" миль)<br>" +
          "При броске умения "+skillName+" "+round(perDay*$("#c_time").int()*1.6*1.2)+" км ("+round(perDay*$("#c_time").int()*1.2)+" миль)"+note);
      }

    }


  }

  modalPopup(`
    <tool>
      <span style='position:absolute; right: 20px;'>`+makeReferenceLink("B351")+`</span>
      <h2>Путешествия</h2>
      <line style="font-size: 120%; text-align:center;"><label><input type="radio" name="c_type" value="1" checked>Пешком</label> <label><input type="radio" name="c_type" value="2">На транспорте</label></line>
      <line class="vehicle-hide">Скорость макс.: <var id='c_move' class='editable spinner spinner-positive spinner-quarter float'>`+(globalChar.find("speed_result").float()||5)+`</var>
      <div class="note">Скорость самого медленного члена группы с учетом нагрузки и ран</div>
      </line>
      <line class="hiking-hide">Ускорение: <var id='c_veh_accel' class='editable spinner spinner-positive'>3</var> м/c (для подсчета движениия по бездорожью)<br>
      Скорость <var class='editable spinner  spinner-positive' id='c_kmh'>72</var> км/ч | <span class='editable spinner  spinner-positive' id='c_mph'>45</span> мили/ч | <span class='editable spinner  spinner-positive' id='c_ms'>20</span> м/c
      
      <div class="note">Параметры самого медленного участника каравана.<br>В карточке транспорта параметер Move показывает ускорение/макс скорость в <b>м/c</b></div>
      </line>
      
      <line><label><input name="c_togo" type="radio" value="1" checked> Необходимо пройти </label><var class='editable spinner spinner-positiove spinner-five' id="c_range_km">80</var> км | <span class='editable spinner spinner-positiove  spinner-five' id="c_range_mi">50</span> миль</line>
      <line><label><input name="c_togo" type="radio" value="2"> Идти </label><var class='editable spinner spinner-positiove disabled' id="c_time">5</var> <span class="vehicle-hide">дней</span><span class="hiking-hide">часов</span></line>
      
      <line><h3>Ландшафт</h3></line>
      <line><label><input name="c_land" type="radio" value="0.2" vehicle="0.1"> Очень плохой <div class="note">глубокий снег, дремучий лес, горы, джунгли, болота, мягкий песок.</div></label></line>
      <line><label><input name="c_land"  type="radio" value="0.5" vehicle="0.25"> Плохой <div class="note">пересеченная местность (включая реки), лес, крутые холмы</div></label></line>
      <line><label><input name="c_land"  type="radio" value="1"  vehicle="0.5" checked> Средний <div class="note">перелесок или пологие холмы</div></label></line>
      <line><label><input name="c_land"  type="radio" value="1.25"  vehicle="1.25"> Хороший <div class="note">плоскогорье, равнины</div></label></line>
      <line>   
       Дороги:
      <select id="c_roads" style="font-size:140%;">
       <option value="1" checked>Без дорог</option>
       <option value="2">Грунтовые дороги</option>
       <option value="3">Отличные дороги</option>
      </select></line>
      <line>Погода 
      <select id="c_weather" style="font-size:140%;">
        <option value="1"> Хорошая</option>
        <option value="2"> Дождь</option>
        <option value="3"> Снег по щиколотку</option>
        <option value="4"> Снег глубокий</option>
        <option value="5" class="vehicle-hide"> Снег (любой) на лыжах</option>
        <option value="6"> Местами гололед</option>
        <option value="7"> Сплошной лед</option>
        <option value="8" class="vehicle-hide"> Сплошной лед на коьках</option>
      </select> 
      </line>
      <line><result></result></line>
    </tool>`
    ,"Закрыть",null,null,null,
    function(){
      function setType(){
        if ($("modalpopup input[name='c_type']:checked").val()==1){
          $("modalpopup .hiking-hide").hide();
          $("modalpopup .vehicle-hide").show();
        } else{
          $("modalpopup .hiking-hide").show();
          $("modalpopup .vehicle-hide").hide();
        }
      }

      $("modalpopup [name='c_type']").on('change',setType);
      setType();

      $("#c_ms").on("change",function(){
        $("#c_kmh").text(round($(this).float()*3.6));
        $("#c_mph").text(round($(this).float()*2.237));
      });
      $("#c_kmh").on("change",function(){
        $("#c_ms").text(round($(this).float()*0.278));
        $("#c_mph").text(round($(this).float()*0.621));
      });
      $("#c_mph").on("change",function(){
        $("#c_ms").text(round($(this).float()*0.447));
        $("#c_kmh").text(round($(this).float()*1.609));
      });

      $("#c_range_mi").on("change",function(){
        $("#c_range_km").text(round($(this).float()*1.6));
      });
      $("#c_range_km").on("change",function(){
        $("#c_range_mi").text(round($(this).float()/1.6));
      });
      $("modalpopup input[name='c_togo']").on("change",function(){
        if ($("modalpopup input[name='c_togo']:checked").val()==1){
          $("#c_range_km,#c_range_mi").removeClass("disabled");
          $("#c_time").addClass("disabled");
        } else {
          $("#c_range_km,#c_range_mi").addClass("disabled");
          $("#c_time").removeClass("disabled");
        }

      });



      $("modalpopup .editable,modalpopup input,modalpopup select").on("change",calcIt);
      calcIt();
    });

}

function toolDemolition(){
  function calcIt(){
    var res=""

    echo ($("#c_type option:selected").val());
    var modifier=Math.sqrt($("#c_type option:selected").val()*$("#c_weight").float()*4);


    if ($("#c_frag:checked").length) {
      var maxFragDest=round(30*modifier);
      if ($("#c_dist").int() > maxFragDest) {
        res += "<p>Нет осколочных поврежлдений - макс. диастанция " + maxFragDest + " м.</p>";
      }
      else {
        res+="<p>Осколки попадают при броске <gc-roll class='frag-roll'>"+(15+getRangeSpeedModifier($("#c_dist").int()))+"</gc-roll> (rcl 3 - попасть может несколько осколков)<br>и наносят <gc-roll class='damage-roll'>6dx"+round(modifier,1)+" cut</gc-roll></p>";
      }
    }

    var maxDest=round(12*modifier);
    if ($("#c_dist").int() > maxDest) {
      res += "Не нанесет ударных повреждений - макс. диастанция " + maxDest + " м.";
    }
    else {
      if ($("#c_dist").int()>0) modifier=modifier/(3*$("#c_dist").int())
      res+="Ударные повреждения <gc-roll class='damage-roll'>6dx"+round(modifier,1)+" cr</gc-roll>";
    }



    $("modalpopup result").html(res);
    $("modalpopup .damage-roll").click(function () {
      damageRoll($(this).text(),$("modalpopup result"));
    });
    $("modalpopup .frag-roll").click(function () {
      skillRoll($(this).text(),$("modalpopup result"),function (obj) {
        var suc=($(obj).attr('success'));
        var rcl=3;
        var gotIn=1+Math.floor(-1*suc/rcl);
        if (gotIn>0) obj.append('<p> '+textEndings(gotIn,"осколок попал","осколка попали","осколков попали")+' на '+$("modalpopup .damage-roll").html()+'</p>');
        while (gotIn>0) {
          loc=getRandomLocation();
          loc=loc.split("/");
          var location=loc[0];

          if ($(obj).hasClass("crit-fail")) {$(obj).append("<crit>"+toolRollCrit('fail')+"</crit>");}
          if ($(obj).hasClass("crit-success")) {$(obj).append("<crit>"+toolRollCrit((location=='face'||location=='skull')?'success-head':'success')+"</crit>");}

          if ($(obj).hasClass("fail")) return;

          obj.append('* Осколок в <gc-location name="'+location+'" side="'+loc[1]+'"></gc-location>');

          damageRoll($("modalpopup .damage-roll").html(),obj);

          $(obj).append("<location>"+toolLocationsTexts(damageObjToStr(dmgObj),location)+"</location>");
          gotIn--;
        }

      });


    });
  }
  modalPopup(`
    <tool>
      <span style='position:absolute; right: 20px;'>`+makeReferenceLink("B415")+`</span>
      <h2>Взрывчатка</h2>
      <line>Вес предмета <var id='c_weight_kg' class='editable spinner spinner-not-negative spinner-half float'>1</var> кг | <span id='c_weight' class='editable spinner spinner-not-negative float'>2</span> фунт.</line>
      <line>Расстояние до эпицентра: <var id='c_dist' class='editable spinner spinner-not-negative'>0</var> м
      <div class="note">ставьте 0 если взрывчатка попала точно</div>
      </line>      
      
      <line><label><input type="checkbox" id="c_frag">Осколочный эффект </label></line>      

      <select id="c_type" style="font-size:140%;">
        <option value="0.3"> Первый порох (до 1600г. TL3)</option>
        <option value="0.4"> Аммиачная селитра (Популярная самодельная взрывчатка TL4)</option>        
        <option value="0.4"> Черный порох (1600-1850г. TL4)</option>        
        <option value="0.5"> Черный порох (1850-1890г. TL5)</option>
        <option value="0.5"> Дизельное топливо (Популярная самодельная взрывчатка TL6)</option>                
        <option value="0.5"> Азотные удобрения (Популярная самодельная взрывчатка TL6)</option>                
        <option value="0.8"> Динамит (Доступен шахтерам, строителям TL6)</option>                
        <option value="1.0" selected> Тротил (Стандартная взрывчатка, стабильная и мощная. TL6)</option>                
        <option value="1.2"> Аматол (Смесь тротила с аммиачной селитрой. Во вторую мировую использовалась при изготовлении бомб и снарядов. TL6)</option>                
        <option value="1.5"> Нитроглицерин (Нестабильная взрывчатка! При падении взрывается при результате 13+. TL6)</option>                
        <option value="1.3"> Тетрил (Часто используется в небольших снарядах и разрывных патронах. TL7)</option>                
        <option value="1.3"> Гексолит (Также популярный наполнитель для взрывных устройств. TL7)</option>                
        <option value="1.4"> Пластид C4 (Стандартная взрывчатка для армии и спецподразделений. TL7)</option>                
        <option value="4"> Октанитрокубан (Теоретическая взрывчатка будущего. TL9)</option>                
        <option value="6"> Устойчивый металлический водород (Фантастическая взрывчатка. TL10)</option>                
      </select> 
      </line>
      <line><result></result></line>
    </tool>`
    ,"Закрыть",null,null,null,function(){
      $("#c_weight_kg").on("change",function(){
        $("#c_weight").text(round($(this).float()*2,1));
      });
      $("#c_weight").on("change",function(){
        $("#c_weight_kg").text(round($(this).float()/2,1));
      });

      $("modalpopup .editable,modalpopup input,modalpopup select").on("change",calcIt);
      calcIt();
    });
}

function toolJumping(){
  function calcIt(){
    var move=Math.max($("#c_move").int(),Math.floor($("#c_skill").int()/2));
    var run=$("#c_run").int();

    var superjump=$("#c_superjump").int();
    var enhanced=$("#c_enhanced").float()+1;
    var enc=$("#c_enc option:selected").val();

    if ((move+run)<(move*enhanced)) {
      run=0;
      move=move*enhanced;
    }

    var h_jump=Math.min(6*(move+run)-10,(6*(move)-10)*2);
    if (h_jump<0) h_jump=0;
    h_jump*=Math.pow(2,superjump)*enc;

    var l_jump=Math.min(2*(move+run)-3,(2*(move)-3)*2);
    if (l_jump<0) l_jump=0;
    l_jump*=Math.pow(2,superjump)*enc;




    $("modalpopup result").html(
      "<p>Прыжок вы высоту: "+round(h_jump*0.025,2)+" м. макс."+
      "<p>Прыжок вы длину: "+round(l_jump*0.3,2)+" м. макс.");
  }

  updateGlobalLists();
  var skill=0;
  globalSkillsList.each(function(){
    if ($(this).find(">name").text().toLowerCase()=="jumping") skill=$(this).find(">gc-level").int();
  })

  var superjump=0;
  globalAdvantagesList.each(function(){
    if ($(this).find(">name").text().toLowerCase()=="super jump") superjump=$(this).find(">levels").int();
  })


  modalPopup(`
    <tool>
      <span style='position:absolute; right: 20px;'>`+makeReferenceLink("B352")+`</span>
      <h2>Прыжки</h2>
      <line>
        Basic Move <var id='c_move' class='editable spinner spinner-positive'>`+(getAttr('move')||4)+`</var> |  
        Умение Прыжок <var id='c_skill' class='editable spinner spinner-not-negative'>`+skill+`</var>
       </line>      
      <line>Предварительный разбег <var id='c_run' class='editable spinner spinner-not-negative'>0</var> м.</line>
      <line>Уровень нагрузки <select id='c_enc'>
        <option value="1">Нет (0)</option>
        <option value="0.8">Легкая (-1)</option>
        <option value="0.6">Средняя (-2)</option>
        <option value="0.4">Тяжелая (-3)</option>
        <option value="0.2">Сверх тяжелая (-4)</option>
      </select></line>
      <line>Уровень преимущества Enhanced Move (Ground) Levels <span id='c_enhanced' class='editable spinner spinner-half spinner-not-negative'>`+round(globalChar.find("ground_move_bonus").float()||0,1)+`</span></line>
      <line>Уровень преимущества Super Jump <span id='c_superjump' class='editable spinner spinner-not-negative'>`+superjump+`</span></line>
      </line>      
      
      <line><result></result></line>
    </tool>`
    ,"Закрыть",null,null,null,function(){
      $($("modalpopup #c_enc option")[globalChar.find("encumbrance_bonus").int()*-1]).attr('selected','selected');
      $("modalpopup .editable,modalpopup input,modalpopup select").on("change",calcIt);
      calcIt();
    });
}