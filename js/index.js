$(document).ready(function(){
    // 上报隐患数
    var myChart = echarts.init(document.getElementById('dangersReported')); 
    var option = {
        color:['#06b1df','#ff2300','#00e746','#ffb300'],
        title: {
            text: '上报隐患数',
            textStyle:{
                fontSize: 22,
                fontWeight: 'normal',
                color: '#fff'
            }
        },
     
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                itemWidth:10,
                itemHeight:25,
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
                    fontSize: 22,
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
    var map = new BMap.Map("allmap");    // 创建Map实例
    var point = new BMap.Point(119.455835405,32.2044094436);
	map.centerAndZoom(point, 11);  // 初始化地图,设置中心点坐标和地图级别
	
	map.addControl(new BMap.MapTypeControl({//添加地图类型控件
		mapTypes:[
            BMAP_NORMAL_MAP
        ]}));	  
	map.setCurrentCity("镇江");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
   
    // 定义最后一个弹框
    window.lastInfoBox = null;
    
    var status = 1;
     // 向地图添加标注
    switch(status){
        case 1:
            var myIcon = new BMap.Icon("../img/jgqy.png", new BMap.Size(41,60));
            var opts = {
                boxStyle:{
                    width: "252px"
                }
                ,offset: new BMap.Size(20, 45)
                ,enableAutoPan: true
                ,align: INFOBOX_AT_TOP
                ,closeIconMargin:'0px',
                closeIconZIndex:1,
                closeIconWidth:'15px'
                };

                // 向地图添加标注
                var data = new Array();
                for(var i = 0; i < result.length; i++) {
                    var data1 = new Array();
                    data1[0] = result[i].longitude;
                    data1[1] = result[i].latitude;
                    map.centerAndZoom(new BMap.Point(result[i].longitude, result[i].latitude), 12);
                    map.enableScrollWheelZoom(true);
                    var str =`
                        <div class='mapTipBox'>
                            <div class='mapCon blueCon'>
                                <div class='mapConTxt'>
                                    <p class='titleBox'>
                                        <span class='tips'>${result[i].tips}</span> 
                                    </p>
                                    <p class='companyName'>
                                    ${result[i].companyName}
                                    </p>
                                    <p class='info'>
                                        <span>主要负责人：${result[i].headName}</span>
                                        <span>联系电话：${result[i].phone}</span>
                                    </p>
                                    <ul class='infoBtn'>
                                        <li class='entryExitInfo' onclick="entryExitInfo()" >
                                            人员出入信息
                                        </li>
                                        <li class='dangerousInfo' onclick="dangerousInfo()">
                                                <img src="../img/dangerArraw.png" alt="">危化品信息
                                        </li>
                                        <li class='hazardSource' onclick="hazardSource()">
                                                危险源
                                        </li>
                                        <li class='troubleIdentify ' onclick="troubleIdentify()">
                                                隐患排查
                                        </li>
                                </div>
                                <div class='mapConBottom'></div>
                            </div>
                        </div>
                        `
                    data1[2] = str;
                    data[i] = data1;
                }
                var data_info = data;
                for(var i = 0; i < data_info.length; i++) {
                    var marker = new BMap.Marker(new BMap.Point(data_info[i][0], data_info[i][1]),{icon:myIcon}); // 创建标注
                    var content = data_info[i][2];
                    map.addOverlay(marker); // 将标注添加到地图中
                    addClickHandler(content, marker);
                }
                function addClickHandler(content, marker) {
                    marker.addEventListener("click", function(e) {
                    openInfo(content, e)
                    });
                }

                function openInfo(content, e) {
                var p = e.target;
                var point = new BMap.Point(p.getPosition().lng+0.010, p.getPosition().lat);
                var infoWindow = new BMapLib.InfoBox(map,content,opts);// 创建信息窗口对象 
                if(lastInfoBox){
                        lastInfoBox.close();//判断上一个窗体是否存在，若存在则执行close
                    }
                    lastInfoBox = infoWindow;
                infoWindow.open(point);
                }

                function entryExitInfo(){
                    alert(111);
                    }
            break;
        case 2:
            break;
        case 3:
            break;
         default:
            break;
        }

        // 加载地图样式
        map.setMapStyle({styleJson:styleJson});

})