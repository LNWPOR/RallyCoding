const graphql = require('graphql');
const axios = require('axios');
// const _ = require('lodash');

const{
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull 
} = graphql;

// !!! companyType ต้องประกาศก่อน userType
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({ // ต้องประกาศเป็น function เพื่อให้มันไม่งง ว่าเอา UserType มาจากไหน เนื่องจากรเาสร้าง UserType ทีหลัง เพราะ function นั้น js คือ define ไว้แต่ยังไม่ execute จึงปลอดภัยไม่งงตัวแปลหาย
                    // พอทั้งไฟล์ execute หมดแล้ว graphql มันจะตามมา execute function เหล่านี้ที่ define ไว้อีกทีเอง
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType), // มันจะงงว่าเอา UserType มาจากไหนเนื่องจากเราประกาศ UserType ทีหลัง ดังนั้นต้องกระกาศ fields เป็น function
      resolve(parentValue, args){ // parentValue = instance of object we are working with. // for this it is company
        return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then(res=>res.data)
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',// มักตั้งชื่อเหมือนชื่อ type พยางแรก
  // fields: {
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType, // อารมณ์เหมือนใช้ type ที่ตัวเองสร้างเอง
      resolve(parentValue, args){
        return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then(res=>res.data)
      }
    }
  })
});

// const users = [
//   { id : '23', firstName: 'Bill', age: 20},
//   { id : '47', firstName: 'Gill', age: 40},
// ]

// ใช้ Root เพื่อเป็นตัวกำหนดการ query
// เหมือนเป็นการเพิ่มช่องทางให้เจาะไปเอาของที่ node type นั้นๆได้
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentVlue, args){ // go in db and find data we are looking for , args มีของจาก  args ด้านบน
        // return _.find(users, { id: args.id });
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then(resp => resp.data);// axios มันจะเอา resp ที่ได้มาใส่ไว้ใน data ก่อน ซึ่งทำให้ graphql งงว่าของอยู่ใน ดังนั้นเราต้องดึงออกจาก data ก่อน
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString }},
      resolve(parentValue, args){
        return axios.get(`http://localhost:3000/companies/${args.id}`)
          .then(resp=>resp.data);
      }
    }
  }
});

// ใช้ mutation เป็นตัวทำการเข้ามาแก้ไข เพิ่มลบข้อมูล
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType, // type ค่าที่คืน ( จะสังเกตว่า ไม่จำเป็นตัองตรงตามชื่อ fields )
      args: { // args ที่อยากให้คนเรียก query ส่งมา
        firstName: { type: new GraphQLNonNull(GraphQLString) }, // ใช้ GraphQLNonNull เพื่อสั่งให้คนเรียกจำเป็นต้องระบุมา ตอนเขียน doc มันจะระบุให้ด้วยว่า เป็นฟิลที่ต้องระบุ
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString }
      },
      resolve(parentValue, { firstName, age}){
        return axios.post('http://localhost:3000/users', { firstName, age })
          .then(res=>res.data);
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { id }) {
        return axios.delete(`http://localhost:3000/users/${id}`)
          .then(res=>res.data);
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString)},
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString }
      },
      resolve(parentValue, args){
        return axios.patch(`http://localhost:3000/users/${args.id}`, args) // ยิงไป json-server ดังนั้นไม่ต้องกังวลว่า ใน args ซึ่งกลยาเปน body ของ request มี id ติดไปด้วยมันจะงงไหม
                                                                          // json-server จะ ignore id ใน body เอง ดังนั้นไม่ต้องกลัวมัน update id
          .then(res => res.data);
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation// mutation: mutation
})
// module.exports = new GraphQLSchema({
//   query: RootQuery
// });