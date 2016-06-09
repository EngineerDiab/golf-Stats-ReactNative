import Realm from 'realm';


class Hole extends Realm.Object {}
Hole.schema = {
  name: 'Hole',
  primaryKey:  'date'+'round'+'id',
  properties: {
    date: 'string',
    round: 'string',
    id: 'string',
    fullStroke: 'int',
    halfStroke: 'int',
    puts: 'int',
    firstPutDistance: 'int',
    penalties: 'int',
    fairway: 'string'
    },
};

class Round extends Realm.Object {}
Round.schema = {
  name: 'Round',
  primaryKey: 'id',
  properties: {
    id: 'string',
    done: 'string',
    holes: {type: 'list', objectType: 'Hole'}
    },
};

class ExportedRound extends Realm.Object{}
ExportedRounds.schema = {
  name: 'ExportedRound',
  primaryKey: 'id',
  properties: {
    id: {type: 'list', }'int',
    fullStroke: 'int',
    halfStroke: 'int',
    puts: 'int',
    firstPutDistance: 'int',
    penalties: 'int',
    fairway: 'string'
  },
};


export default new Realm({schema: [Hole, Round]});
