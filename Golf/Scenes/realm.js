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
    fullStroke: 'int',
    halfStroke: 'int',
    puts: 'int',
    firstPutDistance: 'int',
    penalties: 'int',
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
