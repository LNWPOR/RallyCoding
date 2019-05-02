https://www.udemy.com/javascript-es6-tutorial/learn/v4/overview
//============== ForEach =========================
var colors = ['red','blue','green'];
for(var i = 0;i<colors.length;i++){
    console.log(colors[i]);
}
// มีโอกาสพลาดเยอะ ตั้งแต่ syntax, ชื่อตัวแปร, ชื่อ item ณ loop นั้นๆ

// ส่ง function ให้ forEach เป็น callback
// เรียกฟังชันนี้ว่า Iterator funciton
// element แต่ละอันของ array จะถูกส่งเข้า iterator function ทีละอัน
// ทำงานเหมือน forloop แต่เขียน code น้อยกว่า และโอกาสพลาดน้อยกว่า
colors.forEach(function(color){
    console.log(color);
});

//================================================
// Create an array of numbers
var numbers = [1,2,3,4,5];
// Create a variable to hold the sum
var sum = 0;
function adder(number){
    sum += number;
}
// Loop over the array, incrementing sum variable
// argument ควรตั้งเป็น singular ของ array
numbers.forEach(function(number){
    sum += number;
});

// ไม่่ต้อง () ให้ adder ไม่งั้นจะเป็นการเอาผลลัพธ์จาก adder() ให้ forEach เลย
// ซึ่งเราไม่ต้องการ เราต้องการให้มันรันเรื่อยๆในอนาคต ตาม element ใน array
numbers.forEach(adder);

// *** array helper ตัวอื่นๆ สามารถ implement ได้ด้วย forEach

//============== Map =========================

var numbers = [1,2,3];
var doubledNumbers = [];

for(var i = 0;i<numbers.length;i++){
    doubledNumbers.push(numbers[i] * 2);
}
// ทำไมไม่แก้ ใน array numbers เลยหละ
// *** เนื่องจากการทำ app ใหญ่ๆจริงๆ ไม่ควรแก้ไขข้อมูลเดิม
// เนื่องจากถ้าเอาไปใช้หลายส่วน เราอาจจะหาไม่ได้ว่ามันเปลี่ยนเพราะตรงไหน
// ดังนั้นสร้าง array ใหม่เลยดีกว่า

var doubled = numbers.map(function(number){
    return number*2;
});
// *** ต้องมี return นะ ไม่งั้นจะเป็น undefined โดยอัตโนมัติ
// ของที่ถูก return จะ return ไปใส่ array ใหม่ทำกำลังจะสร้าง
// พอรันเข้า iterator function ทุก element แล้ว ก็จะได้ array ใหม่นั้นออกมา
//================================================

var cars = [
    { model:'Buick',price:'CHEAP'},
    { model:'Camaro',price:'expensive'},
];

// *** ท่านี้ใช้บ่อยในการเอาค่า field ใด field หนึ่งออกมา เป็น array ใหม่
var prices = cars.map(function(car){
    return car.price;
});
// app มักใช้ list of data เสมอ
// ดังนั้น map จึงใช้บ่อย ในการแปลงเอาข้อมูล object จาก db มาดัดแปลงใช้ในหน้า html

//============== Filter =========================
var products = [
    { name:'cucumber',type:'vegetable', quantity: 0, price: 1 },  
    { name:'banana',type:'fruit', quantity: 10, price: 15 },  
    { name:'celery',type:'vegetable', quantity: 30, price: 13 },  
    { name:'oranger',type:'fruit', quantity: 3, price: 5 }  
];

// จะเอาแต่ fruit
var filteredProducts = [];
for(var i = 0;i<products.length;i++){
    if(products[i].type === 'fruit'){
        filteredProducts.push(products[i]);
    }
}

// ถ้า iterator คืนค่าเป็น true ดังนั้นเอา element นั้นยัดใส่ array ใหม่
// false ดังนั้นไม่เอา
// ทำเสร็จทุก element ก็จะได้ array ใหม่ที่ filter แล้วคืนมา
// *** ต้องมี return true/false  นะ
products.filter(function(product){
    return product.type === 'vegetable';

    //อย่าเผลอเขียนแบบนี้นะ อาจบัค และ ทำงานซ้ำซ้อนด้วย เพราะต้อง เงื่อนไขมันก็คืน true/false ให้อยู่ละ
    /*
    if(product.type === 'vegetable'){
        return true;
    }
    */
});

