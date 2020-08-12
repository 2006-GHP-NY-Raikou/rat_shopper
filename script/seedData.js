const users = [
  {
    email: 'admin@ratshopper.com',
    password: '32!980rjnjek@d890-1[323fsa',
    firstName: 'Admin',
    lastName: 'RatShopper',
    address: 'Outer Space @sdgh30-A',
    zipCode: 10000,
    country: 'NA',
    isAdmin: true
  },
  {
    email: 'cody@fullstack.com',
    password: '12345',
    firstName: 'Cody',
    lastName: 'Pug',
    address: 'Fullstack Academy Office #1',
    zipCode: 10004,
    country: 'US',
    isAdmin: false
  },
  {
    email: 'avidshopper@email.com',
    password: 'iLoveShopping',
    firstName: 'O',
    lastName: 'K',
    address: 'Rich Mansion Avenue #888',
    zipCode: 10282,
    country: 'US',
    isAdmin: false
  }
]

const products = [
  {
    name: 'Sirius',
    category: 'black',
    sex: 'male',
    price: 6750,
    quantity: 1,
    imageUrl:
      'https://image.shutterstock.com/image-photo/beautiful-gray-rat-isolated-on-260nw-1058967671.jpg',
    description: 'This rat sometimes looks like a dog'
  },
  {
    name: 'Luna',
    category: 'blue',
    sex: 'female',
    price: 5950,
    quantity: 1,
    imageUrl:
      'https://64.media.tumblr.com/08d0511d16049e1a006e27f8d85c5524/tumblr_po7h2uhFJk1rh0czs_1280.jpg',
    description: 'A very special, one-of-a-kind rat'
  },
  {
    name: 'Hermione',
    category: 'dumbo',
    sex: 'female',
    price: 7500,
    quantity: 1,
    imageUrl:
      'https://i.pinimg.com/originals/7f/23/cc/7f23ccef5cf4d94266b3dd4d61a10074.jpg',
    description: 'One of the smartest rats out there'
  },
  {
    name: 'Draco',
    category: 'dumbo',
    sex: 'male',
    price: 3500,
    quantity: 1,
    imageUrl:
      'https://i.pinimg.com/originals/7f/23/cc/7f23ccef5cf4d94266b3dd4d61a10074.jpg',
    description: 'Pretty rat and quite cunning'
  },
  {
    name: 'Fleur',
    category: 'dumbo',
    sex: 'female',
    price: 4100,
    quantity: 1,
    imageUrl:
      'https://i.pinimg.com/originals/7f/23/cc/7f23ccef5cf4d94266b3dd4d61a10074.jpg',
    description: 'Pretty rat'
  },
  {
    name: 'Hagrid',
    category: 'fuzz',
    sex: 'male',
    price: 4000,
    quantity: 1,
    imageUrl:
      'https://i.pinimg.com/originals/12/6e/d0/126ed045e4f08eac69dcc96d9608b042.jpg',
    description: 'This rat is on the larger side'
  },
  {
    name: 'Snape',
    category: 'sphynx',
    sex: 'male',
    price: 6900,
    quantity: 1,
    imageUrl:
      'https://cf.ltkcdn.net/small-pets/images/std/259853-425x274-hairless-pet-rat-1.jpg',
    description: 'This rat has two identities'
  },
  {
    name: 'Neville',
    category: 'satin',
    sex: 'male',
    price: 3990,
    quantity: 1,
    imageUrl:
      ' https://i.pinimg.com/originals/3f/9d/db/3f9ddb1309d1d22a4dd879d3b26ea53f.jpg',
    description: 'This rat makes great company'
  },
  {
    name: 'Harry',
    category: 'husky',
    sex: 'male',
    price: 5000,
    quantity: 1,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Ratte-Vache.jpeg/1200px-Ratte-Vache.jpeg',
    description: 'A very popular but perhaps overrated rat'
  },
  {
    name: 'Remus',
    category: 'husky',
    sex: 'male',
    price: 7000,
    quantity: 1,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Ratte-Vache.jpeg/1200px-Ratte-Vache.jpeg',
    description: 'This rat sometimes looks like a wolf'
  },
  {
    name: 'Ron',
    category: 'rex',
    sex: 'male',
    price: 6000,
    quantity: 1,
    imageUrl:
      'https://pm1.narvii.com/5814/f93414bcd343cc962d2cb21ed032617c98c77ba7_hq.jpg',
    description: 'Ginger rat!'
  },
  {
    name: 'Newt',
    category: 'rex',
    sex: 'male',
    price: 8000,
    quantity: 1,
    imageUrl:
      'https://beyondthetreat.com/wp-content/uploads/2019/05/Rex-rat.jpg',
    description: 'Very special rat, loves other animals and creatures'
  },
  {
    name: 'Dumblie',
    category: 'satin',
    sex: 'male',
    price: 7500,
    quantity: 1,
    imageUrl:
      ' https://i.pinimg.com/originals/3f/9d/db/3f9ddb1309d1d22a4dd879d3b26ea53f.jpg',
    description: 'An old but wise rat'
  },
  {
    name: 'Cowboy Hat',
    category: 'hat',
    sex: null,
    price: 1000,
    quantity: 10,
    imageUrl:
      'https://i.pinimg.com/originals/3a/c3/01/3ac301e53126d22f1e135c05fac4c9ec.jpg',
    description: "Yeeee haw lil\\' pardner!'"
  },
  {
    name: 'Spring Dress',
    category: 'clothes',
    sex: null,
    price: 3000,
    quantity: 5,
    imageUrl:
      'https://i.pinimg.com/originals/43/e7/d3/43e7d33d2ee3c04eb3e42dca04700f56.jpg',
    description:
      "Get your rat ready for spring with this dress from our prata 2021 collection'"
  },
  {
    name: 'Chic Harness',
    category: 'clothes',
    sex: null,
    price: 4000,
    quantity: 5,
    imageUrl:
      'https://thecabanasguesthouse.com/wiltondriveonline/wp-content/uploads/sites/8/2011/06/Sugar-and-Spice-storms-the-catwalk-in-this-matching-jacket-and-lead-ensemble.jpeg',
    description: "For the rat who wants to look fabulous on the go'"
  },
  {
    name: 'Witch Hat',
    category: 'hat',
    sex: null,
    price: 1000,
    quantity: 10,
    imageUrl:
      'https://petdiys.com/wp-content/uploads/2014/09/DIY-Rat-Witch-Hat.jpg',
    description: "This hat makes for a bewitching rat'"
  },
  {
    name: 'Sunglasses',
    category: 'props',
    sex: null,
    price: 5000,
    quantity: 20,
    imageUrl:
      'https://wallpapersgood.com.de/resize/640x960/wallpapers/main/201546/20309cc1d731ed6.jpg',
    description: 'Let your rat throw some shade!'
  },
  {
    name: 'Hoodies',
    category: 'clothes',
    sex: null,
    price: 6000,
    quantity: 20,
    imageUrl:
      'https://i.pinimg.com/originals/66/95/98/6695981f0275b1cc3d5ca87c159cf87e.png',
    description: 'Super soft and comfy!'
  },
  {
    name: 'Boxing Gear',
    category: 'props',
    sex: null,
    price: 7000,
    quantity: 34,
    imageUrl:
      'https://i.pinimg.com/236x/00/36/a1/0036a17dc6bedc0fe198d02dc7caec7f.jpg',
    description: 'For the rats that pack a punch'
  },
  {
    name: 'Top Hat',
    category: 'hat',
    sex: null,
    price: 5000,
    quantity: 12,
    imageUrl:
      'https://i.pinimg.com/originals/e9/d3/1e/e9d31e62bbfde85adc51d948d767f3ad.jpg',
    description: 'For the spiffy rats!'
  },
  {
    name: 'Birthday Hat',
    category: 'props',
    sex: null,
    price: 2200,
    quantity: 30,
    imageUrl:
      'https://i.pinimg.com/236x/19/16/b6/1916b6b68d0f12188c67e0b79cd65ec3--fancy-rat-cute-rats.jpg',
    description: "Celebrate your rat's birthday!"
  },
  {
    name: 'Flute',
    category: 'props',
    sex: null,
    price: 6000,
    quantity: 20,
    imageUrl:
      'https://rlv.zcache.com/cute_rat_playing_flute_postcard-r7d47941f9a7c4d1db63665da8dda12c3_vgbaq_8byvr_630.jpg?view_padding=%5B285%2C0%2C285%2C0%5D',
    description: 'For rats to pack anything they want!'
  },
  {
    name: 'Bango',
    category: 'props',
    sex: null,
    price: 8000,
    quantity: 20,
    imageUrl:
      'https://i0.wp.com/theverybesttop10.com/wp-content/uploads/2014/11/Top-10-Rats-Playing-Musical-Instruments-9.jpg?resize=600%2C436&ssl=1',
    description: 'For the musical rats'
  },
  {
    name: 'Stuffed Animal',
    category: 'props',
    sex: null,
    price: 7000,
    quantity: 20,
    imageUrl:
      'https://i.pinimg.com/originals/14/83/73/1483739108cb5bb27ac00507814fb657.jpg',
    description:
      'Because all rats deserve to snuggle with their favorite stuffed animal!'
  }
]

