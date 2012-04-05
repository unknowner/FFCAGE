// This is an active module of the CAGEnhancer Add-on

var com = {
	// FF workers
	worker : {
		castleAge : null,
		facebook : null
	},
	// Port names
	port : {
		current : null,
		castleAge : 'PORT_CASTLEAGE',
		facebook : 'PORT_FACEBOOK'
	},
	// Ports
	ports : {},
	// Available tasks
	task : {
		alive : 'TASK_ALIVE',
		init : 'TASK_INIT',
		fbReady : 'TASK_FBREADY',
		getGeneral : 'TASK_GETGENERAL',
		general : 'TASK_GENERAL',
		updateGenerals : 'TASK_UPDATEGENERALS',
		castleAgeReady : 'TASK_CAREADY',
		showAllGenerals : 'TASK_SHOWALLGENERALS',
		heal : 'TASK_HEAL',
		signed : 'TASK_SIGNED',
		userId : 'TASK_USERID',
		fbButtonEnable : 'TASK_FBBUTTONENABLE',
		scroll : 'TASK_SCROLL',
		eliteGuard : 'TASK_ELITEGUARD',
		loadPage : 'LOADPAGE',
		updateGifter : 'TASK_UPDATEGIFTER',
		startGifter : 'TASK_STARTGIFTER',
		startStash : 'TASK_STASH',
		resize : 'TASK_RESIZE',
		showSettings : 'TASK_SETTINGS',
		hideBluebar : 'TASK_HIDEBAR',
		showBluebar : 'TASK_SHOWBAR'
	}
};

var data = require("self").data, workers = {};
console.log('dataurl:' + data.url("js/version.js"));
function passCAMessage(_data) {
	if(com.worker.facebook !== null) {
		com.worker.facebook.port.emit(com.port.facebook, _data);
	} else {
		window.setTimeout(function() {
			passCAMessage(_data);
		}, 100);
	}
}

function passFBMessage(_data) {
	if(com.worker.castleAge !== null) {
		com.worker.castleAge.port.emit(com.port.castleAge, _data);
	} else {
		window.setTimeout(function() {
			passFBMessage(_data);
		}, 100);
	}
}

console.log('FB...');
var pageModFacebook = require("page-mod").PageMod({
	include : ["http://apps.facebook.com/castle_age/*", "https://apps.facebook.com/castle_age/*"],
	contentScriptWhen : 'end',
	contentScriptFile : [data.url("js/version.js"), data.url("js/jquery.js"), data.url("js/firefox.js"), data.url("js/common.js"), data.url("js/fb/fb_receiver.js"), data.url("js/fb/fb_start.js"), data.url("js/facebook.js")],
	onAttach : function onAttach(worker) {
		com.worker.facebook = worker;
		com.worker.facebook.port.on(com.port.castleAge, function(_data) {
			passFBMessage(_data);
		});
		console.log('FB attached:');
	}
});

console.log('CA...');
var pageModCastleAge = require("page-mod").PageMod({
	include : ["http://web.castleagegame.com/castle/*", "https://web.castleagegame.com/castle/*", "http://cloud.github.com/downloads/unknowner/FFCAGE/*"],
	contentScriptWhen : 'end',
	contentScriptFile : [
		data.url("js/jquery.js"),
		data.url("js/jqueryui.js"),
		data.url("js/ui.selectmenu.js"),
		data.url("js/firefox.js"),
		data.url("js/common.js"),
		data.url("js/version.js"),
		
		data.url("js/ca/language.js"),
		data.url("js/ca/tool.js"),
		data.url("js/ca/utilities.js"),
		data.url("js/ca/ca_receiver.js"),
		data.url("js/ca/news.js"),
		
		data.url("js/ca/tool/functions.js"),
		data.url("js/ca/tool/settings.js"),
		data.url("js/ca/tool/cage.js"),
		data.url("js/ca/tool/castleage.js"),
		data.url("js/ca/tool/facebook.js"),
		data.url("js/ca/tool/armyCleaner.js"),
		data.url("js/ca/tool/armyFiller.js"),
		data.url("js/ca/tool/assister.js"),
		data.url("js/ca/tool/class.js"),
		data.url("js/ca/tool/demi.js"),
		data.url("js/ca/tool/eliteguard.js"),
		data.url("js/ca/tool/generals.js"),
		data.url("js/ca/tool/gifter.js"),
		data.url("js/ca/tool/heal.js"),
		data.url("js/ca/tool/monster.js"),
		data.url("js/ca/tool/page.js"),
		data.url("js/ca/tool/potionEnergy.js"),
		data.url("js/ca/tool/potionStamina.js"),
		data.url("js/ca/tool/stash.js"),
		data.url("js/ca/tool/statPoints.js"),
		data.url("js/ca/tool/stats.js"),
		
		data.url("js/ca/page/allpages.js"),
		
		data.url("js/ca/page/alchemy.js"),
		data.url("js/ca/page/arena_battle.js"),
		data.url("js/ca/page/army.js"),
		data.url("js/ca/page/army_member.js"),
		data.url("js/ca/page/army_news_feed.js"),
		data.url("js/ca/page/army_reqs.js"),
		data.url("js/ca/page/battle.js"),
		data.url("js/ca/page/battle_expansion_monster.js"),
		data.url("js/ca/page/battle_monster.js"),
		data.url("js/ca/page/guild_battle.js"),
		data.url("js/ca/page/festival_battle_monster.js"),
		data.url("js/ca/page/festival_duel_battle.js"),
		data.url("js/ca/page/festival_duel_home.js"),
		data.url("js/ca/page/festival_guild_battle.js"),
		data.url("js/ca/page/generals.js"),
		data.url("js/ca/page/gift.js"),
		data.url("js/ca/page/goblin_emp.js"),
		data.url("js/ca/page/guild_shop.js"),
		data.url("js/ca/page/guildv2_battle_monster.js"),
		data.url("js/ca/page/index.js"),
		data.url("js/ca/page/keep.js"),
		data.url("js/ca/page/monster_quests.js"),
		data.url("js/ca/page/player_monster_list.js"),
		data.url("js/ca/page/quests.js"),
		data.url("js/ca/page/raid.js"),
		data.url("js/ca/page/symbolquests.js"),
		data.url("js/ca/page/symbols.js"),
		data.url("js/ca/page/treasure_chest.js"),
		data.url("js/ca/page/guildv2_conquest_command.js"),
		data.url("js/ca/page/conquest_duel.js"),
		data.url("js/ca/page/soldiers.js"),
		data.url("js/ca/page/oracle.js"),
		data.url("js/ca/page/achievements.js"),

		data.url("js/castleage.js")
	],
	onAttach : function onAttach(worker) {
		com.worker.castleAge = worker;
		com.worker.castleAge.port.on(com.port.facebook, function(_data) {
			passCAMessage(_data);
		});
		console.log('CA attached:');
	}
});
//com.initBackground();
console.log('CAGE main.js done');
