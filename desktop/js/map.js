(function(A) {
if (!Array.prototype.forEach)
A.forEach = A.forEach || function(action, that) {
	for (var i = 0, l = this.length; i < l; i++)
		if (i in this)
			action.call(that, this[i], i, this);
	};

})(Array.prototype);

$.ajax({
	dataType: "json",
	url: "data/congresistas.json",
	success: function(data){
		arCongresistas = [];
		testObj=data;
		for(var i=1;i<data.result.length-1;i++){
			arCongresistas.push({value:i,label:data.result[i][1]+" - "+data.result[i][3]});
			//console.log(data.result[i][10]);
			descripcion="";
			if(data.result[i][12]){
				descripcion+="<div style='height: 20px;overflow: hidden;'><font style='float:left;padding-right: 2px;'>Correo 1: </font> <a href='mailto:"+data.result[i][12]+"'>"+data.result[i][12].substring(0,18)+"</a></div>"
			}
			if(data.result[i][13]){
				descripcion+="<div style='height: 20px;overflow: hidden;'><font style='float:left;padding-right: 2px;'>Correo 2: </font> <a href='mailto:"+data.result[i][13]+"'>"+data.result[i][13].substring(0,18)+"</a></div>"
			}
			if(data.result[i][28]){
				descripcion+="<div style='height: 20px;overflow: hidden;'><font style='float:left;padding-right: 2px;'>Facebook: </font> <a target='_blank' href='"+data.result[i][28]+"'>"+data.result[i][28].replace("https://www.facebook.com/","").substring(0,18)+"</a></div>"
			}
			if(data.result[i][27]){
				descripcion+="<div style='height: 20px;overflow: hidden;'><font style='float:left;padding-right: 2px;'>Twitter: </font> <a target='_blank' href='"+data.result[i][27]+"'>"+data.result[i][27].replace("https://twitter.com/","@").substring(0,18)+"</a></div>"
			}
			markersData.congresistas.push({name: data.result[i][1],
				location_latitude: region[data.result[i][3]].lat+Math.random()/4, 
				location_longitude: region[data.result[i][3]].lng+Math.random()/4,
				map_image_url: 'img/img.png?r=2',
				name_point: data.result[i][1],
				description_point: descripcion,
				url_point:  data.result[i][10].replace(/ /g,'')
			});
		}				
		addMarcas_congresistas("congresistas");
		$( "#busqueda" ).autocomplete({
	      	source: arCongresistas,
	     	select: function( event, ui ) {
		        console.log([event,ui]);
		        google.maps.event.trigger(markers["congresistas"][ui.item.value-1], 'click');
		        return false;
		    }
	    });
	}
});

$.when(
    $.getJSON('data/construccion.json', function(data) {
    	markersData.construccion=data;
    }),
    $.getJSON('data/deporte.json', function(data) {
    	markersData.deporte=data;
    }),
    $.getJSON('data/educacion.json', function(data) {
    	markersData.educacion=data;
    }),
    $.getJSON('data/salud.json', function(data) {
    	markersData.salud=data;
    }),
    $.getJSON('data/seguridad.json', function(data) {
    	markersData.seguridad=data;
    }),	
    $.getJSON('data/transporte.json', function(data) {
    	markersData.transporte=data;
    })	
).then(function(contestMedia, contest) {
	//console.log(markersData);
    // do something    
    // contestMedia = [ "success", statusText, jqXHR ]
    // contest = [ "success", statusText, jqXHR ]

    // response data can be gotten with contest[2].responseText
    addMarcas();
});


