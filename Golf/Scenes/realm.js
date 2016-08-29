import Realm from 'realm';


class Hole extends Realm.Object {}
Hole.schema = {
  name: 'Hole',
  primaryKey: 'id',
  properties: {
    id: 'string',
    date: 'string',
    round: 'string',
    holeID: 'int',
    par: 'int',
    fullStroke: 'int',
    halfStroke: 'int',
    puts: 'int',
    firstPutDistance: 'int',
    penalties: 'int',
    gir: 'bool',
    fairway: 'string'
    },
};

class Round extends Realm.Object{}
Round.schema = {
  name: 'Round',
  primaryKey: 'id',
  properties:{
    id: 'int',
    roundNumber: 'int'
  }
}

export default new Realm({schema: [Hole, Round]});
