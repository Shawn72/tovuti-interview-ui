# tovuti-interview-ui

Tovuti Interview UI Template Readme

EF Core used, Code First Approach, MySQl used

clone both the api and web app into your local machine

Download and restore the database backup attached (tovuti_db.sql)

Host the TovutiApi on port 8020

Postman was used for api testing

Some of endpoints urls:

1. Creating User roles ( Admin, Novice )

POST: localhost:8020/api/roles/createrole 

json body

{
    "name":"Admin"
}                      

{
    "name":"Novice"
}

2. View Roles, and note the Id of the role
GET: localhost:8020/api/roles/

3. Add user to role
POST: localhost:8020/api/roles/addusertorole

4. View All Sales
GET: localhost:8020/api/Sale/

5. Sales Invoice
localhost:8020/api/SaleInvoices

6.  Make a payment
POST: localhost:8020/api/Payments/MakePayment

Git repos
https://github.com/Shawn72/tovuti-interview-api.git
https://github.com/Shawn72/tovuti-interview-ui.git
