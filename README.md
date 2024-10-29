# Unofficial DeskHub's Stripe Revenue Service

A simple Node.js and Express application that provides a GET endpoint to fetch and display your Stripe revenue over various date ranges.

## Setup Instructions

### Prerequisites

	•	Node.js installed on your machine.
	•	A Stripe API Secret Key.

You can generate a restricted key [here](https://dashboard.stripe.com/apikeys/create?name=DeskHub%20Service&permissions%5B%5D=rak_charge_read&permissions%5B%5D=rak_subscription_read)

### 1. Install Dependencies

npm install

### 2. Configure Environment Variables

Create a .env file in the project’s root directory:

touch .env

Add your Stripe API Secret Key to the .env file:

STRIPE_API_KEY=your_stripe_api_key_here

Replace your_stripe_api_key_here with your actual Stripe API Secret Key.

### 3. Run the Application

Start the server with:

node index.js

The server will start on port 3000 by default.

Or deploy it on Render, DigitalOcean, whatever...

### Using the Service

Endpoint

GET /stripe_revenue

Query Parameters

	•	date_range (optional): Specifies the date range for the revenue calculation. Possible values:
	•	all   : All-time revenue (default).
	•	today : Today’s revenue.
	•	7d    : Last 7 days’ revenue.
	•	30d   : Last 30 days’ revenue.
	•	month : This month’s revenue.
	•	year  : This year’s revenue.

Examples

1. All-Time Revenue

http://localhost:3000/stripe_revenue

2. Today’s Revenue

http://localhost:3000/stripe_revenue?date_range=today

3. Last 7 Days’ Revenue

http://localhost:3000/stripe_revenue?date_range=7d

4. This Month’s Revenue

http://localhost:3000/stripe_revenue?date_range=month

Sample Response

{
  "short_revenue": "$1,234.56",
  "long_revenue": "This month I made $1,234.56"
}

	•	short_revenue: A concise representation of the revenue.
	•	long_revenue: A friendly message including the revenue and date range.

### DeskHub Dashboard

 - Paste your service URL with the date range you want.
 - Select the JSON Key to be displayed. Mind that if you make millions or if you select long_revenue you may have to check "Enable Scrolling"

### Let's fill your DeskHub with money! 🤑
