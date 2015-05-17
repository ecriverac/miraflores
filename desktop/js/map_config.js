var
testObj,
mapObject,
markers = [],
markersData = {
	'congresistas': [],
	'transporte':[],
	'deporte':[],
	'educacion':[],
	'salud':[],
	'seguridad':[],
	'construccion':[]
},
region={
	'AMAZONAS':{
		lat: -5.115146,
		lng: -78.11082789999999
	},
	'APURIMAC':{
		lat: -14.0504533,
		lng: -73.087749
	},
	'AREQUIPA':{
		lat: -16.4090474,
		lng: -71.53745099999999	
	},
	'AYACUCHO':{
		lat: -13.1638737,
		lng: -74.22356409999999
	},
	'CAJAMARCA':{
		lat: -6.4549673,
		lng: -78.8382644
	},
	'CALLAO':{
		lat: -12.0508491,
		lng: -77.1259843
	},
	'CUSCO':{
		lat: -13.53195,
		lng: -71.96746259999999
	},
	'HUANCAVELICA':{
		lat: -12.786389,
		lng: -74.9997568
	},
	'HUÁNUCO':{
		lat: -9.9298454,
		lng: -76.24326529999999
	},
	'ICA':{
		lat: -13.9379378,
		lng: -75.80070929999999
	},
	'JUNIN':{
		lat: -11.335798,
		lng: -75.34121789999999
	},
	'LAMBAYEQUE':{
		lat: -6.4776528,
		lng: -79.9192702
	},
	'LIBERTAD':{
		lat: -8.143593300000001,
		lng: -78.4751945
	},
	'LIMA':{
		lat: -12.046374,
		lng: -77.04279339999999
	},
	'LIMA PROVINCIAS':{
		lat: -25.7746627,
		lng: -100.2322595
	},
	'LORETO':{
		lat: -4.232472899999999,
		lng: -74.21793260000001
	},
	'MADRE DE DIOS':{
		lat: -12.5986,
		lng: -70.09058399999999
	},
	'MOQUEGUA':{
		lat: -17.1927361,
		lng: -70.93281379999999
	},
	'PASCO':{
		lat: -10.4475753,
		lng: -75.1545381
	},
	'PIURA':{
		lat: -5.2,
		lng: -80.63333299999999
	},
	'PUNO':{
		lat: -15.234875,
		lng: -70.050314
	},
	'SAN MARTIN':{
		lat: -7.244488100000001,
		lng: -76.8259652
	},
	'TACNA':{
		lat: -18.0065679,
		lng: -70.24627409999999
	},
	'TUMBES':{
		lat: -3.9338256,
		lng: -80.54384499999999
	},
	'UCAYALI':{
		lat: -9.8251183,
		lng: -73.087749
	},
	'ÁNCASH':{
		lat: -9.325049699999999,
		lng: -77.56194189999999
	}
};

var mapOptions = {
	zoom:14,
	center: new google.maps.LatLng(-12.1218104, -77.0295234),
	mapTypeId: google.maps.MapTypeId.ROADMAP,

	mapTypeControl: false,
	mapTypeControlOptions: {
		style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
		position: google.maps.ControlPosition.LEFT_CENTER
	},
	panControl: false,
	panControlOptions: {
		position: google.maps.ControlPosition.TOP_RIGHT
	},
	zoomControl: false,
	zoomControlOptions: {
		style: google.maps.ZoomControlStyle.LARGE,
		position: google.maps.ControlPosition.TOP_RIGHT
	},
	scaleControl: false,
	scaleControlOptions: {
		position: google.maps.ControlPosition.TOP_LEFT
	},
	streetViewControl: false,
	streetViewControlOptions: {
		position: google.maps.ControlPosition.LEFT_TOP
	},
	styles: [/*insert your map styles*/]
};