function addMarcas() {
	var
	marker;
	if(!mapObject){
			mapObject = new google.maps.Map(document.getElementById('map'), mapOptions);
	}	for (var key in markersData){
		//markersData[key].forEach(function (item) {
		if(key!="congresistas"){
			markersData[key].forEach(function (item) {
				//console.log(item);
				item.categoria=key;

				marker = new google.maps.Marker({
					position: new google.maps.LatLng(region[item.departamento].lat+Math.random()/2.2, region[item.departamento].lng+Math.random()/2.2),
					map: mapObject,
					icon: 'img/icon/' + key + '.png?r=2',
				});

				if ('undefined' === typeof markers[key]){
					markers[key] = [];
				}

				markers[key].push(marker);
				google.maps.event.addListener(marker, 'click', (function () {
					closeInfoBox();
					//console.log(item);
			      	getInfoBox(item).open(mapObject, this);
			      	mapObject.setCenter(new google.maps.LatLng(region[item.departamento].lat+Math.random()/2.2, region[item.departamento].lng+Math.random()/2.2));
			    }));

				
			});

		}

		
	}
};

function addMarcas_congresistas(_grupo) {
	var
	marker;
	if(!mapObject){
			mapObject = new google.maps.Map(document.getElementById('map'), mapOptions);
	}
	//for (var key in markersData){
		//markersData[key].forEach(function (item) {
		markersData[_grupo].forEach(function (item) {
			//console.log(_grupo);
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(item.location_latitude, item.location_longitude),
				map: mapObject,
				icon: 'img/icon/' + _grupo + '.png?r=2',
			});

			if ('undefined' === typeof markers[_grupo]){
				markers[_grupo] = [];
			}

			markers[_grupo].push(marker);
			google.maps.event.addListener(marker, 'click', (function () {
					closeInfoBox();
		      	getInfoBox(item).open(mapObject, this);
		      	mapObject.setCenter(new google.maps.LatLng(item.location_latitude, item.location_longitude));
		    }));

			
		});
	//}
};

function hideAllMarkers () {
	for (var key in markers)
		markers[key].forEach(function (marker) {
			marker.setMap(null);
		});
};

function toggleMarkers (category) {
	hideAllMarkers();
	closeInfoBox();

	if ('undefined' === typeof markers[category])
		return false;
	markers[category].forEach(function (marker) {
		marker.setMap(mapObject);
		marker.setAnimation(google.maps.Animation.DROP);

	});
};

function closeInfoBox() {
	$('div.infoBox').remove();
};

function getInfoBox(item) {
	if(item.name){
		//congresista
		contenido='<div class="marker_info none" id="marker_info">' +
			'<div class="info" id="info">'+
			'<img src="' + item.map_image_url + '" class="logotype" alt=""/>' +
			'<h2 class="h2detalle">'+ item.name_point +'<span></span></h2>' +
			'<span style="text-align: left">'+ item.description_point +'</span>';
			if(item.url_point){
				contenido+='<a href="'+ item.url_point + '" target="_blank" class="green_btn">WebSite</a>';
			}
			contenido+='<span class="arrow"></span>' +
			'</div>' +
			'</div>';

		return new InfoBox({
			content:contenido,
			disableAutoPan: true,
			maxWidth: 0,
			pixelOffset: new google.maps.Size(40, -210),
			closeBoxMargin: '50px 200px',
			closeBoxURL: '',
			isHidden: false,
			pane: 'floatPane',
			enableEventPropagation: true
		})
	}else{
		//propuestas
		return new InfoBox({
			content:
			'<div class="marker_info none InfoBox_detalle" id="marker_info">' +
			'<div class="info" id="info">'+
			'<img src="img/categorias/' + item.categoria + '.jpg" class="logotype" alt=""/>' +
			'<h2 class="h2detalle">'+ item.propuesta +'<span></span></h2>' +
			'<span>'+ item.departamento +'</span>' +
			'<textarea readonly>'+ item.detalle +'</textarea>' +
			'<span class="arrow"></span>' +
			'</div>' +
			'</div>',
			disableAutoPan: true,
			maxWidth: 0,
			height:400,
			pixelOffset: new google.maps.Size(40, -210),
			closeBoxMargin: '50px 200px',
			closeBoxURL: '',
			isHidden: false,
			pane: 'floatPane',
			enableEventPropagation: true
		})


	}

	/*
	;/**/
};