// Type = vegetable, quatity>0, price < 10
products.filter(function(product){
    return product.type === 'vegetable'
        && product.quantity > 0
        && product.price < 10
});

//================================================
// เอา comment ของ post นั้นๆเท่านั้น ซึ่งเชื่อมกันด้วย id ของ post
var post = {id:4,title:'New Post'};
var comments = [
    { postId:4, content: 'awesome post'},
    { postId:3, content: 'it was ok'},
    { postId:4, content: 'neat'}
];

function commentsForPost(post,comments){
    return comments.filter(function(comment){
       return comment.postId === post.id; 
    });
}

//============== Find =========================
var users = [
    { name : 'Jill'},
    { name : 'Alex'},
    { name : 'Bill'}
];
var user;
for(var i = 0;i<users.length;i++){
    if(users[i].name === 'Alex'){
        user = users[i];
        break;
    }
}

// find helper เรียก iterator function เรื่อยๆ จนกว่า จะ return true
// return true ปุ๊ป ดังนั้นคืนค่า element นั้น แล้วหยุดทันที
// ดังนั้นถ้ามีอันที่ true มากกว่าหนึ่งอัน เฉพาะอันแรกเท่านั้นที่ถูก return
/*var users = [
    { name : 'Jill'},
    { name : 'Alex'},
    { name : 'Bill'},
    { name : 'Alex'}
];*/
// *** ต้องใส่ return true/false 
users.find(function(user){
    return user.name === 'Alex';
});
// ไม่ต้องใช้ if เทียบนะซับซ้อน// อารมเดียวกับ filter

//================================================
var cars = [
    new Car('Buick'),
    new Car('Camaro'),
    new Car('Focus')
]

function Car(model){
    this.model = model;
}

cars.find(function(car){
    return car.model === 'Focus';
});
//================================================
var posts = [
    {id:1,title:'New Post'},
    {id:2,title:'Old Post'}
];
var comment = { postId: 1, content:'Great Post'};

function postForComment(posts,comment){
    return posts.find(function (post) {
        return post.id === comment.postId;
    });
}

// มักเอาไปใช้เวลากดเลือก Post จาก list แล้วไปที่หน้า detail ดังนั้นต้องเอา id ของ post นั้นจาก url
// ไปหาข้อมูลต่อมาใช้ในหน้า detail

//============== Every / Some =========================
// Every, Some, Reduce จะคล้ายๆกันคือ จะนำผลลัพธ์จาก การยัด element ใส่ iterator 
// แต่ละผลลัพธ์มาคิดรวบ รวมกันเป็ยผลลัพธ์สุดท้ายกันอีกทีตอนหลังค่าเดียว

var computers = [
    {name:'Apple',ram:24},
    {name:'Compaq',ram:4},
    {name:'Acer',ram:32}
]

var allComputersCanRunProgram = true;
var onlySomeComputerCanRunProgram = false;

for(var i = 0;i<computers.length;i++){
    var computer = computers[i];
    if(computer.ram < 16){
        allComputersCanRunProgram = false;
    }else{
        onlySomeComputerCanRunProgram = true;
    }
}

// every เอาผลลัพธ์จากทุรอบ iterator true/false มา && กัน
// แล้วคืนผล true/false รวมออกไป
// *** ต้อง return true/false ด้วย
computers.every(function (computer) {
    return computer.ram > 16;
});

// some เอาผลลัพธ์จากทุรอบ iterator true/false มา || กัน
// แล้วคืนผล true/false รวมออกไป
// *** ต้อง return true/false ด้วย
computers.some(function (computer) {
    return computer.ram > 16; 
})
//================================================
var names = [
    "Alexandria",
    "Matthew",
    "Joe",
];
name.every(function(name){
    return name.length > 4;
});
names.some(function (name) {
    return name.length > 4;
});
//================================================
function Field(value){
    this.value = value;
}
Field.prototype.validate = function(){
    return this.value.length > 0;
}
var username = new Field("2cool");
var password = new Field("my_password");

// ถ้า field น้อยๆยังพอเช็คท่านี้ไหว
// username.validate() && password.validate();
// ถ้า field เยอะ มันจะเป็นยังไง จะยาว จะแก้ไขทีหลังยาก จะเพิ่มฟิลล์ที่หลังยาก

