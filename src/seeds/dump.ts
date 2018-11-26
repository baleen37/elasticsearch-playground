import * as faker from 'faker';
import * as elasticsearch from 'elasticsearch';

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  // log: 'trace'
});

const build = (index: number) => {
  return [{ index: { _index: 'baleen-search', _type: 'baleen', _id: index }, },
    {
      title: faker.commerce.productName(),
      tags: [...Array(10).keys()].map(() => faker.random.word()),
      colors: [...Array(faker.random.number(10)).keys()].map(() => faker.commerce.color()),
      score: faker.random.number(20000),
      price: faker.random.number(100000),
      properties: {
        fit: [...Array(faker.random.number(3)).keys()].map(() => faker.commerce.productAdjective()) ,
        material: [...Array(faker.random.number(3)).keys()].map(() => faker.commerce.productMaterial()),
      },
      date_created: faker.date.recent(365)
    },
  ];
};

const run = async () => {
  for (let i = 0; i < 10000; i++) {
    const documents = [];
    for (let j = 0; j < 1000; j++) {
      const idx = i * j;
      const doc = build(idx);
      documents.push(...doc);
    }
    await client.bulk({ body: documents })
  }
};

run();