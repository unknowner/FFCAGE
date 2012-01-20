/*
* FIREFOX only
*/

//Desktop notes chrome only
function note(_data) {
	var _note = webkitNotifications.createNotification('img/icon64.png', _data.t, _data.m);
	_note.show();
	setTimeout(function() {
		_note.cancel();
	}, 10000);
}

// update check
var _window = (this.unsafeWindow) ? this.unsafeWindow : window;
if(_window.location.hostname == 'apps.facebook.com') {
	$.getScript('https://github.com/downloads/unknowner/FFCAGE/update.js', function(data, textStatus) {
		console.log(_window['cageFFVersion'], version.string());
		if(_window['cageFFVersion'] != version.string()) {
			console.log(_window['cageFFVersion'], version.string());
			if(confirm('You can now update CAGE to version ' + version.string()) == true) {
				location.href = 'https://github.com/downloads/unknowner/FFCAGE/CAGE' + version.file() + '.xpi?x=' + (Math.random() * 1000);
			}
		}
	});
}
// CSS problems
$('body').css({
	'height' : '100%',
	'width' : '100%',
	'position' : 'fixed'
});

// Firefox get path to internals
function getPath(_file) {
	return 'resource://cage-data/' + _file // 'resource://cage-data/' +
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
		showSettings : 'TASK_SETTINGS'
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
		console.log('send:', _task, _port, _data);
		if(_task == 'NOTE') {
			console.log('NOTE:', _data.t, _data.m)
		} else {
			self.port.emit(_port, {
				task : _task,
				port : _port,
				data : _data
			});
		}
	},
	note : function(_title, _message) {
		com.send('NOTE', com.port.background, {
			t : _title,
			m : _message
		});
	}
};
