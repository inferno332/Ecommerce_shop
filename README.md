# Shoes_Online_Shop

## 	:bookmark_tabs:CATEGORY
### :cyclone:API: GET ALL CATEGORIES
#### REQUEST:
- URL: http://localhost:9000/categories
- Method: GET
- Authorization: Bearer Token 
- Allow Role: ADMIN, STAFF

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: GET CATEGORY BY ID
#### REQUEST:
- URL:  http://localhost:9000/categories/:id
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF
- Params: 

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: GET CATEGORY BY NAME
#### REQUEST:
- URL: http://localhost:9000/categories/find/:name
- Method: GET
- Authorization: Bearer Token 
- Allow Role: ADMIN, STAFF

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: CREATE A CATEGORY
#### REQUEST:
- URL: http://localhost:9000/categories
- Method: POST
- Authorization: Bearer Token 
- Allow Role: ADMIN

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: UPDATE A CATEGORY
#### REQUEST:
- URL: http://localhost:9000/categories/:id
- Method: PUT
- Authorization: Bearer Token 
- Allow Role: ADMIN
- Params: 

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: DELETE A CATEGORY
#### REQUEST:
- URL: http://localhost:9000/categories/:id
- Method: DELETE
- Authorization: Bearer Token 
- Allow Role: ADMIN
- Params: 

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: GET CATEGORIES WITH ALL PRODUCT IN EACH CATEGORY
#### REQUEST:
- URL: http://localhost:9000/categories/search/:name
- Method: GET
- Authorization: Bearer Token 
- Allow Role: ADMIN, STAFF
- Params: 

#### RESPONSE:

------------------------------------------------

## 	:bookmark_tabs:CUSTOMER
### :cyclone:API: GET ALL CUSTOMERS
#### REQUEST:
- URL: http://localhost:9000/customers
- Method: GET
- Authorization: Bearer Token 
- Allow Role: ADMIN, STAFF

#### RESPONSE:

------------------------------------------------
### :cyclone:API: GET A CUSTOMERS BY ID
#### REQUEST:
- URL: http://localhost:9000/customers/:id
- Method: GET
- Authorization: Bearer Token 
- Allow Role: ADMIN, STAFF
- Params:

#### RESPONSE:

------------------------------------------------
### :cyclone:API: GET A CUSTOMER BY NAME
#### REQUEST:
- URL: http://localhost:9000/customers/:name
- Method: GET
- Authorization: Bearer Token 
- Allow Role: ADMIN, STAFF
- Params:

#### RESPONSE:

------------------------------------------------
### :cyclone:API: CREATE A CUSTOMER
#### REQUEST:
- URL: http://localhost:9000/customers/
- Method: POST
- Authorization: Bearer Token 
- Allow Role: ADMIN

#### RESPONSE:

------------------------------------------------
### :cyclone:API: UPDATE A CUSTOMER
#### REQUEST:
- URL: http://localhost:9000/customers/:id
- Method: PUT
- Authorization: Bearer Token 
- Allow Role: ADMIN
- Params:

#### RESPONSE:

------------------------------------------------
### :cyclone:API: DELETE A CUSTOMER
#### REQUEST:
- URL: http://localhost:9000/customers/:id
- Method: DELETE
- Authorization: Bearer Token 
- Allow Role: ADMIN
- Params:

#### RESPONSE:

------------------------------------------------

## 	:bookmark_tabs:EMPLOYEE
### :cyclone:API: GET ALL EMPLOYEES
#### REQUEST:
- URL: http://localhost:9000/employees
- Method: GET
- Authorization: Bearer Token 
- Allow Role: ADMIN, STAFF

#### RESPONSE:

------------------------------------------------
### :cyclone:API: GET A EMPLOYEE BY ID
#### REQUEST:
- URL: http://localhost:9000/employees/:id
- Method: GET
- Authorization: Bearer Token 
- Allow Role: ADMIN, STAFF
- Params:

#### RESPONSE:

------------------------------------------------
### :cyclone:API: GET A EMPLOYEE BY NAME
#### REQUEST:
- URL: http://localhost:9000/employees/:name
- Method: GET
- Authorization: Bearer Token 
- Allow Role: ADMIN, STAFF
- Params:

#### RESPONSE:

------------------------------------------------
### :cyclone:API: UPDATE A EMPLOYEE
#### REQUEST:
- URL: http://localhost:9000/employees/:id
- Method: PATCH
- Authorization: Bearer Token 
- Allow Role: ADMIN
- Params:

#### RESPONSE:

------------------------------------------------
### :cyclone:API: DELETE A EMPLOYEE
#### REQUEST:
- URL: http://localhost:9000/employees/:id
- Method: DELETE
- Authorization: Bearer Token 
- Allow Role: ADMIN
- Params:

#### RESPONSE:

------------------------------------------------

## 	:bookmark_tabs:AUTHENTICATE
### :cyclone:API: REGISTER
#### REQUEST:
- URL: http://localhost:9000/auth/register
- Method: POST

#### RESPONSE:

------------------------------------------------
### :cyclone:API: LOGIN
#### REQUEST:
- URL: http://localhost:9000/auth/login
- Method: POST

