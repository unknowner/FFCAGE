// Index
tools['Page'].runtime['index.php'] = function() {

	/*$('table:eq(1)').before('<div id="cageBattleNews" style="background-image:url(\'http://image4.castleagegame.com/10009/graphics/battle_news_wide.jpg\');height: 226px;margin-left: 1px;width: 722px;padding: 40px 0 0 17px;"></div>');
	var xp = 0, bp = 0, wp = 0, cp = 0, win = 0, lose = 0, deaths = 0, cash = 0, list = [];
	$('#battleUpdateBox div.alertsContainer > div').each(function(i, el) {
		var txt = $(el).text().replace(/,/g, ''), my_xp = 0, my_bp = 0, my_wp = 0, my_cash = 0, my_cp = 0, result = 1;
		if(txt.match(/You were killed/i)) {
			killed = true;
			deaths++;
		} else {
			uid = $('a:eq(0)', el).attr('href').match(/user=(\d+)/i)[1];
			result = null;
			if(txt.match(/Victory!/i)) {
				win++;
			} else {
				lose++;
				result = -1;
			}
			my_xp = txt.match(/(\d+) experience/i);
			console.log( typeof my_xp, my_xp !== null && my_xp[1]);
			my_bp = txt.match(/(\d+) Battle Points!/i);
			my_wp = txt.match(/(\d+) War Points!/i);
			my_cp = txt.match(/(\d+) Champion Points!/i);
			my_cash = txt.match(/\$(\d+)/i);
			xp += parseInt( typeof my_xp == 'object' && my_xp !== null ? my_xp[1] : 0, 10);
			bp += parseInt( typeof my_bp == 'object' && my_bp !== null ? my_bp[1] : 0, 10) * result;
			wp += parseInt( typeof my_wp == 'object' && my_wp !== null ? my_wp[1] : 0, 10) * result;
			cp += parseInt( typeof my_cp == 'object' && my_cp !== null ? my_cp[1] : 0, 10) * result;
			cash += parseInt( typeof my_cash == 'object' && my_cash !== null ? my_cash[1] : 0, 10) * result;
		}
	});
	list.push('You were challenged <strong>' + (win + lose) + '</strong> times, winning <strong>' + win + '</strong> and losing <strong>' + lose + '</strong>.');
	list.push('You ' + (xp >= 0 ? 'gained <span class="positive">' : 'lost <span class="negative">') + xp + '</span> experience points.');
	list.push('You ' + (cash >= 0 ? 'gained <span class="positive">' : 'lost <span class="negative">') + '<b class="gold">$' + cash.toString().replace(/(\d)(?=(\d{3})+\b)/g, '$1,') + '</b></span>.');
	list.push('You ' + (bp >= 0 ? 'gained <span class="positive">' : 'lost <span class="negative">') + bp + '</span> Battle Points.');
	list.push('You ' + (wp >= 0 ? 'gained <span class="positive">' : 'lost <span class="negative">') + wp + '</span> War Points.');
	list.push('You ' + (cp >= 0 ? 'gained <span class="positive">' : 'lost <span class="negative">') + cp + '</span> Champion Points.');
	if(deaths) {
		list.push('You died ' + (deaths > 1 ? deaths + ' times' : 'once') + '!');
	}
	list.push('');
	$('#cageBattleNews').html(list.join('<br>'));
*/
	$('div.indexRightCol:has(img[src*="/newiphone_ad_facebook.jpg"])').remove();
	$('div.indexRightCol').parent().prepend($('div.indexRightCol:last').detach());

};