/*
* FIREFOX only
*/

//Desktop notes currently chrome only
function note(_data) {

}

// update check
function ffUpdateCheck() {
	var _window = (this.unsafeWindow) ? this.unsafeWindow : window;
	if(_window.location.hostname == 'apps.facebook.com') {
		console.log('update init...');
		$.getScript('http://cloud.github.com/downloads/unknowner/FFCAGE/update.js', function(data, textStatus) {
			var _on = $('#cageOnlineVersion').val();
			console.log('github: ', _on, ' - local: ', version.string());
			if(_on != version.string()) {
				if(confirm('You can now update CAGE to version ' + _on) == true) {
					location.href = 'https://github.com/downloads/unknowner/FFCAGE/CAGE_' + _on.replace(/\./g, '_') + '.xpi?x=' + (Math.random() * 1000);
				}
			}
		}).error(function(x) {
			console.log("error:", x.statusText);
		});
	}
}

// CSS problems
$('body').css({
	'height' : '100%',
	'width' : '100%',
	'position' : 'fixed',
	'overflow' : 'auto'
});

// Firefox get path to internals
function getPath(_file) {
	return 'resource://jid0-biqrccr5ehvojye6gjyg08qpu38-at-jetpack/cage/data/' + _file // 'resource://cage-data/' +
}

// Firefox communication
var com = {
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
		caStart : 'TASK_CASTART',
		fbStart : 'TASK_FBSTART',
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
	},
	// Called in content script to setup port
	initPort : function(_port) {
		console.log('initContentScript:', _port);
		com.port.current = {
			name : _port
		};
		self.port.on(_port, function(_data) {
			receiver(_data);
		});
	},
	// Send Messages to ports
	send : function(_task, _port, _data) {
		console.log('send:', _port, com.port.current.name)
		if(_port === com.port.current.name) {
			receiver({
				task : _task,
				port : _port,
				data : _data
			});
		} else {
			if(_task == 'NOTE') {
				console.log('NOTE:', _data.t, _data.m)
			} else {
				self.port.emit(_port, {
					task : _task,
					port : _port,
					data : _data
				});
			}
		}
	},
	note : function(_title, _message) {
		com.send('NOTE', com.port.background, {
			t : _title,
			m : _message
		});
	}
};
