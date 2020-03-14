import { uuid } from '@/utils';

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      id: uuid(),
      tasks: [
        {
          description: 'Do task one',
          id: uuid(),
          name: 'First Task',
          userAssigned: null
        },
        {
          description: '',
          id: uuid(),
          name: 'Second Task',
          userAssigned: null
        },
        {
          description: '',
          id: uuid(),
          name: 'Third Task',
          userAssigned: null
        }
      ]
    },
    {
      name: 'review',
      id: uuid(),
      tasks: [
        {
          description: '',
          id: uuid(),
          name: 'First review',
          userAssigned: null
        },
        {
          description: '',
          id: uuid(),
          name: 'Second review',
          userAssigned: null
        },
        {
          description: '',
          id: uuid(),
          name: 'Third review',
          userAssigned: null
        }
      ]
    }
  ]
};
