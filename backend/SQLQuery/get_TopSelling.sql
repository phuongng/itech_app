CREATE DEFINER=`root`@`localhost` PROCEDURE `get_TopSelling`()
begin
select ordergraph_productdetails.product_name, sum(ordergraph_orderproduct.quantity) as "Sold"
from ordergraph_orderproduct
join ordergraph_productdetails 
	on ordergraph_orderproduct.productdetails_id = ordergraph_productdetails.id
group by ordergraph_productdetails.product_name
order by sum(ordergraph_orderproduct.quantity) desc;
end