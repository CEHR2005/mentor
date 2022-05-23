var undoLevel=50; // Максимальная "глубина" undo
var globalCalcTimeLimit=1500; // время на расчет пресонажа в мс. после когорого появится сообщенеи о том что можно переключиться в "ручной" режим
var mentorUlr="http://mentor.gurps.ru/";
var discordChannelCount=6;

function getThr(ST)
{
  if (isCharOption("kyos")) {
    if (ST <= 1) return ('1d-11');
    if (ST <= 2) return ('1d-10');
    if (ST <= 3) return ('1d-9');
    if (ST <= 4) return ('1d-8');
    if (ST <= 5) return ('1d-7');
    if (ST <= 6) return ('1d-6');
    if (ST <= 7) return ('1d-5');
    if (ST <= 8) return ('1d-4');
    if (ST <= 9) return ('1d-3');
    if (ST <= 10) return ('1d-2');
    if (ST <= 11) return ('1d-1');
    if (ST <= 12) return ('1d');
    if (ST <= 13) return ('1d+1');
    if (ST <= 14) return ('1d+2');
    if (ST <= 15) return ('2d-1');
    if (ST <= 16) return ('2d');
    if (ST <= 17) return ('2d+1');
    if (ST <= 18) return ('2d+2');
    if (ST <= 19) return ('3d-1');
    if (ST <= 20) return ('3d');

    // алогритм )
    var dices=3+(Math.floor((ST-20)/4));
    var add=((ST-20)%4);
    if (add>2) {add=add-4; dices++;}
    if (add>0) add="+"+add;
    if (add==0) add="";
    return(dices+'d'+add);

    //return (modifyDamage('3d',ST-20));
  } else {
    if (ST <= 1) return ('1d-6');
    if (ST <= 2) return ('1d-6');
    if (ST <= 3) return ('1d-5');
    if (ST <= 4) return ('1d-5');
    if (ST <= 5) return ('1d-4');
    if (ST <= 6) return ('1d-4');
    if (ST <= 7) return ('1d-3');
    if (ST <= 8) return ('1d-3');
    if (ST <= 9) return ('1d-2');
    if (ST <= 10) return ('1d-2');
    if (ST <= 11) return ('1d-1');
    if (ST <= 12) return ('1d-1');
    if (ST <= 13) return ('1d');
    if (ST <= 14) return ('1d');
    if (ST <= 15) return ('1d+1');
    if (ST <= 16) return ('1d+1');
    if (ST <= 17) return ('1d+2');
    if (ST <= 18) return ('1d+2');
    if (ST <= 19) return ('2d-1');
    if (ST <= 20) return ('2d-1');
    if (ST <= 21) return ('2d');
    if (ST <= 22) return ('2d');
    if (ST <= 23) return ('2d+1');
    if (ST <= 24) return ('2d+1');
    if (ST <= 25) return ('2d+2');
    if (ST <= 26) return ('2d+2');
    if (ST <= 27) return ('3d-1');
    if (ST <= 28) return ('3d-1');
    if (ST <= 29) return ('3d');
    if (ST <= 30) return ('3d');
    if (ST <= 31) return ('3d+1');
    if (ST <= 32) return ('3d+1');
    if (ST <= 33) return ('3d+2');
    if (ST <= 34) return ('3d+2');
    if (ST <= 35) return ('4d-1');
    if (ST <= 36) return ('4d-1');
    if (ST <= 37) return ('4d');
    if (ST <= 38) return ('4d');
    if (ST <= 39) return ('4d+1');
    if (ST <= 40) return ('4d+1');
    if (ST <= 45) return ('5d');
    if (ST <= 50) return ('5d+2');
    if (ST <= 55) return ('6d');
    if (ST <= 60) return ('7d-1');
    if (ST <= 65) return ('7d+1');
    if (ST <= 70) return ('8d');
    if (ST <= 75) return ('8d+2');
    if (ST <= 80) return ('9d');
    if (ST <= 85) return ('9d+2');
    if (ST <= 90) return ('10d');
    if (ST <= 95) return ('10d+2');
    if (ST <= 100) return ('11d');
    return ((Math.floor((ST-100)/10)+11)+"d");
  }
  return('---');
}

