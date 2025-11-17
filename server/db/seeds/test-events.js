/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('events').del()
  await knex('events').insert([
    {
      name: 'ENCORE DANCERS SHOWCASE',
      host: 'ART DECO TRUST EVENT',
      bio: "The Encore Deco Dancers will once again be performing iconic Art Deco style dance throughout the City over the Napier Art Deco Festival. Join the dancers and special guests for their annual showcase, celebrating all that is Deco 'with song & dance'. This incredible troupe will also be popping up all over the Deco quarter during the Festival weekend bringing their moves to the streets, so keep an eye out!",
      dates: 'February 21, 2026 11:00-11:45;February 21, 2026 15:45-16:45',
      location: 'Napier Soundshell, Marine Parade, Napier',
      price: 'NZD 0.00',
    },
    {
      name: 'DECO BAY BRASS',
      host: 'ART DECO TRUST EVENT',
      bio: "Relax to the sounds of Deco Bay Brass! With a sound that blends jazz, swing, and traditional brass band favourites, Deco Bay Brass has become a fixture in Hawke's Bay's music scene. The band brings together players young and old, united by a love of performance and community spirit. ",
      dates: 'February 21, 2026 12:15-13:45',
      location: 'Napier Soundshell, Marine Parade, Napier',
      price: 'NZD 0.00',
    },
    {
      name: 'DECO DOG PARADE',
      host: 'ART DECO TRUST EVENT, SUPPORTED BY SUPERIOR PET FOOD CO.',
      bio: "Another one of the festival's most popular events - the Deco Dog Parade. Join us for another year of celebrating sartorial canines and their stylish owners. Dress yourself and your pup in your best Deco- inspired outfits, and don't forget to register online early at artdecofestival.co.nz for your chance to win fantastic prizes. The parade is sure to be a howling success. You can also head down on the day, with limited late registrations open from 8:00am - 8:45am. ",
      dates: 'February 22, 2026 09:00-10:00',
      location: 'Napier Soundshell, Marine Parade, Napier',
      price: 'NZD 0.00',
    },
    {
      name: 'SOAP BOX DERBY',
      host: 'ART DECO TRUST EVENT, SPONSORED BY CONROY REMOVALS',
      bio: "This is one of the festival's most popular events. The annual Soap Box Derby competition is back again, ready for children and parents to race their home- made carts in front of thousands who come to watch and cheer them on. Race rules and cart specifications are available at: www.artdecofestival.co.nz. Great prizes up for grabs! Coordinated by the Rotary Club of Ahuriri Sunrise. Please Note: Mustering and scrutineering is at 9.00am in Herschell Street by the MTG (access via Browning Street). First race at 10.00am. Starting line is 7 Tennyson Street, Napier (opposite the Art Deco Masonic Hotel).",
      dates: 'February 22, 2026 10:00-11:00',
      location: 'Tennyson Street, Napier',
      price: 'NZD 0.00',
    },
    {
      name: 'TREMAINS GATSBY PICNIC GRAZING BOX - ROAM',
      host: 'ASSOCIATED EVENT',
      bio: "Let the team at ROAM cater for your Gatsby Picnic with one of its thoughtfully constructed grazing boxes. These delicious hampers that celebrate Hawke's Bay, its produce and artisans, have carefully been put together for you to enjoy. Whether you are from out of town, do not have time, or just simply want to dine in style, these sumptuous hampers will not disappoint. Please note: Hampers must be pre-ordered via iTICKET and collected from ROAM on the day to enjoy at your own Gatsby Picnic site.",
      dates: 'February 22, 2026 10:00-13:00',
      location: 'Collect at ROAM, 189 Marine Parade, Napier',
      price:
        'NZD 80.00 (sandwich box- 10 people);NZD NZD 120.00 (small grazing box- 2-4 people);NZD 220.00 (large grazing box- 6-10 people)',
    },
    {
      name: 'VERONICA BELL CEREMONY',
      host: 'ART DECO TRUST EVENT',
      bio: "A Moment of Commemoration. We gather with the Acting Dean of the Anglican Cathedral, the Westshore Sea Scouts, and members from the Napier Pipe Band, to honour the memory of the 1931 earthquake — one of New Zealand's greatest natural disasters. At the heart of the ceremony stands the Veronica Bell, a lasting symbol of both tragedy and strength. Gifted in recognition of the Navy's tireless efforts in the aftermath, it continues to be rung as a reminder of resilience, compassion, and community. As we remember those who lost their lives, we also give thanks for the enduring spirit that carried Hawke's Bay forward in the face of devastation. The ceremony concludes with the Veronica Bell escorted to the Cathedral by a bagpiper and drummer from the Napier Pipe Band.",
      dates: 'February 22, 2026 12:00-12:30',
      location: 'Veronica Sun Bay, Napier Soundshell,Marine Parade, Napier',
      price: 'NZD 0.00',
    },
    {
      name: 'THE DECO TIMES',
      host: 'ART DECO TRUST EVENT',
      bio: "Stay up to date with today 's events by picking up your complimentary copy of The Deco Times from one of our young newspaper hawkers on the street or from The Art Deco Trust (Memorial Square). Printed daily, it features the full schedule of performers on Emerson Street and the Sound Shell, details of all festival happenings, late additions to the programme since October, and special announcements. ",
      dates:
        'February 20, 2026 13:00-15:00;February 21, 2026 10:00-12:00;February 22, 2026 10:00-12:00',
      location:
        'Emerson Street, Napier Soundshell, Marine Parade or the Art Deco Trust, Memorial Square. Napier',
      price: 'NZ 0.00',
    },
    {
      name: 'BOOTLEGS & BURLESQUE: A DECO-GLAM CABARET',
      host: 'INDEPENDENT EVENT',
      bio: 'Step into a world of forbidden glamour and vintage rebellion at Bootlegs & Burlesque - where cocktails flow, boas swirl through the air, and the spirit of Deco-Glam reigns supreme. This immersive cabaret experience invites you to a night of sultry jazz, dazzling circus and elegant burlesque performances, all wrapped in a speakeasy setting. Cash bar (with featured cocktails) available. For tickets go to www.toitoivenues.co.nz',
      dates: 'February 21, 2026 20:00-22:00',
      location:
        "Toitoi: Hawke's Bay Arts and Events Centre, 109 Hastings Street South, Eastbourne Corner, Hastings",
      price: 'NZD 75.00',
    },
    {
      name: 'BRUNCH WITH STYLE AT THE COUNTY HOTEL',
      host: 'ASSOCIATED EVENT',
      bio: 'Why not start your Deco Day with celebratory "French bubbles" at the County. Revel in the delights of a gourmet brunch matched with exceptional service and Art Deco fun and frivolity in charming surroundings. Dine for 1 hour. ',
      dates:
        'February 19, 2026 11:00-12:00;February 20, 2026 09:30-10:30;February 21, 2026 09:30-10:30;February 22, 2026 09:30-10:30;February 20, 2026 11:30-12:30;February 21, 2026 11:30-12:30;February 22, 2026 11:30-12:30;February 20, 2026 13:30-14:30;February 21, 2026 13:30-14:30;February 22, 2026 13:30-14:30',
      location: 'The County Hotel, 12 Browning Street, Napier',
      price: 'NZD 95.00',
    },
    {
      name: 'KNEES UP',
      host: 'ASSOCIATED EVENT',
      bio: "The 1930s were a time of great social change and upheaval including The Great Depression, but amid the challenges, a strong sense of community and resilience shone through. A unique dining experience where audience participation will be encouraged. Enjoy a hearty cook- up and a cheerful singalong to the tunes of the 1920s and 1930s. Dress in your best recycled vintage 'make do and mended' outfits for a night to remember. For added comfort bring your own cushion to sit on!",
      dates:
        'February 19, 2026 19:00-21:30;February 20, 2026 19:00-21:30;February 21, 2026 19:00-21:30',
      location: 'The Gatsby Room, K Kitchen and Bar,2 Tennyson Street, Napier',
      price: 'NZD 50.00',
    },
    {
      name: 'AS THE DUST SETTLES',
      host: 'INDEPENDENT EVENT',
      bio: 'In the aftermath of the 1931 earthquake, many Napier residents left their homes for makeshift camps in parks and along the foreshore. Although most houses remained standing, broken chimneys and windows, scattered debris, ongoing aftershocks and the loss of power meant it would be some time before people felt safe enough to return. This recreated encampment honours the community spirit shown in the days immediately following the earthquake, with coal range cooking and a field hospital re-creation remembering those who rolled up their sleeves to help one another.',
      dates:
        'February 20, 2026 10:00-19:00;February 21, 2026 10:00-19:00;February 22, 2026 10:00-16:00',
      location: 'Beach front below the Sun Dial, Marine Parade, Napier',
      price: 'NZD 0.00',
    },
    {
      name: 'STEAM EXPLORER',
      host: 'ASSOCIATED EVENT',
      bio: "Travel in style on a 1904 Steam Traction Engine, take in the views around past the port and through Ahuriri to stop at the National Tobacco Company Building for a photo and quick visit to learn about some of its history. Then continue on to one of Napier's best kept secrets - the Faraday Museum - where you will be able to explore historic technology for a short time.We will then return back through town and Tennyson Street to our drop off point outside the MTG.Duration, 2 hours and 30 mins.",
      dates:
        'February 19, 2026 08:30-11:00;February 19, 2026 11:15-13:45;February 19, 2026 14:00-16:30;February 20, 2026 08:30-11:00;February 20, 2026 11:15-13:45;February 20, 2026 14:00-16:30',
      location: 'Beach front below the Sun Dial, Marine Parade, Napier',
      price: 'NZD 0.00',
    },
  ])
}
