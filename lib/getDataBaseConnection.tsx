import { AppDataSource } from "src/data-source"

const create = async () => {
  if (!AppDataSource.isInitialized) {
    return AppDataSource.initialize()
  } else {
    return AppDataSource
  }
}

const promise = create()

export const getDataBaseConnection = async () => {
  return promise
}
