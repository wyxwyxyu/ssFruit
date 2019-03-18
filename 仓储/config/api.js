const ApiRootUrl = 'http://192.168.1.103:8080/'; 

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


  SearchProduct: ApiRootUrl + 'product/searchProduct.do' ,//搜索商品
  GetProductDetail: ApiRootUrl + 'product/getProductDetail.do',   //获取商品详情
  PutIn: ApiRootUrl + 'storage/putIn.do',   //入库
  SelectOrder: ApiRootUrl + 'order/selectOrderByStatus.do',   //根据订单状态查询订单
  SelectByOrdNo: ApiRootUrl + 'order/selectOrderVorByOrderNo.do',//根据订单号查订单详情
  PutOutAfterScan: ApiRootUrl +'standard/storingStandardMaterialByOrder.do',//根据用户订单分拣出库
  FinishPicking: ApiRootUrl + 'order/finishPicking.do',//完成拣货
  
};