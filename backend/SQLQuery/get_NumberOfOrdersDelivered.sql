CREATE DEFINER=`root`@`localhost` PROCEDURE `get_NumberOfOrdersDelivered`()
begin
select count(ordergraph_orders.id)
from ordergraph_orders
where ordergraph_orders.deliverystatus='D';
end