function getSw(ST)
{
  if (isCharOption("kyos")) {
    if (ST <= 1) return ('1d-9');
    if (ST <= 2) return ('1d-8');
    if (ST <= 3) return ('1d-7');
    if (ST <= 4) return ('1d-6');
    if (ST <= 5) return ('1d-5');
    if (ST <= 6) return ('1d-4');
    if (ST <= 7) return ('1d-3');
    if (ST <= 8) return ('1d-2');
    if (ST <= 9) return ('1d-1');
    if (ST <= 10) return ('1d');
    if (ST <= 11) return ('1d+1');
    if (ST <= 12) return ('1d+2');
    if (ST <= 13) return ('2d-1');
    if (ST <= 14) return ('2d');
    if (ST <= 15) return ('2d+1');
    if (ST <= 16) return ('2d+2');
    if (ST <= 17) return ('3d-1');
    if (ST <= 18) return ('3d');
    if (ST <= 19) return ('3d+1');
    if (ST <= 20) return ('3d+2');

    // алогритм )
    var dices=3+(Math.floor((ST-20)/4));
    var add=((ST-20)%4)+2;
    if (add>2) {add=add-4; dices++;}
    if (add>0) add="+"+add;
    if (add==0) add="";
    return(dices+'d'+add);

  } else {
    if (ST <= 1) return ('1d-5');
    if (ST <= 2) return ('1d-5');
    if (ST <= 3) return ('1d-4');
    if (ST <= 4) return ('1d-4');
    if (ST <= 5) return ('1d-3');
    if (ST <= 6) return ('1d-3');
    if (ST <= 7) return ('1d-2');
    if (ST <= 8) return ('1d-2');
    if (ST <= 9) return ('1d-1');
    if (ST <= 10) return ('1d');
    if (ST <= 11) return ('1d+1');
    if (ST <= 12) return ('1d+2');
    if (ST <= 13) return ('2d-1');
    if (ST <= 14) return ('2d');
    if (ST <= 15) return ('2d+1');
    if (ST <= 16) return ('2d+2');
    if (ST <= 17) return ('3d-1');
    if (ST <= 18) return ('3d');
    if (ST <= 19) return ('3d+1');
    if (ST <= 20) return ('3d+2');
    if (ST <= 21) return ('4d-1');
    if (ST <= 22) return ('4d');
    if (ST <= 23) return ('4d+1');
    if (ST <= 24) return ('4d+2');
    if (ST <= 25) return ('5d-1');
    if (ST <= 26) return ('5d');
    if (ST <= 27) return ('5d+1');
    if (ST <= 28) return ('5d+1');
    if (ST <= 29) return ('5d+2');
    if (ST <= 30) return ('5d+2');
    if (ST <= 31) return ('6d-1');
    if (ST <= 32) return ('6d-1');
    if (ST <= 33) return ('6d');
    if (ST <= 34) return ('6d');
    if (ST <= 35) return ('6d+1');
    if (ST <= 36) return ('6d+1');
    if (ST <= 37) return ('6d+2');
    if (ST <= 38) return ('6d+2');
    if (ST <= 39) return ('7d-1');
    if (ST <= 40) return ('7d-1');
    if (ST <= 45) return ('7d+1');
    if (ST <= 50) return ('8d-1');
    if (ST <= 55) return ('8d+1');
    if (ST <= 60) return ('9d');
    if (ST <= 65) return ('9d+2');
    if (ST <= 70) return ('10d');
    if (ST <= 75) return ('10d+2');
    if (ST <= 80) return ('11d');
    if (ST <= 85) return ('11d+2');
    if (ST <= 90) return ('12d');
    if (ST <= 95) return ('12d+2');
    if (ST <= 100) return ('13d');
    return ((Math.floor((ST-100)/10)+13)+"d");
  }
  return ('---');
}

