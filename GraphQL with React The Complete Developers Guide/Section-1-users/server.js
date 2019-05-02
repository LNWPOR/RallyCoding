const express = require('express');
const expressGraphQL = require('express-graphql');// เป็น middlewate กาวระหว่าง express, graphql
const schema = require('./schema/schema');

const app = express();

// ถ้ามี request มา path นี้ ดังนั้นให้ใช้ graphql ช่วยจัดการ request
// ต้องระบุ schema ด้วย
app.use('/graphql', expressGraphQL({
  schema, // schema:schema
  graphiql: true
}));


app.listen(4000, ()=>{
  console.log('Listening');
});