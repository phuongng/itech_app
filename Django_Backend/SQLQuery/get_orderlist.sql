CREATE DEFINER=`root`@`localhost` PROCEDURE `get_orderlist`()
BEGIN 
	select  ordergraph_customers.name, ordergraph_productdetails.product_name, ordergraph_orderproduct.quantity, ordergraph_orders.orderdate
	from ordergraph_orders
	join ordergraph_orderproduct
		on ordergraph_orders.id = ordergraph_orderproduct.orders_id
	join ordergraph_productdetails
		on ordergraph_orderproduct.productdetails_id = ordergraph_productdetails.id
	join ordergraph_deliverydetails
		on ordergraph_orders.id = ordergraph_deliverydetails.tracking_id
	join ordergraph_customers
		on ordergraph_deliverydetails.customer_id = ordergraph_customers.id;
	
END