// ทำท่านี้จะแก้ไขง่ายกว่า
var fields = [username, password]
var formIsValid = fields.every(function(field){
    return field.validate();
});

//============== Reduce =========================
// flexible มากๆ
// *** สามารถใช้ reduce reimplement array helper ตัวอื่นได้หมด
var numbers = [10,20,30];
var sum = 0;
for(var i = 0 ;i<numbers.length;i++){
    sum += numbers[i];
}

// argument 1st ของ iterator คือ initial value ที่กำหนดได้จาก 2nd argument ของ reduce
// argument 2nd ของ iterator ก็คือ แต่ละ element ตามเดิม
// ซึ่งค่านี้ที่ return ออกไปในแต่ละรอบ จะถูกนำไปเป็น initial ของรอบ element ถัดไป
// = ไปเป็น argument 1st ของรอบต่อไป
// อารมณ์เหมือนรวมค่าทุกรอบเป็นค่าเดียว concept เดียวกับ every,some (รวมผลลัพธ์ออกมาเป็นอีกผลลัพธ์)
// *** ต้อง return ด้วย
numbers.reduce(function (s,number) {
    return s + number;
}, 0);

var primaryColors = [
    {color:'red'},
    {color:'yellow'},
    {color:'blue'},
];

// ตัวแปลแรกตั้งชื่อลำบาก อาจตั้งว่า previous หรือ accumlator, mem ก็ได้ก็ดูตรงตามการใช้งานดี
// previous ดูเข้าใจง่ายสุด
// จะสังเกตว่าเราทำการ แก้ไข previous ตลอด แต่ไม่เป็นไร เพราะมันไม่ได้กระทบกับข้อมูลข้างนอกอื่น
primaryColors.reduce(function (previous, primaryColor) {
    previous.push(primaryColor.color);
    return previous;
}, []);
//================================================
// Interview balance () question
// ใช้ reduce แก้ปัญหานี้ได้อย่างหล่อๆ
function balancedParens(string){
    // javascript ใช้ ! จะ flip >=0 เป็น True ได้, <0 เป็น False
    return !string.split("").reduce(function(previous, char){
        if(previous < 0){return previous} // กันกรณี )( เนื่องจากถ้าเจอ <0 ดังนั้นจบละไม่ balance แน่ๆ
        if(char === "("){return ++previous}
        if(char === ")"){return --previous}
        return previous;// กรณีตัวอักษรอื่นๆปนมา
    },0);
}
balancedParens("((((");

//================== const let =============
// const = never change
// let = changeable
// *** ดังนั้นก่อนตั้งตัวแปลทุกครั้ง พิจาณาก่อนว่ามันจะเปลีย่นในอนาคตไหม

var name = 'Jane';
var title = 'Software Engineer';
var hourlyWage = 50;

//ES6 not using var anymore
const name = 'Jane'; // name not change
let title = 'Software Engineer';
title = 'Senior Software Engineer';
let hourlyWage = 40;


function count(targetString){
    // var characters = ['a','e','i','o','u'];
    // var number = 0;

    // อ่านง่ายกว่าอันบน เพราะ อย่างน้อยเราก็รู้ละว่า อะไรจะมีการเปลี่ยนค่าหรือไม่
    const characters = ['a','e','i','o','u'];
    let number = 0;
    
    for(var i = 0 ; i < targetString.length;i++){
        if(characters.includes(targetString[i])){
            number++;
        }
    }
    return number;
}

/*
"let allows you to declare variables that are limited in scope to the block,statement,
or expression on which it is used.
This is unlike the var keyword, which defines a variable globally,
or locally to an entire function regardless of block scope."
For example check the value of 'i' after these for loops.
//using var
for(var i =0;i<10;i++){// do something}
console.log(i);
//using let
for(let i =0;i<10;i++){// do something}
console.log(i);
*/

//=================== Template String ============
function getMessage(){
    const year = new Date().getFullYear();
    // return "The year is " + year;
    // return `The year is ${year}`;

    // return `${year}`;
    //same as
    // return year;
}

//========== Fat Arrow ============
const add = (a,b) =>{
    return a + b;
}

