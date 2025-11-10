/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('events').del()
  await knex('events').insert([
    {
      id: 1,
      name: 'ENCORE DANCERS SHOWCASE',
      host: 'ART DECO TRUST EVENT',
      bio: "The Encore Deco Dancers will once again be performing iconic Art Deco style dance throughout the City over the Napier Art Deco Festival. Join the dancers and special guests for their annual showcase, celebrating all that is Deco 'with song & dance'. This incredible troupe will also be popping up all over the Deco quarter during the Festival weekend bringing their moves to the streets, so keep an eye out!",
      dates: 'February 21, 2026 11:00-11:45;February 21, 2026 15:45-16:45',
      location: 'Napier Soundshell, Marine Parade, Napier',
      price: 'NZD 0.00',
    },
    {
      id: 2,
      name: 'DECO BAY BRASS',
      host: 'ART DECO TRUST EVENT',
      bio: "Relax to the sounds of Deco Bay Brass! With a sound that blends jazz, swing, and traditional brass band favourites, Deco Bay Brass has become a fixture in Hawke's Bay's music scene. The band brings together players young and old, united by a love of performance and community spirit. ",
      dates: 'February 21, 2026 12:15-13:45',
      location: 'Napier Soundshell, Marine Parade, Napier',
      price: 'NZD 0.00',
    },
    {
      id: 3,
      name: 'DECO DOG PARADE',
      host: 'ART DECO TRUST EVENT, SUPPORTED BY SUPERIOR PET FOOD CO.',
      bio: "Another one of the festival's most popular events - the Deco Dog Parade. Join us for another year of celebrating sartorial canines and their stylish owners. Dress yourself and your pup in your best Deco- inspired outfits, and don't forget to register online early at artdecofestival.co.nz for your chance to win fantastic prizes. The parade is sure to be a howling success. You can also head down on the day, with limited late registrations open from 8:00am - 8:45am. ",
      dates: 'February 22, 2026 09:00-10:00',
      location: 'Napier Soundshell, Marine Parade, Napier',
      price: 'NZD 0.00',
    },
    {
      id: 4,
      name: 'SOAP BOX DERBY',
      host: 'ART DECO TRUST EVENT, SPONSORED BY CONROY REMOVALS',
      bio: "This is one of the festival's most popular events. The annual Soap Box Derby competition is back again, ready for children and parents to race their home- made carts in front of thousands who come to watch and cheer them on. Race rules and cart specifications are available at: www.artdecofestival.co.nz. Great prizes up for grabs! Coordinated by the Rotary Club of Ahuriri Sunrise. Please Note: Mustering and scrutineering is at 9.00am in Herschell Street by the MTG (access via Browning Street). First race at 10.00am. Starting line is 7 Tennyson Street, Napier (opposite the Art Deco Masonic Hotel).",
      dates: 'February 22, 2026 10:00-11:00',
      location: 'Tennyson Street, Napier',
      price: 'NZD 0.00',
    },
    {
      id: 5,
      name: 'TREMAINS GATSBY PICNIC GRAZING BOX - ROAM',
      host: 'ASSOCIATED EVENT',
      bio: "Let the team at ROAM cater for your Gatsby Picnic with one of its thoughtfully constructed grazing boxes. These delicious hampers that celebrate Hawke's Bay, its produce and artisans, have carefully been put together for you to enjoy. Whether you are from out of town, do not have time, or just simply want to dine in style, these sumptuous hampers will not disappoint. Please note: Hampers must be pre-ordered via iTICKET and collected from ROAM on the day to enjoy at your own Gatsby Picnic site.",
      dates: 'February 22, 2026 10:00-13:00',
      location: 'Collect at ROAM, 189 Marine Parade, Napier',
      price:
        'NZD 80.00 (sandwich box- 10 people);NZD NZD 120.00 (small grazing box- 2-4 people);NZD 220.00 (large grazing box- 6-10 people)',
    },
  ])
}
