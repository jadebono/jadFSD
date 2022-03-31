# `τεknοskεnα - MCAST Fullstack Development Assignment`

Author: **Joseph Anthony Debono**  
email: [joe@jadebono.com](joe@jadebono.com)  
Institution: **Malta College of Arts, Sciences and Technology (MCAST)**  
Course: [MCAST Fullstack Development Bootcamp](https://iict.mcast.edu.mt/full-stack-development-bootcamp/)
Cycle: Q4 2021 - Q1 2022

---

## `Frontend`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `Dependencies`

1. "axios": "^0.26.0",
1. "react": "^17.0.2",
1. "react-dom": "^17.0.2",
1. "react-scripts": "5.0.0",
1. "web-vitals": "^2.1.4"

### `<Card/> Properties`

Card data is retrieved from the db collection "items"

1. key, ex: key={items.\_id} - unique key identifier, from a field in the items collection;
1. id, id={item.\_id}- same as key but necessary to retrieve item from db by id.
1. img, ex: img={items.img}`} - url of the image from the db;
1. name, ex: name={items.name} - item name
1. desc, ex: desc={items.desc} extended description of the item
1. price, ex: price={items.price} price (typeof string)
1. qty, ex: qty={items.qty} quantity of items available (typeof string)
1. currentQty, currentQty={testItem(item.\_id)} uses a function to check cart state from <App/> and compare the cartItem with the id of the offers/shops item, if they are the same, cartItem.qty is submitted as a prop to appear in the orange circle
1. getItem, ex: getItem={props.getItem} function in <App/> that updates the state of the cart
1. deleteItem, ex: deleteItem={props.deleteItem} function in <App/> that deletes the supplied item from the state of the cart.

### `<Cart/> Variables and Properties`

#### `Variables`

1. vatRate variable allows operator to change the vat rate.

#### `Properties`

1. getItem, ex: getItem={props.getItem} function in <App/> that updates the state of the cart
1. cart, ex: cart={cart} state in <App/> containing the cart data
1. deleteItem, ex: deleteItem={props.deleteItem} function in <App/> that deletes the supplied item from the state of the cart.
1. cartQty, ex: cartQty={cartQty} state in <App/> containing the total number of items added to cart
1. emptyCart, ex: emptyCart={props.emptyCart} function in <App/> that allows user to empty the cart with one click

### `<SnackBar/> Properties`

You can configure your SnackBar component by using the following props that are properties of the snackBar state object.

1. colour, ex: colour={"red"} - defines colour of SnackBar
1. type, ex: type={"danger"} - defines type in header of SnackBar
1. message, ex: message={"Your input is invalid"} - the message to display in the SnackBar

### `<Testimonial/> Properties`

You can configure your Testimonial component by using the following props with state variables retrieved from the db collection "testimonials"

1. key, ex: key={testimonial.\_id} - unique key identifier, from a field in the testimonials collection
1. headline, ex: headline={testimonial.tag} - headline text of testimonial
1. text, ex: text="Lorem ipsum..." - the text of the testimonial
1. img, ex: img={`http://localhost:3001/${testimonial.img}`} - the imported image; replace the port with your own; assets are in /public/assets/ folder but the url is in the db;
1. name, ex: name={testimonial.name} - full name author
1. age, ex: age={testimonial.age} age (typeof string)
1. occupation, occupation={testimonial.occ} - occupation or other activity

## `Backend`

Port: 4000

**IMPORTANT**  
.env file in backend folder excluded from git for security

### `Dependencies`

1. "axios": "^0.26.0",
1. "cookie-parser": "^1.4.6",
1. "cors": "^2.8.5",
1. "dotenv": "^16.0.0",
1. "express": "^4.17.3",
1. "jsonwebtoken": "^8.5.1",
1. "mongodb": "^4.4.0",
1. "nodemailer": "^6.7.2",
1. "nodemon": "^2.0.15",
1. "uuid": "^8.3.2"

## `External Services`

### `MongoDB`

### `Mailtrap`
