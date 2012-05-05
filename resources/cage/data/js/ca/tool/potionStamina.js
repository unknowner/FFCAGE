tool('PotionStamina');

tools.PotionStamina.start = function() {
	$.post('keep.php', {
		'consume' : true,
		'item' : 2,
		'ajax' : 1,
		'signed_request' : CastleAge.signed_request
	}, function(_data) {
		_data = noSrc(_data);
		tools.PotionStamina.work(_data);
		console.log($(_data).find('span.result_body'));
		if($(_data).find('span.result_body:contains("You consumed")').length > 0) {
			addFunction(function(data) {
				cageStat.stamina = data.stamina;
			}, JSON.stringify({
				stamina : parseInt($('#stamina_current_value').text(), 10) + 10
			}), true, true);
		}
	});
};
// Parse keep for stamina potions
tools.PotionStamina.work = function(_pagedata) {
	_pagedata = _pagedata == null ? $('#app_body') : $(_pagedata);
	var _potions = /\d+/.exec(_pagedata.find('img[alt="Stamina Potion"]').parent().next().text());
	if(_potions !== null) {
		$('#cagePotionStamina').find('span.cagePotionCount').text(_potions[0]);
	} else {
		$('#cagePotionStamina').find('span.cagePotionCount').text('');
	}
	tools.PotionStamina.done();
};
tools.PotionStamina.done = function() {
	$('#cagePotionStamina').css({
		'cursor' : '',
		'backgroundSize' : '',
		'backgroundPosition' : '',
		'backgroundImage' : ''
	}).removeAttr('disabled');
};
tools.PotionStamina.init = function() {
	$('#cageStatsContainer').append($('<button id="cagePotionStamina" title="Use stamina potion if available"><span class="cagePotionCount"></span></button>').click(function() {
		if($(this).text() !== '' && $(this).text() !== '0') {
			$(this).css({
				'cursor' : 'wait',
				'backgroundSize' : '32px 32px',
				'backgroundPosition' : '-4px -4px',
				'backgroundImage' : 'url(\'http://image4.castleagegame.com/graphics/shield_wait.gif\')'
			}).attr('disabled', 'disabled');
			tools.PotionStamina.start();
		}
	}));
};
