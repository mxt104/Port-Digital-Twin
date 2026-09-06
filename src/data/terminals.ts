import type { Terminal } from '@/types/terminal'

/**
 * JNPA terminal reference data.
 * Capacity figures are SIMULATED for development purposes.
 * Not official JNPA published capacity statistics.
 *
 * Terminal codes: NSFT, NSICT, NSIGT, APMT, BMCT, NSDT
 * Source context: JNPA published terminal-wise traffic information.
 */
export const TERMINALS: Terminal[] = [
  {
    code:         'NSICT',
    name:         'Nhava Sheva International Container Terminal',
    operator:     'DP World',
    yardCapacity: 600,
    berths:       4,
    quayLength:   1200,
  },
  {
    code:         'NSIGT',
    name:         'Nhava Sheva International Gateway Terminal',
    operator:     'PSA International',
    yardCapacity: 580,
    berths:       3,
    quayLength:   1050,
  },
  {
    code:         'APMT',
    name:         'APM Terminals Mumbai',
    operator:     'APM Terminals',
    yardCapacity: 520,
    berths:       3,
    quayLength:   960,
  },
  {
    code:         'BMCT',
    name:         'Bharat Mumbai Container Terminals',
    operator:     'Ports America / JNPA JV',
    yardCapacity: 500,
    berths:       3,
    quayLength:   900,
  },
  {
    code:         'NSFT',
    name:         'Nhava Sheva Free Trade Warehousing Zone Terminal',
    operator:     'JNPA',
    yardCapacity: 440,
    berths:       2,
    quayLength:   720,
  },
  {
    code:         'NSDT',
    name:         'Nhava Sheva Distripark Terminal',
    operator:     'JNPA / CFS Operators',
    yardCapacity: 360,
    berths:       2,
    quayLength:   600,
  },
]
