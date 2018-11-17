export default {
  // все группы
  message: {},
  // шаблоны алгоритмов
  patterns: {
    loading: false,
    list: []
  },
  // шаблоны алгоритмов
  pattern: {
    loading: false,
    editing: false,
    model: {
      alg: null,
      name: null,
      desc: null,
      group: null
    }
  },
  // все группы
  groups: {
    loading: false,
    list: []
  },
  // Группа
  group: {
    loading: false,
    model: {
      code: null,
      name: null,
      desc: null,
      projections: []
    }
  },
  // все части группы
  parts: {
    loading: false,
    list: []
  },
  // часть группы
  part: {
    loading: false,
    model: {
      code: null,
      name: null,
      desc: null
    }
  },
  // все случаи группы
  cases: {
    loading: false,
    list: []
  },
  // Случай
  case: {
    loading: false,
    editing: false,
    model: {
      code: null,
      number: null,
      groupCode: null,
      projectionCode: null,
      partCode: null,
      name: null,
      desc: null,
      setup: null,
      arrows: null
    }
  },
  // все позиции для случая
  positions: {
    loading: false,
    list: []
  },
  // Позиция
  position: {
    loading: false,
    editing: false,
    model: {
      groupCode: null,
      caseCode: null,
      projectionCode: null,
      rotation: null,
      code: null,
      setup: null,
      arrows: null,
      solutions: []
    }
  },

  // проекции
  projections: {
    list: [
      {
        src: 'http://cube.crider.co.uk/visualcube.php?&fmt=svg&pzl=3&size=120&stage=f2l&cc=black&bg=white&dist=6&r=y30x-30',
        code: 'FR',
        name: 'Front right',
        turn:  '',
        rotations: ['U\'','U2','U']
      },
      {
        src: 'http://cube.crider.co.uk/visualcube.php?&fmt=svg&pzl=3&size=120&stage=f2l&cc=black&bg=white&dist=6&r=y-30x-30',
        code: 'FL',
        name: 'Front left',
        turn:  'y',
        rotations: ['U\'','U2','U']
      },
      {
        src: 'http://cube.crider.co.uk/visualcube.php?&fmt=svg&pzl=3&size=120&stage=f2l&cc=black&bg=white&dist=6&r=y30x-30',
        code: 'BR',
        name: 'Back right',
        turn: 'y\'',
        rotations: ['U\'','U2','U']
      },
      {
        src: 'http://cube.crider.co.uk/visualcube.php?&fmt=svg&pzl=3&size=120&stage=f2l&cc=black&bg=white&dist=6&r=y-30x-30',
        code: 'BL',
        name: 'Back left',
        turn: 'y2',
        rotations: ['U\'','U2','U']
      },
      {
        src: 'http://cube.crider.co.uk/visualcube.php?fmt=svg&pzl=3&size=120&view=plan',
        code: 'TOP',
        name: 'Top plan',
        rotations: ['y','y2','y\'']
      },
      {
        src: 'http://cube.crider.co.uk/visualcube.php?fmt=svg&pzl=3&size=120&view=plan&stage=oll',
        code: 'OLL',
        name: 'OLL plan',
        rotations: ['y','y2','y\'']
      }
    ]
  }

}
