const {Router} = require('express');
const pool = require('../db');

const router = Router();

router.get('/',(request,response,next)=>{
    //we will run our query
    
    pool.query('SELECT * FROM monsters ORDER BY id ASC',(err,res)=>{
        //error will be passed to next handler
        if(err) return next(err);
        //console.log(res.rows);
        //below command will render the json onto the browser
        response.json(res.rows);
        });
    });
    
    //thisstack of middleware will look for 
    //error passed onto it
    
    router.get('/:id',(request, response, next)=>{
        //grab the id from url
        const {id} = request.params;
    
        pool.query('SELECT * FROM monsters WHERE id = $1',
        [id],(err, res)=>{
            if(err) return next(err);
            response.json(res.rows);
        });
    });

    router.post('/',(request, response, next)=>{
        const {name, personality} = request.body;
        //console.log('postttt')
        pool.query(
        'INSERT into monsters(name, personality) VALUES($1,$2)',
        [name,personality],
        (err, res)=>{
            if(err) return next(err);

            response.redirect('/monsters');
        }
    );
    });


    router.put('/:id',(request, response, next)=>{
        const {id} = request.params;
        console.log('put')
        const {name, personality} = request.body;

        const keys = ['name','personality'];


        //we will check the properties that we will
        //be sending via put, if it actually exists
        //in the db
        const fields = [];

        keys.forEach(key=>{
            if(request.body[key]) fields.push(key)
        });

        fields.forEach((field, index)=>{

            pool.query(
                `UPDATE monsters SET ${field}=($1),  WHERE id=($2)`,
                [request.body[field],id],
                (err,res) =>{
                    if(err) return next(err);
        
                   if(index === fields.length-1) response.redirect('/monsters');
                }
                )

        });
       
    });

    router.delete('/:id', (request, response, next)=>{
        const {id} = request.params;
        console.log('delete', id)
        pool.query('DELETE FROM monsters WHERE id={$1}', [id],(err, res)=>{
            if(err) return next(err);
            response.redirect('/monsters');
        });
    });

    module.exports = router;