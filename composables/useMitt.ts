import mitt from 'mitt'
import type { AppEvents } from '~/types/events'

const bus = mitt<AppEvents>()
export function useMitt() {
  return bus
}