const orders = [
  {
    status: false,
    userId: 2
  },
  {
    status: true,
    userId: 2
  },
  {
    status: false,
    userId: 3
  },
  {
    status: true,
    userId: 3
  },
  {
    status: true,
    userId: 3
  },
  {
    status: true,
    userId: 3
  },
  {
    status: false,
    userId: 1
  }
]

const orderProducts = [
  {
    orderId: 1,
    productId: 2,
    qty: 1,
    priceAtPurchase: 4400
  },
  {
    orderId: 2,
    productId: 7,
    qty: 1,
    priceAtPurchase: 5500
  },
  {
    orderId: 2,
    productId: 11,
    qty: 1,
    priceAtPurchase: 5500
  },
  {
    orderId: 3,
    productId: 9,
    qty: 1,
    priceAtPurchase: 2300
  },
  {
    orderId: 3,
    productId: 5,
    qty: 2,
    priceAtPurchase: 2300
  }
]

const sessions = [
  {
    sId: 1,
    expires: '8/8/20',
    data: 'data goes here'
  },
  {
    sId: 2,
    expires: '8/9/20',
    data: 'data goes here'
  },
  {
    sId: 3,
    expires: '8/10/20',
    data: 'data goes here'
  },
  {
    sId: 4,
    expires: '8/11/20',
    data: 'data goes here'
  }
]

module.exports = {
  users,
  products,
  orders,
  orderProducts,
  sessions
}
