var config = {
    lang: "zh-cn",
    time: {
        timeFormat: 24
    },
    weather: {
        params: {
            key: "252b74937c4e42c4873fa9489e8b3f4f",
            location: "无锡"
        }
    },
    tem_hum: {
        mqttServer:"location",
		mqttServerPort:9001,
		mqttclientName:"magic_mirror_tem_hum",
		temperatureTopic:"/DHT"
    },
    compliments: {
        interval: 8000,
        fadeInterval: 4000,
        morning: [
            '早安!',
            '早上舒心，出门顺心!',
            '你好，睡的怎么样啊?'
        ],
        afternoon: [
            '午安!',
            '你看起来状态不错!',
            '今天又是美好的一天!'
        ],
        evening: [
            '晚安!',
            '你看起来精神不错!',
            '早睡早起身体好!'
        ]
    },
    calendar: {
        maximumEntries: 10, // Total Maximum Entries
		displaySymbol: true,
		defaultSymbol: 'calendar', // Fontawsome Symbol see http://fontawesome.io/cheatsheet/
        urls: [
		{
			symbol: 'calendar-plus-o',
			url: 'https://p38-calendars.icloud.com/published/2/AcGEBg-ryzF63EYuGV_LyT0qvX6tUAPfGZJrSU--rdf1LJSh05uR6AbHE4Cn9EIPdFDhagrcmCcyyH4IvC5j_WyoERq-U0U06fv2cHXiHsk',
		},
		// {
		// 	symbol: 'soccer-ball-o',
		// 	url: 'https://www.google.com/calendar/ical/akvbisn5iha43idv0ktdalnor4%40group.calendar.google.com/public/basic.ics',
		// },
		// {
			// symbol: 'mars',
			// url: "https://server/url/to/his.ics",
		// },
		// {
			// symbol: 'venus',
			// url: "https://server/url/to/hers.ics",
		// },
		// {
			// C:\Users\zhuxiaoyao\Desktop\MagicMirror-base\index.php: 'venus-mars',
			// url: "https://server/url/to/theirs.ics",
		// },
		]
    },
    news: {
        feed: 'http://www.ftchinese.com/rss/news'
    }
}
