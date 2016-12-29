/**
 * 獲取一個新的chart配置項
 *
 * @param color rgba顏色
 * @param type 圖表類型:line,bar,radar,polarArea,pie,doughnut
 * @param title 顯示圖表的標題
 * @param label 圖表的標籤，鼠標移到圖表某個數據點時顯示的提示文字
 * @param categories 一般是X軸的內容
 * @param data 一般是Y軸的數據
 * @returns 返回圖表的配置參數
 */
function getNewConfig(color, type, title, label, categories, data, wsnValues) {
	var background = color;
	var chartOptions = {
		responsive : true,
		maintainAspectRatio : true,
		legend : {
			display : false,
			position : 'bottom'
		},
		title : {
			display : true,
			text : title,
			padding : 30,
			fontSize : 20,
		},
		tooltips : {
			enabled : true,
			mode : 'single',
			callbacks : {
				label : function(tooltipItems, data) {
					var str = label + ": " + tooltipItems.yLabel;
					return str;
				},
				afterLabel : function(tooltipItems, data) {
					var str = "";
					if (type == 'line') {
						str = "工單號: " + wsnValues[tooltipItems.index] + "\n";
					}
					return str;
				},
			}
		},
		scales : {
			xAxes : [{
				stacked : false,
			}],
			yAxes : [{
				display : true,
				beginAtZero : false,
				stacked : false,
				ticks : {
					suggestedMin : 0,
					suggestedMax : Math.max.apply(null, data) * 1.1,
				}
			}]
		},
		showTooltips : true,
		animation : {
			duration : 200,
		},

	};

	var dataset = {
		label : label,
		data : data,
		fill : false,
		backgroundColor : background,
		borderDash : [0, 0],
		borderColor : '#A0A0A0',
		pointBorderColor : background,
		pointBackgroundColor : background,
		pointRadius : 4,
		spanGaps : true,
	};

	var chartData = {
		labels : categories,
		datasets : [dataset],
	};

	var config = {
		type : type,
		data : chartData,
		options : chartOptions,

	};

	return config;
}