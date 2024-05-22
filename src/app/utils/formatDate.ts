import { format } from 'date-fns'

export const formatDate = (date: Date) => format(new Date(date), 'dd/MM/yyyy HH:mm')