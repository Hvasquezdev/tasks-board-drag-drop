import { uuid } from '@/utils';

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          descriptions: '',
          id: uuid(),
          name: 'First Task',
          userAssigned: null
        },
        {
          descriptions: '',
          id: uuid(),
          name: 'Second Task',
          userAssigned: null
        },
        {
          descriptions: '',
          id: uuid(),
          name: 'Third Task',
          userAssigned: null
        }
      ]
    }
  ]
};