// implicit return
// ถ้ายาวๆก็อย่าใช้ท่านี้ อ่านยาก
const add = (a,b) => a+b;

// only for single argument
const double = number => 2 * number;

// no argument
const double = () => 3;

const numbers = [1,2,3];
numbers.map(number=>2*number);
//==================================
const team = {
    members:['Jane', 'Bill'],
    teamName: 'Super Squad',
    teamSummary() { // ใช้ Fat Arrow ไม่ได้ ทำได้แค่ลบ function กับ :

        // return this.members.map(function(member) {
        //     return `${member} is on team ${this.teamName}`;
        //     // TypeError:Cannot read property 'teamName' of undefined
        //     // เนื่องจาก iterator function มันจะส่งต่อไปที่ anonymous function 
        //     // ที่ใดที่หนึ่งใน code base ของเรา ทำให้ค่าของ this ของ object นี้หายไป
        //     // ES6 อาจใช้การ bind หรือ self=this มาช่วย (jquery)
        // });
        
        return this.members.map((member)=>{
            return `${member} is on team ${this.teamName}`;
            // Fat arrow ใช้หลักการ lexical this
            // arrow functions do not bind their own 'this', 'this' will still be pointing at the default object
        });
    }
}

//=============== Enhanced Object Literals =========
// const createBookShop = (inventory)=>{
//     return {
//         inventory: inventory,
//         inventoryValue: function(){
//             return this.inventory.reduce((total, book)=> total + book.price,0);
//         },
//         priceForTitle: function(title){
//             return this.inventory.find(book=>book.title === title).price;
//         }
//     };
// }
const createBookShop = (inventory)=>{
    return {
        inventory,// only if key and value is the same name
        inventoryValue(){// key = function ดังนั้น ลบ function กับ : ทิ้งได้
            return this.inventory.reduce((total, book)=> total + book.price,0);
        },
        priceForTitle(title){
            return this.inventory.find(book=>book.title === title).price;
        }
    };
}
const inventory = [
    { title: 'Harry Potter', price:10 },
    { title: 'Eloquent Javascript', price:15 }
];
const bookShop = createBookShop(inventory);
bookShop.inventoryValue();
bookShop.priceForTitle('Harry Potter');
//====================================
const saveFile = ()=>{
    // $.ajax({method:'POST', url:url,data:data});
    // $.ajax({method:'POST', url,data}); // only for key and value = same name
    $.ajax({url,data, method:'POST'}); // มักเอาแบบย่อ ไว้ข้างซ้ายก่อนแบบ key value pair ปกติ

}

//============ Default Function Arguments ==============
// ต้องการทำให้ default method คือ get request ถ้า user ไม่ส่ง method มา
// function makeAjaxRequest(url, method){
//     if(!method){
//         method = 'GET';
//     }
//     // logic to make the request
// }
function makeAjaxRequest(url, method = 'GET'){
    // logic to make the request
}
// แต่ถ้าไม่อยากให้ method มีค่าจริงๆ ดังนั้นควรส่งค่าเข้ามาเป็น null
// ถ้าใส่ไปเป็น undefined มันก็จะถูกปรับให้เป็น 'GET' อัตโนมัติอยู่ดี makeAjaxRequest('google.com',undefined);
// makeAjaxRequest('google.com',null);
// null หมายถึง Dev เป็นคนสั่งให้ไม่มีค่า เป็นคนสั่งให้เป็นอย่างนี้เอง
//===========================
function User(id){
    this.id = id;
}
function generateId(){
    return Math.random() * 9999999;
}
// function createAdminUser(user) {
function createAdminUser(user = new User(generatedId())){
    user.admin = true;
    return user;
}
// createAdminUser(new User(generateId());// ตอนใช้ขก มันดูใช้ยาก อยากให้ generated user ใหม่ให้อัตโนมัติได้ด้วย
// ดังนั้นกำหนดuser ไว้ที่ default
// createAdmin User(user); // หรือจะ เรียกด้วยท่าเก่าก็ยังได้อยู่

//================ Rest and Spread Operator =============
// function addNumbers(numbers){
function addNumbers(...numbers){ // = Rest Operator = ไม่รู้ว่าจะมีargument มากี่อัน แต่จะจับทั้งหมดยัดเป็น array เดียวกันให้
    return numbers.reduce((sum, number)=>{
        return sum+number;
    },0);
}
// addNumbers([1,2,3]);
addNumbers(1,2,3); // ถ้าอยากส่งท่านี้หละ
// ===================
const defaultColors = ['red', 'green'];
const userFavoriteColors = ['orange', 'yellow'];

