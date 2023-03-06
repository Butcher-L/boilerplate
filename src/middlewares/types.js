const TransactionType = [
  'TODO',
  'INPROGRESS',
  'BLOCKED',
  'DONE'
]

const RoleType = [
  'ADMIN',
  'USER',
  'SUPER ADMIN'
]

const JobRoleType = [
  'NODE JS DEV',
  'FRONTEND DEV',
  'HR'
]

const VaccineType = [
  'PFIZER',
  'MODERNA',
  'JANSSEN',
  'SPUTNIK',
  'ASTRAZENECA'
]

const VaccineStatusType = [
  'UNVACCINATED',
  'VACCINATED',
  'FULLY VACCINATED',
]

const TeamsType = [
  'TEAM A',
  'TEAM B',
  'TEAM C',
  'TEAM D',
]

const Transaction = {
  Todo: 'TODO',
  Inprogress: 'INPROGRESS',
  Blocked: 'BLOCKED',
  Done: 'DONE'
}

const Role = {
  Admin: 'ADMIN',
  User: 'USER',
  SuperAdmin: 'SUPER ADMIN'
}

const JobRole = {
  NodeJsDev:'NODE JS DEV',
  FronEndDev:'FRONTEND DEV',
  Hr: 'HR'
}

const Vaccine = {
  Pfizer: 'PFIZER',
  Moderna: 'MODERNA',
  Janssen: 'JANSSEN',
  Sputnik: 'SPUTNIK',
  AstraZeneca: 'ASTRAZENECA'
}

const VaccineStatus = {
  Unvaccinated: 'UNVACCINATED',
  Vaccinated: 'VACCINATED',
  FullyVaccinated: 'FULLY VACCINATED',
}

const Teams = {
  TeamA: 'TEAM A',
  TeamB: 'TEAM B',
  TeamC: 'TEAM C',
  TeamD: 'TEAM D',
}


module.exports = { 
  TransactionType, 
  Transaction,
  RoleType,
  Role,
  JobRoleType,
  JobRole,
  VaccineType,
  Vaccine,
  VaccineStatusType,
  VaccineStatus,
  TeamsType,
  Teams
}