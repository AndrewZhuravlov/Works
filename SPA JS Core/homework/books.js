const books = [
    {
        id: 0,
        name: '67 Tales',
        author: 'Edgar Allan Poe',
        imageUrl: 'https://img.thriftbooks.com/api/images/m/d30d95d6e0774c62785e6810e50d4821389b984a.jpg',
        plot:   `67 tales from a master of the short story.
                Includes the incomparableThe Fall of the House of Usher, The Cask of Murders in the Rue Morgue,
                The Pit and the PendulumandThe Tell-Tale Heart as well as
                "The Raven"andThe Narrative of Arthur Gordon Pym. 769 pages.`
    },
    {
        id: 1,
        name: 'The Metamorphosis',
        author: 'Franz Kafka',
        imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1359061917l/485894.jpg',
        plot:   `As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into
                 a gigantic insect. He was laying on his hard, as it were armor-plated, back and when he lifted his head
                a little he could see his domelike brown belly divided into stiff arched segments on top of which the
                bed quilt could hardly keep in position and was about to slide off completely. His numerous legs, which
                 were pitifully thin compared to the rest of his bulk, waved helplessly before his eyes.`
    },
    {
        id: 2,
        name: 'Necronomicon',
        author: 'H.P. Lovecraft',
        imageUrl: 'https://img.yakaboo.ua/media/catalog/product/' +
        'cache/1/image/398x565/234c7c011ba026e66d29567e1be1d1f7/n/e/necronomicon_front.jpg',
        plot:   `This handsome tome collects together the very best of Lovecraft's tales of terror, including the
                 complete Cthulhu Mythos cycle, just the way they were originally published. It will introduce a whole 
                 new generation of readers to Lovecraft's fiction, as well as being a must-buy for those fans
                 who want all his work in a single, definitive, highly attractive volume.`
    }
]
localStorage.setItem('books', JSON.stringify(books));