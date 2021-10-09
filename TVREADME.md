#TradingView 概述

1. 什么是 TradingView?<br/>TradingView 为优秀的交易技术分析金融图表 📈 拥有丰富完善的技术分析指标库，并拥有可以直接交易的终端插件。

2. 中文开发文档: https://zlq4863947.gitbook.io/tradingview/

3. 如何使用？
   TradingView 拥有三大公共资源库，分别为轻量级图表库，专业技术分析图表库，技术分析&交易终端库，使用官方库需要提交申请以获得 git 权限。
   申请入口: https://cn.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/?feature=technical-analysis-charts

#TradingView Widget Api

1. 引入资源库后初始化 tv-Widget 配置参数详解

```
    new TradingView.widget({
      symbol: 'A', // 产品
      interval: 'D', // 时间间隔
      theme: "Dark", // 自定义主题色
      timezone: 'America/New_York', //默认时区
      container_id: 'tv_chart_container', // 指定要包含widget的DOM元素id。
      locale: 'ru', //语言 本地化处理
      datafeed: new Datafeeds.UDFCompatibleDatafeed('https://demo_feed.tradingview.com'), // 图表设置，可以自定义。当您创建一个实现接口的对象时，只需将它传递给图表库Widget的构造函数。
      supported_resolutions: ['1','5','15','60','120','1D','1W'], //支持的周期数组
      supports_search: false, / 是否支持搜索
      library_path: 'charting_library/', //static 文件夹路径
      fullscreen:false, //是否占用窗口所有可用空间
      toolbar_bg: '#f4f7f9', // 工具栏背景颜色
      customFormatters: {timeFormatter,dataFormatter} //格式化自定义显示日期和时间的值  format()/formatLocal() 方法
      overrides: { // 对Widget默认属性进行覆盖，
        'mainSeriesProperties.style': 0
      },
      disabled_features: ["header_widget", "left_toolbar"],  // 默认情况下启用的功能
      enabled_features: ["move_logo_to_main_pane"],  // 默认情况下禁用功能
      studies_overrides: {  // 自定义默认的指标样式及输入值
        "volume.volume.color.0": "#00FFFF",
      },
      time_frames: [  // 图表底部选择的可见时间范围列表
        { text: "50y", resolution: "6M", description: "50 Years" },
        { text: "3y", resolution: "W", description: "3 Years", title: "3yr" },
        { text: "8m", resolution: "D", description: "8 Month" },
        { text: "3d", resolution: "5", description: "3 Days" },
        { text: "1000y", resolution: "W", description: "All", title: "All" },
      ],
      custom_css_url: 'css/style.css', // 添加自定义CSS到图表中
    })
```

2.  tv-Widget 方法详解

```
      widget.onChartReady(function() { //图表初始化并准备就绪，调用相关回调方法
      widget.subscribe(event, callback) // websocket/UDF 执行订阅时
        event:
          - toggle_sidebar // 显示/隐藏 绘图工具栏
          - indicators_dialog // 显示 指标对话框
          - toggle_header // 显示/隐藏 图表头
          - edit_object_dialog // 显示 图表/指标属性对话框
          - chart_load_requested // 即将加载新图表
          - drawing // 绘图将添加到图表中。参数包含一个带有 value 字段的对象，该字段与绘图名称相对应
          - study // 指标将添加到图表中。参数包含一个带有 value 字段的对象，该字段与指标名称相对应
          - reset_scales // 重置比例按钮被点击
          - load_study template // 指标模板被加载
          - onTick // 最新 K 线 更新触发
          - onMarkClick // 用户点击 K 线 标记
          - onTimescaleMarkClick // 用户点击时间刻度标记
          - drawing_event // 隐藏/显示/移动/移除/单击 绘图 (hide/show/move/remove/click)
          - panes_height_changed // 窗格大小已更改
          - panes_order_changed // 窗格订单发生变化

      widget.unsubscribe(event,callback) // 取消订阅特定事件
      widget.chart() // 返回图表对象
      widget.setSymbol(symbol, interval, callback) // 修改图表商品(交易对)和周期，新数据接收到时调用回调
      widget.remove() // 删除 widget
      widget.closePopupsAndDialogs() // 关闭上下文菜单或对话框
      widget.selectLineTool(drawingId) // 选择与绘图按钮上的单击相同的形状或光标 (cursor/dot/arrow_cursor/eraser/measure/zoom/brush)
      widget.selectedLineTool() // 返回所选形状的光标或标识符
      widget.startFullscreen() // 进入全屏模式
      widget.exitFullscreen() // 退出全屏模式

      widget.save(callback) // 保存图表到 JS 对象 图表库将调用回调函数并将状态对象作为参数传递
      widget.createButton(options) // 在图表的顶部工具栏创建一个 dom 元素 可以添加为自定义控件 options: object { align: "left" }

      widget.showNoticeDialog(params) // 显示对话框 包含自定义标题和文本以及“确定”按钮

      widget.symbolInterval() // 返回一个包含 symbol 和 interval 的对象
      widget.mainSeriesPriceFormatter() // 返回一个带有 format 方法的对象 支持批量格式化价格
      widget.getIntervals() // 返回支持的周期数组
      widget.getStudiesList() // 返回全部技术指标数组

      widget.getTheme() // 返回图表主题名称
      widget.applyOverrides(overrides) // 覆盖图表属性 同 overrides 版本 1.5 引入

});
```

