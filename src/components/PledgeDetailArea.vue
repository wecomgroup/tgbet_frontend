<template>
    <div>
        <div ref="echartsArea" style="height: 400px;"></div>
    </div>
</template>
  
<script>
import * as echarts from 'echarts';

export default {
    data() {
        return {
            name: 'PledgeDetailArea',
            // 数据示例，根据你的需求替换成实际数据
            chartData: {
                categories: ['2023-03-06', '2023-03-06', '2023-03-06', '2023-03-06', '2023-03-06', '2023-03-06', '2023-03-06', '2023-03-06', '2023-03-06'],
                data: [150, 160, 150, 140, 130, 120, 140, 140, 100, 90]
            },
        };
    },

    mounted() {
        this.renderEChartsArea();
    },

    methods: {
        renderEChartsArea() {
            // 基于准备好的dom，初始化echarts实例
            const myChart = echarts.init(this.$refs.echartsArea);

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
                    data: this.chartData.categories,
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
                        data: this.chartData.data
                    }
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(options);
        }
    }
};
</script>
  
<style></style>
  