function getBasicLift(ST)
{
  if (isCharOption("kyos")) {
    if (ST <= 1) return (2.5);
    if (ST <= 2) return (3.2);
    if (ST <= 3) return (4);
    if (ST <= 4) return (5);
    if (ST <= 5) return (6.3);
    if (ST <= 6) return (8);
    if (ST <= 7) return (10);
    if (ST <= 8) return (13);
    if (ST <= 9) return (16);
    if (ST <= 10) return (20);
    if (ST <= 11) return (25);
    if (ST <= 12) return (32);
    if (ST <= 13) return (40);
    if (ST <= 14) return (50);
    if (ST <= 15) return (63);
    if (ST <= 16) return (80);
    if (ST <= 17) return (100);
    if (ST <= 18) return (126);
    if (ST <= 19) return (159);
    if (ST <= 20) return (200);

    var mult=(Math.floor((ST-10)/10));
    var base=9+((ST-9)%10);
    return (getBasicLift(base)*Math.pow(10,mult));

  }
  else {
  // тут была таблица но заменена алгоритмом
    var ret=ST*ST/5;
    if (ret>10) ret=Math.round(ret)
    return (ret);
  }
}

function getRangeSpeedModifier(dist){
  if (dist <=2) return (0);
  if (dist <=3) return (-1);
  if (dist <=5) return (-2);
  if (dist <=7) return (-3);
  if (dist <=10) return (-4);
  if (dist <=15) return (-5);
  if (dist <=20) return (-6);
  if (dist <=30) return (-7);
  if (dist <=50) return (-8);
  if (dist <=70) return (-9);
  if (dist <=100) return (-10);
  if (dist <=150) return (-11);
  if (dist <=200) return (-12);
  if (dist <=300) return (-13);
  if (dist <=500) return (-14);
  if (dist <=700) return (-15);
  if (dist <=1000) return (-16);
  if (dist <=1500) return (-17);
  if (dist <=2000) return (-18);
  if (dist <=3000) return (-19);
  if (dist <=5000) return (-20);
  if (dist <=7000) return (-21);
  if (dist <=10000) return (-22);
  if (dist <=15000) return (-23);
  if (dist <=20000) return (-24);
  if (dist <=30000) return (-25);
  if (dist <=50000) return (-26);
  if (dist <=70000) return (-27);
  if (dist <=100000) return (-28);
  if (dist <=150000) return (-29);
  if (dist <=200000) return (-30);
  if (dist <=300000) return (-31);
  if (dist <=500000) return (-32);
  if (dist <=700000) return (-33);
  return (-34);
}

function getSizeModifier(size) {
  if (size<0.005) return(-15);
  if (size<0.0085) return(-14);
  if (size<0.0127) return(-13);
  if (size<0.0169) return(-12);
  if (size<0.025) return(-11);
  if (size<0.038) return(-10);
  if (size<0.05) return(-9);
  if (size<0.0762) return(-8);
  if (size<0.1778) return(-7);
  if (size<0.2032) return(-6);
  if (size<0.3) return(-5);
  if (size<0.45) return(-4);
  if (size<0.6) return(-3);
  if (size<1) return(-2);
  if (size<1.5) return(-1);
  return(getRangeSpeedModifier(size)*-1);
}

function getRofBonus(rof){
  if (rof<=4) return(0);
  if (rof<=8) return(1);
  if (rof<=12) return(2);
  if (rof<=16) return(3);
  if (rof<=24) return(4);
  if (rof<=49) return(5);
  if (rof<=99) return(6);
  if (rof<=200) return(7);
  if (rof<=400) return(8);
  if (rof<=800) return(9);
  if (rof<=1600) return(10);
  return(11);
}

