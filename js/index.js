$(document).ready(function(){
    
    dangersReport();
    equipmentNum();

    allShow();
    $(window).resize(function() {
        allShow();
      });

   

    //重大危险源预警按钮
    $(".warningBtn .warn").click(function(){
        $('.warningBtn').children().removeClass('current');
        $(this).addClass('current');
        $('.warnList ul li').filter('.warn').show();
        $('.warnList ul li').filter('.error').hide();
    });

    $(".warningBtn .error").click(function(){
        $('.warningBtn').children().removeClass('current');
        $(this).addClass('current');
        $('.warnList ul li').filter('.warn').hide();
        $('.warnList ul li').filter('.error').show();
    });

    $(".warningBtn .all").click(function(){
        $('.warningBtn').children().removeClass('current');
        $(this).addClass('current');
        $('.warnList ul li').filter('.warn').show();
        $('.warnList ul li').filter('.error').show();
    });

    // 菜单下拉
    $(".navManger .dropDown span").click(function(){
        $(this).next('ul').toggle();
        $(".systemManger ul").hide();
    });
     $(".systemManger .dropDown span").click(function(){
        $(this).next('ul').toggle();
        $(".navManger ul").hide();
    });

    // 地图
    // var map = new BMap.Map("allmap");    // 创建Map实例
    var map = new BMap.Map('allmap', { enableMapClick: false });
    var point = new BMap.Point(119.455835405,32.2044094436);
	map.centerAndZoom(point, 11);  // 初始化地图,设置中心点坐标和地图级别  
	map.setCurrentCity("镇江");          // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
   
    // 定义最后一个弹框
    window.lastInfoBox = null;

       $.ajax({
        url: '../js/sj.json',
        method: 'get',
        dataType: 'json',
        success:function(result){
            // 向地图添加标注
            var data = new Array();
            for(var i = 0; i < result.length; i++) {
               switch(result[i].status){
                case 0:
                var opts = {
                        boxStyle:{
                            width: "252px"
                        }
                        ,offset: new BMap.Size(20, 45)
                        ,enableAutoPan: true
                        ,align: INFOBOX_AT_TOP
                        ,closeIconMargin:'10px 10px 0 0'
                        ,closeIconUrl:'../img/close.png'
                        ,closeIconZIndex:9999
                       ,closeIconWidth:'10px'
                        };
                    var myIcon = new BMap.Icon("../img/jgqy.png", new BMap.Size(60,60));
                    var data1 = new Array();
                    data1[0] = result[i].info.longitude;
                    data1[1] = result[i].info.latitude;
                    data1[3] = myIcon;
                    data1[4] = opts;
                map.centerAndZoom(new BMap.Point(result[i].info.longitude, result[i].info.latitude), 12);
                map.enableScrollWheelZoom(true);

                // 人员出入信息
                var entryExitInfo = "<div class=\\'infoAlertBox entryExit\\'><div class=\\'title\\'>人员出入信息</div> <table><col width=\\'50%\\'/><col width=\\'50%\\'/><tr><th>部门</th><th>人员数量</th></tr><tr><td>访客</td><td>" + result[i].entryExitInfo.fk + "</td> </tr><tr><td>临时承包商</td><td>" + result[i].entryExitInfo.lscbs + "</td> </tr> <tr><td>Novacap</td><td>1</td></tr> <tr><td>承包商</td><td>" + result[i].entryExitInfo.cbs + "</td></tr> <tr><td>制造商</td><td>" + result[i].entryExitInfo.zzs + "</td></tr> </table></div>";

                // 隐患排查
                var troubleIdentify = "<div class=\\'infoAlertBox entryExit\\'><div class=\\'title\\'>隐患排查</div> <table><col width=\\'50%\\'/><col width=\\'50%\\'/><tr><th>隐患</th><th>数量</th></tr><tr><td>排查数</td><td>" + result[i].troubleIdentify.pcs + "</td> </tr><tr><td>隐患数</td><td>" + result[i].troubleIdentify.yhs + "</td> </tr> <tr><td>已整改</td><td>" + result[i].troubleIdentify.yzg + "</td></tr> <tr><td>待整改</td><td>" + result[i].troubleIdentify.dzg + "</td></tr><tr><td>整改率</td><td>" + result[i].troubleIdentify.zgl + "%</td></tr> </table></div>";

               // 危化品信息
               var item = '';
               $.each(result[i].dangerousInfo, function (j) {
                   item += '<tr><td>' + j + '</td><td>' + result[i].dangerousInfo[j].whpname + '</td><td>' + result[i].dangerousInfo[j].yt + '</td><td>' + result[i].dangerousInfo[j].ccfs + '</td><td>' + result[i].dangerousInfo[j].ccdd + '</td><td>' + result[i].dangerousInfo[j].sfzdjgwhp + '</td></tr>';
               });
             
               var dangerousInfoHtml = "<div class=\\'infoAlertBox dangerousInfo\\'><div class=\\'title\\'>危化品信息</div><table><col width=\\'10%\\'/><col width=\\'18%\\'/><col width=\\'18%\\'/><col width=\\'18%\\'/><col width=\\'18%\\'/><col width=\\'18%\\'/><thead><tr><th>序号</th><th>危化品名称</th><th>用途（类别）</th><th>储存方式</th><th>储存地点</th><th>是否重点监管危化品</th></tr></thead><tbody>" + item + "</tbody></table></div>";

               // 危险源
               var item2 = '';
               $.each(result[i].hazardSource, function (j) {
                   item2 += '<tr><td>' + j + '</td><td>' + result[i].hazardSource[j].hazardSourcename + '</td><td>' + result[i].hazardSource[j].chargename + '</td></tr>';
               });
               var hazardSourceHtml = "<div class=\\'infoAlertBox hazardSource\\'><div class=\\'title\\'>危险源</div><table><col width=\\'20%\\'/><col width=\\'40%\\'/><col width=\\'40%\\'/><thead><tr><th>序号</th><th>危险源名称</th><th>负责人</th></tr></thead><tbody>" + item2 + "</tbody></table></div>";

               var str ='<div class="mapTipBox">'+
               '<div class="mapCon blueCon">'+
                  '<div class="mapConTxt">'+
                  '<p class="titleBox">'+
                  '<span class="tips">'+result[i].info.tips+'</span>'+
                  '</p>'+
                  '<p class="companyName">'+result[i].info.companyName+'</p>'+
                       '<p class="info">'+
                       '<span>主要负责人：'+result[i].info.headName+'</span>'+
                       '<span>联系电话：'+result[i].info.phone+'</span>'+
                       '</p>'+
                       '<ul class="infoBtn">'+
                       '<li onclick="alertInfo(\''+entryExitInfo+'\')" >人员出入信息 </li>'+
                       '<li onclick="alertInfo(\''+dangerousInfoHtml+'\')">'+
                       '<img src="../img/dangerArraw.png" alt="">危化品信息</li>'+
                       '<li onclick="alertInfo(\''+hazardSourceHtml+'\')"> 危险源</li>'+
                       '<li onclick="alertInfo(\''+troubleIdentify+'\')">隐患排查</li>'+
                       '</div>'+
                       '<div class="mapConBottom"></div>'+
                       '</div>'+
                       '</div>'
                
                         var data_info = data;
                        for(var i = 0; i < data_info.length; i++) {
                            var marker = new BMap.Marker(new BMap.Point(data_info[i][0], data_info[i][1]),{icon:myIcon}); // 创建标注
                            var content = data_info[i][2];
                            map.addOverlay(marker); // 将标注添加到地图中
                            addClickHandler(content, marker);
                        }
                    break;
                case 1:
                    var opts = {
                        boxStyle:{
                            width: "252px"
                        }
                        ,offset: new BMap.Size(20, 35)
                        ,enableAutoPan: true
                        ,align: INFOBOX_AT_TOP
                        ,closeIconMargin:'10px 10px 0 0'
                        ,closeIconUrl:'../img/close.png'
                        ,closeIconZIndex:9999
                        ,closeIconWidth:'10px'
                        };
                    var myIcon = new BMap.Icon("../img/zdwx.png", new BMap.Size(54,34));
                    var data1 = new Array();
                    data1[0] = result[i].info.longitude;
                    data1[1] = result[i].info.latitude;
                    data1[3] = myIcon;
                    data1[4] = opts;
                map.centerAndZoom(new BMap.Point(result[i].info.longitude, result[i].info.latitude), 12);
                map.enableScrollWheelZoom(true);
                var str = "<div class='mapTipBox'>"+
                "<div class='mapCon yellowCon'>"+
                "<div class='mapConTxt'>"+
                "<p class='titleBox'>"+
                "<span class='tips'>"+result[i].info.tips+"</span>"+
                "</p>"+
                " <p class='companyName'>"+
                        result[i].info.companyName+
                            "</p>"+
                            "<div class='yellowInfo'>"+
                            "<div>监测区域：<span>"+result[i].info.area+"</span></div>"+
                                "<div>检  测  项： <span>"+result[i].info.item+"</span></div>"+
                                "<div>监测介质： <span>"+result[i].info.monitoringMedium+"</span>"+
                                " </div>"+
                                " <div>检  测  值： <span>"+result[i].info.detectionValue+"</span>"+
                                " </div>"+
                                " </div>"+
                                " <div class='mapConBottom'></div>"+
                                " </div>"+
                                "</div>"
                    break;
                case 2:
                var opts = {
                    boxStyle:{
                        width: "262px"
                    }
                    ,offset: new BMap.Size(20, 38)
                    ,enableAutoPan: true
                    ,align: INFOBOX_AT_TOP
                    ,closeIconMargin:'15px 15px 0 0'
                    ,closeIconUrl:'../img/close.png'
                    ,closeIconZIndex:9999
                    ,closeIconWidth:'10px'
                    };
                var myIcon = new BMap.Icon("../img/sgbj.gif", new BMap.Size(60,60));
                var data1 = new Array();
                data1[0] = result[i].info.longitude;
                data1[1] = result[i].info.latitude;
                data1[3] = myIcon;
                data1[4] = opts;
            map.centerAndZoom(new BMap.Point(result[i].info.longitude, result[i].info.latitude), 12);
            map.enableScrollWheelZoom(true);
            var str ="<div class='redTipsBox'>"+
            "<div class='redTipsBottom'>"+
            "<div class='mapCon yellowCon'>"+
            "<div class='mapConTxt'>"+
            "<p class='titleBox'>"+result[i].info.note+"</p>"+
            "<p class='info'>"+
            " <span>上报时间："+result[i].info.time+"</span>"+
            "<span>事故单位："+result[i].info.companyName+"</span>"+
            "</p>"+
            " <p>"+
            "<img src="+result[i].info.imgUrl+" class='hzt' alt=''>"+
            "</p>"+
            "<ul class='infoBtn'>"+
            "<li><a href=''>平面图</a></li>"+
            "<li><a href=''>消防疏散路线</a></li>"+
            "<li><a href=''>综合应急预案</a></li>"+
            "<li><a href=''>专项应急预案</a></li>"+
            "<li><a href=''>现场处置方案</a></li>"+
            "<li><a href=''>应急小组及物资</a></li>"+
            "</ul>"+
            "</div>"+
            "<div class='mapConBottom'></div>"+
            "</div>"+
            "</div>"+
            "</div>"+
            "</div>"
                    break;

                case 3:
                var opts = {
                    boxStyle:{
                        width: "252px"
                     
                    }
                    ,offset: new BMap.Size(20, 45)
                    ,enableAutoPan: true
                    ,align: INFOBOX_AT_TOP
                    ,closeIconMargin:'10px 10px 0 0'
                        ,closeIconUrl:'../img/close.png'
                        ,closeIconZIndex:9999
                       ,closeIconWidth:'10px'
                    };
                   
                var myIcon = new BMap.Icon("../img/zdwz.gif", new BMap.Size(45,43));
                var data1 = new Array();
                data1[0] = result[i].info.longitude;
                data1[1] = result[i].info.latitude;
                data1[3] = myIcon;
                data1[4] = opts;
                map.centerAndZoom(new BMap.Point(result[i].info.longitude, result[i].info.latitude), 12);
                map.enableScrollWheelZoom(true);
                
                 var str ="<div class='mapTipBox'>"+
                 "<div class='mapCon yellowCon'>"+
                 "<div class='mapConTxt'>"+
                 "<p class='titleBox'>"+
                 "<img src='../img/warn.png' alt=''><span class='tips'>"+result[i].info.tips+"</span>"+ 
                 "</p>"+
                 " <p class='companyName'>"+result[i].info.companyName+"</p>"+
                 "<div class='yellowInfo'>"+
                 "<div>监测区域：<span>"+result[i].info.area+"</span>"+
                 " </div>"+
                 "<div>检  测  项： <span>"+result[i].info.item+"</span>"+
                 "</div>"+
                 " <div>监测介质： <span>"+result[i].info.monitoringMedium+"</span>"+
                 "</div>"+
                 "<div>检  测  值： <span>"+result[i].info.detectionValue+"</span>"+
                 "</div>"+
                "</div>"+
                  "<div class='mapConBottom'></div>"+
                    "</div>"+
                    "</div>"
                break;
                 default:
                    break;
                }
                 data1[2] = str;
                 data[i] = data1;
            }  
            var data_info = data;
            for(var i = 0; i < data_info.length; i++) {
                var marker = new BMap.Marker(new BMap.Point(data_info[i][0], data_info[i][1]),{icon:data_info[i][3]}); // 创建标注
                var content = data_info[i][2];
                var opts = data_info[i][4];
                map.addOverlay(marker); // 将标注添加到地图中
                addClickHandler(content, marker,opts);
            }
                  
            function addClickHandler(content, marker,opts) {
                marker.addEventListener("click", function(e) {
                openInfo(content, e,opts)
                });
            }
            function openInfo(content, e,opts) {
            var p = e.target;
            var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
            var infoWindow = new BMapLib.InfoBox(map,content,opts);// 创建信息窗口对象 
            if(lastInfoBox){
                    lastInfoBox.close();//判断上一个窗体是否存在，若存在则执行close
                }

                infoWindow.addEventListener("close", function(e) {
                    layer.closeAll();
                });
                lastInfoBox = infoWindow;
            infoWindow.open(point);
        
            }

        }
    })
    map.setMapStyle({styleJson:styleJson});
    $(".inputBtn").click(function(){
        sear($(".inputTxt").val());
        return false;
    })

    function sear(result){//地图搜索 
        var local = new BMap.LocalSearch(map, { 
            renderOptions:{map: map} 
        }); 
        local.search(result); 
     } 

})

