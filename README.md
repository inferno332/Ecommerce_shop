# Shoes_Online_Shop
## :[DEMO](https://ls-eshop.vercel.app/)


## :bookmark_tabs:SLIDER

### :cyclone:API: GET ALL SLIDERS

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/sliders
- Method: GET

#### RESPONSE:

---

### :cyclone:API: CREATE A SLIDER

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/sliders/
- Method: POST

#### RESPONSE:

---

### :cyclone:API: UPDATE A SLIDER

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/sliders/:id
- Method: PUT
- Params:

#### RESPONSE:

---

### :cyclone:API: DELETE A SLIDER

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/sliders/:id
- Method: DELETE
- Params:

#### RESPONSE:

---

## :bookmark_tabs:CATEGORY

### :cyclone:API: GET ALL CATEGORIES

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/categories/v1
- Method: GET
- Authorization: none
- Allow Role: none

#### RESPONSE:

---

### :cyclone:API: GET ALL CATEGORIES WITH AUTHORIZATION

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/categories
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF

#### RESPONSE:

---

### :cyclone:API: GET CATEGORY BY ID

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/categories/:id
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF
- Params:

#### RESPONSE:

---

### :cyclone:API: GET CATEGORY BY NAME

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/categories/find/:name
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF

#### RESPONSE:

---

### :cyclone:API: CREATE A CATEGORY

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/categories
- Method: POST
- Authorization: Bearer Token
- Allow Role: ADMIN

#### RESPONSE:

---

### :cyclone:API: UPDATE A CATEGORY

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/categories/:id
- Method: PUT
- Authorization: Bearer Token
- Allow Role: ADMIN
- Params:

#### RESPONSE:

---

### :cyclone:API: DELETE A CATEGORY

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/categories/:id
- Method: DELETE
- Authorization: Bearer Token
- Allow Role: ADMIN
- Params:

#### RESPONSE:

---

### :cyclone:API: GET CATEGORIES WITH ALL PRODUCT IN EACH CATEGORY

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/categories/search/:name
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF
- Params:

#### RESPONSE:

---

## :bookmark_tabs:CUSTOMER

### :cyclone:API: GET ALL CUSTOMERS

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/customers
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF

#### RESPONSE:

---

### :cyclone:API: GET A CUSTOMERS BY ID

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/customers/:id
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF
- Params:

#### RESPONSE:

---

### :cyclone:API: GET A CUSTOMER BY NAME

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/customers/:name
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF
- Params:

#### RESPONSE:

---

### :cyclone:API: CREATE A CUSTOMER

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/customers/
- Method: POST
- Authorization: Bearer Token
- Allow Role: ADMIN

#### RESPONSE:

---

### :cyclone:API: UPDATE A CUSTOMER

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/customers/:id
- Method: PUT
- Authorization: Bearer Token
- Allow Role: ADMIN
- Params:

#### RESPONSE:

---

### :cyclone:API: DELETE A CUSTOMER

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/customers/:id
- Method: DELETE
- Authorization: Bearer Token
- Allow Role: ADMIN
- Params:

#### RESPONSE:

---

## :bookmark_tabs:EMPLOYEE

### :cyclone:API: GET ALL EMPLOYEES

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/employees
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF

#### RESPONSE:

---

### :cyclone:API: GET A EMPLOYEE BY ID

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/employees/:id
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF
- Params:

#### RESPONSE:

---

### :cyclone:API: GET A EMPLOYEE BY NAME

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/employees/:name
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF
- Params:

#### RESPONSE:

---

### :cyclone:API: UPDATE A EMPLOYEE

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/employees/:id
- Method: PATCH
- Authorization: Bearer Token
- Allow Role: ADMIN
- Params:

#### RESPONSE:

---

### :cyclone:API: DELETE A EMPLOYEE

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/employees/:id
- Method: DELETE
- Authorization: Bearer Token
- Allow Role: ADMIN
- Params:

#### RESPONSE:

---

## :bookmark_tabs:AUTHENTICATE

### :cyclone:API: REGISTER

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/auth/register
- Method: POST

#### RESPONSE:

---

### :cyclone:API: LOGIN

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/auth/login
- Method: POST

#### RESPONSE:

---

