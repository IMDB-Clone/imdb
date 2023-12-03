const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv'); // Require dotenv

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;
const uri = "mongodb+srv://Ali:Ali.ali.@cluster12.kvmh0fp.mongodb.net/?retryWrites=true&w=majority";// Use the environment variable

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db("User_Reviews");
    const reviewsCollection = db.collection("Reviews");

    app.post('/api/save-review', async (req, res) => {
      const { author, content, headline, movieId, rating, sessionId, spoiler, termsAgreed, createdAt, uid } = req.body;
    
      // Construct the review object
      const review = {
        author,
        content,
        headline,
        movieId,
        rating: parseInt(rating, 10),
        sessionId,
        spoiler,
        termsAgreed,
        createdAt,
        uid
      };
    
      try {
        const query = { uid: review.uid, movieId: review.movieId };
        const update = { $set: review };
        const options = { upsert: true };
        await reviewsCollection.updateOne(query, update, options);
        res.status(200).send('Review saved or updated');
      } catch (err) {
        console.error('Error saving review to the database', err);
        res.status(500).send('Error saving review to the database');
      }
    });

    app.get('/api/reviews/:movieId', async (req, res) => {
      const movieId = req.params.movieId;

      if (isNaN(parseInt(movieId, 10))) {
        return res.status(400).send('Invalid movie ID');
      }

      try {
        const query = { movieId: parseInt(movieId, 10) };
        const reviews = await reviewsCollection.find(query).toArray();
        if (reviews.length === 0) {
          return res.status(404).send('No reviews found for this movie ID');
        }
        res.status(200).json(reviews);
      } catch (err) {
        console.error('Error fetching reviews from the database', err);
        res.status(500).send('Error fetching reviews from the database');
      }
    });

    // Other endpoints...

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

run().catch(console.error);

process.on('SIGINT', async () => {
  console.log('Closing MongoDB connection');
  await client.close();
  process.exit(0);
});