#### RESPONSE:

------------------------------------------------
## 	:bookmark_tabs:ORDER
### :cyclone:API: GET ALL ORDERS
#### REQUEST:
- URL: http://localhost:9000/orders
- Method: GET
- Authorization: Bearer Token 
- Allow Role: ADMIN, STAFF

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: GET ORDER BY ID
#### REQUEST:
- URL:  http://localhost:9000/orders/:id
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF
- Params: 

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: CREATE A ORDER
#### REQUEST:
- URL: http://localhost:9000/orders
- Method: POST
- Authorization: Bearer Token 
- Allow Role: ADMIN

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: UPDATE A ORDER
#### REQUEST:
- URL: http://localhost:9000/orders/:id
- Method: PUT
- Authorization: Bearer Token 
- Allow Role: ADMIN
- Params: 

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: DELETE A ORDER
#### REQUEST:
- URL: http://localhost:9000/orders/:id
- Method: DELETE
- Authorization: Bearer Token 
- Allow Role: ADMIN
- Params: 

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: GET ALL ORDERS SOLD TODAY
#### REQUEST:
- URL: http://localhost:9000/orders/sold/today
- Method: GET
- Authorization: Bearer Token 
- Allow Role: ADMIN, STAFF

#### RESPONSE:

------------------------------------------------
### :cyclone:API: GET ALL ORDERS SOLD THIS WEEK
#### REQUEST:
- URL: http://localhost:9000/orders/sold/week
- Method: GET
- Authorization: Bearer Token 
- Allow Role: ADMIN, STAFF

#### RESPONSE:

------------------------------------------------
### :cyclone:API: GET ALL ORDERS SOLD THIS MONTH
#### REQUEST:
- URL: http://localhost:9000/orders/sold/month
- Method: GET
- Authorization: Bearer Token 
- Allow Role: ADMIN, STAFF

#### RESPONSE:

------------------------------------------------

## 	:bookmark_tabs:PRODUCT
### :cyclone:API: GET ALL PRODUCTS
#### REQUEST:
- URL: http://localhost:9000/products
- Method: GET
- Authorization: Bearer Token 
- Allow Role: ADMIN, STAFF

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: GET PRODUCT BY ID
#### REQUEST:
- URL:  http://localhost:9000/products/:id
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF
- Params: 

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: GET PRODUCT BY NAME
#### REQUEST:
- URL: http://localhost:9000/products/find/:name
- Method: GET
- Authorization: Bearer Token 
- Allow Role: ADMIN, STAFF

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: CREATE A PRODUCT
#### REQUEST:
- URL: http://localhost:9000/products
- Method: POST
- Authorization: Bearer Token 
- Allow Role: ADMIN

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: UPDATE A PRODUCT
#### REQUEST:
- URL: http://localhost:9000/products/:id
- Method: PUT
- Authorization: Bearer Token 
- Allow Role: ADMIN
- Params: 

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: DELETE A PRODUCT
#### REQUEST:
- URL: http://localhost:9000/products/:id
- Method: DELETE
- Authorization: Bearer Token 
- Allow Role: ADMIN
- Params: 

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: GET ALL PRODUCTS WITH STOCK < 50
#### REQUEST:
- URL: http://localhost:9000/products/stock/find
- Method: GET
- Authorization: Bearer Token 
- Allow Role: ADMIN, STAFF

#### RESPONSE:

-----------------------------------------------


## 	:bookmark_tabs:SUPPLIER
### :cyclone:API: GET ALL SUPPLIERS
#### REQUEST:
- URL: http://localhost:9000/suppliers
- Method: GET
- Authorization: Bearer Token 
- Allow Role: ADMIN, STAFF

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: GET SUPPLIER BY ID
#### REQUEST:
- URL:  http://localhost:9000/suppliers/:id
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF
- Params: 

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: GET SUPPLIER BY NAME
#### REQUEST:
- URL: http://localhost:9000/suppliers/find/:name
- Method: GET
- Authorization: Bearer Token 
- Allow Role: ADMIN, STAFF

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: CREATE A SUPPLIER
#### REQUEST:
- URL: http://localhost:9000/suppliers
- Method: POST
- Authorization: Bearer Token 
- Allow Role: ADMIN

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: UPDATE A SUPPLIER
#### REQUEST:
- URL: http://localhost:9000/suppliers/:id
- Method: PUT
- Authorization: Bearer Token 
- Allow Role: ADMIN
- Params: 

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: DELETE A SUPPLIER
#### REQUEST:
- URL: http://localhost:9000/suppliers/:id
- Method: DELETE
- Authorization: Bearer Token 
- Allow Role: ADMIN
- Params: 

#### RESPONSE:

-----------------------------------------------

## :bookmark_tabs:UPLOAD
### :cyclone:API: UPLOAD IMAGE FOR CATEGORY
#### REQUEST:
- URL: http://localhost:9000/upload/category/:id
- Method: POST
- Params:

#### RESPONSE:

-----------------------------------------------
### :cyclone:API: UPLOAD IMAGE FOR PRODUCT
#### REQUEST:
- URL: http://localhost:9000/upload/product/:id
- Method: POST
- Params:

#### RESPONSE:
