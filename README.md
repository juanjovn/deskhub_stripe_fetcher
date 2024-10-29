# Unofficial DeskHub’s Revenue Service

A simple Node.js and Express application that provides GET endpoints to fetch and display your revenue from Stripe and RevenueCat over various date ranges.

You can get a DeskHub [here](https://getdeskhub.com)

## Setup Instructions

### Prerequisites

	•	Node.js installed on your machine.
	•	A Stripe API Secret Key.
	•	A RevenueCat API Key and Project ID (for RevenueCat metrics).

You can generate a restricted Stripe key [here](https://dashboard.stripe.com/apikeys/create?name=DeskHub%20Service&permissions%5B%5D=rak_charge_read&permissions%5B%5D=rak_subscription_read)

### 1. Install Dependencies

npm install

### 2. Configure Environment Variables

Create a .env file in the project’s root directory:

touch .env

Add your Stripe API Secret Key to the .env file:

STRIPE_API_KEY=your_stripe_api_key_here

Replace your_stripe_api_key_here with your actual Stripe API Secret Key.

Same for RevenueCat:

REVENUECAT_API_KEY=your_revenuecat_api_key_here
PROJECT_ID=your_revenuecat_project_id_here

### 3. Run the Application

Start the server with:

node index.js

The server will start on port 3000 by default.

Or deploy it on Render, DigitalOcean, whatever...

### Using the Service

#### Stripe Endpoint

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
  "short": "$1,234.56",
  "long": "This month I made $1,234.56"
}

	•	short: A concise representation of the revenue.
	•	long: A friendly message including the revenue and date range.

#### RevenueCat Endpoint

GET /revenuecat_metric

Query Parameters

	•	output_type (required): Specifies the metric to retrieve. Possible values:
	•	mrr                 : Monthly Recurring Revenue
	•	revenue             : Revenue in the last 28 days
	•	new_customers       : New customers in the last 28 days
	•	active_subscriptions: Active subscriptions
	•	active_trials       : Active trials

Examples

1.	Revenue in the Last 28 Days

http://localhost:3000/revenuecat_metric?output_type=revenue


2.	Active Subscriptions

http://localhost:3000/revenuecat_metric?output_type=active_subscriptions


3.	New Customers in the Last 28 Days

http://localhost:3000/revenuecat_metric?output_type=new_customers



Sample Response

{
  "short_value": "$569",
  "long_value": "The revenue in the last 28 days is $569.00"
}

	•	short_value: A concise representation of the metric.
	•	long_value: A friendly message including the metric name and value.

### DeskHub Dashboard

 - Paste your service URL with the date range you want.
 - Select the JSON Key to be displayed. Mind that if you make millions or if you select long_revenue you may have to check "Enable Scrolling"

### Let's fill your DeskHub with money! 🤑
