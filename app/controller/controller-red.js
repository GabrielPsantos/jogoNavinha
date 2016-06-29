app.controller("red",function($scope){
	$scope.nome ="div vermelha";
	$scope.pontos = 0;
	$scope.saude = 1000;
	$scope.saudeMestre = 1000;
	$scope.nTop = Math.round($("#areaJogo").outerHeight() - $("#nave").outerHeight() * 3 );
	$scope.nLeft = Math.round($("#areaJogo").outerWidth()/2);
	$scope.topMax = Math.round($("#areaJogo").outerHeight());
	$scope.leftMax = Math.round($("#areaJogo").outerWidth());



	window.anima = (function(){
		return  window.requestAnimationFrame       || 
		window.webkitRequestAnimationFrame || 
		window.mozRequestAnimationFrame    || 
		window.oRequestAnimationFrame      || 
		window.msRequestAnimationFrame     || 
		function(/* function */ callback, /* DOMElement */ element){
			window.setTimeout(callback, 1000 / 60);
		};
	})();


	$scope.rodaFundo = function(){
		$("#areaJogo").pan({fps: 30, speed: 2, dir: 'left'});

	}

	$scope.moveNave = function(e){
			//D 68
			//W 87
			//A 65
			//S 83
			
			switch(e.keyCode){
				case 32:
				var tiro = $("#missil").clone();
				tiro.removeAttr("id");
				tiro.css({'top':$scope.nTop,'left':$scope.nLeft});
				tiro.addClass("missil");
				$(tiro).insertAfter("#nave");
				$(".missil").animate({top:"-100px"},
				{
					duration: 1000,
					step : function(){
						
							if($scope.overlaps($(".missil"),$("#inimigo"))){
								$(".panel-body").css("background-color","blue");
								$scope.pontos++;
								$(".pts").html($scope.pontos);
								$scope.saudeMestre--;
								$(".lHealthM").css("width" ,$scope.saudeMestre/10 + "%");					
						}
					},
					complete : function(){
						$(".panel-body").css("background-color","white");
						$(".missil").fadeOut();
					}

				});
				break;
				case 68:
				$scope.nLeft+=50;
				break;
				case 87:
				$scope.nTop-=50;
				break;
				case 65:
				$scope.nLeft-=50;
				break;
				case 83:
				$scope.nTop+=50;
				break;
			}
			$("#nave").animate({top:$scope.nTop+"px",left : $scope.nLeft+"px"},{
				duration : 10
			});

			console.log($scope.nLeft+" - "+$scope.nTop);
			$scope.pontos++;
			console.log($scope.pontos);
		}




		$scope.makeNewPosition = function(){

	    // Get viewport dimensions (remove the dimension of the div)
	    var h = $("#areaJogo").height() - 100;
	    var w = $("#areaJogo").width() - 100;
	    
	    var nh = Math.floor(Math.random() * h);
	    var nw = Math.floor(Math.random() * w);
	    
	    return [nh,nw];    
	    
	}

	$scope.animateDiv = function(){
		var newq = $scope.makeNewPosition();
		$('#inimigo').animate({ top: newq[0], left: newq[1]},
		{
			easing: "linear",
			duration: 2000,
			step: function(){
				if($scope.overlaps($("#inimigo"),$("#nave"))){
					$(".panel-body").css("background-color","red");
					$scope.saude--;
					$(".saude").html($scope.saude);
					$(".saude").css("width" ,$scope.saude/10 + "%");
				}
			},
			complete: function(){
				$scope.animateDiv();
				$(".panel-body").css("background-color","white");        
			}
		});
		

	};

	$scope.overlaps = (function () {
		function getPositions( elem ) {
			var pos, width, height;
			pos = $( elem ).position();
			width = $( elem ).width() / 2;
			height = $( elem ).height();
			return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
		}

		function comparePositions( p1, p2 ) {
			var r1, r2;
			r1 = p1[0] < p2[0] ? p1 : p2;
			r2 = p1[0] < p2[0] ? p2 : p1;
			return r1[1] > r2[0] || r1[0] === r2[0];
		}

		return function ( a, b ) {
			var pos1 = getPositions( a ),
			pos2 = getPositions( b );
			return comparePositions( pos1[0], pos2[0] ) && comparePositions( pos1[1], pos2[1] );
		};
	})();

	$scope.iniciaJogo = function(){
		$(".pts").html($scope.pontos);
		$(".saude").html($scope.saude);
		//$scope.rodaFundo();	
		$(document).keydown(function(e){
			$scope.moveNave(e);
		});
		$scope.animateDiv();
	}


	
	angular.element(document).ready(function () {
		$scope.iniciaJogo();
	});

});