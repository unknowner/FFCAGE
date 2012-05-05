// Festival duel
tools.Page.pages['conquest_duel.php'] = function() {

	console.log('Page: conquest_duel.php');

	var _sortOrder = item.get('cagePageConquestOrder', 'descending');

	function sortConquestRank() {
		var _battles = {}, _battleSorted = [], _divs = $('table.layout div[style*="/graphics/war_conquest_mid.jpg"]'), _parent = _divs.parent();
		_divs.each(function(_i, _e) {
			var _rank = ('0' + /Rank.*?(\d+)/.exec($(_e).text())[1]).slice(-2) + ('0' + _i).slice(-2);
			_battles[_rank] = _e;
			_battleSorted.push(_rank);
		});
		_battleSorted.sort();
		if(_sortOrder == 'descending') {
			_battleSorted.reverse()
		}
		_divs.remove();
		$.each(_battleSorted, function(_i, _e) {
			_parent.append(_battles[_e]);
		});
	}

	// Sorting
	$('table.layout div[style*="/graphics/war_conquest_header.jpg"]:first div:contains("NEMESIS"):last').parent().parent().append('<div id="cageBattleListSort" style="color:white;position:absolute;margin:20px 0 0 180px;font-size:13px;font-weight:bold;text-align:center;">Sort by <span style="cursor:pointer;text-decoration:underline;">' + _sortOrder + '</span> rank / <span style="cursor:pointer;text-decoration:underline;">Reload</span></div>');

	$('#cageBattleListSort span:first').click(function() {
		_sortOrder = _sortOrder == 'descending' ? 'ascending' : 'descending';
		$(this).text(_sortOrder);
		item.set('cagePageConquestOrder', _sortOrder);
		sortConquestRank();
	});

	$('#cageBattleListSort span:last').click(function() {
		tools.Page.loadPage('conquest_duel.php');
	});
	sortConquestRank();

};
