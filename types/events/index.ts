import type { AuthEvents } from './auth'
import type { DevEvents } from './dev'

export type AppEvents =
  & DevEvents
  & AuthEvents
