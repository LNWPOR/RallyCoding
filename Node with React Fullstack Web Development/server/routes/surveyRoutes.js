const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } =require('url'); //ไม่ต้อง install มันมากลับ node
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

// ต้อง require มาท่านี้ มาตรงๆไม่ได้เนื่องจาก อาจมีปัญหาตอนใช้กับ lib test
const Survey = mongoose.model('surveys');

module.exports = app =>{

    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user:req.user.id })
            .select({ recipients:false});// pull off only specific properties
        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) =>{
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', (req,res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');// path-parser ใช้ในการ extract parameter จาก url path
        // const events = _.map(req.body, (event)=>{
        // const events = _.chain(req.body)
        _.chain(req.body)
            .map(({email,url})=>{
                const match = p.test(new URL(url).pathname); //.test คืน true ถ้า pathname extract ได้
                // .test ใช้ destructuring ไม่ได้ เพราะว่าถ้ามัน extract ไม่ได้ดังนั้นมันมาทำ destructuring ก็จะพังไป
                if(match){
                    return { email, surveyId: match.surveyId, choice: match.choice};
                }
            })
            .compact() // return only object that not undefind
            .uniqBy('email', 'surveyId')
            .each(({surveyId, email, choice})=>{
                // ไม่ต้อง async await เนื่องจาก ไม่จำเป็นต้องรอ เพราะเราไม่ได้จำเป็นต้องไปทำอะไรต่อ ไม่ได้ต้องส่งอะไรกลับให้ sendggrid หรือให้ใคร
                Survey.updateOne({
                    _id: surveyId,
                    recipients:{
                        $elemMatch:{ email: email, responded: false}
                    }
                },{
                    $inc: {[choice]:1},
                    $set:{ 'recipients.$.responded':true},
                    lastResponded: new Date()
                }).exec(); //execute qurey
            })
            .value();
        res.send({});// ถ้าไม่ส่งอะไรตอบ sendgrid มันจะนึกว่า fail แล้วมันก็จะส่ง req มาใหม่เรื่อยๆ
        
        /*
        // // const events = _.map(req.body, (event)=>{
        // const events = _.map(req.body, ({email,url})=>{
        //     const pathname = new URL(url).pathname;
        //     const p = new Path('/api/surveys/:surveyId/:choice');// path-parser ใช้ในการ extract parameter จาก url path
        //     const match = p.test(pathname); //.test คืน true ถ้า pathname extract ได้
        //     // .test ใช้ destructuring ไม่ได้ เพราะว่าถ้ามัน extract ไม่ได้ดังนั้นมันมาทำ destructuring ก็จะพังไป
        //     if(match){
        //         return { email, surveyId: match.surveyId, choice: match.choice};
        //     }
        // });
        // const compactEvents = _.compact(events); // return only object that not undefind
        // const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
        // console.log(uniqueEvents);
        // res.send({});// ถ้าไม่ส่งอะไรตอบ sendgrid มันจะนึกว่า fail แล้วมันก็จะส่ง req มาใหม่เรื่อยๆ
        */
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const {title, subject, body, recipients } = req.body;
        
        const survey = new Survey({
            title,
            subject,
            body,
            // recipients: recipients.split(',').map(email=> ({email})), // ต้องใส่วงเล็บ ({email}) เนื่องจากเดวมันงงว่า เราจะ return ของเลยหรือจะใส่ {} เพื่อเขียนฟังชันข้างใน
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        // Great place to send an email!
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try{
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;

            const user = await req.user.save();

            res.send(user);
        }catch(err){
            res.status(422).send(err) // something wrong
        }
    });
};