const db = require("../server/db");
const { User } = require("../server/db/models");

const users = [
  {
    username: "danceswithwolves",
    city: "Brooklyn",
    state: "NY",
    bio: "just a small town girl",
    medium: "painting",
    email: "nancybepainting@gmail.com",
    password: "12345",
  },
  {
    username: "guitargod",
    city: "Brooklyn",
    state: "NY",
    bio: "Love my mom's basement",
    medium: "music",
    email: "iwannarocknrollallnight@gmail.com",
    password: "12345",
  },
  {
    username: "welcometodrama",
    city: "Brooklyn",
    state: "NY",
    bio: "I'm LOUD",
    medium: "theater",
    email: "alltheworldsastage@gmail.com",
    password: "12345",
  },
  {
    username: "hecklersbeware",
    city: "Brooklyn",
    state: "NY",
    bio: "looking for a laugh",
    medium: "comedy",
    email: "lolololol@gmail.com",
    password: "12345",
  },
  {
    username: "doyouevenliftbro",
    city: "Brooklyn",
    state: "NY",
    bio: "you could say I have a trust fund",
    medium: "graphic design",
    email: "chad@gmail.com",
    password: "12345",
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    const artists = await Promise.all(
      users.map((user) =>
        User.create({
          username: user.username,
          city: user.city,
          state: user.state,
          bio: user.bio,
          medium: user.medium,
          email: user.email,
          password: user.password,
          isAdmin: user.isAdmin,
        })
      )
    );

    // seed your database here!
  } catch (err) {
    console.log(err);
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log("Seeding success!");
      db.close();
    })
    .catch((err) => {
      console.error("Oh noes! Something went wrong!");
      console.error(err);
      db.close();
    });
}
