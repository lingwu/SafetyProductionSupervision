$(document).ready(function(){
    // 折线
    var myChart = echarts.init(document.getElementById('111')); 
    var option = {
        title: {
            text: '上报隐患数'
        },
     
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                itemWidth:10,
                itemHeight:12,
                data:['排查数','隐患数','已整改','待整改']
            },
          
            calculable : true,
            grid:{
                x:45,
                x2:30,
                y2:20
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
                    data : ['0','200','400','600','800'],
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
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'隐患数',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'已整改',
                    type:'line',
                    stack: '总量',
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'待整改',
                    type:'line',
                    stack: '总量',
                    data:[320, 332, 301, 334, 390, 330, 320]
                }
            ]
        };   
        myChart.setOption(option); 
        var myChart2 = echarts.init(document.getElementById('222')); 
    var option = {
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
            },
           
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'line',
                    stack: '总量',
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'直接访问',
                    type:'line',
                    stack: '总量',
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name:'搜索引擎',
                    type:'line',
                    stack: '总量',
                    data:[820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };   
        myChart2.setOption(option); 
    })