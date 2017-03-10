import random
# init方法是您的初始化逻辑。context对象可以在任何方法之间传递。
def init(context):
    context.quick = True
    #context.days = 0
    context.enlisted = False
    context.high = 0.8
    context.low = 0.2
    context.middle = 0.4
    context.max = 1
    context.lmax = 1000
    #context.stock = ""#"000001.SZ"
    context.stocklist = get_sector('Industrials')
    #context.lowpool = ['Industrials','Materials']
    # context.middlepool = ['Industrials']
    # context.highpool = ['Industrials']
    logger.info("init universe for %s" % context.stocklist)

def resizelist(context):
    if context.quick or context.low * context.max < len(context.portfolio.positions):
        context.stocklist = get_sector('Industrials')
    else:
        _list = []
        for pool in industries:
            _list.extend(get_sector(pool))
        context.stocklist =_list
    

def checkmistake(context,stock):
    close = get_history(4,'1d','close')[stock].values
    if len(close) == 4:
        if close[0] < close[3]:
            order_target_percent(stock, 0)
            #context.buy = False
            #context.stock = ""

def before_trade(context):
    for stock in context.portfolio.positions:
        checkmistake(context,stock)

    resizelist(context)
    
    
def price(stock):
    close = get_history(1,'1d','close')[stock].values
    last = get_history(5,'1m','last')[stock].values
    count = 0
    for _last in last:
        if _last > close[0] * 1.03:
            count+=1
    #logger.info("p%f %f" % (count, close[0]))
    if count > 4:
        return True
    return False
    
def volume(stock):
    volume = get_history(5,'1d','volume')[stock].values
    count = 0
    for _volume in volume:
        if _volume > volume[0] * 2:
            count+=1
    #logger.info("v%f %f" % (count, volume[0]))
    if count > 3:
        return True
    return False

# kdj for buying
def kdj_cross_stock(stock):
    high=get_history(15, '1d', 'high')[stock].values
    low=get_history(15,'1d','low')[stock].values
    close=get_history(15,'1d','close')[stock].values
    kdj = IKdj(high, low, close,5,3,3,2,2)
    if kdj.ks[0] is None or kdj.ds[0] is None:
        return False
    elif kdj.ks[0]<kdj.ds[0] and kdj.ks[1]>kdj.ds[1]:
        return True
    else:
        return False
# kdj for selling 
def kdj_cross_stock2(stock):
    high=get_history(15, '1d', 'high')[stock].values
    low=get_history(15,'1d','low')[stock].values
    close=get_history(15,'1d','close')[stock].values
    kdj = IKdj(high, low, close,5,3,3,2,2)
    if kdj.ks[0] is None or kdj.ds[0] is None:
        return False
    elif kdj.ks[0]>kdj.ds[0] and kdj.ks[1]<kdj.ds[1]:
        return True
    else:
        return False

industries = ['Energy',
'Materials',
'ConsumerDiscretionary',
'ConsumerStaples',
'Industrials',
'HealthCare',
'Financials',
'InformationTechnology',
'TelecommunicationServices',
'Utilities']

# 交易
def trade(context,data_dict):
    for stock in context.stocklist:
        if len(context.portfolio.positions) < context.max:
            if stock in context.portfolio.positions:
                continue
            if is_st(stock):
                continue
            if price(stock) and volume(stock) and kdj_cross_stock(stock):
                #pop_portofolio(context)
                order_target_percent(stock, 1.0 / context.max)
                logger.info("kdj_cross_stock: %s" % stock)
                #context.stock = stock
                #context.buy = True
                # if len(context.portfolio.positions) >= context.max:
                #     break
    
    for stock in context.portfolio.positions:
        if kdj_cross_stock2(stock):
            order_target_percent(stock, 0)
            logger.info("kdj_cross_stock2: %s" % stock)
            #context.stock = ""
            #context.buy = False


# 日或分钟或实时数据更新，将会调用这个方法
def handle_data(context, data_dict):
    trade(context,data_dict)
    pass

# task.daily(function, time_rule=market_open(hour=0, minute=240-30))


