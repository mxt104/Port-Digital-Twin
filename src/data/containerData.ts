export type ContainerStatus =
  | "OCCUPIED"
  | "AVAILABLE"
  | "RESERVED"
  | "INSPECTION";

export interface ContainerData {
  id: string;
  isoCode: string;
  type: "20FT" | "40FT";
  terminal: string;
  yard: string;
  block: string;
  bay: number;
  row: number;
  tier: number;
  status: ContainerStatus;
  sensorId?: string;
  lastUpdated: string;
}

export const containers: ContainerData[] = [
  {
    id: "MSKU1234567",
    isoCode: "45G1",
    type: "40FT",
    terminal: "Terminal 1",
    yard: "YARD-A",
    block: "A03",
    bay: 12,
    row: 4,
    tier: 3,
    status: "OCCUPIED",
    sensorId: "IR-034",
    lastUpdated: "2026-08-27T21:20:00",
  },

  {
    id: "TGHU7654321",
    isoCode: "22G1",
    type: "20FT",
    terminal: "Terminal 1",
    yard: "YARD-A",
    block: "A03",
    bay: 12,
    row: 4,
    tier: 2,
    status: "AVAILABLE",
    sensorId: "IR-035",
    lastUpdated: "2026-08-27T21:20:00",
  },

  {
    id: "OOLU2468135",
    isoCode: "45G1",
    type: "40FT",
    terminal: "Terminal 1",
    yard: "YARD-A",
    block: "A03",
    bay: 13,
    row: 4,
    tier: 1,
    status: "OCCUPIED",
    sensorId: "IR-036",
    lastUpdated: "2026-08-27T21:20:00",
  },

  {
    id: "CMAU1357924",
    isoCode: "45G1",
    type: "40FT",
    terminal: "Terminal 1",
    yard: "YARD-A",
    block: "A03",
    bay: 13,
    row: 5,
    tier: 2,
    status: "RESERVED",
    sensorId: "IR-037",
    lastUpdated: "2026-08-27T21:20:00",
  },

  {
    id: "TEMU8642097",
    isoCode: "22G1",
    type: "20FT",
    terminal: "Terminal 1",
    yard: "YARD-A",
    block: "A03",
    bay: 14,
    row: 5,
    tier: 1,
    status: "INSPECTION",
    sensorId: "IR-038",
    lastUpdated: "2026-08-27T21:20:00",
  },
];