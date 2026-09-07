const products = [
  {
    id: 'gold-touch-01',
    name: 'Iga metall, mida puudutan, muutub kullaks',
    priceCents: 5000,
    priceLabel: '50 kükki igal hommikul',
    description: '',
    image: '/assets/golden-touch.png'
  },
  {
    id: 'backorder-01',
    name: 'Saan teleporteeruda igasse WC-sse, kus olen kunagi käinud',
    priceCents: 10000,
    priceLabel: 'kord nädalas teen süüa 10 võõrale',
    description: '',
    image: '/assets/wc-portal.png'
  },
  {
    id: 'protein-sight-03',
    name: 'Tean iga roa valgusisaldust, kui seda näen',
    priceCents: 3000,
    priceLabel: 'üks kuu ilma kastmeta friikateta',
    description: '',
    image: '/assets/oracle-plate.png'
  },
  {
    id: 'photo-face-04',
    name: 'Kõik mu fotod tulevad esimesel katsel head',
    priceCents: 4200,
    priceLabel: '200 selfiet kustutan teiste telefonidest',
    description: '',
    image: '/assets/oracle-plate.png'
  },
  {
    id: 'rewind-minute-05',
    name: 'Saan ühe minuti jagu aega tagasi kerida',
    priceCents: 8800,
    priceLabel: 'igal teisipäeval loen kasutustingimused läbi',
    description: '',
    image: '/assets/time-pillow.png'
  },
  {
    id: 'password-memory-06',
    name: 'Mäletan kõiki paroole, aga ainult enda omi',
    priceCents: 2600,
    priceLabel: 'kolm aastat ei ütle "mul oli see kuskil kirjas"',
    description: '',
    image: '/assets/oracle-plate.png'
  },
  {
    id: 'queue-luck-07',
    name: 'Kõik järjekorrad liiguvad minu ees kiiremini',
    priceCents: 6100,
    priceLabel: 'iga kuu seisan ühe võõra eest pangakontoris',
    description: '',
    image: '/assets/lucky-logistics.png'
  },
  {
    id: 'find-anything-08',
    name: 'Leian alati asja, mida otsin',
    priceCents: 4700,
    priceLabel: 'igal pühapäeval sorteerin sokisahtlit',
    description: '',
    image: '/assets/lucky-logistics.png'
  },
  {
    id: 'lie-detector-09',
    name: 'Tean kohe, kas inimene valetab',
    priceCents: 9300,
    priceLabel: 'aasta aega vastan ausalt küsimusele "kuidas läheb?"',
    description: '',
    image: '/assets/oracle-plate.png'
  },
  {
    id: 'micro-sleep-10',
    name: 'Saan magada 8 tundi 20 minutiga',
    priceCents: 12500,
    priceLabel: '90 päeva ei vajuta snooze nuppu',
    description: '',
    image: '/assets/time-pillow.png'
  },
  {
    id: 'plant-life-11',
    name: 'Kõik taimed jäävad minu käes ellu',
    priceCents: 3400,
    priceLabel: 'pool aastat räägin basiilikuga iga hommik',
    description: '',
    image: '/assets/oracle-plate.png'
  },
  {
    id: 'child-translator-12',
    name: 'Saan alati aru, mida laps tegelikult tahab',
    priceCents: 7800,
    priceLabel: '40 õhtut loen sama raamatut sama häälega',
    description: '',
    image: '/assets/oracle-plate.png'
  },
  {
    id: 'taxi-two-13',
    name: 'Iga takso tuleb 2 minutiga',
    priceCents: 5300,
    priceLabel: '10 korda istun ees ja pean small talki',
    description: '',
    image: '/assets/lucky-logistics.png'
  },
  {
    id: 'avocado-oracle-14',
    name: 'Tean enne avamist, kas avokaado on küps',
    priceCents: 2500,
    priceLabel: '30 päeva ostan ainult hooajalisi vilju',
    description: '',
    image: '/assets/oracle-plate.png'
  },
  {
    id: 'battery-37-15',
    name: 'Mu telefonil on alati 37% akut',
    priceCents: 6600,
    priceLabel: 'iga reede laen kõigi teiste powerbanke',
    description: '',
    image: '/assets/time-pillow.png'
  },
  {
    id: 'email-answer-16',
    name: 'Ükski email ei jää vastuseta',
    priceCents: 7400,
    priceLabel: '100 korda kirjutan "aitäh, sain kätte"',
    description: '',
    image: '/assets/time-pillow.png'
  },
  {
    id: 'invisible-day-17',
    name: 'Saan korra päevas nähtamatuks muutuda',
    priceCents: 9700,
    priceLabel: 'kuus kuud kannan ainult helkurvesti',
    description: '',
    image: '/assets/wc-portal.png'
  },
  {
    id: 'silence-sense-18',
    name: 'Tean täpselt, millal vait olla',
    priceCents: 8900,
    priceLabel: '52 koosolekut ei alusta lauset sõnaga "tegelikult"',
    description: '',
    image: '/assets/oracle-plate.png'
  },
  {
    id: 'jokes-land-19',
    name: 'Kõik mu naljad maanduvad',
    priceCents: 7100,
    priceLabel: '25 korda naeran kellegi teise nalja üle esimesena',
    description: '',
    image: '/assets/golden-touch.png'
  },
  {
    id: 'free-parking-20',
    name: 'Leian igal pool tasuta parkimiskoha',
    priceCents: 8200,
    priceLabel: 'üks kuu pargin alati joone keskele',
    description: '',
    image: '/assets/lucky-logistics.png'
  }
];

function createMemoryDb(seedProducts = products) {
  async function all(sql, params) {
    if (sql.includes('order by name')) {
      return [...seedProducts].sort((a, b) => a.name.localeCompare(b.name));
    }
    return [];
  }

  async function get(sql, params) {
    if (sql.includes('where id = ?')) {
      return seedProducts.find((product) => product.id === params[0]) || null;
    }
    return null;
  }

  return { all, get };
}

function createProductRepository(db = createMemoryDb()) {
  async function listProductCatalog() {
    return db.all(
      'select id, name, price_cents as priceCents, price_label as priceLabel, description, image from products order by name',
      []
    );
  }

  async function findProductById(productId) {
    return db.get(
      'select id, name, price_cents as priceCents, price_label as priceLabel, description, image from products where id = ?',
      [productId]
    );
  }

  return {
    listProductCatalog,
    findProductById
  };
}

module.exports = { createMemoryDb, createProductRepository };
