import { format } from 'date-fns'

export const formatDateTime = (date: Date) => format(new Date(date), 'dd/MM/yyyy HH:mm')