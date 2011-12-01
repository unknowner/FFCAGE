// Firefox get path to internals
function getPath(_file){
	return 'resource://cage-data/' + _file
}

// Firefox communication
var com = {
	// Port names
	port: {
		current: null,
		castleAge: 'PORT_CASTLEAGE',
		facebook: 'PORT_FACEBOOK'
	},
	// Ports
	ports: {},
	// Available tasks
	task: {
		init: 'TASK_INIT',
		fbReady: 'TASK_FBREADY',
		getGeneral: 'TASK_GETGENERAL',
		general: 'TASK_GENERAL',
		updateGenerals: 'TASK_UPDATEGENERALS',
		castleAgeReady: 'TASK_CAREADY',
		heal: 'TASK_HEAL',
		signed: 'TASK_SIGNED',
		userId: 'TASK_USERID',
		fbButtonEnable: 'TASK_FBBUTTONENABLE',
		scroll: 'TASK_SCROLL',
		eliteGuard: 'TASK_ELITEGUARD',
		loadPage: 'LOADPAGE',
		updateGifter: 'TASK_UPDATEGIFTER',
		startGifter: 'TASK_STARTGIFTER',
		startStash: 'TASK_STASH',
		resize: 'TASK_RESIZE'
	},
	// Called in content script to setup port
	initContentScript: function (_port) {console.log('initContentScript:', _port);
		com.port.current = {
			name: _port
		};
		self.port.on(_port, function(_data){
				receiver(_data);
			});
	},
	// Send Messages to ports
	send: function (_task, _port, _data) {
		console.log('send:', _task, _port, _data);
		self.port.emit(_port, {
			task: _task,
			port: _port,
			data: _data
		});
	}
};