// Алфавит соответсвия руских - английских букв на клавиатуре
var keyboardAlphabet=[];
keyboardAlphabet['q']='й';      keyboardAlphabet['й']='q';
keyboardAlphabet['w']='ц';      keyboardAlphabet['ц']='w';
keyboardAlphabet['e']='у';      keyboardAlphabet['у']='e';
keyboardAlphabet['r']='к';      keyboardAlphabet['к']='r';
keyboardAlphabet['t']='е';      keyboardAlphabet['е']='t';
keyboardAlphabet['y']='н';      keyboardAlphabet['н']='y';
keyboardAlphabet['u']='г';      keyboardAlphabet['г']='u';
keyboardAlphabet['i']='ш';      keyboardAlphabet['ш']='i';
keyboardAlphabet['o']='щ';      keyboardAlphabet['щ']='o';
keyboardAlphabet['p']='з';      keyboardAlphabet['з']='p';
keyboardAlphabet['[']='х';      keyboardAlphabet['х']='[';
keyboardAlphabet[']']='ъ';      keyboardAlphabet['ъ']=']';
keyboardAlphabet['z']='я';      keyboardAlphabet['я']='z';
keyboardAlphabet['x']='ч';      keyboardAlphabet['ч']='x';
keyboardAlphabet['c']='с';      keyboardAlphabet['с']='c';
keyboardAlphabet['v']='м';      keyboardAlphabet['м']='v';
keyboardAlphabet['b']='и';      keyboardAlphabet['и']='b';
keyboardAlphabet['n']='т';      keyboardAlphabet['т']='n';
keyboardAlphabet['m']='ь';      keyboardAlphabet['ь']='m';
keyboardAlphabet[',']='б';      keyboardAlphabet['б']=',';
keyboardAlphabet['.']='ю';      keyboardAlphabet['ю']='.';
keyboardAlphabet['a']='ф';      keyboardAlphabet['ф']='a';
keyboardAlphabet['s']='ы';      keyboardAlphabet['ы']='s';
keyboardAlphabet['d']='в';      keyboardAlphabet['в']='d';
keyboardAlphabet['f']='а';      keyboardAlphabet['а']='f';
keyboardAlphabet['g']='п';      keyboardAlphabet['п']='g';
keyboardAlphabet['h']='р';      keyboardAlphabet['р']='h';
keyboardAlphabet['j']='о';      keyboardAlphabet['о']='j';
keyboardAlphabet['k']='л';      keyboardAlphabet['л']='k';
keyboardAlphabet['l']='д';      keyboardAlphabet['д']='l';
keyboardAlphabet[';']='ж';      keyboardAlphabet['ж']=';';
keyboardAlphabet['`']='ё';      keyboardAlphabet['ё']='`';
keyboardAlphabet['\'']='э';     keyboardAlphabet['э']='\'';


