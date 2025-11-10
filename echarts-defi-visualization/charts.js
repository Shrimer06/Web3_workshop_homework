// 1. DeFi借贷业务TVL折线图
function initTVLChart() {
    const chart = echarts.init(document.getElementById('tvlChart'));

    // 模拟从Dune获取的TVL数据
    const dates = [];
    const aaveData = [];
    const compoundData = [];
    const makerData = [];

    // 生成最近30天的数据
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);

        // 模拟数据：Aave TVL在50-60亿美元之间波动
        aaveData.push((5000 + Math.random() * 1000).toFixed(2));
        // Compound TVL在30-40亿美元之间
        compoundData.push((3000 + Math.random() * 1000).toFixed(2));
        // MakerDAO TVL在40-50亿美元之间
        makerData.push((4000 + Math.random() * 1000).toFixed(2));
    }

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            formatter: function(params) {
                let result = params[0].axisValue + '<br/>';
                params.forEach(item => {
                    result += item.marker + item.seriesName + ': $' +
                             parseFloat(item.value).toLocaleString() + 'M<br/>';
                });
                return result;
            }
        },
        legend: {
            data: ['Aave', 'Compound', 'MakerDAO'],
            top: 10
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dates,
            axisLabel: {
                rotate: 45,
                formatter: function(value) {
                    return value.substring(5); // 只显示月-日
                }
            }
        },
        yAxis: {
            type: 'value',
            name: 'TVL (Million USD)',
            axisLabel: {
                formatter: '${value}M'
            }
        },
        series: [
            {
                name: 'Aave',
                type: 'line',
                data: aaveData,
                smooth: true,
                itemStyle: {
                    color: '#B6509E'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(182, 80, 158, 0.3)' },
                        { offset: 1, color: 'rgba(182, 80, 158, 0.05)' }
                    ])
                }
            },
            {
                name: 'Compound',
                type: 'line',
                data: compoundData,
                smooth: true,
                itemStyle: {
                    color: '#00D395'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(0, 211, 149, 0.3)' },
                        { offset: 1, color: 'rgba(0, 211, 149, 0.05)' }
                    ])
                }
            },
            {
                name: 'MakerDAO',
                type: 'line',
                data: makerData,
                smooth: true,
                itemStyle: {
                    color: '#1AAB9B'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(26, 171, 155, 0.3)' },
                        { offset: 1, color: 'rgba(26, 171, 155, 0.05)' }
                    ])
                }
            }
        ]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

// 2. DEX交易量柱状图
function initDEXChart() {
    const chart = echarts.init(document.getElementById('dexChart'));

    // 模拟从Dune获取的DEX交易量数据（单位：亿美元）
    const dexData = [
        { name: 'Uniswap V3', value: 156.8, color: '#FF007A' },
        { name: 'PancakeSwap', value: 89.5, color: '#D1884F' },
        { name: 'Curve', value: 78.3, color: '#40649F' },
        { name: 'SushiSwap', value: 45.6, color: '#FA52A0' },
        { name: 'Balancer', value: 34.2, color: '#1E1E1E' },
        { name: 'dYdX', value: 28.9, color: '#6966FF' },
        { name: '1inch', value: 23.7, color: '#94A6C3' }
    ];

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function(params) {
                return params[0].name + '<br/>' +
                       params[0].marker + '交易量: $' +
                       params[0].value.toLocaleString() + '亿';
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: dexData.map(item => item.name),
            axisLabel: {
                rotate: 30
            }
        },
        yAxis: {
            type: 'value',
            name: '交易量（亿美元）',
            axisLabel: {
                formatter: '${value}亿'
            }
        },
        series: [
            {
                name: '24h交易量',
                type: 'bar',
                data: dexData.map(item => ({
                    value: item.value,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: item.color },
                            { offset: 1, color: item.color + '80' }
                        ])
                    }
                })),
                barWidth: '60%',
                label: {
                    show: true,
                    position: 'top',
                    formatter: '${c}'
                }
            }
        ]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

