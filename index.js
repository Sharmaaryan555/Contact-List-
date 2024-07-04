const { log } = require('console');
const express = require('express');
const path = require('path');
const port = 8000;


const db = require('./config/mongoose')
const Contact = require('./models/contact')
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.static('assets'));


var contactList = [
    {
        name:"Aryan Sharma",
        phone:"8295739516"
    },
    {
        name:"Raman",
        phone:"999156466"
    },
    {
        name:"Aman",
        phone:"9034508010"
    }
]

app.get('/', async function (req, res) {
    try {
        const contactList = await Contact.find({});
        return res.render('home', {
            title: "Contact List",
            contact_List: contactList
        });
    } catch (err) {
        console.log('Error in fetching contacts from DB', err);
        return res.redirect('back');
    }
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"Let's Play with ejs"
    });
});

app.post('/create-contact', async function (req, res) {
    try {
        const newContact = await Contact.create({
            name: req.body.name,
            phone: req.body.phone,
        });

        console.log('*******', newContact);
        return res.redirect('back');
    } catch (err) {
        console.log('Error in Creating Contact', err);
        return res.redirect('back');
    }
});


app.get('/delete-contact/', async function (req, res) {
    try {
        let phone = req.query.phone;

        if (!phone) {
            console.log('No phone number provided for deletion');
            return res.redirect('back');
        }

        // Find and delete contact by phone number
        await Contact.findOneAndDelete({ phone: phone });

        return res.redirect('back');
    } catch (err) {
        console.log('Error in Deleting an Object From Database', err);
        return res.redirect('back');
    }
});

app.listen(port,function(err){
    if (err) {
        console.log('Error in Running the Server!!!');
    }
    console.log('Server is Running Successfully');
})