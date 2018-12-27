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

    switch(status){
        case 1:
            var myIcon = new BMap.Icon("../img/jgqy.png", new BMap.Size(41,60));
            var opts = {
                // width: 140, // 信息窗口宽度
                // height: 160, // 信息窗口高度
                // enableMessage: false //设置允许信息窗发送短息

                boxStyle:{
                    width: "280px",
                    height: "195px"
                }
                ,enableAutoPan: true
                ,align: INFOBOX_AT_TOP,
                closeIconUrl:'icon/close.png',
                closeIconMargin:'0px',
                closeIconZIndex:1,
                closeIconWidth:'15px'
                };
                // 随机向地图添加25个标注
                var data = new Array();
                for(var i = 0; i < result.length; i++) {
                var data1 = new Array();
                data1[0] = result[i].longitude;
                data1[1] = result[i].latitude;
                map.centerAndZoom(new BMap.Point(result[i].longitude, result[i].latitude), 12);
                map.enableScrollWheelZoom(true);
                var str = '<div class="mapCon" style="background:#ccc;">';
                str += '<p>大气温度：' + result[i].temperature + '</p>';
                str += '<p>大气压：' + result[i].pressure + '</p>';
                str += '<p>风速：' + result[i].wind + '</p>';
                str += '<p>风速：' + result[i].name + '</p>';
                str += "</div>";
                data1[2] = str;
                data[i] = data1;
                }
                var data_info = data;
                
                // var infoBox = new BMapLib.InfoBox(map,str.join(""),{
                //     boxStyle:{
                //         background:"url('tipbox.gif') no-repeat center top"
                //         ,width: "270px"
                //         ,height: "300px"
                //     }
                //     ,closeIconMargin: "1px 1px 0 0"
                //     ,enableAutoPan: true
                //     ,align: INFOBOX_AT_TOP
                // });

                

                
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
                var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                // var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象 
               
                var infoWindow = new BMapLib.InfoBox(map,content,opts)

                if(lastInfoBox){
                    //判断上一个窗体是否存在，若存在则执行close
                        lastInfoBox.close();
                    }
                    lastInfoBox = infoWindow;
                // map.openInfoWindow(infoWindow, point); //开启信息窗口
                infoWindow.open(point);
                }
            break;
        case 2:
       
            break;
        case 3:
       
            break;
         default:
        // var pt = new BMap.Point(116.417, 39.909);
        // var myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(300,157));
        // var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
        // map.addOverlay(marker2);   
        // var opts = {
        //     width : 200,     // 信息窗口宽度
        //     height: 100,     // 信息窗口高度
        //     title : "海底捞王府井店" , // 信息窗口标题
        //     enableMessage:true,//设置允许信息窗发送短息
        //     message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
        // }
        // var infoWindow = new BMap.InfoWindow("地址：北京市东城区王府井大街88号乐天银泰百货八层", opts);  // 创建信息窗口对象 
        // marker2.addEventListener("click", function(){          
        //     map.openInfoWindow(infoWindow,pt); //开启信息窗口
        // }); 
            break;
        }

        // 加载地图样式
        map.setMapStyle({styleJson:styleJson});

})