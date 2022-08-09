# Getting Started with the Pizza app App

clone the repo from github repository at "https://github.com/tbookra/doris-pizza-app"
open a new terminal on the root of the project
write "npm i"
write "npm run build"
write "npm run start"

# activating an order

the app is now running on your localhost:8005
send to "http://localhost:8005/set-order" an array of orders, that each contains an array
of toppings strings. (in the body as json with a key of 'orders')
for example:
{
"orders": [
["onion", "tomato", "cheese"],
["onion", "tomato"],
["cheese", "tomato", "olives", "ananas"],
["onion", "tomato", "cheese"],
["onion", "tomato", "cheese"]
]
}
the console would print each process, the time it took to make the order, as it finnished.
And for each order it would also print the total time, as the whole order has finnished.
