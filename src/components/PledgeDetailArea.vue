<template>
    <div>
        <div ref="echartsArea" style="height: 400px;"></div>
    </div>
</template>
  
<script>
import * as echarts from 'echarts';

let myChar = null;

export default {
    data() {
        return {
            name: 'PledgeDetailArea',
            // 数据示例，根据你的需求替换成实际数据
            options: {}
        };
    },
    mounted() {

        this.renderEChartsArea();
        this.requestTimeline();
    },
    watch: {
        //观察option的变化
        options: {
            handler(newVal, oldVal) {
                if (myChar) {
                    if (newVal) {
                        myChar.setOption(newVal);
                    } else {
                        myChar.setOption(oldVal);
                    }
                } else {
                    this.init();
                }
            },
            deep: true //对象内部属性的监听，关键。
        }
    },

    methods: {

        requestTimeline() {

            try {
                let lineDada = localStorage.getItem('line')
                if (lineDada && lineDada.length > 0) {
                    console.log('line')
                    let timeLine = JSON.parse(lineDada)
                    // create_at,total_stake
                    let xlines = []
                    let ylines = []
                    timeLine.forEach(element => {
                        let date = this.$moment(element.create_at).format("YYYY-MM-DD");
                        xlines.push(date)
                        ylines.push(element.total_stake)
                    });
                    if (xlines.length && ylines.length) {
                        this.options.xAxis.data = xlines
                        this.options.series[0].data = ylines
                    }
                }
                let date = this.$moment(new Date).format("YYYY-MM-DD HH:mm:ss");
                console.log(`date: ${date}`)
                console.log(`date:`)
            } catch (error) {
                console.log(error)
            }
        },



        renderEChartsArea() {


            myChar = echarts.init(this.$refs.echartsArea);

            // 配置项
            const options = {
                title: {
                    text: ''
                },
                tooltip: {
                    backgroundColor: 'black',
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#B38C5F'
                        },
                    },
                    textStyle: {
                        color: '#C5AC79' // 修改 Tooltip 数据颜色
                    }
                },
                xAxis: {
                    data: [],
                    boundaryGap: false, // 设置 boundaryGap 为 false
                    axisLine: {
                        smooth: true, // 设置 smooth 为 true 去掉锯齿
                        lineStyle: {
                            color: '#272727' // 可以设置线的颜色
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#616161', // 修改 X 轴字体颜色
                            fontSize: window.innerWidth < 900 ? 10 : 14
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#616161', // 修改 Y 轴字体颜色
                            fontSize: window.innerWidth < 900 ? 10 : 14
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#2D2D2D' // 修改 Y 轴上的横线颜色
                        }
                    }
                },
                grid: {
                    top: 30,
                    bottom: 20,
                    left: 42,
                    right: 42
                },
                series: [
                    {
                        name: '质押总额',
                        type: 'line',
                        smooth: true,  // 开启曲线
                        tooltip: {
                            trigger: 'axis',
                            extraCssText: 'background-color: rgba(0, 0, 0, 0.7);', // 修改 Tooltip 的背景色
                            axisPointer: {
                                type: 'line',
                                lineStyle: {
                                    color: '#C5AC79'
                                }
                            },
                        },
                        lineStyle: {
                            color: '#929292'
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    { offset: 0, color: 'rgba(146, 146, 146, 1)' },  // 渐变开始颜色
                                    { offset: 1, color: 'rgba(146, 146, 146, 0)' }    // 渐变结束颜色
                                ]
                            },
                        }, // 开启面积图样式
                        itemStyle: {
                            color: '#C5AC79' // 修改线上点的颜色
                        },
                        data: []
                    }
                ]
            };

            this.options = options

            myChar.setOption(
                this.options
            )
        }
    }
};
</script>
  
<style></style>
  