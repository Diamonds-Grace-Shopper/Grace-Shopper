const data = {
  products:[
    {
      _id: '1',
      name: 'Prime Porterhouse, Wet Aged 20oz',
      price: '38',
      description: 'Indeed the very best of both worlds, this is one hearty steak. On one side, a tender Filet Mignon; on the other side, an intensely flavorful NY Strip.  Doesn’t get much better than this! Wet aged.',
      category: 'beef',
      image: '/images/image_11.jpeg'
    },
    {
      _id: '2',
      name: 'Filet - Prime, Wet Aged 10oz',
      price: '34',
      description: 'This is the most incredibly tender, buttery texture that is center cut from a pristine tenderloin and crafted by hand. Subtly marbled that enhances an even greater depth of flavor.  If you’ve been wanting a filet that will literally melt in your mouth- you found it! ',
      category: 'beef',
      image: '/images/image_21.jpg'
    },
    {
      _id: '3',
      name: '14 oz Bone-In Filet Prime, Wet Aged',
      price: '42',
      description: 'If you love tenderloin steak, you’ll love our USDA Prime Bone In Filet Mignon. Aged to perfection, this beef cut has a mild flavor and superior buttery texture, making it an excellent choice for special occasion dinners. The steak is hand-selected and hand-cut with precision by veteran butchers and wet aged a minimum of 21 days to enhance steak flavor and texture.',
      category: 'beef',
      image: '/images/image_31.png'
    },
    {
      _id: '4',
      name: 'NY Strip - Prime, Wet Aged 16oz',
      price: '38',
      description: 'A steakhouse staple. Sourced from the short loin, the strip is another tender cut of beef. A cut favored for its beefy flavor, our Strip Steaks are center cut, (no tough tendons here), and offer a bit less marbling than a Ribeye. All while providing a cut that is incredibly tender & flavorful. ',
      category: 'beef',
      image: '/images/image_41.jpg'
    },
    {
      _id: '5',
      name: 'NY Strip - Prime, Dry Aged 16oz',
      price: '36',
      description: 'A cut favored for its beefy flavor, our Strip Steaks are center-cut, (no tough tendons here), and offer less marbling than a Ribeye, while providing just enough to produce a cut that is incredibly tender, rich & flavorful. Its fine marbling and 41-day aging results in a more pronounced, nuttier flavor.',
      category: 'beef',
      image: '/images/image_51.jpg'
    },
    {
      _id: '6',
      name: 'Boneless Ribeye - Prime, Wet Aged 16oz',
      price: '31',
      description: 'The Ribeye gets such high praise because it’s the most well-marbled of all the steaks and tender to boot. We handcraft this steak to showcase the brilliantly marbled center, including a nice “Rib Eye Cap” on one end which is loaded with delicious flavor. ',
      category: 'beef',
      image: '/images/image_61.jpg'
    },
    {
      _id: '7',
      name: '36 oz Tomahawk Prime, Wet Aged',
      price: '64',
      description: 'Our Happy To Meat You Prime Tomahawk Ribeye is a true stand out.   Essentially an incredibly flavorful, tender and well marbled ribeye steak, this grand dame of the beef world is specifically cut with at least five inches of rib bone left intact and can feed 2-3 people.  Perfect any time, but especially when served at your next dinner party or grilling event or even as an ever so welcomed gift of great taste!',
      category: 'beef',
      image: '/images/image_71.jpg'
    },
    {
      _id: '18',
      name: '18 oz T-Bone - Prime, Wet Aged',
      price: '30',
      description: 'A junior version our Porterhouse, yet still the best of both worlds with a succulent NY Strip on one side and a tender, melt in your mouth filet on the other. Bone appetite!   ',
      category: 'beef',
      image: '/images/image_181.jpg'
    },
    {
      _id: '19',
      name: 'The Mother Chucker Prime Burger(Pack of 2; 8oz each)',
      price: '9',
      description: 'A Happy To Meat You (HTMY) exclusive! This is a carefully balanced blend of Prime Chuck & Outside Skirt to produce one of the most incredibly flavorful burgers ever! With the buttery flavor profile from our outside skirt and our quality prime chuck, we’ve personally created the best, most juiciest burger on earth. This bodacious blend is guaranteed NOT to dry out on the grill. Extra napkins not included.  (2) 8oz burgers per pack.',
      category: 'beef',
      image: '/images/image_191.jpg'
    },

    {
      _id: '20',
      name: '2 Rib Baby Back (2lbs each)',
      price: '30',
      description: 'The centerpiece of your next BBQ!  With 4lbs to work with, these meaty, juicy, and deliciously tender baby backs are sure to impress. (2) Racks (2) lbs each',
      category: 'beef',
      image: '/images/image_201.jpg'
    },
    {
      _id: '24',
      name: 'Japanese A5 Wagyu Ribeye Steak 14oz',
      price: '149',
      description: 'One show-stopping, finely marbled A5 Japanese Wagyu Ribeye, cut to 3/4-inch thickness. The ribeye is intensely marbled, decadent, umami-laden, with an unforgettable, rich mouthfeel.',
      category: 'Wagyu',
      image: '/images/image_241.jpg'
    },
    {
      _id: '25',
      name: 'Japanese A5 Wagyu Petite Striploin Steak 5oz',
      price: '54',
      description: 'Our petite striploin steaks are a great way to get a taste of sublime, A5 Kagoshima Wagyu in a manageable portion size. Each package comes with one A5 Wagyu Petite Striploin Steak.',
      category: 'Wagyu',
      image: '/images/image_251.jpg'
    },
    {
      _id: '26',
      name: 'Japanese A5 Wagyu Striploin Ends 11oz',
      price: '72',
      description: 'These A5 Japanese Wagyu Striploin Ends have the perfect balance of tenderness, texture, and flavor. Thinner pieces can be cut into strips, while thicker sections can be left whole and prepared as small steaks.',
      category: 'Wagyu',
      image: '/images/image_261.jpg'
    },
    {
      _id: '27',
      name: 'Japanese A5 Wagyu Filet Medallions 8oz',
      price: '120',
      description: 'Cut from the end of the tenderloin, these Japanese Wagyu Filet Medallions are exceptionally tender. Cook whole or cut in half for a fast sear; these are simply a must-eat.',
      category: 'Wagyu',
      image: '/images/image_271.jpg'
    },
    {
      _id: '28',
      name: 'Japanese A5 Wagyu Petite Striploin Trio 12oz',
      price: '130',
      description: 'Our petite striploin steaks are a great way to get a taste of sublime, A5 Wagyu in a manageable portion size. Each package comes with three A5 Wagyu Petite Striploin Steaks.',
      category: 'Wagyu',
      image: '/images/image_281.jpg'
    },
    {
      _id: '29',
      name: 'Japanese A5 Wagyu Rib Caps 3.5lb',
      price: '194',
      description: 'Known for its luxurious marbling and buttery umami finish, these delicious A5 Rib Caps (Rib Caps are lifter meat from above the ribeye) are ideal for sharing with a friend or two if you’re willing. Packed with two Japanese Wagyu Rib Caps to the total weight.',
      category: 'Wagyu',
      image: '/images/image_291.jpg'
    },
    {
      _id: '30',
      name: 'Japanese A5 Wagyu Prime Rib 4.5lb',
      price: '360',
      description: 'Indulge in the most amazingly marbled Rib Roast you have ever laid eyes on. Use this cut to create thick-cut A5 Wagyu Ribeye Steaks, or roast the entire Ribloin in the oven. Either way, it will be an unforgettable experience.',
      category: 'Wagyu',
      image: '/images/image_301.jpg'
    },

    {
      _id: '8',
      name: 'Chicken Breasts - 2 * 6oz',
      price: '14',
      description: 'Our chicken comes from the heart of Ohio’s Amish coutntry via Gerber’s Amish Farm,  where they have been raising better tasting chicken for over 6 decades. Never treated with hormones or antibiotics, 100% vegetarian diet.  (2) 6 oz  Chicken Breasts packaged per single order.',
      category: 'chicken',
      image: '/images/image_81.jpg'
    },
    {
      _id: '9',
      name: 'New Zealand Lamb Rack',
      price: '44',
      description: 'Our New Zealand 2 lb, 8 rib rack is raised solely on pasture. No hormones or antibiotics are used. New Zealand Lamb is an ideal choice for today’s high-energy lifestyles. It is low in calories, fat and cholesterol, and high in protein, b vitamins, zinc, and iron. Its rich, yet mild, non gamey, buttery flavor, lends itself to any number of cooking methods, from grilling to braising. ',
      category: 'lamb',
      image: '/images/image_91.jpg'
    },
    {
      _id: '10',
      name: 'Lamb Loin Chops ',
      price: '64',
      description: 'Premium grass fed lamb from selected ranches in Colorado.  Great pan-seared, sauteed or prepared on the grill. Loin chops are  great pan-seared, sautéed or prepared on the grill.',
      category: 'lamb',
      image: '/images/image_101.jpg'
    },
    {
      _id: '11',
      name: 'Pork Chops 2 * 8oz Center Cut',
      price: '8',
      description: 'Like well-marbled ribeye steaks, pork needs marbling, not water and sodium solutions. These 2, 8 oz center cut chops have natural marbling, making it naturally juicy and delicious.  For those more concerned with presentation, select our 12oz “Frenched” chop with a trimmed bone. ',
      category: 'pork',
      image: '/images/image_111.jpg'
    },
    {
      _id: '12',
      name: 'Gourmet Sliced Bacon (2.5 lbs)',
      price: '23',
      description: 'From the heart of Chicago with history tied back to the Union Stockyards, this gourmet, thick sliced bacon has been naturally cured and smoked, delivering uncompromising flavor.  This is the same bacon delivered to many of the top restaurants around the great states.  Now you can experience this luxurious cut for yourself, direct to your door. ',
      category: 'pork',
      image: '/images/image_121.jpg'
    },
    {
      _id: '13',
      name: 'Wild Caught Halibut - 2lb Box',
      price: '50',
      description: 'Delicate, firm white sweet flesh, there’s no question as to why these are fly fish’n out the door! , Our fresh, wild caught & hand trimmed halibut is as good as it gets. These boneless, skinless individually sealed 8oz portions are super convenient and the best way to store.  Hand cut and flash frozen for the freshest flavor. ',
      category: 'seafood',
      image: '/images/image_131.jpg'
    },
    {
      _id: '14',
      name: 'Fresh, Wild Caught Sea Bass - 2lb Box',
      price: '66',
      description: 'This chef-prized fish is known for its high-fat content and velvety mouthfeel.  Sea Bass has a rich, melt in your mouth texture. With its white flesh and flaky meat, you can use this in just about any white fish recipe. It accepts all spices and forgives very easy with any cooking method. Wild caught, hand cut and individually flash frozen in 8oz portions.',
      category: 'seafood',
      image: '/images/image_141.jpg'
    },
    {
      _id: '15',
      name: 'Salmon - 2lb Box',
      price: '34',
      description: 'Whether it’s a quick sear, roast or poach, our  #1 quality salmon is sustainably farm raised on the Canadian coast and are ready to impress.  The fresh Salmon portions are 4, 8oz and each portion is individually vacuum packaged.',
      category: 'seafood',
      image: '/images/image_151.jpg'
    },
    {
      _id: '16',
      name: 'Fresh, Wild Caught Tuna (A1 Grade, 2lb Box. 4 - 8oz pieces)',
      price: '70',
      description: 'Fresh from Hawaii’s waters, our Wild-Caught yellowfin tuna is a highly sought after fish all over the world.  At the highest grade possible, A1, the deep red, fatty meat is recognizable anywhere. When raw or lightly seared, yellowfin tuna adds a vibrant splash of appetizing color to any dish. You can enjoy it all on its own as an entree, or as a lean protein addition to salads, rice bowls, and sushi rolls.   ',
      category: 'seafood',
      image: '/images/image_161.jpg'
    },
    {
      _id: '17',
      name: 'Caribbean Lobster Tails (2, 8oz )',
      price: '49',
      description: 'From the pristine, warm, crystal clear waters of the Caribbean, these sweet warm water lobster tails are packed with meat and certain to satisfy your craving for the ultimate tail flavor experience. Sweeter than their cold water counterparts, warm water Lobster Tails offer sweet, succulent meat and help create amazing plate presentations. Perfect whether grilled, baked, broiled or steamed. Our Lobster Tails are caught fresh and immediately flash frozen to insure the ultimate flavor and texture. ',
      category: 'seafood',
      image: '/images/image_171.jpg'
    },

    {
      _id: '21',
      name: 'Wild Alaska King Crab Legs 3lb',
      price: '120',
      description: 'Alaska Red King Crab, caught in the frigid waters of the Bering Sea, is the largest and most sought-after of Alaskan crabs. Its legs are large, bright red with darker highlights around the spines and tips, and full of tender white meat that is packed with rich, delicious crab flavor. We have a limited supply of these beauties, sustainably caught and ready to ship to your door.',
      category: 'Seafood',
      image: '/images/image_211.jpg'
    },
    {
      _id: '22',
      name: 'Alaskan Dungeness Crab – Wild Caught',
      price: '47',
      description: '-Approximately (1) 2.0lbs – 3.0lbs whole Dungeness Crab. Our Dungeness are harvested, cooked, and flash-frozen in Southeast Alaska. The crab is individually wrapped for maximum freshness.',
      category: 'Seafood',
      image: '/images/image_221.jpg'
    },
    {
      _id: '23',
      name: 'SNOW CRAB 2lb',
      price: '46',
      description: 'Just as in our King Crab, Supreme’ s Snow Crab Clusters can be served hot or cold. For hot preparations, gentle heating is all that’s required once the legs are thawed. To steam, throw legs in a covered pot with an inch or so of water, bring to a boil and steam just until just heated through, about 5 minutes.',
      category: 'Seafood',
      image: '/images/image_231.jpg'
    },


  ]

}


export default data;

