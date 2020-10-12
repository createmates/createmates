const db = require("../server/db");
const { User, Tag, Session } = require("../server/db/models");
// const Session = require("../server/db/models/session");

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

const exampleTags = [
  {name: 'improv'},
  {name: 'beginner'},
  {name: 'jazz'},
  {name: 'standup'},
  {name: 'contemporarydance'},
  {name: 'trumpet'},
  {name: 'painter'}
];

const exampleSessions = [
  {
    status: 'unmatched',
    category: 'dance',
    blurb: 'Would love some eyes on a new 30 second phrase I just came up with',
  },
  {
    status: 'unmatched',
    category: 'joke',
    blurb: 'Need some help wording a joke'
  },
  {
    status: 'matched',
    category: 'painting',
    blurb: 'Who wants to paint the sunset?'
  },
  {
    status: 'closed',
    category: 'poem',
    blurb: 'I want to write a sonnet',
    summary: 'We wrote a beautiful sonnet'
  },
  {
    status: 'unmatched',
    category: 'music',
    blurb: 'I just wanna jam bro'
  }
]

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

    const tags = await Promise.all(
      exampleTags.map(tag => 
        Tag.create({name: tag.name})
      )
    );

    const sessions = await Promise.all(
      exampleSessions.map(session => 
        Session.create({
          status: session.status,
          category: session.category,
          blurb: session.blurb,
          summary: session.summary
        })
      )
    )

    await sessions[0].addTag(tags[0]);
    await sessions[0].addTag(tags[1]);
    await sessions[0].addUser(artists[0])
    await sessions[1].addTag(tags[3]);
    await sessions[1].addUser(artists[3])
    await sessions[4].addTag(tags[2]);
    await sessions[4].addTag(tags[5]);
    await sessions[4].addUser(artists[1])

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
