;(function($){
	var counter = 0;
	var counterToasty = 0;
	var counterTimer = null;
	var boo = new Audio('./assets/sound/boo.mp3');
	var toasty = new Audio('./assets/sound/toasty.mp3')
	var arrPanelada = ['panelada-1', 'panelada-2', 'panelada-3'];
	var japanese = $('.japanese');
	var person = $('.person');
	var counterDiv = $('.counter');

	$(boo)[0].volume = 0.2;
	function nFormatter(num, digits) {
	  var si = [
	    { value: 1E18, symbol: "E" },
	    { value: 1E15, symbol: "P" },
	    { value: 1E12, symbol: "T" },
	    { value: 1E9,  symbol: "G" },
	    { value: 1E6,  symbol: "M" },
	    { value: 1E3,  symbol: "k" }
	  ], i;
	  for (i = 0; i < si.length; i++) {
	    if (num >= si[i].value) {
	      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].symbol;
	    }
	  }
	  return num.toString();
	};
	var getPanelada = function () {
	  return arrPanelada[parseInt(Math.random() * (3 - 0) + 0)];
	};

	var testToasty = function(){
		if(counterToasty > 0 && counterToasty < 20){
			person.attr("data-level", 1);
		};
		if(counterToasty > 20 && counterToasty < 40){
			person.attr("data-level", 2);
		}
		if(counterToasty > 40 && counterToasty < 60){
			person.attr("data-level", 3);
		}
		if(counterToasty%60 == 0){
			toasty.play();
			$('.japanese').addClass('is-active');
			setTimeout(function(){
				$('.japanese').removeClass('is-active');
			}, 600);
		}
	};

	var setShareLink = function(){
		counterDiv.find('a').show();
		var message = encodeURIComponent("Acabei de panelar "+counter+" vezes contra o Lula!, vem panelar também!");
		counterDiv.find('a').attr("href", "https://www.facebook.com/sharer/sharer.php?title="+message+"&u=http%3A//ogilvieira.github.io/");
	};

	var setAction = function(){
		var paneladaSound = new Audio('./assets/sound/'+getPanelada()+'.wav');
		paneladaSound.play();
		$(paneladaSound)[0].volume = 0.3;
		boo.play();
		counter++;
		counterToasty++;
		testToasty();
		counterDiv.find('span').text(nFormatter(counter));
		
		if(counter > 1){
			setShareLink();
		};

		if(counterTimer){ clearTimeout(counterTimer)};
		counterTimer = setTimeout(function(){
			counterToasty = 0;
			$(boo)[0].pause();
			person.attr("data-level", 1);
		}, 400);
	};


	$('.btn-batepanelada').on('click', function(e){
		e.preventDefault();
		setAction();
	});

	$(document).on('keypress', function(e){
		if( e.which == 32 ){
			e.preventDefault();
			setAction();
		}
	});

	$(window).load(function(){
		$('.paneladas-wrap').removeClass('is-loading');
	});

})(jQuery || $);
