require('dotenv').config();
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

app.get('/stripe_revenue', async (req, res) => {
  const dateRange = req.query.date_range || 'all';

  const getTimeRange = () => {
    const now = new Date();
    let startDate;

    switch (dateRange) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case '7d':
        startDate = new Date(now - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case 'all':
      default:
        startDate = null;
    }

    return startDate ? Math.floor(startDate.getTime() / 1000) : null;
  };

  const startTime = getTimeRange();
  const endTime = Math.floor(Date.now() / 1000);

  console.log('Start Time:', startTime ? new Date(startTime * 1000) : 'N/A');
  console.log('End Time:', new Date(endTime * 1000));

  let charges = [];
  let hasMore = true;
  let startingAfter = null;

  try {
    while (hasMore) {
      const params = {
        limit: 100,
        ...(startingAfter && { starting_after: startingAfter }),
        ...(startTime && { created: { gte: startTime, lte: endTime } })
      };

      const response = await stripe.charges.list(params);

      // Log the fetched charges
      console.log('Fetched charges:', response.data);

      charges = charges.concat(response.data);
      hasMore = response.has_more;
      if (hasMore) {
        startingAfter = response.data[response.data.length - 1].id;
      }
    }

    // Only succeeded charges
    charges = charges.filter(charge => charge.status === 'succeeded');

    // Uncomment this if you want to get rid of refunded ones
    // charges = charges.filter(charge => !charge.refunded);

    // Sum the amounts
    let totalAmount = 0;
    if (charges.length > 0) {
      totalAmount = charges.reduce((sum, charge) => sum + charge.amount, 0);
    }

    // Format the amount
    let formattedAmount;
    if (charges.length > 0) {
      formattedAmount = (totalAmount / 100).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    } else {
      // No charges, set amount to $0.00
      formattedAmount = (0).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    }

    let longMessage;
    switch (dateRange) {
      case 'today':
        longMessage = `Today I made ${formattedAmount}`;
        break;
      case '7d':
        longMessage = `In the last 7 days I made ${formattedAmount}`;
        break;
      case '30d':
        longMessage = `In the last 30 days I made ${formattedAmount}`;
        break;
      case 'month':
        longMessage = `This month I made ${formattedAmount}`;
        break;
      case 'year':
        longMessage = `This year I made ${formattedAmount}`;
        break;
      case 'all':
      default:
        longMessage = `In total, I made ${formattedAmount}`;
    }

    res.json({
      short_revenue: formattedAmount,
      long_revenue: longMessage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});