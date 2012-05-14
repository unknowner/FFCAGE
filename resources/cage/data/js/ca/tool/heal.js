tool('Heal');

tools.Heal.start = function() {
	if(parseInt($('#health_current_value').next().text(), 10) - parseInt($('#health_current_value').text(), 10) > 0) {
		signedGet('keep.php?signed_request=' + CastleAge.signed_request, function(_data) {
			_data = $(noSrc(_data));
			CastleAge.bqh = _data.find('input[name="bqh"]:first').attr('value');
			post('keep.php?action=heal_avatar&bqh=' + CastleAge.bqh, function() {
				addFunction(function() {
					clearTimeout(timedStats['health']);
					stat_increase_ticker(0, $('#health_current_value').next().text(), $('#health_current_value').next().text(), 0, 0, 'health', false);
				}, null, true, true);
				tools.Heal.done();
			});
		});
	} else {
		tools.Heal.done();
	}
};

tools.Heal.done = function() {
	$('#cageHeal').css({
		'cursor' : '',
		'backgroundSize' : '',
		'backgroundPosition' : '',
		'backgroundImage' : ''
	}).removeAttr('disabled');
};
tools.Heal.init = function() {
	$('#cageStatsContainer').append($('<button id="cageHeal" title="Heal to full health"></button>').click(function() {
		$(this).css({
			'cursor' : 'wait',
			'backgroundSize' : '32px 32px',
			'backgroundPosition' : '-4px -4px',
			'backgroundImage' : 'url(\'http://image4.castleagegame.com/graphics/shield_wait.gif\')'
		}).attr('disabled', 'disabled');
		tools.Heal.start();
	}));
};
