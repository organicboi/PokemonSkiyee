export interface PokemonData {
  id: number;
  name: string;
  image: string;
  type: string;
  message?: string;
}

export interface MysteryData {
  id: number;
  title: string;
  hint: string;
  solution: string;
  image: string;
  message: string;
}

export interface HauntedData {
  id: number;
  title: string;
  image: string;
  description: string;
}

export const pokemonData: PokemonData[] = [
  {
    id: 1,
    name: 'Pikachu',
    image: '/images/homepage-bg/pika.png',
    type: 'electric',
    message: 'I will always be there for you, just like Pikachu is always there for Ash.'
  },
  {
    id: 2,
    name: 'Eevee',
    image: '/images/homepage-bg/evee.png',
    type: 'normal',
    message: 'You are my Eevee, and I will always be your trainer.You can evolve in so many ways, just like our relationship!'
  },
  {
    id: 3,
    name: 'Gengar',
    image: '/images/homepage-bg/gengar.png',
    type: 'ghost',
    message: 'Even ghostly Pokemon can bring smiles, like our late night talks.'
  },
  {
    id: 4,
    name: 'Gardevoir',
    image: '/images/homepage-bg/Gardevoir.png',
    type: 'psychic',
    message: 'You\'ve always been my guardian, through thick and thin. I will also be your guardian, through thick and thin.'
  },
  {
    id: 5,
    name: 'Charizard',
    image: '/images/homepage-bg/charizard.png',
    type: 'fire',
    message: 'Our passion burns bright like Charizard\'s flame! so lets burn together always and forever. And not let this flame die.'
  },
  {
    id: 6,
    name: 'Umbreon',
    image: '/images/homepage-bg/umberon.png',
    type: 'dark',
    message: 'Even in darkness, we find our way to each other. Just like Umbreon and Espeon.'
  }
];

export const mysteryData: MysteryData[] = [
  {
    id: 1,
    title: 'First thing we did',
    hint: 'When we came in room...',
    solution: 'Hug',
    image: '/ourImages/photo1.jpg',
    message: 'I still remember how nervous I was that day!'
  },
  {
    id: 2,
    title: 'Special Song',
    hint: 'The song that I love you to sing for me...',
    solution: 'Dandelions',
    image: '/ourImages/photo5.1.jpg',
    message: 'That melody and your voice still gives me butterflies.'
  },
  {
    id: 3,
    title: 'Hidden Treasure',
    hint: 'The most precious thing I gave you...',
    solution: 'saree',
    image: '/ourImages/photo8.jpg',
    message: 'I still remember how you looked in it so beautiful and so gorgeous'
  }
];

export const hauntedData: HauntedData[] = [
  {
    id: 1,
    title: 'Midnight Whispers',
    image: '/images/scary1.jpg',
    description: 'One day we will explore the haunted house together and we will be scared together and we will laugh together and we wil shout together'
  },
  {
    id: 2,
    title: 'Abandoned Manor',
    image: '/images/scary2.jpg',
    description: 'lets go to movie theater and watch a horror movie together and you will hold my hand and come close to me'
  },
  {
    id: 3,
    title: 'Foggy Forest',
    image: '/images/scary3.jpg',
    description: 'Lets prank my friends by saying we are going to haunted house and we will scare them by shouting "Boo" how funny it will be!'
  }
];

export const personalMessage = "I know we've been going through a rough patch, but I want you to know how much you mean to me. All these memories we've created together are precious to me. I hope this little digital space reminds you of our adventures and brings a smile to your face. I miss the spark between us, but I believe we can find it again. ❤️"; 