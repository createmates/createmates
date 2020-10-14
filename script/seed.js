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
  {
    username: "treegirl",
    city: "Paris",
    state: "Texas",
    bio: "I'm a major treehugger, what can I say?",
    medium: "Water color",
    email: "treegirl98@gmail.com",
    password: "12345"
  },
  {
    username: "iloveart",
    city: "Columbus",
    state: "Ohio",
    bio: "Moved to Columbus two years ago and looking to collab",
    medium: "Dance",
    email: "ryan447@gmail.com",
    password: "12345"
  },
  {
    username: "michelangelo100",
    city: "Portland",
    state: "Oregon",
    bio: "You might know me for my statue of David",
    medium: "Sculpture",
    email: "michaelangelo@gmail.com",
    password: "12345"
  }
];

const exampleTags = [
  {name: 'improv'},
  {name: 'beginner'},
  {name: 'jazz'},
  {name: 'standup'},
  {name: 'contemporarydance'},
  {name: 'trumpet'},
  {name: 'painter'},
  {name: 'watercolor'},
  {name: 'feedback'},
  {name: 'artisticproecess'},
  {name: 'trusttheprocess'},
  {name: 'flowers'},
  {name: 'pinetree'},
  {name: 'creativity'},
  {name: 'collaboration'},
  {name: 'inspo'},
  {name: 'choreography'},
  {name: 'humor'}
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
  },
  {
    status: 'unmatched',
    category: 'theater improv',
    blurb: 'Looking to do some fun theater improv games'
  },
  {
    status: 'unmatched',
    category: 'drawing',
    blurb: 'Can anyone model for me? I want to draw a portrait. You can keep the finished product!'
  },
  {
    status: 'unmatched',
    category: 'scene',
    blurb: 'Doing a reading of a new scene and would love some outside perspective.'
  },
  {
    status: 'unmatched',
    category: 'script',
    blurb: "Is anyone available to read over my new screenplay? I don't know if I like the ending"
  },
  {
    status: 'unmatched',
    category: 'music',
    blurb: 'I just wanna jam bro'
  },
  {
    status: 'unmatched',
    category: 'comedy',
    blurb: 'What is humor? Would love to discuss.'
  },
  {
    status: 'unmatched',
    category: 'music',
    blurb: 'Anyone play guitar? I would like to try a duet.'
  },
  {
    status: 'unmatched',
    category: 'poem',
    blurb: 'Does anyone want to brainstorm words that rhyme with "toast"? Trying to write a poem about breakfast'
  },
  {
    status: 'unmatched',
    category: 'music',
    blurb: "Let's singggggggggg"
  },
  {
    status: 'unmatched',
    category: 'dance',
    blurb: 'Looking to improvise with a partner. The prompt is: "Be Water"'
  },  
  {
    status: 'unmatched',
    category: 'joke',
    blurb: "Knock knock. Who's there? I need help finishing this joke."
  },
  {
    status: 'unmatched',
    category: 'painting',
    blurb: 'Would anyone like to take a look at this painting I just finished? Need feedback.'
  },
  {
    status: 'unmatched',
    category: 'poem',
    blurb: "Let's co-write a poem!"
  },  
  {
    status: 'unmatched',
    category: 'music',
    blurb: 'Anyone good with lyrics?'
  },  
  {
    status: 'unmatched',
    category: 'theater improv',
    blurb: 'Beginner improviser. Looking to chat with someone with more experience and get some tips.'
  },      
  {
    status: 'unmatched',
    category: 'drawing',
    blurb: "Let's share each other's work and give each other constructive feedback!"
  },  
  {
    status: 'unmatched',
    category: 'scene',
    blurb: 'Any actors that would like to act out this scene with me?'
  },  
  {
    status: 'unmatched',
    category: 'scene',
    blurb: "I need help crying on demand for this scene I'm rehearsing. Anyone got tips?"
  },  
  {
    status: 'unmatched',
    category: 'script',
    blurb: 'Anyone want to brainstorm screenplay ideas?'
  },  
  {
    status: 'unmatched',
    category: 'dance',
    blurb: "I'm going to do a Cunningham warmup. Anyone want to join?"
  },  
  {
    status: 'unmatched',
    category: 'poem',
    blurb: 'Cannot write the last line of this poem, help!!!'
  },  
  {
    status: 'unmatched',
    category: 'music',
    blurb: 'Anyone want to do a vocal warmup?'
  },  
  {
    status: 'unmatched',
    category: 'joke',
    blurb: "Can someone honestly tell me if I'm funny?"
  },  
  {
    status: 'unmatched',
    category: 'theater improv',
    blurb: 'Improv actor looking for tips on zoom performances.'
  },  
  {
    status: 'unmatched',
    category: 'drawing',
    blurb: "What's your favorite pencil company? Anyone want to discuss?"
  },  
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

    for (let i = 0; i < 30; i++) {
      await sessions[i].addUser(artists[Math.floor(Math.random() * artists.length)])
      let finish = Math.ceil(Math.random() * 3)
      for (let j = 0; j < finish; j++) {
        await sessions[i].addTag(tags[Math.floor(Math.random() * tags.length)])
      }
    }
    
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