var booksAbbreviations =[];
booksAbbreviations['B']="Basic Set 4th Edition";
booksAbbreviations['BS']="Banestorm";
booksAbbreviations['Bio']="Bio-Tech";
booksAbbreviations['DF1:']="Dungeon Fantasy 1: Adventures";
booksAbbreviations['DF2:']="Dungeon Fantasy 2: Dungeons";
booksAbbreviations['DF3:']="Dungeon Fantasy 3: Next Level";
booksAbbreviations['DF4:']="Dungeon Fantasy 4: Sages";
booksAbbreviations['DF5:']="Dungeon Fantasy 5: Allies";
booksAbbreviations['DF6:']="Dungeon Fantasy 6: 40 Artifacts";
booksAbbreviations['DF7:']="Dungeon Fantasy 7: Clerics";
booksAbbreviations['DF10:']="Dungeon Fantasy 10: Taverns";
booksAbbreviations['DF12:']="Dungeon Fantasy 12: Ninja";
booksAbbreviations['DF14:']="Dungeon Fantasy 14: Psi";
booksAbbreviations['DFM1:']="Dungeon Fantasy Monsters 1";
booksAbbreviations['DR']="Dragons";
booksAbbreviations['F']="Fantasy";
booksAbbreviations['GF']="Gun Fu";
booksAbbreviations['HT']="High-Tech";
booksAbbreviations['LFM']="Lair of the Fat Man";
booksAbbreviations['PG1:']="High-Tech: Pulp Guns 1";
booksAbbreviations['PG2:']="High-Tech: Pulp Guns 2";
booksAbbreviations['H']="Horror";
booksAbbreviations['IW']="Infinite Worlds";
booksAbbreviations['LoT']="Lands Out of Time";
booksAbbreviations['L']="Lite 4th Edition";
booksAbbreviations['LT']="Low-Tech";
booksAbbreviations['LT2:']="Low-Tech Companion 2: Weapons and Warriors";
booksAbbreviations['LT3:']="Low-Tech Companion 3: Daily Life and Economics";
booksAbbreviations['M']="Magic";
booksAbbreviations['MA']="Martial Arts";
booksAbbreviations['MA:FC']="Martial Arts Fairbairn Close Combat Systems";
booksAbbreviations['MA:GL']="Martial Arts Gladiators";
booksAbbreviations['MH1:']="Monster Hunters 1: Champions";
booksAbbreviations['MY']="Mysteries";
booksAbbreviations['P']="Powers";
booksAbbreviations['PU1:']="Power-Ups 1 - Imbuements";
booksAbbreviations['PU2:']="Power-Ups 2 - Perks";
booksAbbreviations['PDK']="Prime Directive: Klingons";
booksAbbreviations['PDR']="Prime Directive: Romulans";
booksAbbreviations['PD']="Prime Directive";
booksAbbreviations['PP']="Psionic Powers";
booksAbbreviations['Psi']="Psis";
booksAbbreviations['P1/YY:']="Pyramid 1 (the original Print version), issue YY, page XX";
booksAbbreviations['P3/YY:']="Pyramid 3 (the current PDF version), issue YY, page XX";
booksAbbreviations['S']="Space";
booksAbbreviations['SC:AS']="Supporting Cast Age of Sail Pirate Crew";
booksAbbreviations['SS2:']="Spaceships 2: Traders, Liners, and Transports";
booksAbbreviations['SS4:']="Spaceships 4: Fighters, Carriers, and Mecha";
booksAbbreviations['S']="Supers";
booksAbbreviations['SV']="SEALS in Vietnam";
booksAbbreviations['TSP']="Tales of the Solar Patrol";
booksAbbreviations['Th']="Thaumatology";
booksAbbreviations['Th:UM']="Thaumatology Urban Magic";
booksAbbreviations['TS:CT']="Transhuman Space: Changing Times";
booksAbbreviations['TS:ST']="Transhuman Space: Shell-Tech";
booksAbbreviations['T:IW']="Traveller: Interstellar Wars";
booksAbbreviations['UT']="Ultra-Tech";

var spellChartsPages={};
spellChartsPages['Air']=3;
spellChartsPages['Animal']=5;
spellChartsPages['Body Control']=6;
spellChartsPages['Communication']=8;
spellChartsPages['Earth']=9;
spellChartsPages['Enchantment']=10;
spellChartsPages['Fire']=12;
spellChartsPages['Food']=13;
spellChartsPages['Gate']=14;
spellChartsPages['Healing']=15;
spellChartsPages['Illusion & Creation']=17;
spellChartsPages['Knowledge']=18;
spellChartsPages['Light & Darkness']=20;
spellChartsPages['Making & Breaking']=21;
spellChartsPages['Meta']=22;
spellChartsPages['Mind Control']=24;
spellChartsPages['Movement']=26;
spellChartsPages['Necromancy']=27;
spellChartsPages['Plant']=29;
spellChartsPages['Protection']=30;
spellChartsPages['Sound']=32;
spellChartsPages['Technological']=33;
spellChartsPages['Water']=35;
spellChartsPages['Weather']=38;
