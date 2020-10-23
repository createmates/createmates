const { session } = require("passport");
const db = require("../server/db");
const { User, Tag, Session } = require("../server/db/models");
// const Session = require("../server/db/models/session");

const users = [
  {
    username: "danceswithwolves",
    firstName: 'Nancy',
    lastName: 'Smith',
    city: "Brooklyn",
    state: "NY",
    bio: "just a small town girl",
    medium: "painting",
    email: "nancybepainting@gmail.com",
    password: "12345",
  },
  {
    username: "guitargod",
    firstName: 'Chester',
    lastName: 'Jones',
    city: "Brooklyn",
    state: "NY",
    bio: "Love my mom's basement",
    medium: "music",
    email: "iwannarocknrollallnight@gmail.com",
    password: "12345",
  },
  {
    username: "welcometodrama",
    firstName: 'Rebecca',
    lastName: 'Goldberg',
    city: "Brooklyn",
    state: "NY",
    bio: "I'm LOUD",
    medium: "theater",
    email: "alltheworldsastage@gmail.com",
    password: "12345",
  },
  {
    username: "hecklersbeware",
    firstName: 'Garth',
    lastName: 'Holder',
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
    firstName: 'Janine',
    lastName: 'Howell',
    state: "NY",
    bio: "you could say I have a trust fund",
    medium: "graphic design",
    email: "chad@gmail.com",
    password: "12345",
  },
  {
    username: "treegirl",
    firstName: 'John',
    lastName: 'Bauer',
    city: "Paris",
    state: "Texas",
    bio: "I'm a major treehugger, what can I say?",
    medium: "Water color",
    email: "treegirl98@gmail.com",
    password: "12345"
  },
  {
    username: "iloveart",
    firstName: 'Ana',
    lastName: 'Roth',
    city: "Columbus",
    state: "Ohio",
    bio: "Moved to Columbus two years ago and looking to collab",
    medium: "Dance",
    email: "ryan447@gmail.com",
    password: "12345"
  },
  {
    username: "michelangelo100",
    firstName: 'Jamaal',
    lastName: 'Holland',
    city: "Portland",
    state: "Oregon",
    bio: "You might know me for my statue of David",
    medium: "Sculpture",
    email: "michaelangelo@gmail.com",
    password: "12345"
  },
  {
    username: "evelynsosa",
    firstName: 'Stacey',
    lastName: 'White',
    city: "Chicago",
    state: "Illinois",
    bio: "An Award winning photographer, Evelyn Sosa Rojas was born in 1989 in Havana, Cuba, where she still lives and work. In her practice, since 2008, Sosa specializes in amazingly soulful portraits. Sosa shows the power of femininity through photos of women in different familiar or intimate settings. In 2016, Sosa was the winner of the Herman Puig Prize, awarded yearly to the best artist of the Body Photography Salon in Havana.",
    medium: "Photography",
    email: "evelyn@mail.com",
    password: "12345"
  },
  {
    username: "joseph200",
    firstName: 'Eugenia',
    lastName: 'Joseph',
    city: "Cleveland",
    state: "Ohio",
    bio: "Born in Sydney in 1972, Rolella completed a Bachelor of Visual Arts (Honours) in 1994 and went on to obtain a Masters in Visual Arts at the University of Western Sydney in 1998. Joseph Rolella has exhibited consistently for the past twelve years both nationally and internationally.",
    medium: "Drawing",
    email: "rolella22@email.com",
    password: "12345"
  },
  {
    username: "painter4lyfe",
    firstName: 'Laura',
    lastName: 'Cummings',
    city: "Los Angeles",
    state: "California",
    bio: "Begins her studies 1979 at the Hertfordshire College of Art and Design in St Albans, UK. In Portugal she studied etching and painting at Ar.Co. (Art and Visual Communication Center). Her first group exhibition was in 1982 at the 1ª Mostra de Artes in Lagos, Portugal and her first solo show was in 1990 at Galeria Alda Cortez, Lisbon. Since then, Sofia has exhibited in various countries individually and collectively.",
    medium: "etching",
    email: "painter@gmail.com",
    password: "12345"
  },
  {
    username: "lilianna95",
    firstName: 'Lilianna',
    lastName: 'Kane',
    city: "Brooklyn",
    state: "New York",
    bio: "I am an improviser, primarily working though dancing and cooking.  My mission: to invigorate humans to love themselves, collaborate and cooperate with one another, indulge in pleasure and joy, and engage in dynamic experience.  I have shared my practice and my creative work internationally.  I currently live in Lunow-Stolzenhagen, Germany, where I am a resident artist and chef at Ponderosa Movement and Discovery.",
    medium: "Dance",
    email: "lily@email.com",
    password: "12345"
  },
  {
    username: "lottiestickles",
    firstName: 'Charlotte',
    lastName: 'Stickles',
    city: "Bellingham",
    state: "Washington",
    bio: "Charlotte Stickles is a freelance movement artist currently based in Skagit Valley, Washington. She graduated from The Ohio State University Department of Dance in 2017 with a BFA in Dance and distinction in artistic research. Prior to OSU, Charlotte attended Manhattan Youth Ballet, and trained at various festivals and programs including Bates Dance Festival in Maine, Dance Exchange in Washington D.C., and at the New York State Summer School for the Arts in Saratoga Springs. During her time at school, Charlotte performed, taught, choreographed, and received academic funding to conduct research and perform internationally.",
    medium: "Dance",
    email: "lottie@mail.com",
    password: "12345"
  },
  {
    username: "val27",
    firstName: 'Valerie',
    lastName: 'June',
    city: "Memphis",
    state: "Tennessee",
    bio: "Valerie June Hockett, known as Valerie June, is an American singer, songwriter, and multi-instrumentalist from Memphis, Tennessee, United States. Her sound encompasses a mixture of folk, blues, gospel, soul, country, Appalachian and bluegrass. She is signed to Concord Music Group worldwide.",
    medium: "Music",
    email: "valeriejune@email.com",
    password: "12345"
  },
  {
    username: "katieceramics",
    firstName: 'Katie',
    lastName: 'Coughlin',
    city: "Brooklyn",
    state: "New York",
    bio: "Katie Coughlin received her MFA from The Ohio State University(2018) and her BFA from Alfred University(2010). Katie has been an Artist in Resident at Red Lodge Clay Center and Watershed Center for the Ceramic Arts. She has most recently received the Outstanding Student Achievement in Contemporary Sculpture Award from the International Sculpture Center as well as the Warren Mackenzie Advancement Award from Northern Clay Center. A native New Yorker, Katie returned to the city in 2018 and lives and works in Brooklyn.",
    medium: "Ceramics",
    email: "katie@mail.com",
    password: "12345"
  },
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
    status: 'closed',
    category: 'Dance',
    blurb: 'Would love some eyes on a new 30 second phrase I just came up with',
    summary: 'Got some great feedback from this session. Thanks partner!',
    image: 'images/Dance.jpg'
  },
  {
    status: 'closed',
    category: 'Joke',
    blurb: 'Need some help wording a joke',
    summary: 'OMG that was hilarious! We had so much fun.',
    image: '/images/Joke.jpg'
  },
  {
    status: 'closed',
    category: 'Painting',
    blurb: 'Who wants to paint the sunset?',
    summary: 'A lovely experience, co-painting tonight\'s sunset',
    image: '/images/Painting.jpg'
  },
  {
    status: 'closed',
    category: 'Poem',
    blurb: 'I want to write a sonnet',
    summary: 'We wrote a beautiful sonnet',
    image: '/images/Poem.jpg'
  },
  {
    status: 'closed',
    category: 'Music',
    blurb: 'I just wanna jam bro',
    summary: 'We had such a sweet jam sesh.'
  },
  {
    status: 'closed',
    category: 'Theater improv',
    blurb: 'Looking to do some fun theater improv games',
    summary: 'That was the first time in months that I was able to do theater improv games with someone. Had such a blast!'
  },
  {
    status: 'closed',
    category: 'Drawing',
    blurb: 'Can anyone model for me? I want to draw a portrait. You can keep the finished product!',
    summary: 'I had never modeled for an artist before but it was so cool to watch the process!'
  },
  {
    status: 'closed',
    category: 'Scene',
    blurb: 'Doing a reading of a new scene and would love some outside perspective.',
    summary: 'I loved practicing providing constructive feedback. Plus it was cool to watch actors in their element.'
  },
  {
    status: 'closed',
    category: 'Script',
    blurb: "Is anyone available to read over my new screenplay? I don't know if I like the ending",
    summary: 'Provided some tips for their screenplay\'s ending. I hope they appreciated my opinion!'
  },
  {
    status: 'closed',
    category: 'Music',
    blurb: 'Ukelele duet anyone?',
    summary: 'Really cool to duet over video conference.'
  },
  {
    status: 'closed',
    category: 'Comedy',
    blurb: 'What is humor? Would love to discuss.',
    summary: 'We had a really nice discussion about humor.'
  },
  {
    status: 'closed',
    category: 'Music',
    blurb: 'Anyone play guitar? I would like to try a duet.',
    summary: 'I wish we\'d had more time! Can\'t wait for my next createmates session!.'
  },
  {
    status: 'closed',
    category: 'Poem',
    blurb: 'Does anyone want to brainstorm words that rhyme with "toast"? Trying to write a poem about breakfast',
    summary: 'Finished the poem I have been working on for weeks!',
    image: '/images/Poem.jpg'
  },
  {
    status: 'closed',
    category: 'Music',
    blurb: "Let's singggggggggg",
    summary: 'Wow, found a new singing friend. So much fun!'
  },
  {
    status: 'closed',
    category: 'Dance',
    blurb: 'Looking to improvise with a partner. The prompt is: "Be Water"',
    summary: 'Such a pleasure to improvise with another dancer while remaining in the safety of our homes.',
    image: '/images/Dance.jpg'
  },
  {
    status: 'unmatched',
    category: 'Joke',
    blurb: "Knock knock. Who's there? I need help finishing this joke.",
    image: '/images/Joke.jpg'
  },
  {
    status: 'unmatched',
    category: 'Painting',
    blurb: 'Would anyone like to take a look at this painting I just finished? Need feedback.',
    image: '/images/Painting.jpg'
  },
  {
    status: 'unmatched',
    category: 'Poem',
    blurb: "Let's co-write a poem!",
    image: '/images/Poem.jpg'
  },
  {
    status: 'unmatched',
    category: 'Music',
    blurb: 'Anyone good with lyrics?',
    image: './images/Music.jpg'
  },
  {
    status: 'unmatched',
    category: 'Theater improv',
    blurb: 'Beginner improviser. Looking to chat with someone with more experience and get some tips.',
    image: './images/Theater-improv.jpg'
  },
  {
    status: 'unmatched',
    category: 'Drawing',
    blurb: "Let's share each other's work and give each other constructive feedback!",
    image: './images/Drawing.jpg'
  },
  {
    status: 'unmatched',
    category: 'Scene',
    blurb: 'Any actors that would like to act out this scene with me?',
    image: './images/Scene.jpg'
  },
  {
    status: 'unmatched',
    category: 'Scene',
    blurb: "I need help crying on demand for this scene I'm rehearsing. Anyone got tips?",
    image: './images/Scene.jpg'
  },
  {
    status: 'unmatched',
    category: 'Script',
    blurb: 'Anyone want to brainstorm screenplay ideas?',
    image: './images/Script.jpg'
  },
  {
    status: 'unmatched',
    category: 'Dance',
    blurb: "I'm going to do a Cunningham warmup. Anyone want to join?",
    image: '/images/Dance.jpg'
  },
  {
    status: 'unmatched',
    category: 'Poem',
    blurb: 'Cannot write the last line of this poem, help!!!',
    image: '/images/Poem.jpg'
  },
  {
    status: 'unmatched',
    category: 'Music',
    blurb: 'Anyone want to do a vocal warmup?',
    image: './images/Music.jpg'
  },
  {
    status: 'unmatched',
    category: 'Joke',
    blurb: "Can someone honestly tell me if I'm funny?",
    image: '/images/Joke.jpg'
  },
  {
    status: 'unmatched',
    category: 'Theater improv',
    blurb: 'Improv actor looking for tips on zoom performances.',
    image: './images/Theater-improv.jpg'
  },
  {
    status: 'unmatched',
    category: 'Drawing',
    blurb: "What's your favorite pencil company? Anyone want to discuss?",
    image: './images/Drawing.jpg'
  },
]

const seed = async () => {
  try {
    await db.sync({ force: true });

    const artists = await Promise.all(
      users.map((user) =>
         User.create({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
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
          summary: session.summary,
          image: session.image,
        })
      )
    )

    for (let i = 0; i < 15; i++) {
      await sessions[i].addUser(artists[i])
      if (i === 14) {
        await sessions[i].addUser(artists[0])
      } else {
        await sessions[i].addUser(artists[i + 1])
      }
      let finish = Math.ceil(Math.random() * 3)
      for (let j = 0; j < finish; j++) {
        await sessions[i].addTag(tags[Math.floor(Math.random() * tags.length)])
      }
    }

    for (let i = 15; i < 30; i++) {
      await sessions[i].addUser(artists[i - 15])
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