3. 图表方法 一期业务不涉及

- 方法详情: https://zlq4863947.gitbook.io/tradingview/4-tu-biao-ding-zhi/chart-methods

4. 图表单个功能 设置: https://zlq4863947.gitbook.io/tradingview/4-tu-biao-ding-zhi/featuresets

- 控件及视觉元素 显示/隐藏
- 元素放置
- 特性

#TradingView JS API 重点/核心 \*\*\*

1. JS API 的用处？<br/>以约定方式接收数据，并响应图表库请求，将接口对象传递给图表 Widget 构造函数

2. JS API 相关 Methods 详解

```
    onReady(callback) // 设置图表库支持的图表配置
      configurationData:{
        supports_search: false, // 是否支持搜索
        supported_resolutions: ['1','5','15','60','120','1D','1W'], //支持的周期数组
        supports_marks: true, // 标识 datafeed 是否支持在 K 线上显示标记。
        supports_timescale_marks: true, //标识 datafeed 是否支持时间刻度标记。
        exchanges: ['myExchange1'], // 交易所对象数组
        symbols_types: [], // 商品类型对象数组
        currency_codes: ["USD","EUR","GBP"], // 用于货币转换的支持的货币数组
        searchSymbols(userInput, exchange, symbolType, onResultReadyCallback):{}
     }

```

```
    // 通过商品名称解析商品信息(SymbolInfo)，可以在此配置单个商品
    const resolveSymbol = () => {
      return new Promise((resolve) => {
        resolve({
          name: symbol.value, // 商品名称/交易对
          full_name: symbol.value,
          description: symbol.value, // 商品描述
          type: symbol.value, // 仪表的可选类型 'bitcoin'
          session: "24x7", // 商品交易时间段 "HHMM-HHMM"
          exchange: "HuoBi", // 交易所简称 同 listed_exchange
          listed_exchange: symbol.value, // 交易所简称
          timezone: "Asia/Shanghai", // 时区
          format: "price", //在价格刻度上标签格式 price/volume
          pricescale: Math.pow(10, symbolInfo.value["price-precision"]), // 价格精度
          minmov: 1, //最小波动价格
          volume_precision: symbolInfo.value["value-precision"], // 以整数显示成交量数字的小数位
          has_intraday: true, // 是否有日内(分钟)历史数据
          supported_resolutions: supported_resolutions, // 周期数组 });
        });
      };
```

```
    // 从我们的 API 源获取图表数据并将其交给 TradingView。
    Datafeed.Container.prototype.getBars = async function (
      symbolInfo, // 商品信息对象
      resolution, //（string （周期）)
      rangeStartDate, // unix 时间戳, 最左边请求的 K 线时间
      rangeEndDate, // unix 时间戳, 最右边请求的 K 线时间
      onDataCallback, // 历史数据的回调函数。每次请求只应被调用一次。
      onErrorCallback, // 错误的回调函数。
      firstDataRequest //布尔值，以标识是否第一次调用此商品/周期的历史记录。 )
      {
        that.localresolution = resolution
        if (firstDataRequest) {
          let bars = await that.getChartData(resolution, rangeStartDate, rangeEndDate, firstDataRequest)
          if (bars.length) {
             onDataCallback(bars)
          } else {
            onDataCallback([], { noData: true })
            // onErrorCallback([], { noData: true })
          }
        } else {
           onDataCallback([], { noData: true })
           // onErrorCallback([], { noData: true })
          }
        }
```

```
    // 订阅 K 线数据。图表库将调用 onRealtimeCallback 方法以更新实时数据。
    Datafeed.Container.prototype.subscribeBars = function (
      symbolInfo, // ObjectsymbolInfo 对象
      resolution, // StringK 线周期
      onRealtimeCallback, // Function 将我们更新的 K 线传递给此回调以更新图表
      listenerGUID, // String 此交易对的唯一 ID 和表示订阅的分辨率，生成规则：ticker+'\_'+周期
      onResetCacheNeededCallback // Function 调用次回调让图表再次请求历史 K 线数据
      ) {
      that.callbacks = []
      that.callbacks.push(onRealtimeCallback)
      that.updateBar(resolution, onRealtimeCallback)
      // 更改线型
      that.chart.activeChart().setChartType(1);
      }
      // 取消订阅 K 线数据
      Datafeed.Container.prototype.unsubscribeBars = function (listenerGUID) {}

```

#TraingView 开发中会遇到的问题汇总

1. 如何设置 K 线间距/放大 K 线？

- "timeScale.barSpacing":50,

2. 创建了一个指标和设置的按钮，需要实现点击弹出 tv 的指标设置弹框和设置弹框？

```
    this. Widget.onChartReady(() => { // createButton... this. widget.chart().executeActionById('chartProperties') })
```