// 3. ERC20持仓地址饼图
function initHoldersChart() {
    const chart = echarts.init(document.getElementById('holdersChart'));

    // 模拟从Dune获取的USDT前10持仓地址数据
    const holdersData = [
        { name: '0x5754...3f2a (Binance)', value: 18.5 },
        { name: '0x28C6...5d4f (Tether Treasury)', value: 15.2 },
        { name: '0xdac1...7ec7 (Contract)', value: 12.8 },
        { name: '0x4862...b5e3 (Unknown)', value: 9.3 },
        { name: '0x1062...d4a1 (Bitfinex)', value: 7.6 },
        { name: '0x876E...a9c2 (FTX)', value: 6.4 },
        { name: '0x3f5C...e8d3 (Huobi)', value: 5.9 },
        { name: '0x9696...c7b4 (Kraken)', value: 4.8 },
        { name: '0x0D0D...f2e5 (Gate.io)', value: 3.7 },
        { name: '0xA929...8c6d (OKX)', value: 2.9 },
        { name: '其他地址', value: 12.9 }
    ];

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return params.name + '<br/>' +
                       params.marker + '持仓占比: ' + params.value + '%<br/>' +
                       '价值: $' + (params.value * 10).toFixed(1) + '亿';
            }
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: 'middle',
            textStyle: {
                fontSize: 11
            }
        },
        series: [
            {
                name: 'USDT持仓分布',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['60%', '50%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    formatter: '{b}: {d}%'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 14,
                        fontWeight: 'bold'
                    },
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                data: holdersData
            }
        ]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

// 4. K线图（代币价格）
function initKlineChart() {
    const chart = echarts.init(document.getElementById('klineChart'));

    // 生成ETH价格K线数据 [开盘价, 收盘价, 最低价, 最高价]
    const dates = [];
    const klineData = [];
    const volumeData = [];

    let basePrice = 1800;

    for (let i = 59; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);

        // 生成K线数据
        const open = basePrice + (Math.random() - 0.5) * 100;
        const close = open + (Math.random() - 0.5) * 80;
        const low = Math.min(open, close) - Math.random() * 50;
        const high = Math.max(open, close) + Math.random() * 50;

        klineData.push([open, close, low, high]);
        volumeData.push((Math.random() * 500000 + 200000).toFixed(0));

        basePrice = close; // 下一天的基准价格
    }

    const option = {
        animation: false,
        legend: {
            data: ['K线', '成交量'],
            top: 10
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
                color: '#000'
            },
            formatter: function(params) {
                const kline = params[0];
                const volume = params[1];
                return kline.axisValue + '<br/>' +
                       '开盘: $' + kline.data[0].toFixed(2) + '<br/>' +
                       '收盘: $' + kline.data[1].toFixed(2) + '<br/>' +
                       '最低: $' + kline.data[2].toFixed(2) + '<br/>' +
                       '最高: $' + kline.data[3].toFixed(2) + '<br/>' +
                       '成交量: ' + parseFloat(volume.data).toLocaleString() + ' ETH';
            }
        },
        axisPointer: {
            link: [{ xAxisIndex: 'all' }]
        },
        grid: [
            {
                left: '10%',
                right: '8%',
                height: '50%'
            },
            {
                left: '10%',
                right: '8%',
                top: '70%',
                height: '15%'
            }
        ],
        xAxis: [
            {
                type: 'category',
                data: dates,
                boundaryGap: false,
                axisLine: { onZero: false },
                splitLine: { show: false },
                axisLabel: {
                    show: false
                },
                min: 'dataMin',
                max: 'dataMax'
            },
            {
                type: 'category',
                gridIndex: 1,
                data: dates,
                boundaryGap: false,
                axisLine: { onZero: false },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: {
                    show: true,
                    rotate: 45,
                    formatter: function(value) {
                        return value.substring(5);
                    }
                },
                min: 'dataMin',
                max: 'dataMax'
            }
        ],
        yAxis: [
            {
                scale: true,
                splitArea: {
                    show: true
                },
                axisLabel: {
                    formatter: '${value}'
                }
            },
            {
                scale: true,
                gridIndex: 1,
                splitNumber: 2,
                axisLabel: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: false }
            }
        ],
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: [0, 1],
                start: 0,
                end: 100
            },
            {
                show: true,
                xAxisIndex: [0, 1],
                type: 'slider',
                top: '90%',
                start: 0,
                end: 100
            }
        ],
        series: [
            {
                name: 'K线',
                type: 'candlestick',
                data: klineData,
                itemStyle: {
                    color: '#00da3c',
                    color0: '#ec0000',
                    borderColor: '#00da3c',
                    borderColor0: '#ec0000'
                }
            },
            {
                name: '成交量',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: volumeData,
                itemStyle: {
                    color: function(params) {
                        const dataIndex = params.dataIndex;
                        const kline = klineData[dataIndex];
                        return kline[1] >= kline[0] ? '#00da3c80' : '#ec000080';
                    }
                }
            }
        ]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

// 初始化所有图表
window.onload = function() {
    initTVLChart();
    initDEXChart();
    initHoldersChart();
    initKlineChart();
};
