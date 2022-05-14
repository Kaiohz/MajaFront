export interface WithdrawalAdresses {
  list?: (ListEntity)[] | null;
  pagination: Pagination;
}
export interface ListEntity {
  id: string;
  type: Type;
  name: string;
  address: string;
  createdTs: string;
  currency: string;
  status: Status;
  updatedTs: string;
  inMoratorium: boolean;
}
export interface Type {
  code: string;
  description: string;
  supportedCurrencies?: (string)[] | null;
}
export interface Status {
  code: string;
  description: string;
}
export interface Pagination {
  size: number;
  page: number;
  totalPageCount: number;
}


export interface Wallet {
  active:       boolean;
  currency:     string;
  totalBalance: string;
  available:    string;
  pending:      string;
  btcRate:      number;
}

export interface Avg {
  value:       String;
}

export interface stats {
  value:       String;
  timestamp: String;
}

export interface result {
  result: stats[]
}


export interface NiceHashObject {
    minerStatuses: MinerStatuses
    rigTypes: RigTypes
    totalRigs: number
    totalProfitability: number
    groupPowerMode: string
    totalDevices: number
    devicesStatuses: DevicesStatuses
    unpaidAmount: string
    path: string
    btcAddress: string
    nextPayoutTimestamp: string
    lastPayoutTimestamp: string
    miningRigGroups: any[]
    miningRigs: MiningRig[]
    rigNhmVersions: string[]
    externalAddress: boolean
    totalProfitabilityLocal: number
    externalBalance: string
    pagination: Pagination
  }
  
  export interface MinerStatuses {
    MINING: number
    OFFLINE: number
  }
  
  export interface RigTypes {
    MANAGED: number
  }
  
  export interface DevicesStatuses {
    DISABLED: number
    MINING: number
    OFFLINE: number
  }
  
  export interface MiningRig {
    rigId: string
    type: string
    name: string
    statusTime: number
    joinTime: number
    minerStatus: string
    groupName: string
    unpaidAmount: string
    notifications: string[]
    softwareVersions: string
    devices: Device[]
    cpuMiningEnabled: boolean
    cpuExists: boolean
    stats: Stat[]
    profitability: number
    localProfitability: number
    rigPowerMode: string
    upTime: number
  }
  
  export interface Device {
    id: string
    name: string
    deviceType: DeviceType
    status: Status
    temperature: number
    load: number
    revolutionsPerMinute: number
    revolutionsPerMinutePercentage: number
    powerMode: PowerMode
    powerUsage: number
    speeds: Speed[]
    intensity: Intensity
    nhqm: string
  }
  
  export interface DeviceType {
    enumName: string
    description: string
  }
  
  export interface Status {
    enumName: string
    description: string
  }
  
  export interface PowerMode {
    enumName: string
    description: string
  }
  
  export interface Speed {
    algorithm: string
    title: string
    speed: string
    displaySuffix: string
  }
  
  export interface Intensity {
    enumName: string
    description: string
  }
  
  export interface Stat {
    statsTime: number
    market: string
    algorithm: Algorithm
    unpaidAmount: string
    difficulty: number
    proxyId: number
    timeConnected: number
    xnsub: boolean
    speedAccepted: number
    speedRejectedR1Target: number
    speedRejectedR2Stale: number
    speedRejectedR3Duplicate: number
    speedRejectedR4NTime: number
    speedRejectedR5Other: number
    speedRejectedTotal: number
    profitability: number
  }
  
  export interface Algorithm {
    enumName: string
    description: string
  }
  
  export interface Pagination {
    size: number
    page: number
    totalPageCount: number
  }
  