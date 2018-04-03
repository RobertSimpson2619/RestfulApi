const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());

const names = [
	{ id: 1, name: 'Ryan' },
	{ id: 2, name: 'Jonathan' },
	{ id: 3, name: 'Colin' },
	{ id: 4, name: 'Syed' },
]

const addresses = [
	{ id: 1, customer_id: 2, street_address: '123 Big Walk Way', postal_code: '75023', country: 'US'},
	{ id: 2, customer_id: 3, street_address: '509 Charter Road', postal_code: '90021', country: 'US'},
	{ id: 3, customer_id: 1, street_address: '999 Night Stalker Road', postal_code: '12345', country: 'US'},
]


app.get('/', (req,res) => {

	res.send('Hello World');

});

app.get('/api/names', (req,res) => {
    res.send(names);
});


app.get('/api/addresses', (req,res) => {

	res.send(addresses);
})


app.get('/api/names/:id', (req,res) => {
    const name = names.find(c => c.id === parseInt(req.params.id));

    if(!name) res.status(404).send("The name with the given ID was not found");

    res.send(name);
});



app.post('/api/names', (req,res) => {

	const schema = {
		name: Joi.string().min(2).required()
	};

	const result = Joi.validate(req.body, schema);
	

    if(result.error) {
    	res.status(400).send(result.error.details[0].message);
    	return;
    }

	const name = {
		id: names.length + 1,
		name: req.body.name
	};

	names.push(name);

	res.send(name);
});


app.put('/api/names/:id', (req,res) => {

	const name = names.find(c => c.id === parseInt(req.params.id));
    if(!name) res.status(404).send("The address with the given ID was not found");

	// validate
	// if in-valid return 400
	const schema = {
		name: Joi.string().min(2).required()
	};

	const result = Joi.validate(req.body, schema);

	if(result.error) {
    	res.status(400).send(result.error.details[0].message);
    	return;
    }

	// Update name
	// return updated name
	name.name = req.body.name;
	res.send(name);
})



app.delete('/api/names/:id', (req,res) => {

	const name = names.find(c => c.id === parseInt(req.params.id));
    if(!name) res.status(404).send("The address with the given ID was not found");

	// delete
	const index = names.indexOf(name);
	names.splice(index,1);

	res.send(name);

})






// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

