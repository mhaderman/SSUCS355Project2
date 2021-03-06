var express = require('express');
var router = express.Router();
var account_dal = require('../model/account_dal');

router.get('/all', function(req, res){
   account_dal.getAll(function(err1, res1){
       if(err1){
           console.log("acc get all broke");
           res.send(err1);
       }else{
           res.render('account/accountViewAll', {response: res1});
       }
   })
});

router.get('/createForm', function(req, res1){  //needs to add information into Acc and ACC_ADDr
    res1.render('account/accountCreateForm');
});

router.post('/addAccount', function(req,res1){
    account_dal.addAccount(req.body.account, function(err1, res2){
        if(err1){
            res1.send("insert did not work :(");
        }else{
            res1.render('account/accountSuccessful');
            //res1.send("insert successful");//make it link to success.ejs file
        }
    })
});

router.get('/update/:id', function(req, res){
    var id = req.params.id;
    account_dal.getAllById(id, function(err2, res2){
        if(err2){
            console.log("error thrown creating updateform");
            res.send(err2);
        }else{
            console.log(res2);
            var obj = { account_id: id,
                        account: res2};
            console.log(obj);
            res.render('account/accountUpdateForm', {response: obj});
        }
    })
})

//post req. same route
router.post('/update/:id', function(req, res) {
    var id = req.params.id;
    var obj = { id: id,
                first: req.body.account.first_name,
                last: req.body.account.last_name,
                email: req.body.account.email,
                phone: req.body.account.phone_number };
    console.log(obj);
    account_dal.updateById(obj, function(err1, res1){
        if(err1){
            console.log("account update broke");
            res.send(err1);
        }else{
            res.render('account/accountSuccessful');
        }
    })
})


//usage of view and function
router.get('/viewBy/:id', function(req, res){  //gets the total amount donated, and total time attending volunteer events
    var id = req.params.id;
    //console.log("id: " + id);     //defined

    account_dal.getDonationsById(id, function(err2, donation){ //uses sum,
        account_dal.getActivitiesById(id, function(err3, activity){ //uses count
            account_dal.getAllById(id, function(err4, account){
                if(err2 || err3 || err4){
                    console.log("error");
                    res.send(err2 + err3 + err4);
                }
                console.log(account);
                var obj = {
                            donation: donation,    //[first_name, last_name, sum]
                            activity: activity,     // [account_id, num_activity]
                            account: account,       // first_name, last_name, phone_number, email
                            account_id: id};        //account_id
                console.log(obj);


                res.render('account/accountViewById', { object: obj});
            })


        })

    })
})


module.exports = router;