// defaultColors.concat(userFavoriteColors); // ES5
[...defaultColors, ...userFavoriteColors];// ES6 Spread Operator
// ทำงานเหมือนกัน แต่อ่านง่ายกว่า ลองจินตนาการถ้า concat กันยาวๆ
// ถ้าส่งเข้ามาเป็น ... แบบนี้ มันก็จะถูกจับ spread แยกออกเป็น elementๆก่อนแล้วใส่ใน array ใหม่ให้
// ถ้าไม่มี ... ก็คือยัด element นั้นใน array ใหม่
// ['blue',...defaultColors, ...userFavoriteColors]; //['blue','red', 'green','orange', 'yellow']
//=======================
function validateShoppingList(...items){
    if(items.indexOf('milk')<0){
        return ['milk',...items];
    }
    return items;
}
validateShoppingList('oranges','bread','eggs');
//=======================
const MathLibrary = {
    // calculateProduct(a,b){// ถ้าอยากเปลี่ยนชื่อ ให้ไม่กระทบตรงอื่น ไม่กระทบคนที่เอา lib ไปใช้ จะทำยังไง?
        // return a * b;
    calculateProduct(...rest){
        // ให้ฟังชันเดิมไปเรียกฟังชันใหม่ จะได้ไม่เหมือนว่ามีฟังชัน2อันทำงานแบบเดียวกัน ซ้ำซ้อน
        //มีข้อความเตือนให้ย้ายไว้ด้วย
        console.log('Please use the multiply method instead.');
        return this.multiply();
    },
    multiply(a,b){// ชื่อใหม่ที่อยากเปลี่ยน
        return a*b;
    }
}
//============== Destructuring ==============
var expense = {
    type: 'Business',
    amount:'$45 USD'
};
// ES5
var type = expense.type;
var amount = expense.amount;

// ES6 Destructuring Object = pull of property
const { type , amount} = expesnse; // สร้างตัวแปลใหม่ ชื่อเดียวกับ key ของ object
// ต้องชื่อเดียวกันกับ key นะ
// ถ้าใส่ชื่อที่ไม่มี key นั้นใน object ก็จะได้ค่าเป็น undefined
//=======================
var savedFiled = {
    extension:'.jpg',
    name:'repost',
    size:14040
};
// function fileSummary(file){
//     return `The file ${file.name}.${file.extension} is of size ${file.size}`
// }

// Destructuring Arguments Object
// function fileSummary({name,extension,size}){
function fileSummary({name,extension,size},{color}){
    // จะได้ไม่ต้องเขียน file. ซ้ำๆหลายๆรอบ
    // return `The file ${name}.${extension} is of size ${size}`
    return `${color} The file ${name}.${extension} is of size ${size}`
}
// fileSummary(savedFiled);
fileSummary(savedFiled,{color:'red'});
//==========================
// Destucturing Array = pull of element
const companies = [
    'Google',
    'Facebook',
    'Uber'
];
const [ name,name2,name3 ] = companies; // ดึงค่าจาก array มาใส่ตัวแปล ตามลำดับค่าใน array นั้นเลย
// ถ้า มี name4 ดังนั้น ได้ undefined
// ถ้าอยากเอาแค่ บางตัว ดังนั้นก็ , ตัวที่ไม่ต้องการไว้
const [,,name3 ] = companies;

const [name,...rest] = companies; // ใช้ผสมกับ spread operator
// ดังนั้น name = 'Google', rest = ['Facebook','Uber']
//======================
// Destructuring Array and Object at the same time
const companies = [
    { name:'Google', location:'Mountain View'},
    { name:'Facebook', location:'Menlo Park'},
    { name:'Uber', location:'San Francisco'},
]
// ES5
// var location = companies[0].location;

