const ApiRootUrl = 'http://192.168.1.103:8081/'; 

module.exports = {
  Demand: ApiRootUrl + 'demand/releaseDemand.do', //发布采购需求
  DemandRecept: ApiRootUrl + 'demand/selectDemandByStatus.do ', //查询未接单采购需求
  ReleaseQuote: ApiRootUrl + 'quote/releaseQuote.do ', //供应商接单
  SelectQuoteByDemand: ApiRootUrl + 'quote/selectQuoteByDemand.do', //查询某一需求的供应商报价
  SelectOrderByStatus: ApiRootUrl + 'purchaseOrder/selectPurchaseOrdersByStatus.do',//根据验收状态查询采购订单
  SelectOrderByPay: ApiRootUrl +'purchaseOrder / selectPurchaseOrdersByFinalMoneyType.do',//根据尾款状态查询采购订单  
  OrderCreate: ApiRootUrl +'purchaseOrder / generatePurchaseOrder.do ',//生成采购订单
  OrderChecked: ApiRootUrl + 'purchaseOrder/check.do',  // 验收采购订单
  Storage: ApiRootUrl +'storage/storage.do',//记录仓储位置

  
};