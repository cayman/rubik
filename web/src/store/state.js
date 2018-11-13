export default {
  // все группы
  message: {},
  // шаблоны алгоритмов
  patterns: {
    loading: false,
    list: []
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
      parts: []
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
      setup: null
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
      solutions: []
    }
  },

  // проекции
  projections: {
    list: [
      {
        code: 'FR',
        name: 'Front right',
        view: 'y30x-30',
        turn:  '',
        turns: '',
        rotations: ['U\'','U2','U']
      },
      {
        code: 'FL',
        name: 'Front left',
        view: 'y-30x-30',
        turn:  'y',
        rotations: ['U\'','U2','U']
      },
      {
        code: 'BR',
        name: 'Back right',
        view: 'y30x-30',
        turn: 'y\'',
        rotations: ['U\'','U2','U']
      },
      {
        code: 'BL',
        name: 'Back left',
        view: 'y-30x-30',
        turn: 'y2',
        rotations: ['U\'','U2','U']
      }
    ]
  }

}
