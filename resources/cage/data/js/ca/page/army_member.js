// Army
tools.Page.pages['army_member.php'] = function() {

	console.log('Page: army_member.php');

	$('#app_body table.layout table:eq(1) div:contains("Displaying"):last').css({
		'position' : 'absolute',
		'marginLeft' : 515,
		'width' : 250,
		'textAlign' : 'left'
	})
	$('div:contains("Current Army Size"):last').css('width', 175).before($('<button style="width:85px;" class="cageArmyEdit">F<span>ill </span>A<span>rmy</button>').click(function() {
		$('button.cageGifterButton').fadeOut('slow');
		addFunction(function() {
			fireStartFillArmy();
		}, null, true, true);
	})).before($('<button style="width:185px;" class="cageArmyEdit"><span>R</span>emove <span>N</span>on-<span>F</span>riends</button>').click(function() {
		$('button.cageGifterButton').fadeOut('slow');
		addFunction(function() {
			fireStartCleanArmy();
		}, null, true, true);
	}));
};
