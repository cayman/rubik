export default {


  // все случаи группы
  cases: {
    list: []
  },
  // Случай
  case: {
    model: {

    }
  },
  // все позиции для случая
  positions: {
    list: []
  },
  // Позиция
  position: {
    model: {
      caseCode: null,
      code: null,
      projectionCode: null,
      rotation: null,
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