// ES6
const [{location}] = companies;// [] = เอาอันแรก,{} เอา key location
//================
const Google = {
    locations:['Mountain View', 'New York', 'London']
};
const {locations:[location]}= Google;
// เข้าไปที่ key locations ซึ่งเป็น array แล้วเอา ค่าแรกใน array ของkey นี้มาใส่ตัวแปลชื่อ location
//===========================
// function signup(username, password){
// function signup(username, password, email, dateOfBirth, city){
function signup({username, password, email, dateOfBirth, city}){
    // create new user
}
// signup('myname','mypassword');
signup('myname','mypassword','myemail@example.com','1/1/1990','New York');
// ถ้าเผลอใส่ลำดับ argument ผิดละ
// รับหลาย argument จัด อาจพลาดได้ ถ้าต้องใช้ ฟังชันก์นี้ในหลายๆที่

// อาจใช้วิธีส่งเข้าไปเป็น object แทน
const user = {
    username:'myname',
    password:'mypassword',
    email:'myemail@example.com',
    dateOfBirth:'1/1/1900',
    city:'New York'
}
// ดังนั้นไม่ต้องเมาว่าจะส่งค่าผิดลำดับ argument อีก
//===========================
const points =[
    [4,5],
    [10,1],
    [0,40]
];
/* ต้องการเปลี่ยนเป็น
[
    {x:4,y:5},
    {x:10,y:1},
    {x:0,y:40}
]
*/
points.map(([x,y]) => {
    return {x,y};
});

//============ Classes ==========
// ES5
function Car(options) {
    this.title = options.title;
}
Car.prototype.drive = function () {
    return 'vroom';
}
const car = new Car({title:'Focus'});
car.drive();

function Toyota(options){
    Car.call(this,options);
    this.color = options.color;
}
Toyota.prototype = Object.create(Car.prototype);
Toyota.prototype.constructor = Toyota;
Toyota.prototype.honk = function(){
    return 'beep';
}
const toyota = new Toyota({color:'red',title:'Daily Driver'});
toyota.drive();
toyota.honk();

// ES6
class Car{
    constructor({title}){
        this.title = title;
    }
    // enhanced object literal syntax
    drive(){
        return 'vroom';
    }
}
const car = new Car({title:'Toyota'});
car.drive();

class Toyota extends Car{
    constructor(options){// ไม่นิยมใช้ destructuring ตรง constructor เพราะ อาจต้องส่งไปเรียกใช้ที่ super ต่อ
        super(options); // call the parent's constructor method // Car.constructor();
        this.color = options.color;
    }
    honk(){
        // super(); // ถ้า parent มี method ชื่อ honk ก็คือเรียกใช้ Car.honk(); นั้นเอง
        return 'beep';
    }
}
const toyota = new Toyota({color:'red','title':'Daily Driver'});
toyota.honk();
toyota.drive();
//======================
// ของเก่า
React.createClass({
    doSomething(){

    },
    doSomethingElse(){

    }
});
// ของใหม่
class MyComponent extends Component{
    doSomething(){
        
    }
    doSomethingElse(){

    }
}
//================= For Of Loop =============
// สามารถใช้ implement array helper ตัวอื่นๆได้หมด
// แต่ยังไงก็ยังแนะนำให้ใช้ array helper ดีกว่า ง่ายดี
// แต่ generator เหมาะใช้กับ for of loop
const colors = ['red','green','blue'];
for(let color of colors){
    console.log(color);    
}
//==========
const numbers = [1,2,3,4];
let total = 0;
for(let number of numbers){
    total += number;
}

//============= Generators =================
// Generator is a function that can be entered and exited multiple times.

// function *numbers(){
function* numbers(){
    yield;
}
const gen = numbers();
gen.next();// {"done:false"} ถ้าไม่มี yield จะเป็น {"done:true"}
gen.next();// {"done":true}
//==================
function* shopping(){
    // stuff on the side walk

    // walking down the sidewalk

    // go into the store with cash
    const stuffFromStore = yield 'cash'; // เหมือนออกจากฟังชันกลับมาที่ flow // ตอนกลับมาก็กลับมาตรงบรรทัดนี้เลย
    // กลับมาแบบ const stuffFromStore = 'groceries'; 

    // walking to landry place
    const cleanClothes = yield 'laundry'

    // walking back home
    // return stuffFromStore;
    return [stuffFromStore, cleanClothes];
}
// stuff in the store
const gen = shopping();
gen.next();// leaving our house // {"value":"cash","done":false}
// walked into the store
// walking up and down the aisles..
// purchase our stuff
gen.next('groceries');// leaving the store with groceries // {"value":"groceries","done":true}
gen.next('clean clothes');//{"value":["groceries","clean clothes"],"done":true}
//===========================
function* colors(){
    yield 'red';
    yield 'blue';
    yield 'green';
}
// const gen = colors();
// gen.next();//{"value":"red","done":false}
// gen.next();//{"value":"blue","done":false}
// gen.next();//{"value":"green","done":false}
// gen.next();//{"done":false}

