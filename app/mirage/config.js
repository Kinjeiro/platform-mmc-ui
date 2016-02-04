import config       from './../config/environment';

let OTYPES = [
	{ id: 1, name: 'otype1' },
	{ id: 2, name: 'otype2' },
	{ id: 3, name: 'otype3' }
];


export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
   this.namespace = config.SERVER_API_NAMESPACE;
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */




	//можно с помощью фейкеров нагенерить данных -
	// http://www.ember-cli-mirage.com/docs/v0.2.0-beta.3/seeding-your-database/
	// http://www.programwitherik.com/ember-mirage-tutorial-and-examples/

	this.get('/otypes', (db, req) => {
	    return {
		    otypes: OTYPES
	    };
	});
	this.get('/otypes/:id', (db, req) => {
		const id = req.params.id;
	    return {
		    otypes: OTYPES.find((otype) => (otype.id == id))
	    };
	});



  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;

      return {
        contact: db.contacts.find(contactId),
        addresses: db.addresses.where({contact_id: contactId})
      };
    });

  */
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
