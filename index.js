const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');
const cors = require('cors');

// スキーマ定義
const typeDefs = gql`
  type Query {
    helloFromBackend1: String
    helloFromBackend2: String
  }

  type Mutation {
    dummyMutation: String
  }
`;

// リゾルバ定義
const resolvers = {
  Query: {
    helloFromBackend1: async () => {
      const response = await axios.get('http://localhost:8000/api/hellojava');
      return response.data;
    },
    helloFromBackend2: async () => {
      const response = await axios.get('http://localhost:8001/api/hellogo');
      return response.data;
    },
  },
  Mutation: {
    dummyMutation: () => {
      return "Dummy mutation result";
    },
  },
};

// ApolloServerのインスタンス化
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: '*', // 任意のオリジンからのリクエストを許可（本番環境では推奨されません）
    credentials: true,
  },
});

// サーバーの起動
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
