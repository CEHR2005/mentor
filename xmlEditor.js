(function () {
  // ------ Как выполнять описание  ---
  // class="" - все класы переносятся внурь
  // loc="" - перекрыть навание для меню
  // select - выпадающий список внутри должне быть опасан надором <option value="val">Текст</option>
  // editable-select - выпадающий список с возможностью ввода произвольнх значений, внутри должне быть опасан надором <option value="val">Текст</option>
  // multiselect - выбор из нескольких внутри должне быть опасан надором <option value="val">Текст</option>
  // collapsable - можно сворачивать
  // multiply - можно доавлять в структуру более одного раза
  // noedit - не редактируемое значние
  // autoadd - добавлять при добавленеи родительского тэга
  // recurse - вложеность
  // attribute - атрибут верхней адвантаги
  // hideval - скрыть занчение
  // nodelete - нет кнопки удалить
  // deliminator - Это разделитель - необходимо чтоб ыимена тегов были разные (ставте <hr1> <hr2> <hr3> и т.п.)

  // <v></v>- Будет содержать значенеи родительского тэга - испольузется с случаи когда есть еще атрибуты
  //          а поле редактируемое - чтобы не  запороть атрибуты при редактировании,
  //          так-же подвержено "сортировке" и можно выставить место где будет значние.

  // <menu-item loc="" onAdd=""> - просто доавить элемент в меню со скриптом

  // onInit - событие при иницализации node - текущий объкет, obj - структура
  // onChange - undone
  // onAdd - событие при добавлении node - текущий объкет

  // .collapsed - по умолчанию свернуто (нужно свойтство collapsable)
  // .expanded - всегда будет раскрытым и в одну строку (нужно свойтство collapsable)
  // .in-single-line - внутренние элеметы пойдут в одну строку
  // .inline
  // .spinner - числовое занчение


  var levelMod = `
    <level_mod attribute hideval loc="добавить множитель за ур."
      onAdd="
       var foo=$(node).parent().parent().parent();
       if (foo.find('>levels').length==0){
        renderNode(addNode(findInStructure(foo).find('>levels'),foo));
        sortByStructure(foo);
       }"
    >yes</level_mod>`;
  var perLevel = `
    <per_level attribute hideval loc="добавить множитель за ур." 
      onAdd="
       var foo=$(node).parent().parent().parent();
       if (foo.find('>levels').length==0){
        renderNode(addNode(findInStructure(foo).find('>levels'),foo));
        sortByStructure(foo);
       }"
    >yes</per_level>`;

  var attributesList = `
      <option value="st">ST (Сила)</option>
      <option value="dx">DX (Ловкость)</option>
      <option value="iq">IQ (Интелект)</option>
      <option value="ht">HT (Здоровье)</option>
      <option value="hp">HP (Жизни)</option>
      <option value="fp">FP (Усталость)</option>
      <option value="will">Воля</option>
      <option value="fright_check">Страх</option>
      <option value="speed">Скорость</option>
      <option value="move">Шагов в раунд</option>
      <option value="perception">Восприятие</option>
      <option value="vision">Зрение</option>
      <option value="hearing">Слух</option>
      <option value="taste">Вкус</option>
      <option value="touch">Осязания</option>
      <option value="sm">Мод. размера</option>
      <option value="reaction">Мод. реакции</option>
      `;

  var magicCollegesList=`
      <option value="Air">Air</option>
      <option value="Animal">Animal</option>
      <option value="Body Control">Body Control</option>
      <option value="Communication">Communication</option>
      <option value="Earth">Earth</option>
      <option value="Enchantment">Enchantment</option>
      <option value="Fire">Fire</option>
      <option value="Food">Food</option>
      <option value="Gate">Gate</option>
      <option value="Healing">Healing</option>
      <option value="Illusion & Creation">Illusion & Creation</option>
      <option value="Knowledge">Knowledge</option>
      <option value="Light & Darkness">Light & Darkness</option>
      <option value="Making & Breaking">Making & Breaking</option>
      <option value="Meta">Meta</option>
      <option value="Mind Control">Mind Control</option>
      <option value="Movement">Movement</option>
      <option value="Necromancy">Necromancy</option>
      <option value="Plant">Plant</option>
      <option value="Protection">Protection</option>
      <option value="Sound">Sound</option>
      <option value="Technological">Technological</option>
      <option value="Water">Water</option>
      <option value="Weather">Weather</option>
  `;

  var compareAttr = function (val) {
    return `
    <compare autoadd attribute select nodelete>
      ` + (val || "") + `
      <option value="is">равно</option>
      <option value="is anything">любое знач.</option>
      <option value="is not">не равно</option>
      <option value="contains">содержит</option>
      <option value="does not contain">не содерж.</option>
      <option value="starts with">нач. с</option>
      <option value="does not starts with">не нач. с</option>
      <option value="ends with">зак. на</option>
      <option value="does not ends with">не зак. на</option>
      <option value="exactly">строго ровно</option>
      <option value="at least">не менее</option>
      <option value="at most">не более</option>
    </compare>`
  };

  var compareNumAttr = function (val) {
    return `
    <compare autoadd attribute select nodelete>
      ` + (val || "") + `
      <option value="is">=</option>
      <option value="is not">≠</option>
      <option value="at least">≥</option>
      <option value="at most">≤</option>
    </compare>`
  };

  var categories=`
    <categories collapsable class="expanded">
      <category autoadd loc="Категория" multiply>Категория</category>
    </categories>`;


  var descriptionLoc=`<description-loc class="longtext">
        <img multiply loc='Добавить картинку' onAdd="imageUrlPrompt(node,true)"/>
        Напишите описание
        </description-loc>`;

  var reference=`<reference>B0</reference>`;


  var defaultNode = `
  <default loc="Зависимость" collapsable multiply class="expanded">
    <type autoadd select nodelete onChange="
       if ($(node).find('>select').val()=='Skill'||$(node).find('>select').val()=='Spell') {
         if ($(node).parent().find('>name').length==0){
          renderNode(addNode(findInStructure($(node)).parent().find('>name'),$(node).parent()));
          sortByStructure($(node).parent());
         }
       } else $(node).parent().find('name,specialization').remove();
       ">
      Skill
      <option value="Skill">Умение</option>
      <option value="Spell">Заклинание</option>
      ` + attributesList + `
    </type>
    <name autoadd nodelete loc="Умение" onAdd="$(node).parent().find('>type>select').val('Skill')">Skill name</name>
    <specialization onAdd="$(node).parent().find('>type>select').val('Skill').change();">Sepecialzation</specialization>
    <modifier autoadd nodelete class="spinner">-4</modifier>
  </default>`;


  var rangedWeapon = `
  <ranged_weapon collapsable multiply class="in-single-line">
    <damage autoadd><v>1d</v></damage>
    <strength autoadd>10</strength>
    <accuracy autoadd>3</accuracy>
    <range autoadd>100/500</range>
    <rate_of_fire autoadd>1</rate_of_fire>
    <shots autoadd>30+1(1)</shots>
    <bulk autoadd>-3</bulk>
    <recoil autoadd>1</recoil>
    <ammo autoadd>9mm</ammo>
    <self_strength>10</self_strength>
    ` + defaultNode + `
  </ranged_weapon>`;

  var meleeWeapon = `
  <melee_weapon collapsable multiply class="in-single-line">
    <damage autoadd><v>thr-1 cr</v></damage>
    <strength autoadd>10</strength>
    <reach autoadd>С</reach>
    <parry autoadd>No</parry>
    <block autoadd>No</block>
    <self_strength>10</self_strength>
    ` + defaultNode + `
  </melee_weapon>`;

  var transport = `
  <transport collapsable multiply class="in-single-line">
    <strength_health autoadd>10</strength_health>
    <handling autoadd>10</handling>
    <stability autoadd>3</stability>
    <health autoadd>50</health>
    <acceleration_top_speed autoadd>2/20</acceleration_top_speed>
    <loaded_weight autoadd>50</loaded_weight>
    <load autoadd>1</load>
    <size_modifier autoadd>+2</size_modifier>
    <occupants autoadd>2</occupants>
    <dr autoadd>1</dr>
    <range autoadd>200</range>
    <locations autoadd>4D</locations>
    <draft>1</draft>
    <stall>1</stall>
    ` + defaultNode + `
  </transport>`;

  var drBonus = `
  <dr_bonus multiply collapsable class="expanded">
    <location autoadd nodelete editable-select>
      <option value="full body">Всё тело</option>
      <option value="full body except eyes">Всё тело без глаз</option>
      <option value="feet">Стопы</option>
      <option value="shins">Голени</option>
      <option value="knees">Колени</option>
      <option value="thighs">Бедра</option>
      <option value="hands">Кисти</option>
      <option value="forearms">Предплечья</option>
      <option value="elbows">Локти</option>
      <option value="upper arms">Верхняя часть руки</option>
      <option value="shoulders">Плечо</option>
      <option value="abdomen">Живот</option>
      <option value="chest">Грудь</option>
      <option value="skull">Череп</option>
      <option value="eyes">Глаза</option>
      <option value="face">Лицо</option>
      <option value="torso">Торс</option>
      <option value="arms">Руки</option>
      <option value="legs">Ноги</option>
      <option value="neck">Шея</option>
      <option value="groin">Пах</option>
    </location>
    <amount autoadd nodelete><v class="spinner">10</v></amount>
    <except-damage-type attribute hideval loc="Не защищает от...">yes</except-damage-type>    
    <damage-type multiply loc="Тип повреждения" select>
        <option value="cr" title="Crushing - Дробящее">cr</option>
        <option value="cut" title="Cutting - Режущее">cut</option>
        <option value="imp" title="Impaling - Проникающее">imp</option>
        <option value="pi" title="Piercing - Пробивающее, в том числе и все пулевые">pi</option>
        <option value="burn" title="Burning - Обжигающий, в том числе лазерные и бластерные">burn</option>
        <option disabled>──</option>        
        <option value="cor" title="Corrosion - Разъедание, наносится кислотой, дезинтеграцией или чем-то подобным">cor</option>
        <option value="tox" title="Toxic - Токсические, вызывает повреждение клеток, наподобие болезни, яда">tox</option>
        <option value="fat" title="Fattigue - Изнуряющие.  электрошокер с малой силой тока, «ментальный удар» или даже ослабляющий эффект переохлаждения или голодания. Атака уменьшает FP">fat</option>
        <option value="rad" title="Radiation - Радиация, атака облучает субъекта. Вред кидается как обычно, но независимо от пробивания брони жертва получает 1 рад за каждое выкинутое очко базового вреда" ->rad</option>
        <option value="inc" title="Incendiary - Зажигательные, не наносящая обжигающего вреда, но дает возможность поджечь легковоспламеняемые материалы">inc</option>
        <option value="surg" title="Surge - Импульс, электрический импульс, который может вывести из строя электронику">surg</option>
        <option value="spec" title="Special - Специальные">spec</option>
        <option value="aff" title="Affliction - Воздействие, вызывает пагубный эффект - слепоту, удушье, оглушение и т.д">aff</option>                
    </damage-type>
    
  </dr_bonus>`;

  var attributeBonus = `
  <attribute_bonus multiply collapsable class="expanded">
    <attribute autoadd select nodelete>
    ` + attributesList + `
    </attribute>
    <amount autoadd nodelete>
      <v class="spinner">1</v>
      ` + perLevel + `
    </amount>
  </attribute_bonus>`;

  var skillBonus = `
  <skill_bonus multiply collapsable class="expanded">
    <name autoadd nodelete>
      <v>Skill name</v>    
      ` + compareAttr() + `
    </name>
    <specialization>
      Specialization
      ` + compareAttr() + `
    </specialization>
    <amount autoadd nodelete>
      <v class="spinner">1</v>
      ` + perLevel + `  
    </amount>
  </skill_bonus>
  `;

  var spellBonus = `
  <spell_bonus multiply collapsable class="expanded">
    <all_colleges autoadd attribute hideval onAdd="$(node).parent().find('>college_name').remove()">yes</all_colleges>
    <college_name onAdd="$(node).parent().find('>all_colleges').remove()">Collage
      ` + compareAttr() + `
    </college_name>
    <amount autoadd nodelete class="spinner">
      <v class="spinner">1</v>
      ` + perLevel + `
    </amount>    
  </spell_bonus>`;

  var costReduction = `
  <cost_reduction multiply collapsable class="expanded">
    <attribute autoadd select nodelete>
      <option value="st">ST (Сила)</option>
      <option value="dx">DX (Ловкость)</option>
      <option value="iq">IQ (Интелект)</option>
      <option value="ht">HT (Здоровье)</option>
    </attribute>
    <percentage autoadd nodelete class="spinner spinner-five">10</percentage>
  </cost_reduction>`;

  var weaponBonus = `
  <weapon_bonus multiply collapsable>
    <name autoadd nodelete>
      ` + compareAttr() + `    
      <v>Skill name</v>    
    </name>
    <specialization>
      ` + compareAttr() + `    
      Specialization
    </specialization>
    <level>
    ` + compareNumAttr() + `
      <v class="spinner">0</v>
      </level>
    <amount autoadd nodelete>
      <v class="spinner">1</v>
    </amount>
  </weapon_bonus>`;


  var equipmentModifierType=`
  <type attribute select autoadd nodelete>
    <option value="add">Суммировать c</option>
    <option value="multiply">Умножить на</option>
    <option value="concat">Дописать текст</option>
    <option value="override">Перезадать занчание</option>
    <option value="create">Создать если нет</option>
  </type>
  `;

  var equipmentModifierTypeDamage=`
  <type attribute select autoadd nodelete>
    <option value="damage value">Сумировать повреждения</option>
    <option value="damage type">Заменить тип поврежденеий на</option> 
    <option value="damage dr">Заменить пробивание брони на</option>
    <option value="damage multiplier">Множитель повреждения</option>
    <option value="add">Суммировать</option>
    <option value="multiply">Умножить на</option>
    <option value="concat">Дописать текст</option>
    <option value="create">Создать</option>
    <option value="override">Перезадать занчание</option>
  </type>
  `;


  var equipmentModifier=`
  	<equipment_modifier collapsable>
      <ammunition attribute hideval>yes</ammunition>
		  <skill_level>`+equipmentModifierType+`<v>1</v></skill_level>
		  <value>`+equipmentModifierType+`<v>1</v></value>
		  <weight>`+equipmentModifierType+`<v>1</v></weight>
		  <damage>`+equipmentModifierTypeDamage+`<v>1d+1</v>
		    <per_dice attribute hideval>yes</per_dice>
		  </damage>
		  <strength>`+equipmentModifierType+`<v>1</v></strength>		  		  
		  <reach>`+equipmentModifierType+`<v>1</v></reach>		  		  
		  <parry>`+equipmentModifierType+`<v>1</v></parry>		  		  
		  <block>`+equipmentModifierType+`<v>1</v></block>		  		  
		  <self_strength>`+equipmentModifierType+`<v>1</v></self_strength>		  		  
		  <accuracy>`+equipmentModifierType+`<v>1</v></accuracy>		  		  
		  <range>`+equipmentModifierType+`<v>1</v></range>		  		  
		  <rate_of_fire>`+equipmentModifierType+`<v>1</v></rate_of_fire>		  		  
		  <shots>`+equipmentModifierType+`<v>1</v></shots>		  		  
		  <bulk>`+equipmentModifierType+`<v>1</v></bulk>		  		  
		  <recoil>`+equipmentModifierType+`<v>1</v></recoil>		  		  
		  <ammo>`+equipmentModifierType+`<v>1</v></ammo>		  		  
		  <strength_health>`+equipmentModifierType+`<v>1</v></strength_health>		  		  
		  <handling>`+equipmentModifierType+`<v>1</v></handling>		  		  
		  <stability>`+equipmentModifierType+`<v>1</v></stability>		  		  
		  <health>`+equipmentModifierType+`<v>1</v></health>		  		  
		  <acceleration_top_speed>`+equipmentModifierType+`<v>1</v></acceleration_top_speed>		  		  
		  <loaded_weight>`+equipmentModifierType+`<v>1</v></loaded_weight>		  		  
		  <load>`+equipmentModifierType+`<v>1</v></load>		  		  
		  <size_modifier>`+equipmentModifierType+`<v>1</v></size_modifier>		  		  
		  <occupants>`+equipmentModifierType+`<v>1</v></occupants>		  		  
		  <dr>`+equipmentModifierType+`<v>1</v></dr>		  		  
		  <locations>`+equipmentModifierType+`<v>1</v></locations>		  		  
		  <draft>`+equipmentModifierType+`<v>1</v></draft>		  		  
		  <stall>`+equipmentModifierType+`<v>1</v></stall>		  		  
	  </equipment_modifier>`;


  var armorComponents=`
    <armor-components collapsable class="expanded">
      <base-value autoadd nodelete class="spinner spinner-not-negative">250</base-value>
      <base-weight autoadd nodelete class="spinner spinner-not-negative">25</base-weight>
      <base-dr autoadd nodelete class="spinner spinner-not-negative">3</base-dr>
     </armor-components>
  `;

  var hasAttr = `
      <has autoadd attribute select nodelete class="inline">      
        <option value="yes"></option>
        <option value="no">не</option>
      </has>`;

  var prereqList = `
  <prereq_list multiply collapsable class="collapsed">
    <all autoadd attribute select nodelete class="inline">      
      <option value="no">одно из</option>
      <option value="yes">все</option>
    </all>
    <prereq_list recurse></prereq_list>
    
    <attribute_prereq multiply collapsable loc="Требуется аттрибут">
      ` + hasAttr + `    
      <which autoadd attribute select nodelete>` + attributesList + `</which>
      ` + compareNumAttr('at least') + `
      <v class="spinner">10</v>      
    </attribute_prereq>
    
    <advantage_prereq multiply collapsable loc="Требуется преимущество / недостаток">
       ` + hasAttr + `    
      <name autoadd multiply>
        ` + compareAttr() + `
        <v>Adv name</v>
      </name>
      <level multiply>
        ` + compareNumAttr('at least') + `
        <v class="spinner">2</v>
       </level>
       <notes multiply>
        ` + compareAttr() + `
        <v>Note text</v>
       </notes>
    </advantage_prereq>
    
    <skill_prereq multiply collapsable loc="Требуется умение">
       ` + hasAttr + `
      <name autoadd multiply>
        ` + compareAttr() + `
        <v>Skill name</v>
      </name>
      <level autoadd multiply>
        ` + compareNumAttr('at least') + `
        <v class="spinner">14</v>
       </level>
       <specialization multiply>
        ` + compareAttr() + `
        <v>Note text</v>
       </specialization>
    </skill_prereq>
    
    <spell_prereq multiply collapsable loc="Требуется заклинание">
       ` + hasAttr + `    
      <name autoadd multiply  onAdd="$(node).parent().find('>college,>quantity,>any').remove()">
        ` + compareAttr() + `
        <v>Spell name</v>
      </name>

      <any loc="Любая школа" noedit onAdd="
         $(node).parent().find('>name').remove()
         $(node).parent().find('>college').remove()
         if ($(node).parent().find('>quantity').length==0){
          renderNode(addNode(findInStructure($(node)).parent().find('>quantity'),$(node).parent()));
          sortByStructure($(node).parent());
         }          
        ">
       </any>
       
      <college onAdd="
         $(node).parent().find('>name').remove()
         $(node).parent().find('>any').remove()
         if ($(node).parent().find('>quantity').length==0){
          renderNode(addNode(findInStructure($(node)).parent().find('>quantity'),$(node).parent()));
          sortByStructure($(node).parent());
         }        
        ">
        ` + compareAttr() + `
        <v>Skill name</v>
      </college>       
      
      <quantity loc="Количество заклинаний из школы" onAdd="
         $(node).parent().find('>name').remove()
         if ($(node).parent().find('>college').length==0&&$(node).parent().find('>any').length==0){
          renderNode(addNode(findInStructure($(node)).parent().find('>college'),$(node).parent()));
          sortByStructure($(node).parent());
         }        
        ">
        ` + compareNumAttr('at least') + `
        <v class="spinner spinner-positive">2</v>
       </quantity>
       
    </spell_prereq>
    
    <menu-item 
    loc="Требуется заклинаний из школы" 
    onAdd="
      var foo=addNode(findInStructure($(node)).parent().find('>spell_prereq'),$(node).parent())
      addNode(findInStructure($(foo)).find('>college'),$(foo));
      renderNode(foo);
    "></menu-item>
    
    <when_tl multiply loc="Технический уровень">
            ` + compareNumAttr('at least') + `
            <v class="spinner spinner-positive">10</v>
    </when_tl>
    
  </prereq_list>
  `;

  var advantage=$(`
        <advantage-tag nodelete>
        <name nodelete>Name</name>
        <name-loc>Название</name-loc>
        <stopped attribute hideval>yes</stopped>        
        <notes>Заметка</notes>        
        <base_points class="spinner">10</base_points>
        <points_per_level class="spinner" onAdd="if ($(node).parent().find('>levels').length==0) renderNode(addNode(xmlStructure.find('>advantage-tag>levels'),$(node).parent()))";>5</points_per_level>
        <levels class="spinner spinner-not-negative">1</levels>
        <round_down attribute hideval>yes</round_down>
        <cr select>
          12
          <option value="6">6 (почти бескотрольно)</option>
          <option value="9">9 (контролировать сложно)</option>
          <option value="12">12 (контролировать реально)</option>
          <option value="15">15 (контролировать легко)</option>
        </cr>
        <hr1 deliminator></hr1>
        ` + meleeWeapon + `
        ` + rangedWeapon + `
        ` + drBonus + `
        ` + attributeBonus + `
        ` + skillBonus + `
        ` + spellBonus + `
        ` + costReduction + `
        <modifier collapsable multiply onInit="if ($(node).attr('enabled') == 'no') $(node).addClass('collapsed grey');">
            <enabled attribute autoadd select nodelete onChange="$(node).parent().removeClass('collapsed grey'); if ($(node).find('>select').val() == 'no') $(node).parent().addClass('collapsed grey');">
              yes
              <option value="yes">Вкл</option>
              <option value="no">Выкл</option>
            </enabled>
            <radiogroup attribute select onInit="$(node).parent().find('>checkgoup').remove()">1
             <option value="1">1-й блок</option>
             <option value="2">2-й блок</option>
             <option value="3">3-й блок</option>
             <option value="4">4-й блок</option>
             <option value="5">5-й блок</option>
             <option value="6">6-й блок</option>
            </radiogroup>
            <checkgroup attribute select onAdd="$(node).parent().find('>radiogroup').remove()">11
             <option value="11">1-й блок</option>
             <option value="12">2-й блок</option>
             <option value="13">3-й блок</option>
             <option value="14">4-й блок</option>
             <option value="15">5-й блок</option>
             <option value="16">6-й блок</option>
            </checkgroup>
            <name autoadd nodelete>Название</name>
            <notes>Дополнительный текст</notes>
            <cost autoadd nodelete class="inline">
              <v class="spinner">-10</v>
              <type attribute autoadd select nodelete>
                <option value="percentage">%</option>
                <option value="points">очков</option>
                <option value="multiplier">множ.</option>
              </type>
              <per_level attribute hideval loc="добавить множитель за ур.">yes</per_level>
            </cost>
            <affects autoadd nodelete select class="inline">
              <option value="total">на всю сумму</option>
              <option value="base only">на базовую стоимость</option>
              <option value="levels only">на стоимость за ур.</option>
            </affects>    
            <levels class="spinner spinner-not-negative">1</levels>
            ` + reference + `
            
            ` + meleeWeapon + `
            ` + rangedWeapon + `
            ` + drBonus + `
            ` + attributeBonus + `
            ` + skillBonus + `
            ` + spellBonus + `
            ` + costReduction + `
            ` + equipmentModifier + `            
           
        </modifier>
        ` + prereqList + `
        <hr2 deliminator></hr2>
        ` + categories + `             
        <type multiselect>
            <option value="Mental">Ментальные</option>
            <option value="Physical">Физические</option>
            <option value="Social">Социальные</option>
            <option value="Super">Супер</option>
            <option value="Exotic">Экзотик</option>
        </type>         
        ` + reference + `        
        ` + descriptionLoc + `
      </advantage-tag>`);

  var skill=$(`
        <skill-tag nodelete>
        <menu-item loc="Превратить умение в технику" onAdd="node.remove(); toTechnique(); "></menu-item>      
        <name nodelete>Name</name>
        <name-loc>Название</name-loc>
        <specialization>Специализация</specialization>
        <notes>Заметка</notes>
        <difficulty nodelete>
          <difficulty_attribute select autoadd nodelete>
            DX
            <option value="ST">ST (Сила)</option>
            <option value="DX">DX (Ловкость)</option>
            <option value="IQ">IQ (Интелект)</option>
            <option value="HT">HT (Здоровье)</option>
            <option value="Will">Will (Воля)</option>
            <option value="Per">Per (Воспр.)</option>
          </difficulty_attribute>
          <difficulty_hardness select autoadd nodelete>
            <option value="E">E (Легко)</option>
            <option value="A">A (Средне)</option>
            <option value="H">H (Трудно)</option>
            <option value="VH">VH (Очень трудно)</option>
          </difficulty_hardness>
        </difficulty>
        <points class="spinner spinner-not-negative">1</points>
        <hr1 deliminator></hr1>
        ` + weaponBonus + `
        <parry class="spinner">0</parry>
        <block class="spinner">0</block>
        <encumbrance_penalty_multiplier class="spinner spinner-positive">1</encumbrance_penalty_multiplier>
        ` + defaultNode + `
        ` + prereqList + `
        <hr2 deliminator></hr2>
        <tech_level class="spinner spinner-not-negative">8</tech_level>
        ` + categories + `        
        ` + reference + `
        ` + descriptionLoc + `        
      </skill-tag>`);

  var technique=$(`
      <technique-tag nodelete>
        <menu-item loc="Превратить технику в умение" onAdd="node.remove(); toSkill(); "></menu-item>
        <name nodelete>Name</name>
        <name-loc>Название</name-loc>
        <specialization>Специализация</specialization>
        <notes>Заметка</notes>
        <difficulty nodelete select>
          <option value="A">A (Средняя)</option>
          <option value="H">H (Сложная)</option>
        </difficulty>
        <limit attribute class="spinner">0</limit>        
        <points class="spinner spinner-not-negative">1</points>
        <hr1 deliminator></hr1>
        ` + weaponBonus + `        
        <parry class="spinner">0</parry>
        <block class="spinner">0</block>
        <encumbrance_penalty_multiplier class="spinner spinner-positive">1</encumbrance_penalty_multiplier>
        ` + defaultNode + `
        ` + prereqList + `
        <hr2 deliminator></hr2>
        <tech_level class="spinner spinner-not-negative">8</tech_level>
        ` + categories + `        
        ` + reference + `
        ` + descriptionLoc + `        
      </technique-tag>`);

  var spell=$(`
      <spell-tag nodelete>
        <name nodelete>Name</name>
        <name-loc>Название</name-loc>
        <notes>Заметка</notes>
        <very_hard attribute hideval>yes</very_hard>      
        <points class="spinner spinner-not-negative">1</points>
        <hr1 deliminator></hr1>        
        <spell_class editable-select>
          <option value="Regular">Regular</option>
          <option value="Missile">Missile</option>
          <option value="Area">Area</option>
          <option value="Blocking">Blocking</option>
          <option value="Enchantment">Enchantment</option>
          <option value="Info">Info</option>
          <option value="Melee">Melee</option>
        </spell_class>
        <casting_cost>1</casting_cost>
        <maintenance_cost>1</maintenance_cost>
        <casting_time>1 sec</casting_time>
        <duration>1 sec</duration>
        <college editable-select>
        ` + magicCollegesList + `
        </college>
        <power_source>Название</power_source>
        <hr2 deliminator></hr2>
        `+ meleeWeapon +`
        `+ rangedWeapon +`
        `+ drBonus +`
        
        ` + defaultNode + `
        ` + prereqList + `
        <hr3 deliminator></hr3>
        <tech_level class="spinner spinner-not-negative">8</tech_level>
        ` + categories + `        
        ` + reference + `
        ` + descriptionLoc + `        
      </spell-tag>`);

  var equipment=$(`
      <equipment-tag nodelete>
        <description nodelete>Название</description>
        <state attribute select nodelete>
          <option value="equipped">Экипировано</option>
          <option value="carried">Несу</option>
          <option value="not carried">Снято</option>
        </state>      
        
        <value class="spinner spinner-not-negative">100</value>
        <weight class="spinner spinner-not-negative">100</weight>
        <quantity nodelete class="spinner spinner-positive">1</quantity>
        <notes>Заметка</notes>        
        <hr1 deliminator></hr1> 
        ` + meleeWeapon + `
        ` + rangedWeapon + `
        ` + drBonus + `        
        ` + transport + `
        ` + attributeBonus + `
        ` + skillBonus + `
        ` + spellBonus + `                
        ` + equipmentModifier + `
        ` + armorComponents + `
        
        ` + prereqList + `
        <hr2 deliminator></hr2>        
        <legality_class class="spinner spinner-not-negative">1</legality_class>        
        <tech_level class="spinner spinner-not-negative">8</tech_level>
        ` + categories + `                
        ` + reference + `
        ` + descriptionLoc + `        
      </equipment-tag>`);

  var advantageContainer=$(`
      <advantage_container-tag nodelete>
        <name nodelete></name>
        <notes>Заметка</notes>        
        <type attribute select>
          <option value="meta trait">Мета-черта</option>
          <option value="race">Раса</option>
          <option value="alternative abilities">Альт. способность</option>
        </type>
	      <modifier collapsable>
		      <name noedit autoadd>Модификатор</name>
		      <cost type="percentage" class="spinner" autoadd>0</cost>
		      <affects noedit autoadd>total</affects>
	      </modifier>        
        ` + reference + `
        ` + descriptionLoc + `	      
      </advantage_container-tag>`);

  var spellContainer=$(`
        <spell_container-tag nodelete><name nodelete></name>
          <notes>Заметка</notes>
          ` + reference + `
          ` + descriptionLoc + `
        </spell_container-tag>`);

  var skillContainer=$(`
        <skill_container-tag nodelete>
          <name nodelete></name>
          <notes>Заметка</notes>          
          ` + reference + `
          ` + descriptionLoc + `
        </skill_container-tag>`);

  var equipmentContainer=$(`<equipment_container-tag nodelete></equipment_container-tag>`);
  equipmentContainer.html(equipment.html());
  equipmentContainer.find(">quantity").remove();

  function toTechnique(){
    clearXmlObject();
    $("modalpopup object-edit skill difficulty").html("A");
    $("modalpopup object-edit skill").changeTag("technique");
    initXmlEditor();
  }
  function toSkill(){
    clearXmlObject();
    $("modalpopup object-edit technique difficulty").html("DX/A");
    $("modalpopup object-edit technique").removeAttr("limit");
    $("modalpopup object-edit technique").changeTag("skill");
    initXmlEditor();
  }
  function imageUrlPrompt(node,removeOnCancel){
    var url=window.prompt('Адрес картинки (url):\n(!) Внимание, картинки не сохраняются на сервере ментора. Если картинка будет удалена на указаном вами сайте, она исчезнет и из ментора','http://');
    echo(url);
    if (url=='null') {
      if (removeOnCancel) node.remove();
    }
    else {
      node.attr('src',url);
      node.prependTo(node.parent());
    }
  }


  var xmlStructure = $("<objects></objects>");
  xmlStructure.append(advantage);
  xmlStructure.append(skill);
  xmlStructure.append(technique);
  xmlStructure.append(spell);
  xmlStructure.append(equipment);
  xmlStructure.append(advantageContainer);
  xmlStructure.append(skillContainer);
  xmlStructure.append(spellContainer);
  xmlStructure.append(equipmentContainer);


  // Да да - вот так глупо 5 раз крутим рекурсию и на этом все - не более 5ти вложений
  for (var i = 0; i < 5; i++) {
    xmlStructure.find("*[recurse]").each(function () {
      var parent = $(this).parents($(this).prop("tagName")).prop("outerHTML");
      //echo (parent,"--");
      $(this).replaceWith(parent);
    });
  }

  xmlStructure.find("*[recurse]").remove();

  xmlStructure.find("v").attr("nodelete", '').attr("autoadd", '').parent().attr("noedit", '');

  xmlStructure.find("advantage-tag").find("ranged_weapon>damage,melee_weapon >damage,dr_bonus>amount").append(levelMod);



  // ---------------------------- Функции ----------------------------------




  function addNode(addObj,target,defaultText){
    var text=addObj.clone().children().remove().end().text(); // spell to get only text values 8)
    text=text.replace(/^[\s\n\t\r]*/,'').replace(/[\s\n\t\r]*$/,'');
    if (text==""&&addObj.find(">option").length) text=addObj.find(">option:first-child").attr("value");
    if (defaultText) text=defaultText;

    var node = $("<"+(addObj.prop('tagName'))+">"+text+"</"+(addObj.prop('tagName'))+">");
    target.append(node);
    // onAdd
    try {
      eval (addObj.attr('onAdd')||"");
    } catch (ex) {echo(ex);}

    if (addObj.prop('tagName')=="MENU-ITEM") {
      $(node).remove();
    }

    $(addObj).find(">*[autoadd]").each(function () {
      renderNode(addNode($(this),node));
    });

    return node;
  }

  function editXmlNodePopup(xmlNodeObj){

    $("xml-node-popup").remove();

    var el = $("<xml-node-popup></xml-node-popup>");
    // el.css("left", $(event.target).offset().left);
    // el.css("left", $("modalpopup object-edit").outerWidth()+10);
    el.css("right", 5);
    el.css("top", $(xmlNodeObj).offset().top-$("modalpopup message").offset().top+$("modalpopup message").scrollTop());
    // offsetTop


    if (!xmlNodeObj.is(".nodelete")) {
      $("<item><i class=\"fa fa-trash fa-fw\" aria-hidden=\"true\"></i> Удалить</item>").bind("click", function () {
        $(xmlNodeObj).remove();
        $("xml-node-popup").remove();
      }).appendTo(el);
    }


    findInStructure(xmlNodeObj).find(">*").each(function(){
      if ($(this).attr('multiply')!=undefined||xmlNodeObj.find(">"+$(this).prop('tagName')).length==0){
        if ($(this).prop('tagName')=="OPTION") return;
        var addObj=$(this);
        var foo=(addObj.attr("loc")==undefined)?"<"+addObj.prop('tagName')+" tag-name='"+addObj.prop('tagName').toLowerCase()+"'/>":addObj.attr("loc");
        var menu=$("<item><i class='fa fa-plus-circle fa-fw'></i> "+foo+"</item>");
        menu.bind("click", function () {
          var item=addNode(addObj,xmlNodeObj);
          renderNode(item);
          sortByStructure(xmlNodeObj);
          bindEvents();
          // Включаем подсветку
          $(".gc-selected-node").removeClass("gc-selected-node");
          $(item).addClass("gc-selected-node");
          $(xmlNodeObj).removeClass('collapsed');
          editXmlNodePopup($(item));
        });
        $(el).append(menu);
      }
    });

    if (findInStructure(xmlNodeObj).is("[multiply]")) {
      $("<item><i class='fa fa-clone fa-fw'></i> Дублировать</item>").bind("click", function () {
        var clone=xmlNodeObj.clone(true,true);
        $(xmlNodeObj).after(clone);
        $(".gc-selected-node").removeClass("gc-selected-node");
        $(clone).addClass("gc-selected-node");
        editXmlNodePopup(clone);
      }).appendTo(el);
    }

    if (xmlNodeObj.prev().prop("tagName")==xmlNodeObj.prop("tagName")) {
      $("<item><i class='fa fa-caret-up fa-fw'></i> Поднять вверх</item>").bind("click", function () {
        $(xmlNodeObj).prev().before(xmlNodeObj);
        editXmlNodePopup(xmlNodeObj);
      }).appendTo(el);
    }

    if (xmlNodeObj.next().prop("tagName")==xmlNodeObj.prop("tagName")) {
      $("<item><i class='fa fa-caret-down fa-fw'></i> Опустить вниз</item>").bind("click", function () {
        $(xmlNodeObj).next().after(xmlNodeObj);
        editXmlNodePopup(xmlNodeObj);
      }).appendTo(el);
    }

    el.appendTo("modalpopup message");

  }

  function findInStructure(obj){
    var travers="";
    $($(obj).parentsUntil("object-edit").get().reverse()).each(function (){
      travers+=">"+$(this).prop("tagName");
    });
    travers+=">"+$(obj).prop("tagName");
    return (xmlStructure.find(travers));
  }

  function sortByStructure(obj){
    if ($(obj).hasClass('longtext')) return;
    var sequence=["COLLAPSER"]; // collapser всегда первый
    findInStructure(obj).find(">*").each(function (){
      sequence.push($(this).prop("tagName"));
    });

    obj.find(">*").sort(function(a,b) {
      var ac=sequence.indexOf(a.tagName);
      var bc=sequence.indexOf(b.tagName);
      if (ac==-1) ac=1000000;
      if (bc==-1) bc=1000000;
      if (ac==bc) return 0
      return (ac > bc)?1:-1;
    }).appendTo(obj);
  }

  function renderNode(node){
    var obj=findInStructure($(node)).clone();

    // onInit
    try {
      eval (obj.attr('onInit')||"");
    } catch (ex) {echo(ex);}

    //onChange
    $(node).unbind('change keyup').bind('change keyup',function (){
      try {
        eval (obj.attr('onChange')||"");
      } catch (ex) {echo(ex);}
    });


    $(node).attr("tag-name",$(node).prop("tagName").toLowerCase());

    if (obj.length === 0) {
      $(node).addClass("not-found");
    }
    else {
      $(node).addClass($(obj).prop('className')).addClass("editable");

      if ($(obj).find(">v").length){
        //var clearText=$(node).clone().children().remove().end().text();
        var clearText=$(node).contents().filter(function(){ return this.nodeType !== 1;});
        if ($(node).find(">v").length) {
          $(node).find(">v").append(clearText);
        }else {
          var el=$("<v></v>").append(clearText);
          $(node).append(el);
          renderNode(el);
          el.attr("tag-name",'');
        }
      }

      $(obj).find(">*[attribute]").each(function () {
        var attrName=$(this).prop("tagName");
        if ($(node).attr(attrName)!=undefined) {
          var newAttr=addNode($(this), $(node),$(node).attr(attrName));
          $(node).removeAttr(attrName);
          renderNode($(newAttr));
          sortByStructure($(node));
        }
      });

      if ($(obj).is("[attribute]")) {
        $(node).addClass("attribute");
      }

      $(obj).find(">*[deliminator]").each(function () {
        renderNode(addNode($(this), $(node)));
        sortByStructure($(node));
      });

      if ($(obj).is("[deliminator]")) {
        $(node).removeClass("editable");
        $(node).addClass("deliminator").addClass("nodelete");;
      }

      if ($(obj).is("[nodelete]")) {
        $(node).addClass("nodelete");
      }

      if ($(obj).is("[select],[editable-select]")) {
        $(node).addClass("select").removeClass("editable");
        var value=$(node).html();
        $(node).html("<select>"+$(obj).html()+"</select>");
        var cur=$(node).find("option[value='"+value+"']");
        if (cur.length==0) cur=$("<option value='"+value+"'>"+value+"</option>").appendTo($(node).find("select"));
        cur.attr('selected','selected');
      }

      if ($(obj).is("[multiselect]")) {
        $(node).addClass("multiselect").removeClass("editable");
        var el=$($(obj).html())
        $.each($(node).html().split(/[\s,]+/),function (k,v){
          $(el).filter("option[value='"+v+"']").addClass("selected");
        });
        $(node).html("");
        $(node).append(el);
      }

      if ($(obj).is("[editable-select]")) {
        $(node).addClass("editable-select");
        $(node).find(">select").attr("size",10).on("change",function (){
          $(this).next().val($(this).find(">option:selected").text());
        });
        $("<input type='text'>").on('focus',function(){
           $(this).prev().addClass('visible').val('');
        }).on('blur',function(){
          var sel=$(this).prev()
          setTimeout(function (){sel.removeClass('visible')},300); // так надо 8)
        }).val($(node).find(">select>option:selected").text()).appendTo(node);
        //$(node).find(">select").editableSelect({filter:false, effects: 'slide' });
      }

      if ($(node).is(".root-tag")) {
        $(node).removeClass("editable");
      }

      if ($(obj).is("[noedit]")) {
        $(node).removeClass("editable");
      }

      if ($(obj).is("[hideval]")) {
        $(node).addClass("hideval")
        $(node).removeClass("editable");

      }



      if ($(obj).is("[collapsable]")) {
        $(node).addClass("collapsable").removeClass("editable");
        var el=$("<collapser class='nosave'></collapser>").bind('click',function (){
          $(this).parent().toggleClass("collapsed");
        });
        $(node).prepend(el);
      }
    }

    obj.find(">*").each(function(){
      if ($(this).attr('multiply')!=undefined||node.find(">"+$(this).prop('tagName')).length==0) {
        if ($(this).prop('tagName') != "OPTION") $(node).addClass("has-menu");
      }
    });

    bindSpinners($(node));



    $(node).unbind('click').bind('click',function (){

      $(".gc-selected-node").removeClass("gc-selected-node");
      $(this).addClass("gc-selected-node");
      if (!$(this).is(":focus")&&!$(this).find(">select:focus,>input:focus").length) {document.activeElement.blur();}

      editXmlNodePopup($(this));
      event.stopPropagation();
    });
  }

  window.initXmlEditor=function (){
    $("xml-node-popup").remove();

    $("modalpopup object-edit>*").each(function () {
      $(this).changeTag($(this).prop("tagName")+"-tag").addClass("root-tag");
    });

    $("modalpopup object-edit>skill-tag>difficulty").each(function () {
      var slp=$(this).html().split("/");
      $(this).html("<difficulty_attribute>"+slp[0]+"</difficulty_attribute><difficulty_hardness>"+slp[1]+"</difficulty_hardness>");
    });

    $("modalpopup object-edit img").each(function () {
      $(this).attr('src',$(this).attr('data-src')).removeAttr('data-src');
    });


    $("modalpopup object-edit *").each(function(){
      renderNode($(this));
      sortByStructure($(this));
    });


    $("modalpopup object-edit .multiselect>option").unbind('click').bind('click',function (){
      $(this).toggleClass("selected");
    });
  }

  window.clearXmlObject=function (){
    $("xml-node-popup").remove();
    var obj=$("modalpopup object-edit");

    obj.find(".multiselect").each(function () {
      var text="";
      var deliminator="";
      $(this).find(".selected").each(function () {
        text+=deliminator+$(this).attr("value");
        deliminator=", ";
      });
      $(this).html(text);
    });

    obj.find(".editable-select").each(function () {
      var val=$(this).find(">input").val();
      $(this).find(">select>option").each(function(){
        if ($(this).text()==val) val=$(this).attr("value");
      });
      $(this).html(val);
    });

    obj.find(".select>select").each(function () {
      $(this).parent().html($(this).val());
    });

    obj.find(".attribute").each(function () {
      $(this).parent().attr($(this).prop("tagName"),$(this).text());
      $(this).remove();
    });

    obj.find("v").each(function () {
      $(this).parent().html($(this).html());
    });

    obj.find(".deliminator").remove();

    $("modalpopup object-edit>skill-tag>difficulty").each(function () {
      $(this).html($(this).find(">difficulty_attribute").text()+"/"+$(this).find(">difficulty_hardness").text());
    });

    $("modalpopup object-edit img").each(function () {
      $(this).attr('data-src',$(this).attr('src')).removeAttr('src');
    });


    $("modalpopup object-edit .root-tag").each(function () {
      $(this).changeTag($(this).prop("tagName").substr(0,$(this).prop("tagName").length-4)).removeClass("root-tag");
    });

    clearObj(obj.find(">*"));
  };

})();