function alertInfo(infoAlertBox){
    layer.open({
        type: 1,
        area:['auto','auto'],
        shade: [0.00001,"#fff"],
        shadeClose:true,
        title: false, //不显示标题
        content: infoAlertBox, //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素
      });
}

function allShow(){
    var wh = $(window).height();
    var hh = $('header').height();
    $(".content").height(wh-hh-30);
    $('.rightCon .box').height(($(".content").height()-36)/3)
    $(".echartBox").height($('.rightCon .box').height()-30)
    $(".warnList ul").css({"max-height":$('.rightCon .box').height()-70,"min-height":$('.rightCon .box').height()-70})
}

function dangersReport(){
    // 上报隐患数
        // x轴时间
        var times=[];
        // 排查数
        var investigationNumber=[];
        // 隐患数
        var dangerNumber=[];
        // 已整改
        var rectification=[];
        // 待整改
        var Waiting=[];
        $.ajax({
            type : "get",
            // async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
            url : "../js/zxtsj.json",    //请求发送到TestServlet处
            data : {},
            dataType : "json",        //返回数据形式为json
            success : function(result) {
                $.each(result, function (index, item) {
                    times.push(item.times);    //挨个取出类别并填入类别数组
                    investigationNumber.push(item.investigationNumber);
                    dangerNumber.push(item.dangerNumber);
                    rectification.push(item.rectification);
                    Waiting.push(item.Waiting);
                });

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
                            data:times,
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
                            data:investigationNumber,
                            symbolSize: 2,
                            symbol: 'circle'
                        },
                        {
                            name:'隐患数',
                            type:'line',
                            stack: '总量',
                            data:dangerNumber,
                            symbolSize: 2,
                            symbol: 'circle'
                        },
                        {
                            name:'已整改',
                            type:'line',
                            stack: '总量',
                            data:rectification,
                            symbolSize: 2,
                            symbol: 'circle'
                        },
                        {
                            name:'待整改',
                            type:'line',
                            stack: '总量',
                            data:Waiting,
                            symbolSize: 2,
                            symbol: 'circle'
                        }
                    ]
                }; 
                myChart.setOption(option);  
           },
            error :function(errorMsg) {
                //请求失败时执行该函数
                alert("图表请求数据失败!");
            }
        })
}


function equipmentNum(){
 
   // 公司
   var company=[];
   // 用电设备数
   var eqNum=[];
   $.ajax({
       type : "get",
       async : true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
       url : "../js/sbsj.json",    //请求发送到TestServlet处
       data : {},
       dataType : "json",        //返回数据形式为json
       success : function(result) {
           $.each(result, function (index, item) {
            eqNum.push(item.eqNum);
            company.push(item.company);
           });
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
                        data : company,
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
                        name:'企业用电设备数',
                        type:'bar',
                        data:eqNum
                    }
                ]
            };
            myChart2.setOption(option); 

      },
       error :function(errorMsg) {
           //请求失败时执行该函数
           alert("图表请求数据失败!");
       }
   })
}