## :bookmark_tabs:ORDER

### :cyclone:API: GET ALL ORDERS

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/orders
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF

#### RESPONSE:

---

### :cyclone:API: GET ORDER BY ID

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/orders/:id
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF
- Params:

#### RESPONSE:

---

### :cyclone:API: CREATE A ORDER

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/orders
- Method: POST
- Authorization: Bearer Token
- Allow Role: ADMIN

#### RESPONSE:

---

### :cyclone:API: UPDATE A ORDER

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/orders/:id
- Method: PUT
- Authorization: Bearer Token
- Allow Role: ADMIN
- Params:

#### RESPONSE:

---

### :cyclone:API: DELETE A ORDER

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/orders/:id
- Method: DELETE
- Authorization: Bearer Token
- Allow Role: ADMIN
- Params:

#### RESPONSE:

---

### :cyclone:API: GET ALL ORDERS SOLD TODAY

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/orders/sold/today
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF

#### RESPONSE:

---

### :cyclone:API: GET ALL ORDERS SOLD THIS WEEK

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/orders/sold/week
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF

#### RESPONSE:

---

### :cyclone:API: GET ALL ORDERS SOLD THIS MONTH

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/orders/sold/month
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF

#### RESPONSE:

---

## :bookmark_tabs:PRODUCT

### :cyclone:API: GET ALL PRODUCTS

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/products/v1
- Method: GET

#### RESPONSE:

---

### :cyclone:API: GET ALL PRODUCTS WITH AUTHORIZATION

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/products
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF

#### RESPONSE:

---

### :cyclone:API: GET PRODUCT BY ID

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/products/:id
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF
- Params:

#### RESPONSE:

---

### :cyclone:API: GET PRODUCT BY NAME

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/products/find/:name
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF

#### RESPONSE:

---

### :cyclone:API: CREATE A PRODUCT

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/products
- Method: POST
- Authorization: Bearer Token
- Allow Role: ADMIN

#### RESPONSE:

---

### :cyclone:API: UPDATE A PRODUCT

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/products/:id
- Method: PUT
- Authorization: Bearer Token
- Allow Role: ADMIN
- Params:

#### RESPONSE:

---

### :cyclone:API: DELETE A PRODUCT

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/products/:id
- Method: DELETE
- Authorization: Bearer Token
- Allow Role: ADMIN
- Params:

#### RESPONSE:

---

### :cyclone:API: GET ALL PRODUCTS WITH STOCK < 50

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/products/stock/find
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF

#### RESPONSE:

---

## :bookmark_tabs:SUPPLIER

### :cyclone:API: GET ALL SUPPLIERS

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/suppliers
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF

#### RESPONSE:

---

### :cyclone:API: GET SUPPLIER BY ID

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/suppliers/:id
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF
- Params:

#### RESPONSE:

---

### :cyclone:API: GET SUPPLIER BY NAME

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/suppliers/find/:name
- Method: GET
- Authorization: Bearer Token
- Allow Role: ADMIN, STAFF

#### RESPONSE:

---

### :cyclone:API: CREATE A SUPPLIER

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/suppliers
- Method: POST
- Authorization: Bearer Token
- Allow Role: ADMIN

#### RESPONSE:

---

### :cyclone:API: UPDATE A SUPPLIER

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/suppliers/:id
- Method: PUT
- Authorization: Bearer Token
- Allow Role: ADMIN
- Params:

#### RESPONSE:

---

### :cyclone:API: DELETE A SUPPLIER

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/suppliers/:id
- Method: DELETE
- Authorization: Bearer Token
- Allow Role: ADMIN
- Params:

#### RESPONSE:

---

## :bookmark_tabs:UPLOAD

### :cyclone:API: UPLOAD IMAGE FOR CATEGORY

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/upload/category/:id
- Method: POST
- Params:

#### RESPONSE:

---

### :cyclone:API: UPLOAD IMAGE FOR SLIDER

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/upload/slider/:id
- Method: POST
- Params:

#### RESPONSE:

---

### :cyclone:API: UPLOAD IMAGE FOR PRODUCT

#### REQUEST:

- URL: https://server-ls-shop.onrender.com/upload/product/:id
- Method: POST
- Params:

#### RESPONSE:
