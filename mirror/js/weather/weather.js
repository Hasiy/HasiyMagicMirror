// https://free-api.heweather.com/s6/weather?key=252b74937c4e42c4873fa9489e8b3f4f&location=盐城
var weather = {
	params: config.weather.params || null,
	skyconsTable: {
		'100':'clear-day',
		'101':'cloudy',
		'102':'partly-cloudy-day',
		'103':'partly-cloudy-day',
		'104':'cloudy',
		'200':'wind',
		'202':'wind',
		'203':'wind',
		'204':'wind',
		'205':'wind',
		'206':'wind',
		'207':'wind',
		'208':'wind',
		'209':'wind',
		'210':'wind',
		'211':'wind',
		'212':'wind',
		'213':'wind',
		'300':'sleet',
		'301':'sleet',
		'302':'sleet',
		'303':'sleet',
		'304':'sleet',
		'308':'sleet',
		'310':'sleet',
		'311':'sleet',
		'312':'sleet',
		'313':'sleet',
		'305':'rain',
		'306':'rain',
		'307':'rain',
		'309':'rain',
		'400':'snow',
		'401':'snow',
		'402':'snow',
		'403':'snow',
		'404':'snow',
		'405':'snow',
		'406':'snow',
		'407':'snow',
		'500':'fog',
		'501':'fog',
		'502':'fog',
		'503':'fog',
		'504':'fog',
		'506':'fog',
		'507':'fog',
		'508':'fog',
		'900':'fog',
		'901':'fog',
		'999':'fog'
	},
	fathernodename: "HeWeather6",
	temperatureLocation: ".temp",
	windSunLocation: ".windsun",
	suggestionLocation: ".suggestion",
	forecastLocation: ".forecast",
	updatetimeLocation: ".updatetime",
	apiVersion: "s6",
	apiBase: "https://free-api.heweather.com",
	weatherEndpoint: "weather",
	updateInterval: config.weather.interval || 1800000,
	fadeInterval: config.weather.fadeInterval || 1000,
	intervalId: null,
	orientation: config.weather.orientation || "vertical",
}

/**
 * Rounds a float to one decimal place
 * @param  {float} temperature The temperature to be rounded
 * @return {float}             The new floating point value
 */
weather.roundValue = function (temperature) {
	return parseFloat(temperature).toFixed(1);
}

/**
 * Converts the wind speed (km/h) into the values given by the Beaufort Wind Scale
 * @see http://www.spc.noaa.gov/faq/tornado/beaufort.html
 * @param  {int} kmh The wind speed in Kilometers Per Hour
 * @return {int}     The wind speed converted into its corresponding Beaufort number
 */
weather.ms2Beaufort = function(ms) {
	var kmh = ms * 60 * 60 / 1000;
	var speeds = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102, 117, 1000];
	for (var beaufort in speeds) {
		var speed = speeds[beaufort];
		if (speed > kmh) {
			return beaufort;
		}
	}
	return 12;
}

/**
 * Retrieves the current temperature and weather patter from the heweather.com API
 */
weather.updateCurrentWeather = function () {
	$.ajax({
		type: 'GET',
		url: weather.apiBase + '/' + weather.apiVersion + '/' + weather.weatherEndpoint,
		dataType: 'json',
		data: weather.params,
		success: function (data) {
			var wjson = data[weather.fathernodename][0];
			// console.log('显示1:', wjson);
			// basic
			var _basic	= wjson.basic;
			var city	= _basic.parent_city,
				cnty	= _basic.cnty,
				lat		= _basic.lat,
				lon		= _basic.lon;
			var _update = wjson.update;
			var loc		= _update.loc,
				utc		= _update.utc;
			var _now	= wjson.now;
			var cloud	= _now.cloud,
				concode	= _now.cond_code,
				contxt	= _now.cond_txt,
				fl		= _now.fl,
				hum		= _now.hum,
				pcpn	= _now.pcpn,
				pres	= _now.pres,
				tmp		= _now.tmp,
				vis		= _now.vis,
				winddeg	= _now.wind_deg,
				winddir	= _now.wind_dir,
				windsc	= _now.wind_sc,
				winspd	= _now.wind_spd;

			// tmp_max	= wjson.daily_forecast[0].tmp_max,
			var _daily_forecast= wjson.daily_forecast[0];
			var cond_code_d	= _daily_forecast.cond_code_d,
				cond_code_n	= _daily_forecast.cond_code_n,
				cond_txt_d	= _daily_forecast.cond_txt_d,
				cond_txt_n	= _daily_forecast.cond_txt_n,
				date		= _daily_forecast.data,
				hum			= _daily_forecast.hum,
				mr			= _daily_forecast.mr,
				ms			= _daily_forecast.ms,
				pcpn		= _daily_forecast.pcpn,
				pop			= _daily_forecast.pop,
				pres		= _daily_forecast.prea,
				sr			= _daily_forecast.sr,
				ss			= _daily_forecast.ss,
				tmp_max		= _daily_forecast.tmp_max,
				tmp_min		= _daily_forecast.tmp_min,
				uv_index	= _daily_forecast.uv_index,
				vis			= _daily_forecast.vis,
				wind_deg	= _daily_forecast.wind_deg,
				wind_dir	= _daily_forecast.wind_dir,
				wind_sc		= _daily_forecast.wind_sc,
				wind_spd	= _daily_forecast.wind_spd;

			var _lifestyle  = wjson.lifestyle[0];
			var type		= _lifestyle.type,
				brf			= _lifestyle.brf,
				txt			= _lifestyle.txt;

			var _newWindHtml = "湿度："+hum+"%体感温度："+fl+" ℃";
			$(this.windSunLocation).updateWithText(_newWindHtml,this.fadeInterval);

			var icons = new Skycons({"color": "white"});
			var _icon = '<canvas id="animateicon" width="64" height="64" style="position:relative;display:inline-block;padding-right:15px;top:5px;"></canvas>';
			var _newTempHtml = _icon + tmp +'℃';
			//$(this.temperatureLocation).updateWithText(_newTempHtml, this.fadeInterval);
			$(this.temperatureLocation).updateWithText(_newTempHtml);
			icons.set("animateicon", this.skyconsTable[concode]);
			icons.play();

			var txt1 = wjson.lifestyle[1].txt;
			var txt2 = wjson.lifestyle[2].txt;
			var txt3 = wjson.lifestyle[3].txt;
			var txt4 = wjson.lifestyle[4].txt;
			var txt5 = wjson.lifestyle[5].txt;
			var txt6 = wjson.lifestyle[6].txt;
			var _newSuggestionHtml = "<img src='images/geo_icon.jpg' width='24' height='24' style='vertical-align:text-bottom;'>" + city +" 今天天气： "+ brf + ', ' + txt + ', ' + txt1+ ', ' + txt2;
			$(this.suggestionLocation).updateWithText(_newSuggestionHtml, this.fadeInterval);

			// Week forecast start
			var _opacity = 1,
				_forecastHtml = '<tr>',
				_forecastHtml2 = '<tr>',
				_forecastHtml3 = '<tr>',
				_forecastHtml4 = '<tr>';
			_forecastHtml = '<table class="forecast-table"><tr>';
			for (var i = 0, count = wjson.daily_forecast.length; i < count; i++) {
				// console.log('daily_forecast.长度:', count);
				// console.log('daily_forecast.内容:', wjson.daily_forecast);
				var _forecast = wjson.daily_forecast[i];
				if (this.orientation == 'vertical') {
					_forecastHtml2 = '';
					_forecastHtml3 = '';
					_forecastHtml4 = '';
				}
				var tmp_max=wjson.daily_forecast[i].tmp_max;
				var tmp_min=wjson.daily_forecast[i].tmp_min;
				var cond_txt_d=wjson.daily_forecast[i].cond_txt_d;
				// console.log( '循环次数:', i);
				// console.log('daily_forecast.tmp_max:', tmp_max);
				// console.log('daily_forecast.tmp_min:', tmp_min);
				var _dayName,
					_dayNameBase  = [" 今天 "," 明天 "," 后天 "];
				if (i < 3) {
					_dayName = _dayNameBase[i];
				} else {
				_dayName = moment(date).locale('zh-cn').format('ddd');
				}
				_forecastHtml += '<td style="opacity:' + parseFloat(_opacity).toFixed(2) + '"class="day">' + _dayName + '</td>';
				// _forecastHtml2 += '<td style="opacity:'+ _opacity +'" class="icon-small' + this.iconTable[_forecast.weather[0].icon] + '"></td>';
				_forecastHtml2 += '<td style="opacity:' + parseFloat(_opacity).toFixed(2) + '">'+cond_txt_d+'</td>';
				_forecastHtml3 += '<td style="opacity:' + parseFloat(_opacity).toFixed(2) + '"class="temp-max">' + tmp_max + '&deg;</td>';
				_forecastHtml4 += '<td style="opacity:' + parseFloat(_opacity).toFixed(2) + '"class="temp-min">' + tmp_min + '&deg;</td>';
				_opacity -= 0.05;
				if (this.orientation == 'vertical') {
					_forecastHtml += _forecastHtml2 + _forecastHtml3 + _forecastHtml4 + '</tr>';
				}
			}
			_forecastHtml  += '</tr>',
			_forecastHtml2 += '</tr>',
			_forecastHtml3 += '</tr>',
			_forecastHtml4 += '</tr>';
			if (this.orientation == 'vertical') {
				_forecastHtml += '</table>';
			} else {
				_forecastHtml += _forecastHtml2 + _forecastHtml3 + _forecastHtml4 +'</table>';
			}
			$(this.forecastLocation).updateWithText(_forecastHtml, this.fadeInterval);
			// Week forecast end

			var _updateTimeHtml = " 最后更新时间："+moment(loc).format('HH:mm');
			$(this.updatetimeLocation).updateWithText(_updateTimeHtml, this.fadeInterval);

		}.bind(this),
		error: function () {
			// if error occur
			console.log('weather error');
		}
	});

}

weather.init = function () {
	this.intervalId = setInterval(function () {
		this.updateCurrentWeather();
	}.bind(this), this.updateInterval);
	this.updateCurrentWeather();
}
