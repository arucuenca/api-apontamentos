import Apontamento from '../../src/apontamento/Apontamento.entity';

export default [
  {
    id: 1,
    date: new Date(),
    startTime: `15h`,
    endTime: `16h`,
    user: `test`,
  },
  {
    id: 2,
    date: new Date(),
    startTime: `17h`,
    endTime: `18h`,
    user: `test_2`,
  },
  {
    id: 3,
    date: new Date(),
    startTime: `00h`,
    endTime: `23h59`,
    user: `test_3`,
  },
] as Apontamento[];
