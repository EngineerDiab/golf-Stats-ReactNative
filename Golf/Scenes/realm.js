import Realm from 'realm';


class Hole extends Realm.Object {}
Hole.schema = {
  name: 'Hole',
  properties: {
    number:  'int',
    fullStroke: 'int',
    halfStroke: 'int',
    puts: 'int',
    firstPutDistance: 'int',
    penalties: 'int',
    fairway: 'string'
    },
};


export default new Realm({schema: [Hole]});
