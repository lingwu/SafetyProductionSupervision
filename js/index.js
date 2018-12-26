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
        $('.dropDown ul').hide();
        $(this).next('ul').show()
    })
})