const myColors = [];
for(let color of colors()){ // เอาค่าหลัง yield มาใส่ให้ color ในแต่ละรอบ
    myColors.push(color);
}
// myColors = ["red","blue","green"]
// *** we can use generators to iterate through any different types of data structures.
//=================
const engineeringTeam = {
    size:3,
    department:'Engineering',
    lead:'Jill',
    manager:'Alex',
    engineer:'Dave'
};
function* TeamIterator(team){
    yield team.lead;
    yield team.manager;
    yield team.engineer;
}
const names = [];
for(let name of TeamIterator(engineeringTeam)){
    names.push(name);
}
//  names = ["Jill","Alex","Dave"]
// *** can use to iterate over just very particular properties.
//============== Delegation of Generators ==========
const testingTeam = {
    lead: 'Amanda',
    tester:'Bill'
}
const engineeringTeam = {
    testingTeam,
    size:3,
    department:'Engineering',
    lead:'Jill',
    manager:'Alex',
    engineer:'Dave'
};
function* TeamIterator(team){
    yield team.lead;
    yield team.manager;
    yield team.engineer;
    const testingTeamGenerator = TestingTeamIterator(team.testingTeam);
    yield* testingTeamGenerator;
    // yield* เป็นการส่งสัญญาณกลับไปบอก for of loop ว่า
    // ตอนนี้เราอยู่ใน generator นะ แล้วใน object ข้างหลัง yield* เนี่ย มันก็มีการ yield ข้างในเหมือนกัน
    // for of loop จะได้ไป loop ดูให้ด้วย
}
function* TeatingTeamIterator(team) {
    yield team.lead;
    yield team.tester;
}
const names = [];
for(let name of TeamIterator(engineeringTeam)){
    names.push(name);
}
//  names = ["Jill","Alex","Dave","Amanda","Bill"]
//==================== Symbol.Iterator with Generators ===============
// Symbol.Iterator is a tool that teaches objects how to respond to the for of loop.
const testingTeam = {
    lead: 'Amanda',
    tester:'Bill',
    [Symbol.Iterator]:function* (){
        yield this.lead; // this = testingTeam
        yield this.tester;
    }
}
const engineeringTeam = {
    testingTeam,
    size:3,
    department:'Engineering',
    lead:'Jill',
    manager:'Alex',
    engineer:'Dave'
};
function* TeamIterator(team){
    yield team.lead;
    yield team.manager;
    yield team.engineer;
    yield* team.testingTeam; // yield* บอกให้ for of loop ไป iterate testingTeam ให้หน่อย
    // for of loop จะไปมองหา key Symbol.Iterator ใน testingTeam
    // ถ้ามี จะใช้ iterator จาก key นั้นในการ iterate
}
const names = [];
for(let name of TeamIterator(engineeringTeam)){
    names.push(name);
}
//  names = ["Jill","Alex","Dave","Amanda","Bill"]
//============ Complexities of Symbol.Iterator ============
const testingTeam = {
    lead: 'Amanda',
    tester:'Bill',
    [Symbol.Iterator]:function* (){
        yield this.lead;
        yield this.tester;
    }
}
const engineeringTeam = {
    testingTeam,
    size:3,
    department:'Engineering',
    lead:'Jill',
    manager:'Alex',
    engineer:'Dave',
    [Symbol.iterator]:function* (){
        yield this.lead;
        yield this.manager;
        yield this.engineer;
        yield* this.testingTeam;// ไปตาม loop object นี้ให้ด้วย
    }
};
const names = [];
for(let name of engineeringTeam){// ไม่ต้องใช้ผ่าน Iterator ที่สร้างข้างนอกเพิ่มแล้ว
    // จริงๆแล้ว Array default ก็มี Symbol.iterator ของมันอยู่แล้ว เราจึงใช้ for of loop ได้
    names.push(name);
}
//  names = ["Jill","Alex","Dave","Amanda","Bill"]
//============== Generators with Recursion ================
// เช่น tree data structure มักใช้กันมากใน web application
// ลองนึกถึงระบบ comment reddit ที่มี reply ต่อพ่วงๆกันไปเรื่อยๆ เป็นต้น
class Comment{
    constructor(value, children){
        this.content = content;
        this.children = children;
    }
    *[Symbol.iterator](){
        yield this.content;
        for(let child of this.children){
            yield* child;
        }
        // array helper not work with generators
        // cannot yield inside iterator function of array helper
        // so whenever we want to iterate over some collection and then yield
        // every single value that we have to use for of loop
    }
}
const children = [
    new Comment('good comment', []),
    new Comment('bad comment', []),
    new Comment('meh', [])
];
const tree = new Comment('Great post!', children);

