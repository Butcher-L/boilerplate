const TransactionType = [
  'TODO',
  'INPROGRESS',
  'BLOCKED',
  'DONE'
]

const RoleType = [
  'ADMIN',
  'USER',
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
}

module.exports = { 
  TransactionType, 
  Transaction,
  RoleType,
  Role
}