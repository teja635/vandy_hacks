var express = require('express')
  , router = express.Router();
var PythonShell = require('python-shell');
var fs = require('fs');

global.data = [
  {
    'x': 0,
    'y': 0,
    'time': {
      'one': 50,
      'two': 52,
      'three': 34,
      'week': 30,
      'month': 40
    }
  },
  {
    'x': 0,
    'y': 1,
    'time': {
      'one': 50,
      'two': 67,
      'three': 33,
      'week': 30,
      'month': 40
    }
  },
  {
    'x': 0,
    'y': 2,
    'time': {
      'one': 23,
      'two': 79,
      'three': 43,
      'week': 30,
      'month': 40
    }
  },
  {
    'x': 0,
    'y': 3,
    'time': {
      'one': 23,
      'two': 79,
      'three': 43,
      'week': 30,
      'month': 40
    }
  },
  {
    'x': 1,
    'y': 0,
    'time': {
      'one': 34,
      'two': 65,
      'three': 87,
      'week': 30,
      'month': 40
    }
  },
  {
    'x': 1,
    'y': 1,
    'time': {
      'one': 25,
      'two': 35,
      'three': 45,
      'week': 30,
      'month': 40
    }
  },
  {
    'x': 1,
    'y': 2,
    'time': {
      'one': 32,
      'two': 40,
      'three': 48,
      'week': 30,
      'month': 40
    }
  },
  {
    'x': 1,
    'y': 3,
    'time': {
      'one': 32,
      'two': 40,
      'three': 48,
      'week': 30,
      'month': 40
    }
  },
  {
    'x': 2,
    'y': 0,
    'time': {
      'one': 63,
      'two': 72,
      'three': 43,
      'week': 30,
      'month': 40
    }
  },
  {
    'x': 2,
    'y': 1,
    'time': {
      'one': 5,
      'two': 10,
      'three': 15,
      'week': 30,
      'month': 40
    }
  },
  {
    'x': 2,
    'y': 2,
    'time': {
      'one': 5,
      'two': 10,
      'three': 15,
      'week': 30,
      'month': 40
    }
  },
  {
    'x': 2,
    'y': 3,
    'time': {
      'one': 5,
      'two': 10,
      'three': 15,
      'week': 30,
      'month': 40
    }
  },
  {
    'x': 3,
    'y': 0,
    'time': {
      'one': 63,
      'two': 72,
      'three': 43,
      'week': 30,
      'month': 40
    }
  },
  {
    'x': 3,
    'y': 1,
    'time': {
      'one': 5,
      'two': 10,
      'three': 15,
      'week': 30,
      'month': 40
    }
  },
  {
    'x': 3,
    'y': 2,
    'time': {
      'one': 5,
      'two': 10,
      'three': 15,
      'week': 30,
      'month': 40
    }
  },
  {
    'x': 3,
    'y': 3,
    'time': {
      'one': 5,
      'two': 10,
      'three': 15,
      'week': 30,
      'month': 40
    }
  },
];

router.get('/', function(req, res){
  return res.json({
    data: global.data,
    error: false
  });
});

router.post('/', function(req, res){
  if(!(req.body.x || req.body.y)){
    return res.json({
      message: 'you need to pass in location',
      error: true
    });
  }
  global.data.push(req.body);
  return res.json({
    message: 'success',
    error: false
  });
});

router.put('/:putx/:puty', function(req, res){


  PythonShell.run('/controllers/data_visualization.py', function (err) {
  if (err) throw err;
    console.log('finished');
  });
  for(var r = 0; r < global.data.length; r++){
    if(global.data[r].x === parseInt(req.params.putx) && global.data[r].y === parseInt(req.params.puty)){
      global.data[r].time.one++;
      return res.json({
        message: '('+global.data[r].x + ',' + global.data[r].y + ') has been incremented',
        error: false
      });
    }
  }
  return res.status(404).json({
    message: "x or y value passed in is out of bounds or is nonexistant",
    error: true
  })
})

module.exports = router;
