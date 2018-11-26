import * as es from "elasticsearch";

class ElasticSearchClient {
  private client: es.Client;

  constructor() {
    this.client = new es.Client({
      host: 'localhost:9200',
      // log: 'trace'
    });
  }

  putMappings(mapping: { [key: string]: any }) {
  }
}