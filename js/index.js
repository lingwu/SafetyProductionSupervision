$(document).ready(function(){
    // 上报隐患数
    var myChart = echarts.init(document.getElementById('dangersReported')); 
    var option = {
        color:['#06b1df','#ff2300','#00e746','#ffb300'],
        title: {
            text: '上报隐患数',
            textStyle:{
                fontSize: 16,
                fontWeight: 'normal',
                color: '#fff'
            }
        },
     
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                itemWidth:10,
                itemHeight:12,
                data:['排查数','隐患数','已整改','待整改'],
                x:'right',
                textStyle:{
                    color:"#fff"
                }
            },
            calculable : true,
            grid:{
                x:45,
                x2:30,
                y2:20,
                borderWidth:0
            },
            xAxis : [
                {
                    type : 'category',
                    splitLine:false,
                    boundaryGap : false,
                    data : ['2018-01','2018-03','2018-05','2018-07','2018-09','2018-11'],
                    axisLabel:{
                        textStyle:{
                        color:'#fff'
                        }
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    splitLine:false,
                    axisLabel:{
                        textStyle:{
                        color:'#fff'
                        }
                    }
                }
            ],
            series : [
                {
                    name:'排查数',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230],
                    symbolSize: 2,
                    symbol: 'circle'
                },
                {
                    name:'隐患数',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330],
                    symbolSize: 2,
                    symbol: 'circle'
                },
                {
                    name:'已整改',
                    type:'line',
                    stack: '总量',
                    data:[150, 232, 201, 154, 190, 330],
                    symbolSize: 2,
                    symbol: 'circle'
                },
                {
                    name:'待整改',
                    type:'line',
                    stack: '总量',
                    data:[0, 332, 301, 334, 390, 330],
                    symbolSize: 2,
                    symbol: 'circle'
                }
            ]
        };   
        myChart.setOption(option); 

        // 企业用电设备数
        var myChart2 = echarts.init(document.getElementById('equipmentNum')); 
        var option = {
            color:['#06b1df'],
            title : {
                text: '企业用电设备数',
                textStyle:{
                    fontSize: 16,
                    fontWeight: 'normal',
                    color: '#fff'
                }
            },
            tooltip : {
                trigger: 'axis'
            },
            calculable : true,
            grid:{
                x:45,
                x2:30,
                y2:20,
                borderWidth:0
            },
            xAxis : [
                {
                    splitLine:false,
                    type : 'category',
                    data : ['xxx公司','xxx公司','xxx公司','xxx公司','xxx公司','xxx公司','xxx公司','xxx公司'],
                    axisLabel:{
                        textStyle:{
                        color:'#fff'
                        }
                    }
                },
            
            ],
            yAxis : [
                {
                    splitLine:false,
                    type : 'value',
                    axisLabel:{
                        textStyle:{
                        color:'#fff'
                        }
                    }
                }
            ],
            series : [
                {
                    name:'降水量',
                    type:'bar',
                    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                }
            ]
        };
       myChart2.setOption(option); 

    //重大危险源预警按钮
    $(".warningBtn .warn").click(function(){
        $('.warningBtn').children().removeClass('current');
        $(this).addClass('current');
        $('table tr').filter('.warn').show();
        $('table tr').filter('.error').hide();
    });

    $(".warningBtn .error").click(function(){
        $('.warningBtn').children().removeClass('current');
        $(this).addClass('current');
        $('table tr').filter('.warn').hide();
        $('table tr').filter('.error').show();
    });

    $(".warningBtn .all").click(function(){
        $('.warningBtn').children().removeClass('current');
        $(this).addClass('current');
        $('table tr').filter('.warn').show();
        $('table tr').filter('.error').show();
    });

    // 菜单下拉
    $('.dropDown span').click(function(){
        $(this).next('ul').toggle()
    });

    // 地图
    	// 百度地图API功能
	var map = new BMap.Map("allmap");    // 创建Map实例
	map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
	//添加地图类型控件
	map.addControl(new BMap.MapTypeControl({
		mapTypes:[
            BMAP_NORMAL_MAP
        ]}));	  
	map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    var styleJson = [{
        "featureType": "background",
        "elementType": "geometry",
        "stylers": {
            "color": "#00070fff"
        }
    }, {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#011b33ff"
        }
    }, {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#001c37ff"
        }
    }, {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#063259ff"
        }
    }, {
        "featureType": "road",
        "elementType": "labels",
        "stylers": {
            "visibility": "on"
        }
    }, {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": {
            "weight": 0,
            "color": "#06325900"
        }
    }, {
        "featureType": "districtlabel",
        "elementType": "labels.icon",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "railway",
        "elementType": "geometry.fill",
        "stylers": {
            "color": "#010001ff"
        }
    }, {
        "featureType": "railway",
        "elementType": "geometry.stroke",
        "stylers": {
            "color": "#02101fff"
        }
    }, {
        "featureType": "medicallabel",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#0f3d67ff"
        }
    }, {
        "featureType": "airportlabel",
        "elementType": "labels.text.stroke",
        "stylers": {
            "weight": 0
        }
    }, {
        "featureType": "educationlabel",
        "elementType": "labels.text.stroke",
        "stylers": {
            "weight": 0,
            "color": "#ffffff00"
        }
    }, {
        "featureType": "continent",
        "elementType": "labels",
        "stylers": {
            "visibility": "on"
        }
    }, {
        "featureType": "poilabel",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#063259ff"
        }
    }, {
        "featureType": "poilabel",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffff00"
        }
    }, {
        "featureType": "districtlabel",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#063259ff"
        }
    }, {
        "featureType": "districtlabel",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffff00"
        }
    }, {
        "featureType": "poilabel",
        "elementType": "labels.icon",
        "stylers": {
            "visibility": "off"
        }
    }, {
        "featureType": "medicallabel",
        "elementType": "labels.icon",
        "stylers": {
            "visibility": "on"
        }
    }, {
        "featureType": "highwaysign",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#01182fff"
        }
    }, {
        "featureType": "highwaysign",
        "elementType": "labels.icon",
        "stylers": {
            "visibility": "on"
        }
    }, {
        "featureType": "highwaysign",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffff00"
        }
    }, {
        "featureType": "scenicspotslabel",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#01182fff"
        }
    }, {
        "featureType": "scenicspotslabel",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffff00"
        }
    }, {
        "featureType": "educationlabel",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#01182fff"
        }
    }, {
        "featureType": "medicallabel",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffff00"
        }
    }, {
        "featureType": "entertainmentlabel",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#01182fff"
        }
    }, {
        "featureType": "entertainmentlabel",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffff00"
        }
    }, {
        "featureType": "estatelabel",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#01182fff"
        }
    }, {
        "featureType": "estatelabel",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffff00"
        }
    }, {
        "featureType": "businesstowerlabel",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#01182fff"
        }
    }, {
        "featureType": "businesstowerlabel",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffff00"
        }
    }, {
        "featureType": "companylabel",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#01182fff"
        }
    }, {
        "featureType": "companylabel",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffff00"
        }
    }, {
        "featureType": "governmentlabel",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#01182fff"
        }
    }, {
        "featureType": "governmentlabel",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffff00"
        }
    }, {
        "featureType": "financelabel",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffff00"
        }
    }, {
        "featureType": "financelabel",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#01182fff"
        }
    }, {
        "featureType": "transportationlabel",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffff0"
        }
    }, {
        "featureType": "transportationlabel",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#01182fff"
        }
    }, {
        "featureType": "carservicelabel",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#01182fff"
        }
    }, {
        "featureType": "carservicelabel",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffff00"
        }
    }, {
        "featureType": "lifeservicelabel",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#01182fff"
        }
    }, {
        "featureType": "lifeservicelabel",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffff00"
        }
    }, {
        "featureType": "shoppinglabel",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#01182fff"
        }
    }, {
        "featureType": "shoppinglabel",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffff00"
        }
    }, {
        "featureType": "hotellabel",
        "elementType": "labels.text.fill",
        "stylers": {
            "color": "#01182fff"
        }
    }, {
        "featureType": "hotellabel",
        "elementType": "labels.text.stroke",
        "stylers": {
            "color": "#ffffff00"
        }
    }]
   map.setMapStyle({styleJson:styleJson});

})