#Order For Henry

#Customers
INSERT INTO ims.ordergraph_customers values ('1', 'Henry', '21 Towson ST','21245','Baltimore', 'MD' );
INSERT INTO ims.ordergraph_customers values ('2', 'Eliana', '21 Towson ST','21245','Baltimore', 'MD' );
INSERT INTO ims.ordergraph_customers values ('3', 'Bryan', '932 Dundalk ST','21255','Baltimore', 'MD' );
INSERT INTO ims.ordergraph_customers values ('4', 'Sunny', '932 Varmark ST','21225','Essex', 'MD' );


#Products
INSERT INTO ims.ordergraph_product_details value ('1','IPhone','Phone','1','799.21','421.21');
INSERT INTO ims.ordergraph_product_details value ('2','IPhone2','Phone','1','799.99','400.21');
INSERT INTO ims.ordergraph_product_details value ('3','ILapTop','Laptop','1','1299.99','750.00');
INSERT INTO ims.ordergraph_product_details value ('4','MyDeskTop2','Deskstop','1','1999.99','952.00');

#orders
INSERT INTO ims.ordergraph_orders values ('1','2023-10-10','E','600.21','D','0','0','0');
INSERT INTO ims.ordergraph_orders values ('2','2023-10-15','S','1200.21','P','0','0','0');
INSERT INTO ims.ordergraph_orders values ('3','2023-11-04','3','1900.21','S','0','0','0');
INSERT INTO ims.ordergraph_orders values ('4','2023-11-02','E','24310.21','L','0','0','0');

#Order Product 
INSERT INTO ims.ordergraph_order_product values ('1', '3','1','1');
INSERT INTO ims.ordergraph_order_product values ('2', '2','2','2');
INSERT INTO ims.ordergraph_order_product values ('3', '1','1','1');
INSERT INTO ims.ordergraph_order_product values ('4', '2','2','1');
INSERT INTO ims.ordergraph_order_product values ('5', '4','4','2');
INSERT INTO ims.ordergraph_order_product values ('6', '1','3','3');
INSERT INTO ims.ordergraph_order_product values ('7', '1','1','1');
INSERT INTO ims.ordergraph_order_product values ('8', '4','2','2');
INSERT INTO ims.ordergraph_order_product values ('9', '2','2','4');
INSERT INTO ims.ordergraph_order_product values ('10', '1','3','3');
INSERT INTO ims.ordergraph_order_product values ('11', '5','4','1');


#Delivery Details
INSERT INTO ims.ordergraph_delivery_details values ('1', '1') ;
INSERT INTO ims.ordergraph_delivery_details values ('2', '2') ;
INSERT INTO ims.ordergraph_delivery_details values ('3', '4') ;
INSERT INTO ims.ordergraph_delivery_details values ('4', '2') ;





SELECT * FROM ims.ordergraph_delivery_details;
SELECT * FROM ims.ordergraph_delivery_details;