import Realm from 'realm';


class Hole extends Realm.Object {}
Hole.schema = {
  name: 'Hole',
  primaryKey: 'id',
  properties: {
    id: 'string',
    date: 'string',
    round: 'string',
    holeID: 'string',
    fullStroke: 'int',
    halfStroke: 'int',
    puts: 'int',
    firstPutDistance: 'int',
    penalties: 'int',
    fairway: 'string'
    },
};

export default new Realm({schema: [Hole]});