const values = [];
for(let value of tree){// หน้าตาดูเหมือน for loop ธรรมดา แต่ด้วย Symbol.iterator ข้างในเราสามารถ iterate structure ยากๆได้้ โดยดูเหมือนง่ายๆข้างนอก
    values.push(value);
}
//============ promises ==============
const promise = new Promise((resolve,reject)=>{
    // default status of promise is pending that mean it waiting
    // resolve();// turn the promise in to resolve status // ไม่มี handler ก็ไม่เป็นไร
    // reject();// turn the promise in to reject status // ดังนั้นต้องมีวิธี handle ไม่งั้นมันจะ error // Uncaught (in promise) undefined
});
//============ Then and Catch ========
const promise = new Promise((resolve,reject)=>{
    reject();
});

// every then callback will get call if promise resolved
// every catch callback will get call if promise rejected
promise
    .then(()=>{
        console.log('finally finished!');
    })
    .then(()=>{ // chain ได้
        console.log('i was also ran!!!');
    })
    .catch(()=>{
        console.log('uh oh!!');
    });
//============ Async Code with Promises ==========
const promise = new Promise((resolve,reject)=>{
    // สมมติ api call
    setTimeout(() => {
        resolve();
    }, 3000);

    /*
    จริงๆเบื่องหลัง ajax ก็มีการเรียก request ประมาณนี้
    var request = new XHTMLRequest()
    request.onload = () => {
        resolve();
    }
    */
});
promise
    .then(()=>console.log('finally finished!'))
    .then(()=>console.log('i was also ran!!!'))
    .catch(()=>console.log('uh oh!!'));
//============ Ajax Requests with Fetch ===========
url = "https://jsonplaceholder.typicode.com/posts/";
// fetch(url);// ได้ promise "pending" กลับมา
//fetch(url)
//    .then(response=>console.log(response)) // ได้ response มา ไม่มีdata ที่เราต้องการ แต่ตอนนี้เราต้องการ data ไม่ใช่ response

fetch(url)
    .then(response => response.json()) // ต้อง response.json ก่อนถึงจะ เข้าถึง data ได้ นี้คืออปัญหาอย่างนึงของการใช้ fetch
    .then(data=>console.log(data));

//========= Shortcomings of Fetch =============
fetch(url)
    .then(response =>console.log(response)) // ถึงแม้จะ error 404 300 บลาๆ ก็จะมาเข้า then เพราะ fetch ทำงานไม่เหมือน lib อื่นๆ
    .catch(error=>console.log('BAD',error));// status code above 300 will not enter catch such as 404 ไม่เหมือนพฤติกรรมของ ajax lib อื่นๆ ดังนั้นจึงเป็นอีกข้อเสียนึงของ fetch
    // fetch only hits catch when the network request flat out fails to be issued at all
    // if the request hit the server and get fail status code it will hit then which ต่างจากพฤติกรรม ajax lib อื่นๆ
    // ดังนั้นไปใช้ lib อื่นๆดีกว่าจะได้ถูกท่า ถูกพฤติกรรมที่อยากให้เป็น

//========= More Information on using Generators with promise =========
https://www.youtube.com/watch?v=obaSQBBWZLk
http://plnkr.co/edit/1ArvFxI0gWmajTpDaOSB?p=preview
https://www.youtube.com/watch?v=QO07THdLWQo